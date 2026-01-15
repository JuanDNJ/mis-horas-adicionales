import { useState, type FC } from "react";
import { FaImage, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Select } from "./Select";
import { UserMenu } from "./UserMenu";
import useThemeHook from "@/hooks/theme_hook";
import { cn } from "@/lib/utils";

const Header: FC = () => {
  const { selectedTheme, onChangeTheme, themes } = useThemeHook();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-header-bg border-b-4 border-black w-full max-w-[100vw] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-1 md:gap-4 sticky top-0 px-2 md:px-4 py-2 md:py-3 z-50 transition-colors duration-300 box-border">
      {/* Left Section: Mobile Menu + Logo */}
      <div className="flex items-center gap-1 md:gap-4">
        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-1 md:p-2 text-theme-color text-2xl"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars />
        </button>

        <article className="flex items-center gap-2 md:gap-4">
          <FaImage className="text-2xl md:text-4xl text-theme-color drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)]" />
          <h1 className="hidden sm:block text-theme-color text-2xl tracking-wider text-outline-white">
            Horas Adicionales
          </h1>
        </article>
      </div>

      {/* Center Section: Desktop Navigation */}
      <nav className="hidden lg:flex justify-center gap-8 items-center absolute left-1/2 -translate-x-1/2">
        <NavLink to="/" className="text-theme-color font-bold hover:underline text-lg">
          Home
        </NavLink>

        <NavLink to="/profile" className="text-theme-color font-bold hover:underline text-lg">
          Profile
        </NavLink>
      </nav>

      {/* Right Section: Theme Selector + User Menu */}
      <div className="flex items-center gap-2 md:gap-4 z-50">
        <Select
          options={themes}
          value={selectedTheme}
          onChange={onChangeTheme}
          className="w-fit"
          renderItem={(theme, isSelected) => (
            <>
              <theme.icon className={cn("text-lg md:text-xl", theme.color)} />
              <span
                className={cn(
                  "flex-1 font-bold text-lg hidden md:block",
                  isSelected ? "text-option-selected" : "text-secondary"
                )}
              >
                {theme.name}
              </span>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-select shadow-[0_0_8px_rgba(59,130,246,0.5)] ml-1 md:ml-2" />
              )}
            </>
          )}
        />
        <UserMenu />
      </div>

      {/* Mobile Drawer Menu */}
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 w-64 h-full bg-header-bg border-r-4 border-black shadow-[4px_0_0_rgba(0,0,0,0.2)] z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b-4 border-black/10">
          <h2 className="text-xl font-bold text-theme-color">Menú</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl text-theme-color hover:rotate-90 transition-transform"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20"
          >
            Home
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20"
          >
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
