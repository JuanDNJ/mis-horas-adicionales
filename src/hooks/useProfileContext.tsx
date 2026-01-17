import { ProfileContext } from "@/context";
import { useContext } from "react";

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext debe ser usado dentro de un ProfileProvider");
  }
  return context;
};
