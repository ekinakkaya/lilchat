import React, { useState } from "react";
import dotenv from "dotenv";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat: React.FC = () => {
  dotenv.config();
  const apiKey = process.env.AUTH_TOKEN; // Retrieve the environment variable
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage: Message = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    const url = "https://api.hyperbolic.xyz/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, // Replace with your actual token
    };
    const data = {
      messages: [...messages, newMessage],
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      max_tokens: 512,
      temperature: 0.1,
      top_p: 0.001,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: result.choices[0].message.content,
      };
      setMessages([...messages, newMessage, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  const handleMessageKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            className={msg.role === "user" ? "ml-auto text-right" : "text-left"}
            key={idx}
          >
            <p className="bg-gray-800 p-2 rounded-lg max-w-sm inline-block break-words">
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-800 rounded-lg focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleMessageKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
