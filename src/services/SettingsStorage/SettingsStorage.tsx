export type SettingsType = {
  api_endpoint: string;
  auth_key: string;
  model_name: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
};

export const getSetting = (key: keyof SettingsType) => {
  const value = localStorage.getItem(key)
  if (value === null) {
    return "";
  } else {
    return JSON.parse(value)
  }
}

export const saveSetting = (key: keyof SettingsType, value: string | number) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const getAllSettings = () => {
    let maxTokens = getSetting("max_tokens");
    if (maxTokens === "" || maxTokens === "0") {
        maxTokens = 4096;
    }
    let temperature = getSetting("temperature");
    if (temperature === "" || temperature === "0") {
        temperature = 0.1;
    }
    let topP = getSetting("top_p");
    if (topP === "" || topP === "0") {
        topP = 0.8;
    }
    const settings: SettingsType = {
        api_endpoint: getSetting("api_endpoint"),
        auth_key: getSetting("auth_key"),
        model_name: getSetting("model_name"),
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: topP
    }

    console.log(settings);
    return settings;
}