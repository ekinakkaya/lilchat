import { ChatMessage } from "../../Chat2";

export const MessageCard = ({ role, message}: ChatMessage) => {
  if (role === "user") {
    return (
      <div className="m-2 ml-auto max-w-[70%] whitespace-normal break-words rounded-xl bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-500">
        {message}
      </div>
    );
  } else if (role === "assistant") {
    return (
      <div className="m-2 rounded-xl max-w-[70%] whitespace-normal break-words bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-600">
        {message}
      </div>
    );
  } else {
    return <></>;
  }
};
