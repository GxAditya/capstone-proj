from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from google.cloud import pubsub_v1
import threading
import json
from agents.agent import get_agent
from fastapi import Depends
from auth import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables, ChatHistory, User, SessionDep
from redis import Redis
import boto3
import fitz
import hashlib
from schemas import StatusRequest, StatusResponse, ErrorResponse, HealthResponse, ValidationErrorResponse
from pydantic import ValidationError
from typing import Union
#COMMENTS TO BE ADDED LATER
load_dotenv()
redis_client = Redis(
    host=os.getenv("REDIS_URL"),
    port=int(os.getenv("REDIS_PORT")),
    password=os.getenv("REDIS_PASSWORD"),
    decode_responses=True
)

s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("COGNITO_REGION")
)


app = FastAPI(
    title="Legal Document Analysis API",
    description="AI-powered legal document analysis service",
    version="1.0.0"
)
app.state.mess = None

# Exception handlers
@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    errors = {}
    for error in exc.errors():
        field_name = ".".join(str(loc) for loc in error["loc"]) if error["loc"] else "unknown"
        errors[field_name] = error["msg"]
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ValidationErrorResponse(
            errors=errors,
            code="VALIDATION_ERROR"
        ).model_dump()
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "code": "HTTP_EXCEPTION"
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal server error",
            "code": "INTERNAL_ERROR",
            "details": str(exc) if os.getenv("DEBUG", "false").lower() == "true" else None
        }
    )

def pubsub_listener():
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = os.getenv("SUBSCRIBER_PATH")

    def callback(message: pubsub_v1.subscriber.message.Message):
        app.state.mess = message.data.decode("utf-8")
        print(f"Received: {message.data.decode('utf-8')}")
        message.ack()

    print(f"Pub/Sub: Listening on {subscription_path}...")
    streaming_pull_feature = subscriber.subscribe(subscription_path, callback=callback)

    try:
        streaming_pull_feature.result()
    except Exception as e:
        print(f"Crashed: {e}")


@app.on_event("startup")
def launch_subscriber():
    # create_db_and_tables()
    thread = threading.Thread(target=pubsub_listener, daemon=True)
    thread.start()
    print("🎉 Pub/Sub listener running in background thread!")


def extract_pdf_text(pdf):
    """Extract text from PDF with fallback for legal/complex PDFs."""

    final_text = ""

    for page in pdf:
        text = page.get_text("text").strip()
        if not text:
            blocks = page.get_text("blocks")
            if isinstance(blocks, list):
                text = "\n".join(
                    blk[4] for blk in blocks
                    if isinstance(blk, list) and len(blk) > 4
                ).strip()
        if not text:
            raw = page.get_text("rawdict")
            if "blocks" in raw:
                text = "\n".join(
                    blk.get("text", "")
                    for blk in raw["blocks"]
                    if blk.get("type") == 0
                ).strip()

        final_text += text + "\n"

    return final_text


def chunk_text(text, chunk_size=4000):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def summarize_chunk(chunk: str):
    prompt = f"""
You are a Legal Document Chunk Summarizer.
Summarize the following part of a legal document factually,
without legal advice or opinions.

Chunk:
---------------------
{chunk}
---------------------
"""
    res = get_agent()(prompt)
    return res.message["content"][0]["text"].strip()


def final_legal_analysis(chunk_summaries):
    prompt = f"""
You are a Legal Document Intelligence Agent.

You will receive summarized chunks of a long legal document.
Using ONLY the information in those summaries, generate:

1. A complete overall summary
2. Identified Indian legal sections (IT Act, IPC, Constitution etc.)
3. Factual context/explanation for each section
4. Highlight red flags (ambiguities, missing data, contradictions)
5. Do NOT provide legal advice
6. End with: "Disclaimer: This is an automated analysis, not legal advice."

Chunk Summaries:
-------------------------
{json.dumps(chunk_summaries, indent=2)}
-------------------------
"""
    res = get_agent()(prompt)
    return res.message["content"][0]["text"].strip()


