import React, { useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { MessageCard } from "./components/MessageCard/MessageCard";
import { MessagesPanel } from "./components/MessagesPanel/MessagesPanel";
import { MessageInput } from "./components/MessageInput/MessageInput";

export type ChatMessage = {
  owner: "user" | "assistant";
  message: string;
};

const Chat2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
        <div className="left-sidebar-container flex flex-col w-72 bg-gray-800 px-6 py-4 m-2 text-white rounded-xl transition-opacity">
          <button
            className="w-12 text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-700"
            onClick={() => setIsMenuOpen(false)}
          >
            {"<"}
          </button>
          <div className="settings bg-slate-700 p-4 rounded-xl mt-6 border-2 border-dashed ">
            <div className="mt-2 flex flex-row rounded-xl ">
              <p>Settings</p>
              <button className="ml-auto w-12 rounded-xl bg-slate-300 text-black">
                +
              </button>
            </div>

            <div className="mt-4">
              <p className="mt-2">
                API Endpoint (should be something like
                https://api.hyperbolic.xyz/v1)
              </p>
              <textarea className="w-full h-24 border border-gray-300 rounded-lg p-2 bg-gray-700">
                https://api.hyperbolic.xyz/v1
              </textarea>
            </div>

            <div className="mt-2">
              <p>Authorization Key</p>
              <input
                type="password"
                className="w-full h-12 border border-gray-300 rounded-lg p-2 bg-gray-700"
              ></input>
            </div>

            <div className="mt-2">
              <p>Model Name</p>
              <textarea className="w-full h-12 border border-gray-300 rounded-lg p-2 bg-gray-700"></textarea>
            </div>

            <div className="mt-2">
              <p>Max Tokens</p>
              <textarea className="w-full h-12 border border-gray-300 rounded-lg p-2 bg-gray-700"></textarea>
            </div>

            <div className="mt-2">
              <p>Top P</p>
              <textarea className="w-full h-12 border border-gray-300 rounded-lg p-2 bg-gray-700"></textarea>
            </div>
          </div>
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
