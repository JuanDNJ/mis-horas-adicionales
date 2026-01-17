import { useState, useEffect, type FC } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { HeaderControls } from "./HeaderControls";
import { HeaderLogo } from "./HeaderLogo";
import { GoogleAcces } from "./GoogleAcces";
import { useProfileContext } from "@/hooks/useProfileContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useProfileContext();
  const { activeJobProfile } = useUserProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "border-b-4 border-black w-full max-w-[100vw] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-1 md:gap-4 sticky top-0 px-2 md:px-4 py-2 md:py-3 z-100 transition-all duration-300 box-border",
        "backdrop-blur-sm bg-header-bg/95", // Estado inicial: Blur suave
        isScrolled && "backdrop-blur-md bg-header-bg/85" // Estado scroll: Blur notorio, más transparencia
      )}
    >
      {/* Left Section: Mobile Menu + Logo */}
      <HeaderLogo onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Center Section: Desktop Navigation */}
      <DesktopNav />

      {/* Right Section: Theme Selector + User Menu + Google Access */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Active Company Indicator (Desktop) */}
        {isAuthenticated && activeJobProfile && (
          <div className="hidden lg:flex flex-col items-end mr-2 px-3 py-1 bg-white/50 border-2 border-black rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span className="text-[10px] font-bold uppercase text-gray-500 leading-none mb-0.5">
              Trabajando en
            </span>
            <span className="font-black uppercase text-xs leading-none flex items-center gap-1">
              <Briefcase size={12} /> {activeJobProfile.companyName}
            </span>
          </div>
        )}

        <HeaderControls />
        {!isAuthenticated && <GoogleAcces />}
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};
export default Header;
