import { UserContext } from "@/context";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
};
