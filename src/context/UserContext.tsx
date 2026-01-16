import { useState, type ReactNode } from "react";
import { UserContext } from ".";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataProfile, setDataProfile] = useState<{
    displayName: string;
    photoURL: string;
    phoneNumber: string;
  }>({
    displayName: "Juan Antonio",
    photoURL: "https://avatars.githubusercontent.com/u/132897973?v=4",
    phoneNumber: "123-456-7890",
  });
  const updateUserProfile = (name: string, photo: string, phoneNumber: string) => {
    setDataProfile({ displayName: name, photoURL: photo, phoneNumber: phoneNumber });
  };
  return (
    <UserContext.Provider value={{ ...dataProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
