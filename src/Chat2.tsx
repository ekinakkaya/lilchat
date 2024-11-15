import { useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { MessagesPanel } from "./components/MessagesPanel/MessagesPanel";
import { MessageInput } from "./components/MessageInput/MessageInput";
import { LeftMenuCloseButton } from "./components/LeftMenuCloseButton/LeftMenuCloseButton";
import { SettingsPanel } from "./components/SettingsPanel/SettingsPanel";

export type ChatMessage = {
  owner: "user" | "assistant";
  message: string;
};

// TODO: implement saving settings to local storage

// TODO: implement making requests and getting responses
// TODO: implement sending all messages with the request

const Chat2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const messagesFakeData: ChatMessage[] = [
    {
      owner: "user",
      message:
        "hello world lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
    },
    {
      owner: "assistant",
      message: "asdfasdf bruh bruh bruh bruh. bruhb bruhruh bruh.",
    },
  ];

  return (
    <div className="flex flex-row min-h-screen m-0 bg-slate-700 p-2 text-white font-serif">
      {isMenuOpen && (
        <div className="left-sidebar-container flex flex-col max-w-72 min-w-72 bg-gray-800 px-6 py-4 m-2 text-white rounded-xl transition-opacity">
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

        <MessagesPanel messagesData={messagesFakeData} />

        <MessageInput />
      </div>
    </div>
  );
};

export default Chat2;
