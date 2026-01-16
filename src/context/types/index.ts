import { type Theme } from "@/config";

interface GlobalContextType {
  appTitle: string;
  setAppTitle: (title: string) => void;
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}
interface UserContextType {
  // Define user-related context properties here
  displayName: string;
  photoURL: string;
  phoneNumber?: string;
  email: string;
  employeeId?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login?: () => void;
  logout?: () => void;
  updateUserProfile?: (name: string, photo: string, phoneNumber: string, email: string) => void;
}

interface UserProfile {
  uid?: string;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber?: string;
  jobTitle: string;
  sector: string;
  employeeId: string;
  totalHours: string;
  status: "Activo" | "Inactivo" | "Pendiente";
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export type { GlobalContextType, UserContextType, UserProfile, ProfileContextType };
