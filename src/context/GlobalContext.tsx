import React, { useState, type ReactNode, useEffect } from "react";
import { GlobalContext } from ".";
import { themes, type Theme } from "@/config";

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appTitle, setAppTitle] = useState<string>("Horas Adicionales");
  const [selectedTheme, setSelectedTheme] = useState<Theme>(() => {
    const savedThemeId = localStorage.getItem("selected-theme-id");
    const foundTheme = themes.find((t) => t.id === savedThemeId);
    return foundTheme || themes[0];
  });

  useEffect(() => {
    document.documentElement.className = `${selectedTheme.id} bg-cover bg-center bg-fixed`;
    localStorage.setItem("selected-theme-id", selectedTheme.id);
  }, [selectedTheme]);

  return (
    <GlobalContext.Provider value={{ appTitle, setAppTitle, selectedTheme, setSelectedTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};
