from ninja import Schema
class HelloTestResponse(Schema):
    text : str

class GetSignedUrl(Schema):
    file_name: str
    content_type: str