import { useState } from "react";
import { Chat } from "types";
import img from "assets/react.svg";
import { formatDistanceToNow } from "date-fns";

interface Props {
  data: Chat;
  onClickAction: (action: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}
export const ChatMessage = ({
  data,
  onClickAction,
  onEdit,
  onDelete,
}: Props) => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  window.addEventListener("click", () => {
    //When the user clicks outside of the chat message, hide the menu
    setIsMenuShown(false);
  });
  const handleEdit = () => {
    onEdit();
  };
  const handleDelete = () => {
    onDelete();
  };
  return (
    <>
      {data.sender === "bot" ? (
        <div className="flex items-start gap-2.5">
          <img className="w-8 h-8 rounded-full" src={img} alt="Jese image" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col max-w-[320px] w-fit leading-1.5 p-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {data.message}
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(data.created_at))} ago
                </span>
              </div>
            </div>
            {data.actions &&
              data.actions.map((action) => (
                <button
                  onClick={() => onClickAction(action)}
                  key={action}
                  type="button"
                  className="text-purple-700 w-fit hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-xs px-4 py-2 text-center dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >
                  {action}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <div className="ml-auto flex flex-col max-w-[320px] w-fit leading-1.5 p-3 border-purple-200 bg-purple-500 rounded-xl rounded-tr-none dark:bg-gray-700">
            <p className="text-sm font-normal text-white dark:text-white">
              {data.message}
            </p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="ml-auto text-xs font-normal text-gray-300 dark:text-gray-400">
                {formatDistanceToNow(new Date(data.created_at))} ago
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100  focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuShown((state) => !state);
              }}
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            {isMenuShown && (
              <div
                id="dropdownDots"
                className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <a
                      onClick={() => handleEdit()}
                      className="block px-4 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleDelete()}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
