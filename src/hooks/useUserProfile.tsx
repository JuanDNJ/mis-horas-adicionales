import { ProfileContext } from "@/context";
import { useContext } from "react";

export const useUserProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile debe ser usado dentro de un ProfileProvider");
  }
  return context;
};
