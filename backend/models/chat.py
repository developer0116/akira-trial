from typing import Optional, Any

from beanie import Document
from pydantic import BaseModel, EmailStr


class Chat(Document):
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "message": "test",
            }
        }

    class Settings:
        name = "chat"
