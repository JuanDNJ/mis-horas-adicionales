import { type Theme } from "@/config";

interface GlobalContextType {
  appTitle: string;
  setAppTitle: (title: string) => void;
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}

export type { GlobalContextType };
