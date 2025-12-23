/**
 * Appearance Actions Hook
 * Single Responsibility: Handle appearance-related presentation actions
 * Business logic extracted to service layer
 */

import { useCallback, useState, useEffect, useRef } from "react";
import { useAppearance } from "./useAppearance";
import type {
  ThemeMode,
  CustomThemeColors,
} from "@umituz/react-native-design-system";

export interface UseAppearanceActionsReturn {
  localCustomColors: CustomThemeColors;
  handleThemeSelect: (mode: ThemeMode) => Promise<void>;
  handleColorChange: (key: keyof CustomThemeColors, color: string) => void;
  handleResetColors: (onConfirm?: () => void) => void;
}

export interface AppearanceActionsConfig {
  onResetConfirm?: () => void;
  onResetCancel?: () => void;
  resetTitle?: string;
  resetMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function useAppearanceActions(
  config?: AppearanceActionsConfig
): UseAppearanceActionsReturn {
  const { customColors, setThemeMode, setCustomColors, resetCustomColors } =
    useAppearance();

  // Use ref to prevent unnecessary re-renders and memory leaks
  const configRef = useRef(config);
  configRef.current = config;

  // Initialize local state with custom colors, prevent unnecessary updates
  const [localCustomColors, setLocalCustomColors] = useState<CustomThemeColors>(() => 
    customColors || {}
  );

  // Sync local state with store changes, but only if different
  useEffect(() => {
    if (customColors && JSON.stringify(customColors) !== JSON.stringify(localCustomColors)) {
      if (__DEV__) {
        console.log("[useAppearanceActions] Syncing local colors with store");
      }
      setLocalCustomColors(customColors);
    }
  }, [customColors]); // Only depend on customColors, not localCustomColors

  const handleThemeSelect = useCallback(
    async (mode: ThemeMode) => {
      try {
        await setThemeMode(mode);
      } catch (error) {
        if (__DEV__) {
          console.error("[useAppearanceActions] Failed to set theme mode:", error);
        }
      }
    },
    [setThemeMode],
  );

  const handleColorChange = useCallback(
    (key: keyof CustomThemeColors, color: string) => {
      try {
        // Prevent unnecessary updates if color hasn't changed
        if (localCustomColors[key] === color) {
          return;
        }

        const newColors = {
          ...localCustomColors,
          [key]: color,
        };

        if (__DEV__) {
          console.log("[useAppearanceActions] Updating color:", key, color);
        }

        setLocalCustomColors(newColors);
        setCustomColors(newColors);
      } catch (error) {
        if (__DEV__) {
          console.error("[useAppearanceActions] Failed to update color:", error);
        }
      }
    },
    [localCustomColors, setCustomColors],
  );

  const handleResetColors = useCallback(
    (onConfirm?: () => void) => {
      try {
        // Generic reset handler - the host app should handle the UI confirmation
        const resetAction = async () => {
          try {
            setLocalCustomColors({});
            await resetCustomColors();
            onConfirm?.();
            configRef.current?.onResetConfirm?.();
          } catch (error) {
            if (__DEV__) {
              console.error("[useAppearanceActions] Failed to reset colors:", error);
            }
          }
        };

        // If no custom config provided, just reset directly
        if (!configRef.current?.resetTitle) {
          resetAction();
        }
        // Otherwise, the host app should handle showing the confirmation dialog
        // and call resetAction when confirmed
      } catch (error) {
        if (__DEV__) {
          console.error("[useAppearanceActions] Failed to handle reset colors:", error);
        }
      }
    },
    [resetCustomColors],
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup any pending operations or references
      if (__DEV__) {
        console.log("[useAppearanceActions] Cleanup");
      }
    };
  }, []);

  return {
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  };
}
