import { MessageCard } from "../MessageCard/MessageCard";
import { ChatMessage } from "../../Chat2";

type MessagesPanelProps = {
  messagesData: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void
};

export const MessagesPanel = ({ messagesData, setMessages }: MessagesPanelProps) => {
  return (
    <div className="messages-panel flex-grow m-2 flex flex-col items-start rounded-xl bg-gray-800 p-4 text-white overflow-y-auto h-0">
      {messagesData.filter(message => message.role !== "system").map((message, index) => (
        <MessageCard
          key={index}
          message={message.message}
          role={message.role}
        />
      ))}
    </div>
  );
};
