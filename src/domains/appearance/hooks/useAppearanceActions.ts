import { useState, useCallback, useEffect } from "react";
import { useAppearance } from "./useAppearance";
import type { CustomThemeColors, ThemeMode } from "@umituz/react-native-design-system";

export const useAppearanceActions = () => {
  const { themeMode, customColors, setThemeMode, setCustomColors, reset } = useAppearance();
  const [localCustomColors, setLocalCustomColors] = useState<CustomThemeColors>(customColors || {});

  useEffect(() => {
    if (customColors) {
      setLocalCustomColors(customColors);
    }
  }, [customColors]);

  const handleThemeSelect = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, [setThemeMode]);

  const handleColorChange = useCallback((key: keyof CustomThemeColors, color: string) => {
    setLocalCustomColors(prev => {
      const newColors = { ...prev, [key]: color };
      setCustomColors(newColors);
      return newColors;
    });
  }, [setCustomColors]);

  const handleResetColors = useCallback(() => {
    reset();
    setLocalCustomColors({});
  }, [reset]);

  return {
    themeMode,
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  };
};
