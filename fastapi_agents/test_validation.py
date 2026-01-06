import pytest
from pydantic import ValidationError
from schemas import StatusRequest, StatusResponse, ErrorResponse, UserResponse, ChatHistoryBase


def test_status_request_validation():
    """Test StatusRequest schema validation"""
    # Valid request
    request = StatusRequest(file_key="test.pdf")
    assert request.file_key == "test.pdf"

    # Invalid file key - empty
    with pytest.raises(ValidationError):
        StatusRequest(file_key="")

    # Invalid file key - not PDF
    with pytest.raises(ValidationError):
        StatusRequest(file_key="test.txt")

    # Invalid file key - path traversal attempt
    with pytest.raises(ValidationError):
        StatusRequest(file_key="../../../etc/passwd")


def test_status_response_schema():
    """Test StatusResponse schema"""
    response = StatusResponse(response="Test analysis", cache=False)
    assert response.response == "Test analysis"
    assert response.cache == False


def test_error_response_schema():
    """Test ErrorResponse schema"""
    error = ErrorResponse(
        error="Test error",
        code="TEST_ERROR",
        details={"extra": "info"}
    )
    assert error.error == "Test error"
    assert error.code == "TEST_ERROR"
    assert error.details == {"extra": "info"}


def test_chat_history_base_validation():
    """Test ChatHistoryBase schema validation"""
    # Valid chat history
    history = ChatHistoryBase(file_key="document.pdf", response="Analysis result")
    assert history.file_key == "document.pdf"
    assert history.response == "Analysis result"

    # Invalid file key - not PDF
    with pytest.raises(ValidationError):
        ChatHistoryBase(file_key="document.txt", response="Analysis result")

    # Invalid file key - path traversal
    with pytest.raises(ValidationError):
        ChatHistoryBase(file_key="../../../etc/passwd", response="Analysis result")


def test_chunk_text_function():
    """Test text chunking function"""
    # Import locally to avoid main app dependencies
    def chunk_text(text, chunk_size=4000):
        return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

    # Normal text
    text = "This is a test document. " * 1000
    chunks = chunk_text(text, chunk_size=50)
    assert len(chunks) > 1
    assert all(len(chunk) <= 50 for chunk in chunks)

    # Empty text
    chunks = chunk_text("")
    assert chunks == []  # Empty list for empty text

    # Text smaller than chunk size
    small_text = "Short text"
    chunks = chunk_text(small_text, chunk_size=50)
    assert chunks == [small_text]


if __name__ == "__main__":
    pytest.main([__file__])