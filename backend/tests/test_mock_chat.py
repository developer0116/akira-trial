from httpx import AsyncClient
import pytest
from app import app, token_listener
from tests.conftest import mock_no_authentication

test_user_message = {"message": "test message", "userId": "test_user_id"}


class TestMockChat:
    @classmethod
    def setup_class(cls):
        mock_no_authentication()

    @pytest.mark.anyio
    async def add_chat(self, client_test: AsyncClient):

        response = client_test.post(f"chat", json=test_user_message)
        user_chat_id = response.json().get("user_chat").get("id")
        bot_chat_id = response.json().get("bot_chat").get("id")
        assert response.status_code == 200
        assert user_chat_id
        assert bot_chat_id

    @pytest.mark.anyio
    async def delete_chat(self, client_test: AsyncClient):
        # Create chat
        newChat = client_test.post(f"chat", json=test_user_message)
        chatId = newChat.json().get("user_chat").get("id")
        # And then, delete it
        response = client_test.delete(f"chat/{chatId}")
        assert response.status_code == 200
        assert response.json() == chatId

    @pytest.mark.anyio
    async def edit_chat(self, client_test: AsyncClient):
        # Create chat
        newChat = client_test.post(f"chat", json=test_user_message)
        chatId = newChat.json().get("user_chat").get("id")
        updated_message = "updated message"
        # And then, edit it
        response = client_test.put(f"chat/{chatId}", json={"message": updated_message})

        assert response.status_code == 200
        assert response.json()["message"] == updated_message
