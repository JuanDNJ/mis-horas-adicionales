import { useState, type ReactNode } from "react";
import { UserContext } from ".";
import type { UserContextType } from "./types";
import { auth, GoogleAuthProvider, signInWithPopup } from "@/lib/firebase";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [dataProfile, setDataProfile] = useState<UserContextType>({
    displayName: "Juan Antonio",
    photoURL: "https://avatars.githubusercontent.com/u/132897973?v=4",
    phoneNumber: "123-456-7890",
    email: "juandevnjv@gmail.com",
  });
  const updateUserProfile = (name: string, photo: string, phoneNumber: string, email: string) => {
    setDataProfile(() => ({
      displayName: name,
      photoURL: photo,
      phoneNumber: phoneNumber,
      email: email,
    }));
  };
  const login = () => {
    // Lógica de autenticación aquí
    signInWithPopup(auth, googleProvider);
  };
  return (
    <UserContext.Provider value={{ ...dataProfile, updateUserProfile, login }}>
      {children}
    </UserContext.Provider>
  );
};
