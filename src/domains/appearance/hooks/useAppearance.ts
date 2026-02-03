import { useTheme, type ThemeMode, type CustomThemeColors } from "@umituz/react-native-design-system";

export const useAppearance = () => {
  const { themeMode, customColors, defaultColors, isInitialized, setThemeMode, setCustomColors, resetToDefaults } = useTheme();

  return {
    themeMode,
    customColors,
    defaultColors,
    isLoading: !isInitialized,
    setThemeMode: (mode: ThemeMode) => {
      void setThemeMode(mode);
    },
    setCustomColors: (colors: CustomThemeColors) => {
      void setCustomColors(colors);
    },
    reset: () => {
      void resetToDefaults();
    },
  };
};
