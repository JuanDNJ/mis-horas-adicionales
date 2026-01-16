import type { ReactNode } from "react";
import { UserContext } from ".";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserContext.Provider
      value={{
        displayName: "Juan Pérez",
        photoURL: "http://example.com/photo.jpg",
        phoneNumber: "640282614",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
