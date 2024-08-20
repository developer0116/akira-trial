from typing import List, Union

from beanie import PydanticObjectId

from models.user import User
from models.chat import Chat

user_collection = User
chat_collection = Chat


async def add_user(new_user: User) -> User:
    user = await new_user.create()
    return user


async def add_chat(new_chat: Chat) -> Chat:
    chat = await new_chat.create()
    return chat


async def retrieve_chats(user_id: str) -> List[Chat]:
    chats = await chat_collection.find_many({"userId":user_id}).to_list()
    return chats


async def delete_chat(id: PydanticObjectId) -> bool:
    chat = await chat_collection.get(id)
    if chat:
        await chat.delete()
        return True


async def update_chat_data(id: PydanticObjectId, data: dict) -> Union[bool, Chat]:
    des_body = {k: v for k, v in data.items() if v is not None}
    update_query = {"$set": {field: value for field, value in des_body.items()}}
    chat = await chat_collection.get(id)
    if chat:
        await chat.update(update_query)
        return chat
    return False
