import type { FC } from "react";
import { HamburgerButton } from "./HamburgerButton";
import { Brand } from "./Brand";

interface HeaderLogoProps {
  onOpenMobileMenu: () => void;
}

export const HeaderLogo: FC<HeaderLogoProps> = ({ onOpenMobileMenu }) => {
  return (
    <article className="flex items-center gap-1 md:gap-4">
      {/* Mobile Hamburger Button */}
      <HamburgerButton onClick={onOpenMobileMenu} />

      <Brand />
    </article>
  );
};
