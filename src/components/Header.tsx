import { useState, type FC } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { HeaderControls } from "./HeaderControls";
import { HeaderLogo } from "./HeaderLogo";

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-header-bg border-b-4 border-black w-full max-w-[100vw] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-1 md:gap-4 sticky top-0 px-2 md:px-4 py-2 md:py-3 z-50 transition-colors duration-300 box-border">
      {/* Left Section: Mobile Menu + Logo */}
      <HeaderLogo onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Center Section: Desktop Navigation */}
      <DesktopNav />

      {/* Right Section: Theme Selector + User Menu */}
      <HeaderControls />
      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};
export default Header;
