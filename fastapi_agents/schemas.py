from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime
import json


class UserBase(BaseModel):
    email: str = Field(..., description="User email address", json_schema_extra={"example": "user@example.com"})

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        import re
        if not v or not isinstance(v, str):
            raise ValueError('Email is required')
        v = v.strip()
        if not v:
            raise ValueError('Email cannot be empty')
        # Basic email regex pattern
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        return v.lower()


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    created_at: datetime = Field(..., description="Account creation timestamp")


class ChatHistoryBase(BaseModel):
    file_key: str = Field(..., description="S3 file key for the uploaded document", min_length=1, max_length=500)
    response: str = Field(..., description="AI analysis response", min_length=1)

    @field_validator('file_key')
    @classmethod
    def validate_file_key(cls, v):
        if not v or v.strip() == '':
            raise ValueError('File key cannot be empty')
        # Basic validation for S3 key format
        if '..' in v or v.startswith('/') or '\\' in v:
            raise ValueError('Invalid file key format')
        # Check for PDF extension
        if not v.lower().endswith('.pdf'):
            raise ValueError('Only PDF files are supported')
        return v.strip()


class ChatHistoryCreate(ChatHistoryBase):
    user_email: str = Field(..., description="User email associated with the chat history")


class ChatHistoryResponse(ChatHistoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique chat history ID")
    timestamp: datetime = Field(..., description="Timestamp of the analysis")
    user_email: str = Field(..., description="User email")


class StatusRequest(BaseModel):
    """Request model for status endpoint - expects PubSub message data"""
    file_key: str = Field(..., description="S3 file key for the PDF document", min_length=1, max_length=500)

    @field_validator('file_key')
    @classmethod
    def validate_file_key(cls, v):
        if not v or v.strip() == '':
            raise ValueError('File key cannot be empty')
        # Check for PDF extension
        if not v.lower().endswith('.pdf'):
            raise ValueError('Only PDF files are supported')
        return v.strip()


class StatusResponse(BaseModel):
    response: str = Field(..., description="Legal document analysis result")
    cache: Optional[bool] = Field(False, description="Whether the response was served from cache")


class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    code: str = Field(..., description="Error code for programmatic handling")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional error details")


class ValidationErrorResponse(BaseModel):
    errors: Dict[str, str] = Field(..., description="Field validation errors")
    code: str = Field("VALIDATION_ERROR", description="Error code")


class HealthResponse(BaseModel):
    status: str = Field("healthy", description="Service health status")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Response timestamp")
    version: Optional[str] = Field(None, description="API version")