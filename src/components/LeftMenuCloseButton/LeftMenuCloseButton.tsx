type LeftMenuCloseButtonProps = {
    setIsMenuOpen: (state: boolean) => void
}

export const LeftMenuCloseButton = ({setIsMenuOpen}: LeftMenuCloseButtonProps) => {
  return (
    <button
      className="w-12 text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-700"
      onClick={() => setIsMenuOpen(false)}
    >
      {"<"}
    </button>
  );
};
