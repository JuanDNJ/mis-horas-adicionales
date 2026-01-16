import { useState, type ReactNode } from "react";
import { UserContext } from ".";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataProfile, setDataProfile] = useState<{ displayName: string; photoURL: string }>({
    displayName: "Juan Antonio",
    photoURL: "https://avatars.githubusercontent.com/u/132897973?v=4",
  });
  const updateUserProfile = (name: string, photo: string) => {
    setDataProfile({ displayName: name, photoURL: photo });
  };
  return (
    <UserContext.Provider value={{ ...dataProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
