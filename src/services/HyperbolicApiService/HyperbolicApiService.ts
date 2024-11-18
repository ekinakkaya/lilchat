import OpenAI from "openai";
import { getSetting, SettingsType } from "../SettingsStorage/SettingsStorage";
import { ChatMessage } from "../../Chat2";

export const addMessageToMessages = (
  res: OpenAI.Chat.Completions.ChatCompletion,
  messages: ChatMessage[],
  setMessages: (m: ChatMessage[]) => void
) => {
  const newMessages = res.choices.map((choice) => {
    return {
      role: choice.message.role,
      message: choice.message.content ?? "",
    }
  });
  console.log("new messages from the api response")
  console.log(newMessages)
  console.log("all messages before changing the 'messages' state")
  console.log(messages)

  setMessages([
    ...messages,
    ...newMessages
  ])

  console.log("all messages after api response")
  console.log(messages)
};

export const sendRequestToApi = (
  settings: SettingsType,
  messages: ChatMessage[],
  setMessages: (m: ChatMessage[]) => void
) => {
  // https://docs.hyperbolic.xyz/docs/typescript-api

  const system_prompt = getSetting("system_prompt");

  const client = new OpenAI({
    apiKey: settings.auth_key,
    baseURL: settings.api_endpoint,
    dangerouslyAllowBrowser: true,
  });


  client.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
        ...messages.map((message) => {
          return {
            role: message.role,
            content: message.message,
          };
        }),
      ],
      model: settings.model_name,
      temperature: settings.temperature,
      top_p: settings.top_p,
      max_tokens: settings.max_tokens,
    })
    .then((res) => {
      console.log(res)
      addMessageToMessages(res, messages, setMessages);
      return res;
    });
};
