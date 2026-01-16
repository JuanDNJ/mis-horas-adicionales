import { NavLink } from "react-router-dom";
import type { FC } from "react";
import { useProfileContext } from "@/hooks/useProfileContext";

export const DesktopNav: FC = () => {
  const { isAuthenticated } = useProfileContext();

  return (
    <nav className="hidden xl:flex justify-center gap-8 items-center absolute left-1/2 -translate-x-1/2">
      <NavLink to="/" className="text-theme-color font-bold hover:underline text-lg">
        Home
      </NavLink>
      {isAuthenticated && (
        <NavLink to="/dashboard" className="text-theme-color font-bold hover:underline text-lg">
          Dashboard
        </NavLink>
      )}
    </nav>
  );
};