@app.get("/status", response_model=StatusResponse)
async def check(user=Depends(get_current_user), session: SessionDep = None) -> StatusResponse:
    """
    Process uploaded PDF document and return legal analysis.

    - **Returns**: Legal document analysis or error response
    - **Requires**: Valid authentication token
    """
    try:
        # Validate PubSub message exists
        if app.state.mess is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No document processing request found"
            )

        print("RAW:", repr(app.state.mess))

        # Parse and validate the PubSub message
        try:
            payload = json.loads(app.state.mess)
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid JSON in PubSub message: {str(e)}"
            )

        # Validate the payload structure
        try:
            status_request = StatusRequest(**payload)
            file_key = status_request.file_key
        except ValidationError as e:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid request data: {str(e)}"
            )

        bucket = os.getenv("AWS_BUCKET_NAME")
        if not bucket:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="AWS bucket configuration missing"
            )

        # Download file from S3
        try:
            obj = s3.get_object(Bucket=bucket, Key=file_key)
            content = obj["Body"].read()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Failed to retrieve file from S3: {str(e)}"
            )

        # Validate file size (max 50MB)
        max_size = 50 * 1024 * 1024  # 50MB
        if len(content) > max_size:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File size exceeds maximum limit of 50MB"
            )

        # Open and validate PDF
        try:
            pdf = fitz.open(stream=content, filetype="pdf")
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to open PDF: {str(e)}"
            )

        # Extract text from PDF
        try:
            pdf_text = extract_pdf_text(pdf)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to extract text from PDF: {str(e)}"
            )

        # Validate extracted text
        if not pdf_text or len(pdf_text.strip()) < 50:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="The uploaded document contains insufficient readable text (minimum 50 characters required)"
            )

        # Check cache
        content_hash = hashlib.sha256(pdf_text.encode("utf-8")).hexdigest()
        cached = redis_client.get(content_hash)
        if cached:
            print("🚀 Cache HIT:", content_hash)
            app.state.mess = None
            return StatusResponse(response=cached, cache=True)

        print("❌ Cache MISS:", content_hash)

        # Ensure user exists in database
        try:
            existing_user = session.get(User, user["email"])
            if not existing_user:
                session.add(User(email=user["email"]))
                session.commit()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )
        print("📌 Splitting PDF into chunks...")
        try:
            chunks = chunk_text(pdf_text)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to process document chunks: {str(e)}"
            )

        if not chunks:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Document could not be split into processable chunks"
            )

        print(f"📄 Total Chunks: {len(chunks)}")

        # Process chunks
        chunk_summaries = []
        for index, chunk in enumerate(chunks):
            print(f"🔹 Summarizing Chunk {index + 1}/{len(chunks)}...")
            try:
                summary = summarize_chunk(chunk)
                if not summary or len(summary.strip()) < 10:
                    print(f"⚠️  Warning: Chunk {index + 1} produced insufficient summary")
                    continue
                chunk_summaries.append(summary)
            except Exception as e:
                print(f"⚠️  Warning: Failed to summarize chunk {index + 1}: {str(e)}")
                continue

        if not chunk_summaries:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Failed to generate summaries for any document chunks"
            )

        print("🔍 Running Final Legal Analysis...")
        try:
            final_output = final_legal_analysis(chunk_summaries)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to perform legal analysis: {str(e)}"
            )

        if not final_output or len(final_output.strip()) < 50:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Legal analysis produced insufficient output"
            )

        # Cache the result
        try:
            redis_client.set(content_hash, final_output, ex=60 * 60 * 24)  # 24 hours
        except Exception as e:
            print(f"⚠️  Warning: Failed to cache result: {str(e)}")

        # Save to database
        try:
            new_history = ChatHistory(
                user_email=user["email"],
                file_key=file_key,
                response=final_output
            )
            session.add(new_history)
            session.commit()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save chat history: {str(e)}"
            )

        # Reset message
        app.state.mess = None

        return StatusResponse(response=final_output)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify service status.

    - **Returns**: Service health information
    """
    return HealthResponse(
        status="healthy",
        version="1.0.0"
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://capstone-proj-green.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
