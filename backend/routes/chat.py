from fastapi import APIRouter, Body

from database.database import *
from models.chat import Chat
from schemas.chat import Response, UpdateChatModel


router = APIRouter()


@router.get("/", response_description="Chats retrieved", response_model=Response)
async def get_chats():
    chats = await retrieve_chats()
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Chats data retrieved successfully",
        "data": chats,
    }


@router.get("/{id}", response_description="Chat data retrieved", response_model=Response)
async def get_chat_data(id: PydanticObjectId):
    chat = await retrieve_chat(id)
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
    new_chat = await add_chat(chat)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Chat created successfully",
        "data": new_chat,
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
