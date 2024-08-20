from fastapi import APIRouter, Body
import random
from database.database import *
from models.chat import Chat
from schemas.chat import Response, UpdateChatModel, AddChatModel


router = APIRouter()


@router.get("/{id}", response_description="Chat data retrieved", response_model=Response)
async def get_chat_data(id: str):
    chat = await retrieve_chats(id)
    if chat:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Chat data retrieved successfully",
            "data": chat,
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Chat doesn't exist",
    }


@router.post(
    "/",
    response_description="Chat data added into the database",
    response_model=Response,
)
async def add_chat_data(chat: Chat = Body(...)):

    user_chat = await add_chat(chat)
    mock_response= [
        {
            "message": "Amazing how Mosey is simplifying state compliance for business across the board!",
            "actions": [ "Create Report this month", "Call Lead"],
            "sender": 'bot',
            "userId": str(user_chat.userId)
        },
        {
            "message": "Amazing how Mosey is simplifying state compliance for business across the board!",
            "actions": None,
            "sender": 'bot',
            "userId": str(user_chat.userId)
        },
        {
            "message": "Ask me anything or pick place to start a conversation.",
            "actions": [ "Schedule a call"],
            "sender": 'bot',
            "userId": str(user_chat.userId)
        },
    ]
    random_chat = random.choice(mock_response)
    bot_chat = await add_chat(Chat(**random_chat))
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Chat created successfully",
        "user_chat": user_chat,
        "bot_chat": bot_chat,
    }


@router.delete("/{id}", response_description="Chat data deleted from the database")
async def delete_chat_data(id: PydanticObjectId):
    deleted_chat = await delete_chat(id)
    if deleted_chat:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Chat with ID: {} removed".format(id),
            "data": deleted_chat,
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Chat with id {0} doesn't exist".format(id),
        "data": False,
    }


@router.put("/{id}", response_model=Response)
async def update_chat(id: PydanticObjectId, req: UpdateChatModel = Body(...)):
    updated_chat = await update_chat_data(id, req.dict())
    if updated_chat:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Chat with ID: {} updated".format(id),
            "data": updated_chat,
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Chat with ID: {} not found".format(id),
        "data": False,
    }
