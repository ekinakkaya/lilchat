import { ExpandSettingsButton } from "../ExpandSettingsButton/ExpandSettingsButton";
import { SettingsInput } from "../SettingsInput/SettingsInput";

type SettingsPanelProps = {
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
            inputPlaceholder="htps://api.hyperbolic.xyz/v1"
            inputHeight={24}
          />

          <SettingsInput
            description="Authorization Key a"
            inputPlaceholder="htps://api.hyperbolic.xyz/v1"
            inputHeight={18}
            hideInside
          />

          <SettingsInput
            description="Model Name"
            inputPlaceholder="Qwen/Qwen2.5-Coder-32B-Instruct"
            inputHeight={18}
          />

          <SettingsInput
            description="Max Tokens"
            inputPlaceholder="4096"
            inputHeight={18}
          />

          <SettingsInput
            description="Top P"
            inputPlaceholder="0.01"
            inputHeight={18}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
