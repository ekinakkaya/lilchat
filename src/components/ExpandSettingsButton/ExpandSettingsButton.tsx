type ExpandSettingsButtonProps = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (state: boolean) => void;
};

export const ExpandSettingsButton = ({
  isSettingsOpen,
  setIsSettingsOpen,
}: ExpandSettingsButtonProps) => {
  return (
    <button
      className="ml-auto w-12 rounded-xl bg-slate-300 text-black text-2xl"
      onClick={() => {
        if (isSettingsOpen) setIsSettingsOpen(false);
        else setIsSettingsOpen(true);
      }}
    >
      {isSettingsOpen ? <>-</> : <>+</>}
    </button>
  );
};
