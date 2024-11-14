export const MessageInput = () => {
  return (
    <div className="write-message-div m-2 flex flex-row">
      <textarea
        className="w-full h-24 border border-gray-300 rounded-lg p-2 bg-gray-700"
        placeholder="Type your message..."
      ></textarea>
      <button className=" text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-600 ml-4 text-2xl ">
        {">"}
      </button>
    </div>
  );
};
