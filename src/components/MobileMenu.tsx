import type { FC } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useProfileContext } from "@/hooks/useProfileContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useProfileContext();
  return (
    <>
      {/* Overlay */}
      <article
        className={cn(
          "fixed inset-0 bg-black/50 z-40 xl:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <section
        className={cn(
          "fixed top-0 left-0 w-64 h-full bg-header-bg border-r-4 border-black shadow-[4px_0_0_rgba(0,0,0,0.2)] z-50 transform transition-transform duration-300 ease-in-out xl:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <article className="p-4 flex justify-between items-center border-b-4 border-black/10">
          <h2 className="text-xl font-bold text-theme-color">Menú</h2>
          <button
            onClick={onClose}
            className="text-2xl text-theme-color hover:rotate-90 transition-transform"
          >
            <FaTimes />
          </button>
        </article>

        <nav className="flex flex-col p-4 gap-4">
          <NavLink
            to="/"
            onClick={onClose}
            className="text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20"
          >
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className="text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20"
            >
              Dashboard
            </NavLink>
          )}
        </nav>
      </section>
    </>
  );
};
