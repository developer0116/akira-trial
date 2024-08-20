from pydantic import BaseModel
from fastapi.security import HTTPBasicCredentials
from pydantic import EmailStr

class UserSignIn(HTTPBasicCredentials):
    class Config:
        json_schema_extra = {
            "example": {"username": "test@test.com", "password": "test1234"}
        }


class UserData(BaseModel):
    fullname: str
    email: EmailStr

    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "test user",
                "email": "test@test.com",
            }
        }
