import React, { useState } from "react";

const Chat2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
        <div className="settings bg-slate-700 p-4 rounded-xl mt-8 border-2 border-dashed ">
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
        <nav className=" navbar m-2 flex items-center justify-start rounded-xl bg-gray-800 p-4 px-6">
          {!isMenuOpen && (
          <button
            className=" w-12 text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-700"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>

          )}
          <div className="pl-4 font-serif text-lg font-thin text-white">
            ^0^ lilchat
          </div>
        </nav>

        <div className="messages-panel flex-grow m-2 flex flex-col items-start rounded-xl bg-gray-800 p-4 text-white overflow-y-auto h-0">
          <div className="m-2 ml-auto max-w-[70%] whitespace-normal break-words rounded-xl bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-500">
            hello world Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Officia aliquid aspernatur, quasi, placeat quas cumque labore ipsum,
            eaque at saepe pariatur quos praesentium? Vitae alias, amet eligendi
            placeat ex quos. Ducimus consequuntur quis assumenda ut illo qui
            nesciunt deserunt reiciendis debitis, odit molestiae, repellendus
            fuga ex! Eveniet fugit consequuntur deleniti rem vel dolore in.
            Consequuntur quos distinctio beatae exercitationem nisi.
          </div>
          <div className="m-2 rounded-xl max-w-[70%] whitespace-normal break-words bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-600">
            Hello I am your assistant. How can I help you? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dolore iusto eum alias impedit
            consequatur harum odio delectus in! Placeat dolores labore
            laboriosam minus non veritatis rerum nemo eum accusantium ullam!
          </div>
        </div>

        <div className="write-message-div m-2 flex flex-row">
          <textarea
            className="w-full h-24 border border-gray-300 rounded-lg p-2 bg-gray-700"
            placeholder="Type your message..."
          ></textarea>
          <button className=" text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-600 ml-4 text-2xl ">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat2;
