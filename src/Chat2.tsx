import { useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { MessagesPanel } from "./components/MessagesPanel/MessagesPanel";
import { MessageInput } from "./components/MessageInput/MessageInput";
import { LeftMenuCloseButton } from "./components/LeftMenuCloseButton/LeftMenuCloseButton";
import { SettingsPanel } from "./components/SettingsPanel/SettingsPanel";


export type ChatMessage = {
  role: "system" | "user" | "assistant";
  message: string;
};

// TODO: session history for seeing previous chats.
// TODO: move the api logic to a express js backend

const Chat2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="flex flex-row min-h-screen m-0 bg-slate-700 p-2 text-white font-serif h-screen">
      {isMenuOpen && (
        <div className="left-sidebar-container flex flex-col max-w-72 min-w-72 bg-gray-800 px-6 py-4 m-2 text-white rounded-xl transition-opacity overflow-y-scroll overflow-x-hidden hide-scrollbar">
          <LeftMenuCloseButton setIsMenuOpen={setIsMenuOpen} />

          {/* settings form*/}
          <SettingsPanel
            isSettingsOpen={isSettingsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
          />

          {/* TODO: implement history for chat sessions */}
        </div>
      )}

      <div className="right-side-container flex flex-col m-0 bg-slate-700 p-0 text-white w-full">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <MessagesPanel messagesData={messages} />

        <MessageInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chat2;
