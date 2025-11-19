from ninja import Schema
from datetime import datetime
class HelloTestResponse(Schema):
    text : str

class GetSignedUrl(Schema):
    file_name: str
    content_type: str

class ChatHistoryOut(Schema):
    timestamp : datetime
    response: str