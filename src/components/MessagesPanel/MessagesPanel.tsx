import { MessageCard } from "../MessageCard/MessageCard";
import { ChatMessage } from "../../Chat2";

type MessagesPanelProps = {
  messagesData: ChatMessage[];
};

export const MessagesPanel = ({ messagesData }: MessagesPanelProps) => {
  return (
    <div className="messages-panel flex-grow m-2 flex flex-col items-start rounded-xl bg-gray-800 p-4 text-white overflow-y-auto h-0">
      {messagesData.map((message) => (
        <MessageCard message={message.message} owner={message.owner} />
      ))}
    </div>
  );
};
