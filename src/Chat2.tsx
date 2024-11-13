import React from "react";

const Chat2 = () => {
  return (
    <div className="flex flex-col min-h-screen m-0 bg-slate-700 p-0 text-white">
  <nav className="m-2 flex items-center justify-start rounded-xl bg-gray-800 p-4 px-6">
    <button className="text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-700">☰</button>
    <div className="pl-4 font-serif text-lg font-thin text-white">^0^ lilchat</div>
  </nav>

  <div className="flex-grow m-2 flex flex-col items-start rounded-xl bg-gray-800 p-4 text-white overflow-y-auto h-0">
    <div className="m-2 ml-auto max-w-[70%] whitespace-normal break-words rounded-xl bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-500">
      hello world Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aliquid aspernatur, quasi, placeat quas cumque labore ipsum, eaque at saepe pariatur quos praesentium? Vitae alias, amet eligendi placeat ex quos. Ducimus consequuntur quis assumenda ut illo qui nesciunt deserunt reiciendis debitis, odit molestiae, repellendus fuga ex! Eveniet fugit consequuntur deleniti rem vel dolore in. Consequuntur quos distinctio beatae exercitationem nisi.
    </div>
    <div className="m-2 rounded-xl max-w-[70%] whitespace-normal break-words bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-600">
      Hello I am your assistant. How can I help you? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iusto eum alias impedit consequatur harum odio delectus in! Placeat dolores labore laboriosam minus non veritatis rerum nemo eum accusantium ullam!
    </div>
  </div>

  <div className="write-message-div m-2 flex flex-row">
    <textarea className="w-full h-24 border border-gray-300 rounded-lg p-2 bg-gray-700" placeholder="Type your message..."></textarea>
    <button className=" text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-600 ml-4 text-2xl ">{">"}</button>
  </div>
</div>
  );
};

export default Chat2;
