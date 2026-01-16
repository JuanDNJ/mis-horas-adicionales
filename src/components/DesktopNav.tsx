import { NavLink } from "react-router-dom";
import type { FC } from "react";

export const DesktopNav: FC = () => {
  return (
    <nav className="hidden lg:flex justify-center gap-8 items-center absolute left-1/2 -translate-x-1/2">
      <NavLink to="/" className="text-theme-color font-bold hover:underline text-lg">
        Home
      </NavLink>
      <NavLink to="/dashboard" className="text-theme-color font-bold hover:underline text-lg">
        Dashboard
      </NavLink>
      <NavLink to="/profile" className="text-theme-color font-bold hover:underline text-lg">
        Profile
      </NavLink>
    </nav>
  );
};
