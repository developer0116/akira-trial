from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext

from auth.jwt_handler import sign_jwt
from database.database import add_user, add_chat
from models.user import User
from models.chat import Chat
from schemas.user import UserData, UserSignIn

router = APIRouter()

hash_helper = CryptContext(schemes=["bcrypt"])


@router.post("/login")
async def user_login(user_credentials: UserSignIn = Body(...)):
    user_exists = await User.find_one(User.email == user_credentials.username)
    if user_exists:
        password = hash_helper.verify(user_credentials.password, user_exists.password)

        if password:
            return {
                "userId": str(user_exists.id),
                "userName": str(user_exists.fullname),
                "token": sign_jwt(user_credentials.username).get("access_token")}

        raise HTTPException(status_code=403, detail="Incorrect email or password")

    raise HTTPException(status_code=403, detail="Incorrect email or password")


@router.post("", response_model=UserData)
async def user_signup(user: User = Body(...)):
    user_exists = await User.find_one(User.email == user.email)
    if user_exists:
        raise HTTPException(
            status_code=409, detail="User with email supplied already exists"
        )

    user.password = hash_helper.encrypt(user.password)
    new_user = await add_user(user)

    await add_chat(Chat(message=f"Hello {user.fullname}! Welcome to Artisan! How can I help you?", sender="bot", userId=str(new_user.id)))

    return new_user
