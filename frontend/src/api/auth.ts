import { API } from "utils/api";
import { LoginPayload, UserPayload } from "types";

/* Login user */
export const login = async (payload: LoginPayload) => {
  const response = await API({}, { Authorization: "" }).post("user/login", {
    username: payload.email,
    password: payload.password,
  });
  return response.data;
};

/* Signup user */
export const signup = async (userPayload: UserPayload) => {
  const response = await API({}, { Authorization: "" }).post(
    "user",
    userPayload
  );
  return response.data;
};
