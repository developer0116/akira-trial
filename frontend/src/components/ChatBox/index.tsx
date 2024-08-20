import { useState } from "react";
import img from "../../assets/react.svg";
import closeImg from "../../assets/img/close.svg";
import expandImg from "../../assets/img/expand.svg";
import dockImg from "../../assets/img/dock.svg";
import sendImg from "../../assets/img/send.svg";
import settingImg from "../../assets/img/settings.svg";
import chatImg from "../../assets/img/chat.svg";
import "./style.scss";

export const ChatBox = () => {
  const [widgetSize, setWidgetSize] = useState<
    "normal" | "expanded" | "docked" | "closed"
  >("closed");

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
          <div className="chat-box__content flex-1 flex flex-col gap-2 p-2 overflow-auto">
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

            <div className="flex items-start gap-2.5">
              <img
                className="w-8 h-8 rounded-full"
                src={img}
                alt="Jese image"
              />
              <div className="flex flex-col w-64 max-w-[320px] leading-1.5 p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal text-gray-900 dark:text-white">
                  That's awesome. I think our users will really appreciate the
                  improvements.
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    11:46
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="ml-auto flex flex-col w-64 max-w-[320px] leading-1.5 p-3 border-purple-200 bg-purple-500 rounded-xl rounded-tr-none dark:bg-gray-700">
                <p className="text-sm font-normal text-white dark:text-white">
                  Hi, thanks for connecting!
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="ml-auto text-sm font-normal text-gray-300 dark:text-gray-400">
                    11:46
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <img
                className="w-8 h-8 rounded-full"
                src={img}
                alt="Jese image"
              />
              <div className="flex flex-col w-64 max-w-[320px] leading-1.5 p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal text-gray-900 dark:text-white">
                  That's awesome. I think our users will really appreciate the
                  improvements.
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    11:46
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="ml-auto flex flex-col w-64 max-w-[320px] leading-1.5 p-3 border-purple-200 bg-purple-500 rounded-xl rounded-tr-none dark:bg-gray-700">
                <p className="text-sm font-normal text-white dark:text-white">
                  Hi, thanks for connecting!
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="ml-auto text-sm font-normal text-gray-300 dark:text-gray-400">
                    11:46
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <img
                className="w-8 h-8 rounded-full"
                src={img}
                alt="Jese image"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col w-64 max-w-[320px] leading-1.5 p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-normal text-gray-900 dark:text-white">
                    That's awesome. I think our users will really appreciate the
                    improvements.
                  </p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      11:46
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-purple-700 w-fit hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-xs px-4 py-2 text-center dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >
                  Create Report this month
                </button>
                <button
                  type="button"
                  className="text-purple-700 w-fit hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-xs px-4 py-2 text-center dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >
                  Call Lead
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="ml-auto flex flex-col w-64 max-w-[320px] leading-1.5 p-3 border-purple-200 bg-purple-500 rounded-xl rounded-tr-none dark:bg-gray-700">
                <p className="text-sm font-normal text-white dark:text-white">
                  Hi, thanks for connecting!
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="ml-auto text-sm font-normal text-gray-300 dark:text-gray-400">
                    11:46
                  </span>
                </div>
              </div>
            </div>
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
