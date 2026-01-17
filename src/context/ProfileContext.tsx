import { useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { ProfileContext, UserContext } from ".";
import type { UserProfile } from "./types";
import { firestore, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile as updateAuthProfile } from "firebase/auth";

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userContext = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userContext?.isAuthenticated || !userContext.email) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Usaremos el email como ID o buscamos el UID del usuario actual
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No hay usuario autenticado en Firebase");

      const docRef = doc(firestore, "profiles", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      } else {
        // Si no existe, creamos uno básico o dejamos null para que el UI pida crearlo.
        // Aquí decidimos dejarlo null para que el usuario sea redirigido a "Crear Perfil".
        // O podemos autocrear uno vacío? Mejor dejemos null y lógica en UI.
        console.log("No existe perfil para este usuario usuario.");
        setUserProfile(null);
      }
    } catch (err: unknown) {
      console.error("Error fetching profile:", err);
      setError(err instanceof Error ? err.message : "Error al cargar perfil");
    } finally {
      setIsLoading(false);
    }
  }, [userContext?.isAuthenticated, userContext?.email]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuario no autenticado");

    setIsLoading(true);
    try {
      // 1. Actualizar displayName y photoURL en Firebase Authentication si cambiaron
      if (data.displayName !== undefined || data.photoURL !== undefined) {
        await updateAuthProfile(currentUser, {
          displayName: data.displayName ?? currentUser.displayName,
          photoURL: data.photoURL ?? currentUser.photoURL,
        });
      }

      // 2. Actualizar perfil en Firestore
      const docRef = doc(firestore, "profiles", currentUser.uid);
      const docSnap = await getDoc(docRef);

      const newProfileData = {
        ...data,
        email: currentUser.email || "",
        uid: currentUser.uid,
        updatedAt: serverTimestamp(),
      };

      if (!docSnap.exists()) {
        // Crear nuevo
        await setDoc(docRef, {
          ...newProfileData,
          createdAt: serverTimestamp(),
          // Valores por defecto
          totalHours: "0",
          status: "Activo",
        });
      } else {
        // Actualizar existente
        await updateDoc(docRef, newProfileData);
      }

      await fetchProfile(); // Recargar datos
    } catch (err: unknown) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ userProfile, isLoading, error, updateProfile, refreshProfile: fetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
