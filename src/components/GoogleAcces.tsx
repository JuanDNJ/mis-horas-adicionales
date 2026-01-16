import { useProfileContext } from "@/hooks/useProfileContext";
import { FcGoogle } from "react-icons/fc";

export const GoogleAcces = () => {
  const { login } = useProfileContext();
  return (
    <button
      onClick={login}
      className="flex items-center gap-2 bg-white text-black border-2 border-black font-bold uppercase tracking-widest text-xs md:text-sm py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
    >
      <FcGoogle className="text-lg md:text-xl" />
      <span>Acceder</span>
    </button>
  );
};
