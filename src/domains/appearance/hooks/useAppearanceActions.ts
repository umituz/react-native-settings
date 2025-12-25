import { useState, useCallback, useEffect } from "react";
import { useAppearance } from "./useAppearance";
import { CustomThemeColors } from "@umituz/react-native-design-system";

export const useAppearanceActions = () => {
  const { themeMode, customColors, setThemeMode, setCustomColors, reset } = useAppearance();
  const [localCustomColors, setLocalCustomColors] = useState<CustomThemeColors>(customColors || {});

  useEffect(() => {
    if (customColors) {
      setLocalCustomColors(customColors);
    }
  }, [customColors]);

  const handleThemeSelect = useCallback((mode: any) => {
    setThemeMode(mode);
  }, [setThemeMode]);

  const handleColorChange = useCallback((key: keyof CustomThemeColors, color: string) => {
    const newColors = { ...localCustomColors, [key]: color };
    setLocalCustomColors(newColors);
    setCustomColors(newColors);
  }, [localCustomColors, setCustomColors]);

  const handleResetColors = useCallback(() => {
    reset();
    setLocalCustomColors({});
  }, [reset]);

  return {
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  };
};
