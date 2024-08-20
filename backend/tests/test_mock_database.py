import asyncio
from beanie import init_beanie
from fastapi.testclient import TestClient
from httpx import AsyncClient
import pytest

from models.user import User
from models.chat import Chat
from tests.conftest import mock_no_authentication


class TestMockAuthentication:
    @classmethod
    def setup_class(cls):
        mock_no_authentication()

    @pytest.mark.anyio
    async def test_mock_databases(self, client_test: AsyncClient):
        # generate data
        user = await User(
            fullname="test user", email="test@test.com", password="test1234"
        ).create()

        await Chat(
            message="test",
            userId=user.id,
        ).create()

        response = await client_test.get("chat")

        assert response.status_code == 200

    @pytest.mark.anyio
    async def test_mock_database(self, client_test: AsyncClient):
        user = await User(
            fullname="test user", email="test@test.com", password="test"
        ).create()

        await Chat(
            message="test",
            userId=user.id,
        ).create()

        response = await client_test.get("chat")

        assert response.status_code == 200
