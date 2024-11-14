type NavBarProps = {
    isMenuOpen: boolean
    setIsMenuOpen: (state: boolean) => void
}

export const NavBar = ({isMenuOpen, setIsMenuOpen}: NavBarProps) => {
  return (
    <nav className=" navbar m-2 flex items-center justify-start rounded-xl bg-gray-800 p-4 px-6 min-h-20">
      {!isMenuOpen && (
        <button
          className=" w-12 text-md rounded-xl border-2 border-dashed px-4 py-2 text-white transition-all hover:bg-slate-700"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      )}
      <div className="pl-4 font-serif text-lg font-thin text-white">
        ^0^ lilchat | LlĽĆʜæţ
      </div>
    </nav>
  );
};
