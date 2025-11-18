from strands import Agent, tool
from strands.models.gemini import GeminiModel
import requests
import os
from dotenv import load_dotenv
import boto3
import fitz
load_dotenv()
model = GeminiModel(
    client_args={
        "api_key": os.getenv("GEMINI_API_KEY")
    },
    model_id="gemini-2.5-flash",
    params={
        "temperature": 0.5,
        "max_output_tokens": 2048,
        "top_p": 0.9,
        "top_k": 40
    }
)
s3 = boto3.client(
    's3', 
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("COGNITO_REGION")
)

@tool
def legal_mystic(file_key: str):
    """Fetch the document from S3."""
    bucket = os.getenv("AWS_BUCKET_NAME")
    obj = s3.get_object(Bucket=bucket, Key=file_key)
    content = obj['Body'].read()
    pdf = fitz.open(stream=content, filetype="pdf")
    text = ""
    for page in pdf:
        text += page.get_text()
    return text

@tool
def fetch_india_act(act_code: str):
    """ Fetch full act text from India Code API"""
    url = f"https://www.indiacode.nic.in/api/acts/{act_code}"
    r = requests.get(url)
    return r.json() if r.headers.get("content-type") == "application/json" else r.text

@tool
def fetch_india_section(act_code: str, section_number: str):
    """Fetch specific section from an act."""
    url = f"https://www.indiacode.nic.in/api/section/{act_code}/{section_number}"
    r = requests.get(url)
    return r.json() if r.headers.get("content-type") == "application/json" else r.text

@tool
def fetch_constitution_article(article_number: str):
    """Fetch Constitution article."""
    url = f"https://www.indiacode.nic.in/api/articles/A1950/{article_number}"
    r = requests.get(url)
    return r.json() if r.headers.get("content-type") == "application/json" else r.text

agent = Agent(model=model, tools=[legal_mystic, fetch_india_act, fetch_india_section, fetch_constitution_article])
