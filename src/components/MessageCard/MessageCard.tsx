import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can choose a different theme

import { ChatMessage } from "../../Chat2";

export const MessageCard = ({ role, message }: ChatMessage) => {
  if (role === "user") {
    return (
      <div className="m-2 ml-auto max-w-[70%] whitespace-normal break-words rounded-xl bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-500">
        {message}
      </div>
    );
  } else if (role === "assistant") {
    return (
      <div className="m-2 max-w-[70%] whitespace-normal break-words rounded-xl bg-gray-700 px-6 py-4 transition-colors hover:bg-gray-600">
        <Markdown
          children={message}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={oneDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};
