import { themes, type Theme } from "@/config";
import { useGlobalContext } from "@/hooks/useGlobalContext";

const useThemeHook = () => {
  const { selectedTheme, setSelectedTheme } = useGlobalContext();

  const onChangeTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    // La actualización del DOM se maneja centralizadamente en el GlobalContext
  };

  return {
    selectedTheme,
    onChangeTheme,
    themes,
  };
};

export default useThemeHook;
