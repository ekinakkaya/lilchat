import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can choose a different theme

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  messages: Message[];
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState<string>(() => {
    const savedApiKey = localStorage.getItem("AUTH_TOKEN");
    return savedApiKey || "";
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [isSessionsTabOpen, setIsSessionsTabOpen] = useState<boolean>(true); // New state for session tab visibility

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("AUTH_TOKEN");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    const savedSessions = localStorage.getItem("chatSessions");
    if (savedSessions) {
      setChatSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      const selectedSession = chatSessions.find(
        (session) => session.id === selectedSessionId
      );
      if (selectedSession) {
        setMessages(selectedSession.messages);
      }
    }
  }, [selectedSessionId, chatSessions]);

  const handleSend = async () => {
    if (!inputRef.current?.value.trim() || !apiKey) return;
    setIsLoading(true);
    setError("");

    const newMessage: Message = {
      role: "user",
      content: inputRef.current.value,
    };

    const url = "https://api.hyperbolic.xyz/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
    const data = {
      messages: [...messages, newMessage],
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      max_tokens: 10000,
      temperature: 0.7,
      top_p: 0.9,
    };

    try {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Add user message to state
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: result.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]); // Add assistant message to state

      // Update the chat sessions with the new messages
      if (selectedSessionId) {
        setChatSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === selectedSessionId
              ? {
                  ...session,
                  messages: [...session.messages, newMessage, assistantMessage],
                }
              : session
          )
        );
      } else {
        // If no session is selected, create a new session
        const newSession: ChatSession = {
          id: Date.now().toString(),
          messages: [newMessage, assistantMessage],
        };
        setChatSessions((prevSessions) => [...prevSessions, newSession]);
        setSelectedSessionId(newSession.id);
      }

      // Save the updated chat sessions to localStorage
      localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
    } catch (error) {
      console.error("Error fetching response:", error);
      setError(
        "An error occurred while fetching the response. Please try again."
      );
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleMessageKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default newline behavior
      handleSend();
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("AUTH_TOKEN", newApiKey); // Save the API key to localStorage
  };

  const handleSaveSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      messages: messages,
    };
    setChatSessions((prevSessions) => [...prevSessions, newSession]);
    localStorage.setItem(
      "chatSessions",
      JSON.stringify([...chatSessions, newSession])
    );
    setSelectedSessionId(newSession.id);
  };

  const handleSelectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <h1>Ekin's Hyperbolic AI API for Qwen Coder 2.5 32B Model</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">API Token:</label>
        <input
          type="password"
          className="w-full p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleApiKeyChange}
          placeholder="Enter your API token"
        />
      </div>
      <div className="flex flex-1 space-y-4 overflow-y-auto">
        {isSessionsTabOpen && (
          <div className="w-1/4 border-r border-gray-700 pr-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Chat Sessions</h2>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => setIsSessionsTabOpen(false)}
              >
                X
              </button>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              onClick={handleSaveSession}
              disabled={isLoading || messages.length === 0}
            >
              Save Session
            </button>
            <ul className="space-y-2">
              {chatSessions.map((session) => (
                <li
                  key={session.id}
                  className={`cursor-pointer p-2 rounded-lg ${
                    selectedSessionId === session.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800"
                  }`}
                  onClick={() => handleSelectSession(session.id)}
                >
                  Session {new Date(Number(session.id)).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!isSessionsTabOpen && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 mr-4"
            onClick={() => setIsSessionsTabOpen(true)}
          >
            Open Sessions
          </button>
        )}
        <div className="flex-1">
          <div className="space-y-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.role === "user" ? "ml-auto text-right" : "text-left"
                } mb-2`}
              >
                <div
                  className={`${
                    msg.role === "user"
                      ? "bg-blue-500 text-white text-left"
                      : "bg-gray-700"
                  } bg-gray-800 p-4 rounded-lg max-w-4xl inline-block break-words whitespace-pre-wrap`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      className="markdown overflow-wrap break-words"
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, "")}
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                              className="overflow-wrap break-words"
                            />
                          ) : (
                            <code
                              className={`className overflow-wrap break-words`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
          </div>
          <div className="flex space-x-2 mt-4">
            <textarea
              ref={inputRef}
              rows={10}
              className="flex-1 p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              onKeyDown={handleMessageKeyDown}
              disabled={isLoading}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
