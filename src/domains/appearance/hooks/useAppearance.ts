/**
 * useAppearance Hook
 *
 * Hook for accessing appearance state and actions
 * Single Responsibility: Presentation layer data access
 */

import { useCallback } from "react";
import { useAppearanceStore } from "../infrastructure/stores/appearanceStore";
import { appearanceService } from "../infrastructure/services/appearanceService";
import type { ThemeMode, CustomThemeColors } from "../types";

export const useAppearance = () => {
  const store = useAppearanceStore();

  const setThemeMode = useCallback(
    async (mode: ThemeMode) => {
      await appearanceService.setThemeMode(mode);
    },
    []
  );

  const toggleTheme = useCallback(
    async () => {
      await appearanceService.toggleTheme();
    },
    []
  );

  const setCustomColors = useCallback(
    async (colors: CustomThemeColors) => {
      await appearanceService.setCustomColors(colors);
    },
    []
  );

  const resetCustomColors = useCallback(
    async () => {
      await appearanceService.resetCustomColors();
    },
    []
  );

  const reset = useCallback(
    async () => {
      await appearanceService.reset();
    },
    []
  );

  return {
    themeMode: store.settings.themeMode,
    customColors: store.settings.customColors,
    isInitialized: store.isInitialized,
    setThemeMode,
    toggleTheme,
    setCustomColors,
    resetCustomColors,
    reset,
  };
};
