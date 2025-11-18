from strands import Agent, tool
from strands.models.base import LLMModel
import requests
import os
from dotenv import load_dotenv
import boto3

load_dotenv()
class GroqModel(LLMModel):
    def __init__(self, api_key, model_name="llama3-70b-8192"):
        self.api_key = api_key
        self.model_name = model_name
    async def acompletion(self, prompt: str):
        payload = {
            "model": self.model_name,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json=payload
        )
        data = response.json()
        return data["choices"][0]["message"]["content"]

s3 = boto3.client(
    's3', 
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("COGNITO_REGION")
)

@tool
def legal_mystic(file_key: str):
    """Fetch the document from S3 for analysis."""
    bucket = os.getenv("AWS_BUCKET_NAME")
    obj = s3.get_object(Bucket=bucket, Key=file_key)
    content = obj['Body'].read()
    return content

model = GroqModel(api_key=os.getenv("GROQ_API_KEY"))

agent = Agent(model=model,tools=[legal_mystic])
