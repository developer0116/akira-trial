from fastapi.testclient import TestClient
from httpx import AsyncClient
import pytest
from fastapi import status
from app import app, token_listener
from tests.conftest import mock_no_authentication

test_user_signup = {
    "fullname": "Test User",
    "email": "testuser@example.com",
    "password": "testpassword123",
}

test_user_login = {"username": "testuser@example.com", "password": "testpassword123"}


class TestMockAuthentication:
    @classmethod
    def setup_class(cls):
        mock_no_authentication()

    @pytest.mark.anyio
    async def test_api_processed_jobs(self, client_test: AsyncClient):
        response = client_test.get("/")

        assert response.status_code == 200

    @pytest.mark.anyio
    async def test_user_signup(self, client_test: AsyncClient):
        response = client_test.post("/user", json=test_user_signup)

        assert response.status_code == status.HTTP_200_OK
        assert "email" in response.json()
        assert "fullname" in response.json()
        assert response.json()["email"] == test_user_signup["email"]
        assert response.status_code == 200

    @pytest.mark.anyio
    def test_user_signup_existing_user(self, client_test: AsyncClient):
        # Sign up the user first time
        client_test.post("/user", json=test_user_signup)
        # Try signing up again with the same email
        response = client_test.post("/user", json=test_user_signup)
        assert response.status_code == status.HTTP_409_CONFLICT
        assert response.json()["detail"] == "User with email supplied already exists"

    @pytest.mark.anyio
    def test_user_login_success(self, client_test: AsyncClient):
        # Sign up the user
        client_test.post("/user", json=test_user_signup)
        # Then, log in with correct credentials
        response = client_test.post("/user/login", json=test_user_login)
        assert response.status_code == status.HTTP_200_OK
        assert "token" in response.json()
        assert "userId" in response.json()
        assert "userName" in response.json()
        assert response.json()["userName"] == test_user_signup["fullname"]

    @pytest.mark.anyio
    def test_user_login_wrong_password(self, client_test: AsyncClient):
        # Sign up the user
        client_test.post("/user", json=test_user_signup)
        # Then, log in with correct credentials
        response = client_test.post(
            "/user/login",
            json={"username": test_user_login["username"], "password": "wrongpassword"},
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert response.json()["detail"] == "Incorrect email or password"

    @pytest.mark.anyio
    def test_user_login_nonexistent_user(self, client_test: AsyncClient):
        # Attempt to log in with a user that does not exist
        response = client_test.post(
            "/user/login",
            json={"username": "nonexistent@example.com", "password": "doesnotmatter"},
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert response.json()["detail"] == "Incorrect email or password"
