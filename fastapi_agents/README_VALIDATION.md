# FastAPI Legal Document Analysis Service

## Overview

This FastAPI service provides AI-powered legal document analysis using Google Gemini and various legal data sources. The service has been enhanced with comprehensive input validation, error handling, and edge case management.

## Key Improvements

### 1. Pydantic Schema Validation
- **Request/Response Models**: All API endpoints now use Pydantic models for strict type validation
- **Input Sanitization**: Automatic validation of file keys, email formats, and data constraints
- **Consistent Responses**: Standardized response formats across all endpoints

### 2. Enhanced Error Handling
- **HTTP Status Codes**: Proper status codes (400, 401, 404, 413, 422, 500)
- **Structured Errors**: Consistent error response format with error codes and details
- **Validation Errors**: Automatic handling of Pydantic validation failures

### 3. Edge Case Handling
- **File Validation**: PDF-only support with size limits (50MB max)
- **Content Validation**: Minimum text requirements (50 characters)
- **Empty Documents**: Graceful handling of documents with insufficient content
- **Network Failures**: Robust error handling for S3, Redis, and external API calls

## API Endpoints

### Health Check
```http
GET /health
```

Returns service health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-06T12:00:00",
  "version": "1.0.0"
}
```

### Document Analysis
```http
GET /status
Authorization: Bearer <jwt_token>
```

Processes uploaded PDF documents and returns legal analysis.

**Requirements:**
- Valid JWT token from AWS Cognito
- PubSub message with `file_key` containing S3 PDF path

**Success Response:**
```json
{
  "response": "Legal analysis text...",
  "cache": false
}
```

**Error Responses:**
```json
{
  "error": "Invalid or expired token",
  "code": "HTTP_EXCEPTION"
}
```

## Validation Rules

### File Key Validation
- Must be non-empty
- Must end with `.pdf`
- Cannot contain path traversal sequences (`..`, `/`, `\`)
- Maximum length: 500 characters

### Document Content Validation
- Minimum extracted text: 50 characters
- Maximum file size: 50MB
- Must be valid PDF format

### Authentication
- Required JWT token in Authorization header
- Token must be issued by configured Cognito User Pool
- Must contain valid `email` claim

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 422 | Input validation failed |
| `HTTP_EXCEPTION` | 401/403/404 | Authentication/authorization error |
| `INTERNAL_ERROR` | 500 | Server-side error |

## Running the Service

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables:
```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
COGNITO_REGION=your_region
USER_POOL_ID=your_pool_id
USER_POOL_CLIENT_ID=your_client_id

# Redis Configuration
REDIS_URL=your_redis_url
REDIS_PORT=6379
REDIS_PASSWORD=your_password

# Database
NEON_URL=your_database_url

# Google AI
GEMINI_API_KEY=your_gemini_key

# PubSub
SUBSCRIBER_PATH=your_subscriber_path
```

3. Run the service:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Testing

Run the validation tests:
```bash
python -m pytest test_validation.py -v
```

## Security Features

- **Input Validation**: All inputs validated against schemas
- **File Type Restriction**: Only PDF files accepted
- **Size Limits**: Prevents oversized file uploads
- **Path Traversal Protection**: Sanitizes file keys
- **JWT Validation**: Proper token verification with expiration checks
- **Error Information Leakage**: Sensitive details hidden in production

## Monitoring

The service includes:
- Health check endpoint for load balancer monitoring
- Structured logging for all operations
- Cache hit/miss tracking
- Error rate monitoring through consistent error responses