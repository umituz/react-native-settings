import { useTheme, type ThemeMode as BaseThemeMode, type CustomThemeColors } from "@umituz/react-native-design-system";
import type { ThemeMode } from "../types";

export const useAppearance = () => {
  const { themeMode, customColors, defaultColors, isInitialized, setThemeMode, setCustomColors, resetToDefaults } = useTheme();

  return {
    themeMode: themeMode as ThemeMode,
    customColors,
    defaultColors,
    isLoading: !isInitialized,
    setThemeMode: (mode: ThemeMode) => {
      // Cast to base ThemeMode since design system doesn't support 'auto'
      void setThemeMode(mode as BaseThemeMode);
    },
    setCustomColors: (colors: CustomThemeColors) => {
      void setCustomColors(colors);
    },
    reset: () => {
      void resetToDefaults();
    },
  };
};
