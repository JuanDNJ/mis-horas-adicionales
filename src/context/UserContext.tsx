import type { ReactNode } from "react";
import { UserContext } from ".";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserContext.Provider value={{ displayName: "", photoURL: "", phoneNumber: "" }}>
      {children}
    </UserContext.Provider>
  );
};
