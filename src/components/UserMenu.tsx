import { useState, useRef, useEffect, type FC } from "react";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useProfileContext } from "@/hooks/useProfileContext";
import { SignOut } from "./SignOut";

interface UserMenuProps {
  className?: string;
}

export const UserMenu: FC<UserMenuProps> = ({ className }) => {
  const { isAuthenticated, photoURL, displayName, email } = useProfileContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  return (
    <section className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center p-1 md:p-2 rounded-full",
          "bg-theme-bg border-2 border-theme-color",
          "shadow-[4px_4px_0px_var(--theme-color)]",
          "hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_var(--theme-color)]",
          "active:translate-x-0.75 active:translate-y-0.75 active:shadow-none",
          "transition-all cursor-pointer outline-none",
          isOpen && "ring-2 ring-theme-color/20"
        )}
        aria-label="User menu"
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt={displayName || "User Avatar"}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-2xl md:text-3xl text-theme-color" />
        )}
      </button>

      {isOpen && (
        <article className="absolute right-0 z-50 w-56 mt-4 py-3 bg-theme-bg border-2 border-theme-color rounded-lg shadow-[4px_4px_0px_var(--theme-color)] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="px-5 py-3 border-b-2 border-theme-color/20 mb-2">
            <p className="text-sm font-bold text-theme-color truncate">
              {displayName || "Usuario"}
            </p>
            <p className="text-xs text-secondary truncate">{email}</p>
          </div>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 hover:bg-theme-color/10 transition-colors text-theme-color font-medium"
          >
            <FaUser className="text-lg" />
            <span>Perfil</span>
          </Link>

          <SignOut onAction={() => setIsOpen(false)} />
        </article>
      )}
    </section>
  );
};
