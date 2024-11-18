import { SetStateAction, useState } from "react";
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
  const [message, setMessage] = useState<ChatMessage>({} as ChatMessage);

  const onSendClick = (
    messages: ChatMessage[],
    setMessages: (m: ChatMessage[]) => void
  ) => {
    setMessages([...messages, message])
    console.log(messages)
    const res = sendRequestToApi(getAllSettings(), messages, setMessages);
    console.log(res);
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value)
    const m: ChatMessage = {
      role: 'user',
      message: e.target.value
    }
    console.log(m)
    setMessage(m);
  }

  return (
    <div className="write-message-div m-2 flex flex-row">
      <textarea
        className="w-full h-24 border border-gray-300 rounded-lg p-2 bg-gray-700"
        placeholder="Type your message..."
        value={message.message}
        onChange={onTextAreaChange}
      ></textarea>
      <button
        className=" text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-600 ml-4 text-2xl "
        onClick={() => onSendClick(messages, setMessages)}
      >
        {">"}
      </button>
    </div>
  );
};
