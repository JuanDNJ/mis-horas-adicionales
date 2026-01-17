import { useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { ProfileContext, UserContext } from ".";
import type { UserProfile, JobProfile } from "./types";
import { firestore, auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { updateProfile as updateAuthProfile } from "firebase/auth";

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userContext = useContext(UserContext);

  // States
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [jobProfiles, setJobProfiles] = useState<JobProfile[]>([]);
  const [activeJobProfile, setActiveJobProfileState] = useState<JobProfile | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper para setear activo y guardar preferencia local si se desea
  const setActiveJobProfile = (id: string) => {
    const job = jobProfiles.find((j) => j.id === id);
    if (job) {
      setActiveJobProfileState(job);
      // Opcional: Guardar en localStorage la preferencia
      localStorage.setItem("lastActiveJobId", id);
    }
  };

  const fetchProfile = useCallback(async () => {
    if (!userContext?.isAuthenticated || !userContext.email) {
      setUserProfile(null);
      setJobProfiles([]);
      setActiveJobProfileState(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No hay usuario autenticado en Firebase");
      const uid = currentUser.uid;

      // 1. Obtener Perfil Principal
      const userDocRef = doc(firestore, "profiles", uid);
      const userDocSnap = await getDoc(userDocRef);

      let userData: UserProfile | null = null;
      if (userDocSnap.exists()) {
        userData = userDocSnap.data() as UserProfile;
        setUserProfile(userData);
      } else {
        setUserProfile(null);
        // Si no hay perfil base, probablemente no hay jobs.
      }

      // 2. Obtener Perfiles de Trabajo (Subcolección)
      const jobsRef = collection(firestore, "profiles", uid, "jobs");
      const jobsSnapshot = await getDocs(jobsRef);

      const jobs: JobProfile[] = [];
      jobsSnapshot.forEach((doc) => {
        const data = doc.data();
        jobs.push({
          id: doc.id,
          companyName: data.companyName,
          jobTitle: data.jobTitle,
          employeeId: data.employeeId,
          sector: data.sector,
          isDefault: data.isDefault,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
        });
      });

      // --- Lógica de Migración (Solo si hay userProfile antiguo pero no jobs) ---
      // Si el usuario tenía datos en el modelo plano antiguo, los movemos a un primer JobProfile
      if (userData && jobs.length === 0) {
        // Chequeamos si el userData tiene campos legados
        const legacyData = userData as unknown as {
          companyName?: string;
          empresa?: string;
          jobTitle?: string;
          employeeId?: string;
          sector?: string;
        };
        if (
          legacyData.companyName ||
          legacyData.empresa ||
          legacyData.jobTitle ||
          legacyData.sector
        ) {
          console.log("Migrando datos de perfil antiguo a primer Job Profile...");

          const firstJobData = {
            companyName: legacyData.companyName || legacyData.empresa || "Mi Empresa Principal",
            jobTitle: legacyData.jobTitle || "",
            employeeId: legacyData.employeeId || "",
            sector: legacyData.sector === "Transporte" ? "Transporte" : "General",
            isDefault: true,
          };

          // Crear en Firestore
          await addDoc(jobsRef, {
            ...firstJobData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          // Refetch to get the ID and everything clean
          const newJobsSnapshot = await getDocs(jobsRef);
          jobs.length = 0; // Clear array
          newJobsSnapshot.forEach((doc) => {
            const data = doc.data();
            jobs.push({
              id: doc.id,
              companyName: data.companyName,
              jobTitle: data.jobTitle,
              employeeId: data.employeeId,
              sector: data.sector,
              isDefault: data.isDefault,
              createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
              updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
            });
          });
        }
      }
      // -------------------------------------------------------------

      setJobProfiles(jobs);

      // Determinar cuál activating
      if (jobs.length > 0) {
        // 1. Intentar recuperar último usado
        const lastActiveId = localStorage.getItem("lastActiveJobId");
        const lastActive = jobs.find((j) => j.id === lastActiveId);

        if (lastActive) {
          setActiveJobProfileState(lastActive);
        } else {
          // 2. Buscar default
          const defaultJob = jobs.find((j) => j.isDefault);
          setActiveJobProfileState(defaultJob || jobs[0]);
        }
      } else {
        setActiveJobProfileState(null);
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

  // --- Actions ---

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuario no autenticado");

    setIsLoading(true);
    try {
      // Auth Update
      if (data.displayName !== undefined || data.photoURL !== undefined) {
        await updateAuthProfile(currentUser, {
          displayName: data.displayName ?? currentUser.displayName,
          photoURL: data.photoURL ?? currentUser.photoURL,
        });
      }

      // Firestore Update
      const docRef = doc(firestore, "profiles", currentUser.uid);
      const docSnap = await getDoc(docRef);

      const newProfileData = {
        ...data,
        email: currentUser.email || "",
        uid: currentUser.uid,
        updatedAt: serverTimestamp(),
      };

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          ...newProfileData,
          createdAt: serverTimestamp(),
          status: "Activo",
        });
      } else {
        await updateDoc(docRef, newProfileData);
      }

      await fetchProfile();
    } catch (err: unknown) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addJobProfile = async (
    data: Omit<JobProfile, "id" | "createdAt" | "updatedAt" | "isDefault">
  ) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuario no autenticado");

    setIsLoading(true);
    try {
      const jobsRef = collection(firestore, "profiles", currentUser.uid, "jobs");

      // Si es el primero, será default automáticamente
      const isFirst = jobProfiles.length === 0;

      await addDoc(jobsRef, {
        ...data,
        isDefault: isFirst,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await fetchProfile();
    } catch (err) {
      console.error("Error adding job:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJobProfile = async (id: string, data: Partial<JobProfile>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuario no autenticado");

    setIsLoading(true);
    try {
      const jobRef = doc(firestore, "profiles", currentUser.uid, "jobs", id);

      // Si marcamos como default este, debemos desmarcar otros
      if (data.isDefault === true) {
        const batch = writeBatch(firestore);
        // Buscar otros defaults
        const q = query(
          collection(firestore, "profiles", currentUser.uid, "jobs"),
          where("isDefault", "==", true)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((d) => {
          if (d.id !== id) {
            batch.update(d.ref, { isDefault: false });
          }
        });
        // Update target
        batch.update(jobRef, { ...data, updatedAt: serverTimestamp() });
        await batch.commit();
      } else {
        // Normal update
        await updateDoc(jobRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
      }

      await fetchProfile();
    } catch (err) {
      console.error("Error updating job:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJobProfile = async (id: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuario no autenticado");

    if (jobProfiles.length <= 1) {
      throw new Error("No puedes eliminar tu único perfil de trabajo.");
    }

    setIsLoading(true);
    try {
      await deleteDoc(doc(firestore, "profiles", currentUser.uid, "jobs", id));

      // Si borramos el activo, switch to another
      if (activeJobProfile?.id === id) {
        const other = jobProfiles.find((j) => j.id !== id);
        if (other) setActiveJobProfile(other.id);
      }

      await fetchProfile();
    } catch (err) {
      console.error("Error deleting job:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        jobProfiles,
        activeJobProfile,
        isLoading,
        error,
        updateUserProfile,
        refreshProfile: fetchProfile,
        addJobProfile,
        updateJobProfile,
        deleteJobProfile,
        setActiveJobProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
