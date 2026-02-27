import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from ".";
import type { UserContextType } from "./types";
import {
  auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "@/lib/firebase";
import type { UserCredential } from "firebase/auth";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({ prompt: "select_account" });

  const [dataProfile, setDataProfile] = useState<UserContextType>({
    displayName: "",
    photoURL: "",
    phoneNumber: "",
    email: "",
    isAuthenticated: false,
    isLoading: true,
  });

  const updateUserProfile = (name: string, photo: string, phoneNumber: string, email: string) => {
    setDataProfile((prev) => ({
      ...prev,
      displayName: name,
      photoURL: photo,
      phoneNumber: phoneNumber,
      email: email,
    }));
  };

  const login = async (): Promise<UserCredential> => {
    try {
      return signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during login:", error);
      throw "Login failed";
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, phoneNumber, email } = user;
        setDataProfile({
          displayName: displayName || "",
          photoURL: photoURL || "",
          phoneNumber: phoneNumber || "",
          email: email || "",
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setDataProfile({
          displayName: "",
          photoURL: "",
          phoneNumber: "",
          email: "",
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={{ ...dataProfile, updateUserProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
