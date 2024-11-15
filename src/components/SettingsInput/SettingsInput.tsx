import React, { useEffect, useState } from "react";
import { getSetting, saveSetting, SettingsType } from "../../services/SettingsStorage/SettingsStorage";

type SettingsInputProps = {
  description: string;
  inputPlaceholder?: string;
  hideInside?: boolean;
  // in rem.
  inputHeight?: number;
  setting: keyof SettingsType;
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
}: SettingsInputProps) => {
  const [settingValue, setSettingValue] = useState<string | number>("");
  const [defaultValue, setDefaultValue] = useState<string | number>("");

  useEffect(() => {
    const storedValue = getSetting(setting);
    setSettingValue(storedValue);
    setDefaultValue(storedValue);
  }, [defaultValue])

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
    <div className="mt-3">
      <p>{description}</p>
      <p>last saved {defaultValue}</p>
      {hideInside ? (
        <input
          type="password"
          className={`w-full h-${inputHeight} border border-gray-300 rounded-lg p-2 bg-gray-700`}
          onChange={onInputChange}
          value={settingValue}
          defaultValue={defaultValue}
        ></input>
      ) : (
        <textarea
          className={`w-full h-${inputHeight} border border-gray-300 rounded-lg p-2 bg-gray-700`}
          placeholder={inputPlaceholder}
          onChange={onInputChange}
          value={settingValue}
          defaultValue={defaultValue}
        ></textarea>
      )}
    </div>
  );
};
