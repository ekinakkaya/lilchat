import { ExpandSettingsButton } from "../ExpandSettingsButton/ExpandSettingsButton";
import { SettingsInput } from "../SettingsInput/SettingsInput";

export type SettingsPanelProps = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (state: boolean) => void;
};

export const SettingsPanel = ({
  isSettingsOpen,
  setIsSettingsOpen,
}: SettingsPanelProps) => {

  return (
    <div className="settings bg-slate-700 p-3 rounded-xl mt-6 border-2 border-dashed ">
      <div className="mt-2 flex flex-row rounded-xl">
        <p>Settings</p>
        <ExpandSettingsButton
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </div>

      {/* settings form input */}
      {isSettingsOpen ? (
        <>
          <SettingsInput
            description="API Endpoint"
            inputPlaceholder="https://api.hyperbolic.xyz/v1"
            inputHeight={24}
            setting={"api_endpoint"}
          />

          <SettingsInput
            description="Authorization Key"
            inputPlaceholder="1234"
            inputHeight={18}
            hideInside
            setting={"auth_key"}
          />

          <SettingsInput
            description="Model Name"
            inputPlaceholder="Qwen/Qwen2.5-Coder-32B-Instruct"
            inputHeight={18}
            setting={"model_name"}
          />

          <SettingsInput
            description="System Prompt"
            inputPlaceholder="You are a helpful assistant."
            inputHeight={18}
            setting={"system_prompt"}
            defaultValue="You are a helpful assistant."
          />

          <SettingsInput
            description="Max Tokens"
            inputPlaceholder="4096"
            inputHeight={18}
            setting={"max_tokens"}
          />
          
          <SettingsInput
            description="Temperature"
            inputPlaceholder="0.1"
            inputHeight={18}
            setting={"temperature"}
          />

          <SettingsInput
            description="Top P"
            inputPlaceholder="0.8"
            inputHeight={18}
            setting={"top_p"}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
