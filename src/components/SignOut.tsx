import { useUserContext } from "@/hooks/useUserContext";
import { FaSignOutAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface SignOutProps {
  className?: string;
  onAction?: () => void;
}

export const SignOut = ({ className, onAction }: SignOutProps) => {
  const { logout } = useUserContext();

  const handleClick = () => {
    if (onAction) onAction();
    if (logout) logout();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/10 hover:text-red-600 transition-colors text-theme-color font-medium text-left",
        className
      )}
    >
      <FaSignOutAlt className="text-lg" />
      <span>Cerrar Sesión</span>
    </button>
  );
};
