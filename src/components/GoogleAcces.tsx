import { useUserContext } from "@/hooks/useUserContext";
import { FcGoogle } from "react-icons/fc";

export const GoogleAcces = () => {
  const { login } = useUserContext();
  return (
    <button
      onClick={login}
      className="flex items-center gap-2 bg-white text-black border-2 border-black font-bold text-base md:text-lg py-2 px-2 md:px-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
    >
      <FcGoogle className="text-lg md:text-xl" />
      <span>Acceder</span>
    </button>
  );
};
