import { UserContext } from "@/context";
import { useContext } from "react";

export const useProfileContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useProfileContext debe ser usado dentro de un UserProvider");
  }
  return context;
};
