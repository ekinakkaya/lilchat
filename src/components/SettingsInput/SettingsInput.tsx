import React, { useEffect, useState } from "react";
import {
  getSetting,
  saveSetting,
  SettingsType,
} from "../../services/SettingsStorage/SettingsStorage";

type SettingsInputProps = {
  description: string;
  inputPlaceholder?: string;
  hideInside?: boolean;
  // in rem.
  inputHeight?: number;
  setting: keyof SettingsType;
  defaultValue?: string | number;
};

function stringToNumberOrString(value: string): number | string {
  if (value === "") return "";

  const num = Number(value);
  return isNaN(num) ? value : num;
}

export const SettingsInput = ({
  description,
  inputPlaceholder,
  hideInside,
  inputHeight = 18,
  setting,
  defaultValue,
}: SettingsInputProps) => {
  const [settingValue, setSettingValue] = useState<string | number>("");
  const [storedValue, setStoredValue] = useState<string | number>("");

  useEffect(() => {
    const storedVal = getSetting(setting);
    if (storedVal === "" && defaultValue === typeof 'string') {
      setSettingValue(defaultValue);
      setStoredValue(defaultValue);
    }
    setSettingValue(storedVal);
    setStoredValue(storedVal);
  }, [storedValue]);

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = stringToNumberOrString(e.target.value);
    setSettingValue(value);
    saveSetting(setting, value);
  };

  return (
    <div className="mt-3 overflow-x-hidden">
      <p>{description}</p>
      {/* 
      <p>last saved {storedValue}</p>
      */}
      {hideInside ? (
        <input
          type="password"
          className={`w-full h-${inputHeight} border border-gray-300 rounded-lg p-2 bg-gray-700`}
          onChange={onInputChange}
          value={settingValue}
          defaultValue={storedValue}
        ></input>
      ) : (
        <textarea
          className={`w-full h-${inputHeight} border border-gray-300 rounded-lg p-2 bg-gray-700`}
          placeholder={inputPlaceholder}
          onChange={onInputChange}
          value={settingValue}
          defaultValue={storedValue}
        ></textarea>
      )}
    </div>
  );
};
