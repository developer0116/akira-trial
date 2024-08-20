import { API } from "utils/api";

/* Fetch all chats by user id */
export const getAllChats = async (userId: string) => {
  const response = await API().get(`chat/${userId}`);
  return response.data;
};

/* Update chat by id */
export const updateChatById = async (data: {
  chatId: string;
  message: string;
}) => {
  const response = await API().put(`chat/${data.chatId}`, {
    message: data.message,
  });
  return response.data;
};

/* Delete chat by id */
export const deleteChatById = async (chatId: string) => {
  const response = await API().delete(`chat/${chatId}`);
  return response.data;
};

/* Add new chat */
export const addChat = async (data: { userId: string; message: string }) => {
  const response = await API().post("chat", data);
  return response.data;
};
