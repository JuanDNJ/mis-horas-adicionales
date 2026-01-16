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
  login?: () => void;
  updateUserProfile?: (name: string, photo: string, phoneNumber: string, email: string) => void;
}

export type { GlobalContextType, UserContextType };
