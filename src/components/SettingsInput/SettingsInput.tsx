import React from "react";

type SettingsInputProps = {
  description: string;
  inputPlaceholder?: string;
  hideInside?: boolean;
  // in rem.
  inputHeight?: number;
};

export const SettingsInput = ({
  description,
  inputPlaceholder,
  hideInside,
  inputHeight = 18
}: SettingsInputProps) => {
  return (
    <div className="mt-3">
      <p>{description}</p>
      {hideInside ? (
        <input
          type="password"
          className={`w-full h-${inputHeight} border border-gray-300 rounded-lg p-2 bg-gray-700`}
        ></input>
      ) : (
        <textarea
          className={`w-full h-${inputHeight} border border-gray-300 rounded-lg p-2 bg-gray-700`}
          placeholder={inputPlaceholder}
        >
          {inputPlaceholder}
        </textarea>
      )}
    </div>
  );
};
