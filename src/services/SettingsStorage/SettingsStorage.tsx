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
