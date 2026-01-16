import type { FC } from "react";
import { FaBars } from "react-icons/fa";

interface HamburgerButtonProps {
  onClick: () => void;
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({ onClick }) => {
  return (
    <button className="xl:hidden p-1 md:p-2 text-theme-color text-2xl" onClick={onClick}>
      <FaBars />
    </button>
  );
};
