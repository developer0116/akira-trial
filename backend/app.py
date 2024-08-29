from fastapi import FastAPI, Depends

from auth.jwt_bearer import JWTBearer
from config.config import initiate_database
from routes.user import router as UserRouter
from routes.chat import router as ChatRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
token_listener = JWTBearer()


@app.on_event("startup")
async def start_database():
    await initiate_database()


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this artisan trial app."}


app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(
    ChatRouter,
    tags=["Chat"],
    prefix="/chat",
    dependencies=[Depends(token_listener)],
)
