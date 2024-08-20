from pydantic import BaseModel, EmailStr
from typing import Optional, Any, List


class AddChatModel(BaseModel):
    message: str
    userId: str

    class Collection:
        name = "chat"
    class Config:
        json_schema_extra = {
            "example": {
                "message": "test message",
            }
        }

class UpdateChatModel(BaseModel):
    message: str
    actions: Optional[List[str]]

    class Collection:
        name = "chat"

    class Config:
        json_schema_extra = {
            "example": {
                "message": "test message",
            }
        }


class Response(BaseModel):
    status_code: int
    response_type: str
    description: str
    data: Optional[Any]

    class Config:
        json_schema_extra = {
            "example": {
                "status_code": 200,
                "response_type": "success",
                "description": "Operation successful",
                "data": "Sample data",
            }
        }
