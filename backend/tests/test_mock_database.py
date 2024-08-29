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
            userId=str(user.id),
        ).create()

        response = client_test.get(f"chat/{str(user.id)}")
        assert response.status_code == 200
