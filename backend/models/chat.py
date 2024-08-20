from typing import List, Optional
from beanie import Document, init_beanie, before_event
from datetime import datetime
from pydantic import BaseModel

class Chat(Document):
    message: str
    actions: Optional[List[str]] = None
    sender: str = "user"
    userId: str
    created_at: datetime = datetime.now()

    class Config:
        json_schema_extra = {
            "example": {
                "message": "test",
                "userId": "test",
            }
        }

    class Settings:
        name = "chat"

