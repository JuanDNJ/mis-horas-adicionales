import { useState, useEffect, type FC } from "react";
import { DesktopNav } from "../../components/DesktopNav";
import { MobileMenu } from "../../components/MobileMenu";
import { HeaderControls } from "../../components/HeaderControls";
import { HeaderLogo } from "../../components/HeaderLogo";
import { GoogleAcces } from "../../components/GoogleAcces";
import { useProfileContext } from "@/hooks/useProfileContext";
import { useUserContext } from "@/hooks/useUserContext";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

const MainHeader: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useUserContext();
  const { activeJobProfile } = useProfileContext();

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
        "border-b-4 border-black w-full shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-1 md:gap-4 sticky top-0 px-2 md:px-4 py-2 md:py-3 z-100 transition-all duration-300 box-border",
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
        {/* Active Company Indicator */}
        {isAuthenticated && activeJobProfile && (
          <div className="flex flex-col items-end mr-2 px-2 py-0.5 md:px-3 md:py-1 bg-white/50 border-2 border-black rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] max-w-30 md:max-w-none">
            <span className="text-[8px] md:text-[10px] font-bold uppercase text-gray-500 leading-none mb-0.5">
              Último Activo
            </span>
            <span className="font-black uppercase text-[10px] md:text-xs leading-none flex items-center gap-1 truncate w-full justify-end">
              <Briefcase size={10} className="md:w-3 md:h-3 shrink-0" />{" "}
              <span className="truncate">{activeJobProfile.companyName}</span>
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
export default MainHeader;
