import { useState, useEffect } from "react";
import img from "assets/react.svg";
import closeImg from "assets/img/close.svg";
import expandImg from "assets/img/expand.svg";
import dockImg from "assets/img/dock.svg";
import sendImg from "assets/img/send.svg";
import settingImg from "assets/img/settings.svg";
import chatImg from "assets/img/chat.svg";
import "./style.scss";
import { getAllChats, addChat, deleteChatById, updateChatById } from "api";
import { useAuth } from "contexts";
import { useQuery, useMutation } from "react-query";
import { Chat } from "types";
import { ChatMessage } from "components";
import { isAxiosError } from "axios";
import { Element, animateScroll as scroll } from "react-scroll";

export const ChatBox = () => {
  const [widgetSize, setWidgetSize] = useState<
    "normal" | "expanded" | "docked" | "closed"
  >("closed");
  const [editingChat, setEditingChat] = useState<Chat>();
  const { userInfo } = useAuth();
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [error, setError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const { isLoading } = useQuery(
    ["chats", userInfo?.userId],
    () => getAllChats(userInfo?.userId as string),
    {
      keepPreviousData: true,
      enabled: !!userInfo?.userId,
      onSuccess: (data) => {
        setChatData(data.data);
        scrollToChatBottom();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          setError(error.response?.data.detail);
        }
      },
    }
  );

  const { isLoading: isResponding, mutate: sendChatMsg } = useMutation(
    async (data: { userId: string; message: string }) => await addChat(data),
    {
      onSuccess: (data) => {
        setChatData((prevChats) => [
          ...prevChats.slice(0, -1),
          data.data.user_chat,
          data.data.bot_chat,
        ]);
        scrollToChatBottom();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          setError(error.response?.data.detail);
        }
      },
    }
  );
  const { mutate: updateChatMsg } = useMutation(
    async (data: { chatId: string; message: string }) =>
      await updateChatById(data),
    {
      onSuccess: (data) => {
        setChatData((prevChats) =>
          prevChats.map((chat) =>
            chat._id === data.data._id ? data.data : chat
          )
        );
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          setError(error.response?.data.detail);
        }
      },
    }
  );
  const { mutate: deleteChatMsg } = useMutation(
    async (chatId: string) => await deleteChatById(chatId),
    {
      onSuccess: (data) => {
        if (data.response_type === "success") {
          setChatData((prevChats) =>
            prevChats.filter((chat) => chat._id !== data.data)
          );
        }
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          setError(error.response?.data.detail);
        }
      },
    }
  );

  const handleAddChat = (msg: string) => {
    setChatData((prevChats) => [
      ...prevChats,
      {
        _id: "",
        sender: "user",
        message: msg,
        created_at: new Date().toISOString(),
        userId: userInfo?.userId as string,
      },
    ]);
    sendChatMsg({ userId: userInfo?.userId as string, message: msg });
  };

  const scrollToChatBottom = () => {
    scroll.scrollToBottom({
      behavior: "smooth",
      containerId: "chat-content",
      to: "content-bottom",
    });
  };

  const handleChatSendClick = () => {
    if (editingChat) {
      updateChatMsg({ chatId: editingChat._id, message: chatInput });
      setEditingChat(undefined);
    } else {
      handleAddChat(chatInput);
    }
    setChatInput("");
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // When the user presses Enter, send the chat message
    if (event.key === "Enter") {
      handleChatSendClick();
    }
  };
  const handleDeleteChat = (chat: Chat) => {
    deleteChatMsg(chat._id);
  };
  const handleEditChat = (chat: Chat) => {
    setEditingChat(chat);
    setChatInput(chat.message);
  };

  useEffect(() => {
    if (widgetSize !== "closed") {
      scrollToChatBottom();
    }

    return () => {};
  }, [widgetSize]);

  return (
    <div className="chat-container">
      {widgetSize !== "closed" ? (
        <div
          className={`chat-box w-96 flex flex-col bg-white rounded-lg border border-gray-100 shadow-lg p-4 ${widgetSize}`}
        >
          <div className="flex flex-row justify-start pb-2">
            <button
              onClick={() =>
                setWidgetSize((size) =>
                  size === "expanded" ? "normal" : "expanded"
                )
              }
              className="w-8 h-8 duration-300 ease-in-out bg-transparent my-auto text-blue-700 border-none hover:bg-gray-200 p-1 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <img src={expandImg} alt="expand" className="w-100 h-100" />
            </button>
            <button
              onClick={() =>
                setWidgetSize((size) =>
                  size === "docked" ? "normal" : "docked"
                )
              }
              className="w-8 h-8 duration-300 ease-in-out bg-transparent my-auto text-blue-700 border-none hover:bg-gray-200 p-1 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <img src={dockImg} alt="dock" className="w-100 h-100" />
            </button>
            <button
              onClick={() => setWidgetSize("closed")}
              className="ml-auto duration-300 ease-in-out w-8 h-8 bg-transparent my-auto text-blue-700 border-none hover:bg-gray-200 p-1 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <img src={closeImg} alt="close" className="w-100 h-100" />
            </button>
          </div>
          <div
            id="chat-content"
            className="chat-box__content flex-1 flex flex-col gap-2 p-2 overflow-auto"
          >
            <div className="flex flex-col text-center justify-center gap-1">
              <img
                className="w-10 h-10 rounded-full bg-purple-500 mx-auto"
                src={img}
                alt="Rounded avatar"
              />
              <div className="text-black font-bold text-md">Hey, I'm Ava</div>
              <div className="text-gray-500 text-sm">
                Ask me anything or pick a place to start
              </div>
            </div>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              chatData.map((data, index) => (
                <ChatMessage
                  key={`chat${index}`}
                  data={data}
                  onClickAction={(msg) => handleAddChat(msg)}
                  onDelete={() => handleDeleteChat(data)}
                  onEdit={() => handleEditChat(data)}
                />
              ))
            )}
            {isResponding && (
              <div role="status" className="flex justify-center mb-2">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center border-red-200 border-r-2 w-fit p-3 text-xs">
                Error: {error}
              </div>
            )}
            <Element name="content-bottom" className="element"></Element>
          </div>
          <div className="flex gap-2 items-center h-14 mb-2 border-t border-gray-200 pt-2">
            <img
              className="w-6 h-6 rounded-full bg-green-400"
              src={img}
              alt="Rounded avatar"
            />
            <input
              type="text"
              id="small-input"
              placeholder="Your question"
              className="block w-full h-8 px-3 text-black border border-none outline-none rounded-lg bg-gray-50 text-xs focus:none focus:border-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <div className="flex flex-row justify-start">
            <form className="max-w-sm flex align-middle gap-2 flex-row">
              <label
                htmlFor="countries"
                className="block align-middle leading-8 text-sm font-medium text-gray-600 dark:text-white"
              >
                Context
              </label>
              <select
                id="context"
                className="h-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="onboarding">Onboarding</option>
                <option value="development">Development</option>
              </select>
            </form>
            <button
              type="button"
              className="w-8 h-8 duration-300 ease-in-out bg-transparent ml-auto my-auto text-blue-700 border-none hover:bg-gray-200 p-1 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <img src={settingImg} className="w-100 h-100" />
            </button>
            <button
              type="button"
              className="ml-1 my-auto duration-300 ease-in-out w-8 h-8 bg-transparent text-blue-700 border-none hover:bg-gray-200 p-1 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              onClick={() => handleChatSendClick()}
            >
              <img src={sendImg} className="w-100 h-100" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setWidgetSize("normal")}
          className="chat-button w-16 h-16 rounded-full bg-purple-500 p-3 cursor-pointer hover:bg-purple-800"
        >
          <img src={chatImg} alt="chat" />
        </div>
      )}
    </div>
  );
};
