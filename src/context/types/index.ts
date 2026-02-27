import { type Theme } from "@/config";
import type { UserCredential } from "firebase/auth";

export interface GlobalContextType {
  appTitle: string;
  setAppTitle: (title: string) => void;
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}
export interface UserContextType {
  // Define user-related context properties here
  displayName: string;
  photoURL: string;
  phoneNumber?: string;
  email: string;
  employeeId?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login?: () => Promise<UserCredential>;
  logout?: () => void;
  updateUserProfile?: (name: string, photo: string, phoneNumber: string, email: string) => void;
}
export type UserCredentials = UserCredential;
export interface Job {
  id: string;
  title: string;
  company: string;
  sector: "General" | "Transporte";
  employeeId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface JobProfile {
  id: string;
  companyName: string; // Nombre de la empresa -> para el campo 'empresa'
  jobTitle: string;
  employeeId: string;
  sector: "General" | "Transporte";
  isDefault: boolean; // El perfil que se carga al inicio
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserProfile {
  uid?: string;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber?: string;
  // Campos antiguos marcados para migración o eliminados si ya no se usan directamente
  // jobTitle, sector, employeeId se mueven a JobProfile
  status: "Activo" | "Inactivo" | "Pendiente";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileContextType {
  userProfile: UserProfile | null;
  jobProfiles: JobProfile[]; // Lista de perfiles de trabajo
  activeJobProfile: JobProfile | null; // El perfil seleccionado actualmente

  isLoading: boolean;
  error: string | null;

  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;

  // CRUD de Perfiles Laborales
  addJobProfile: (
    data: Omit<JobProfile, "id" | "createdAt" | "updatedAt" | "isDefault">
  ) => Promise<void>;
  updateJobProfile: (id: string, data: Partial<JobProfile>) => Promise<void>;
  deleteJobProfile: (id: string) => Promise<void>;
  setActiveJobProfile: (id: string) => void;

  refreshProfile: () => Promise<void>;
}
export interface UserRecord {
  empresa: string;
  numero_empleado: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  dia: string;
  mes: string;
  anio: string;
  hora_entrada: string;
  hora_salida: string;
  origen: string;
  destino: string;
  total_horas: string;
}
export interface Children {
  children: React.ReactNode;
}
