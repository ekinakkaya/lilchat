import { useState } from "react";
import { ChatMessage } from "../../Chat2";
import { sendRequestToApi } from "../../services/HyperbolicApiService/HyperbolicApiService";
import { getAllSettings } from "../../services/SettingsStorage/SettingsStorage";

export const MessageInput = ({
  messages,
  setMessages,
}: {
  messages: ChatMessage[];
  setMessages: (m: ChatMessage[]) => void;
}) => {
  const [message, setMessage] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default newline behavior
      onSendClick();
    }
  };

  const onSendClick = async () => {
    const userMessage: ChatMessage = {
      role: "user",
      message: message,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    console.log("Messages after click send, before API response:");
    console.log(updatedMessages);

    await sendRequestToApi(getAllSettings(), updatedMessages, setMessages);
    setMessage("");
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="write-message-div m-2 flex flex-row">
      <textarea
        className="w-full h-36 border border-gray-300 rounded-lg p-2 bg-gray-700"
        placeholder="Type your message..."
        value={message}
        onChange={onTextAreaChange}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        className="text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-600 ml-4 text-2xl"
        onClick={onSendClick}
      >
        {">"}
      </button>
    </div>
  );
};
