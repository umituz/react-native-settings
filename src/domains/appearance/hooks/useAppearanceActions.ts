import { useState, useCallback, useEffect, useRef } from "react";
import { useAppearance } from "./useAppearance";
import type { CustomThemeColors } from "@umituz/react-native-design-system";
import type { ThemeMode } from "../types";

export const useAppearanceActions = () => {
  const { themeMode, customColors, setThemeMode, setCustomColors, reset } = useAppearance();
  const [localCustomColors, setLocalCustomColors] = useState<CustomThemeColors>(customColors || {});

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Sync local state with global state, but only if mounted
  useEffect(() => {
    if (isMountedRef.current && customColors) {
      setLocalCustomColors(customColors);
    }
  }, [customColors]);

  const handleThemeSelect = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, [setThemeMode]);

  const handleColorChange = useCallback((key: keyof CustomThemeColors, color: string) => {
    // Update local state immediately for UI responsiveness
    const newColors = { ...localCustomColors, [key]: color };

    // Batch state updates to prevent race conditions
    setLocalCustomColors(newColors);

    // Update global state separately
    setCustomColors(newColors);
  }, [localCustomColors, setCustomColors]);

  const handleResetColors = useCallback(() => {
    reset();
    if (isMountedRef.current) {
      setLocalCustomColors({});
    }
  }, [reset]);

  return {
    themeMode,
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  };
};
