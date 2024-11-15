import OpenAI from "openai";
import { SettingsType } from "../SettingsStorage/SettingsStorage";

export const sendRequestToApi = (settings: SettingsType) => {
  // https://docs.hyperbolic.xyz/docs/typescript-api

  const client = new OpenAI({
    apiKey: settings.auth_key,
    baseURL: settings.api_endpoint,
    dangerouslyAllowBrowser: true
  });

  client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert travel guide.",
      },
      {
        role: "user",
        content: "Tell me fun things to do in San Francisco.",
      },
    ],
    model: settings.model_name,
    temperature: settings.temperature,
    top_p: settings.top_p,
    max_tokens: settings.max_tokens
  }).then((res) => {
    return res;
  });
};
