import { useTheme, type ThemeMode, type CustomThemeColors } from "@umituz/react-native-design-system";

export const useAppearance = () => {
  const { themeMode, customColors, isInitialized, setThemeMode, setCustomColors } = useTheme();

  return {
    themeMode,
    customColors,
    isLoading: !isInitialized,
    setThemeMode: (mode: ThemeMode) => {
      void setThemeMode(mode);
    },
    setCustomColors: (colors: CustomThemeColors) => {
      void setCustomColors(colors);
    },
    reset: () => {
      void setThemeMode("light");
      void setCustomColors(undefined);
    },
  };
};
