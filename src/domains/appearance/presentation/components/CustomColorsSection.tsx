/**
 * Custom Colors Section Component
 * Single Responsibility: Render custom color picker section
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system";
import { ColorPicker } from "./ColorPicker";
import {
  DEFAULT_PRIMARY_COLORS,
  DEFAULT_SECONDARY_COLORS,
  DEFAULT_ACCENT_COLORS,
} from "../../data/colorPalettes";
import type { DesignTokens } from "@umituz/react-native-design-system";
import type { CustomThemeColors } from "../../types";

export interface ColorFieldConfig {
  key: keyof CustomThemeColors;
  label: string;
  defaultColor: string;
  colorPalette: string[];
}

export interface CustomColorsSectionProps {
  tokens: DesignTokens;
  localCustomColors: CustomThemeColors;
  onColorChange: (key: keyof CustomThemeColors, color: string) => void;
  onResetColors: () => void;
  title?: string;
  description?: string;
  resetButtonText?: string;
  colorFields?: ColorFieldConfig[];
  showResetButton?: boolean;
}

const DEFAULT_COLOR_FIELDS: ColorFieldConfig[] = [
  {
    key: "primary",
    label: "Primary Color",
    defaultColor: "#007AFF",
    colorPalette: DEFAULT_PRIMARY_COLORS.colors,
  },
  {
    key: "secondary",
    label: "Secondary Color", 
    defaultColor: "#8E8E93",
    colorPalette: DEFAULT_SECONDARY_COLORS.colors,
  },
  {
    key: "accent",
    label: "Accent Color",
    defaultColor: "#FF6B6B",
    colorPalette: DEFAULT_ACCENT_COLORS.colors,
  },
  {
    key: "buttonPrimary",
    label: "Button Primary",
    defaultColor: "#007AFF",
    colorPalette: DEFAULT_PRIMARY_COLORS.colors,
  },
  {
    key: "buttonSecondary",
    label: "Button Secondary",
    defaultColor: "#8E8E93",
    colorPalette: DEFAULT_SECONDARY_COLORS.colors,
  },
];

export const CustomColorsSection: React.FC<CustomColorsSectionProps> = ({
  tokens,
  localCustomColors,
  onColorChange,
  onResetColors,
  title,
  description,
  resetButtonText,
  colorFields = DEFAULT_COLOR_FIELDS,
  showResetButton = true,
}) => {
  // Memoize styles to prevent unnecessary re-creation
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  // Memoize color fields to prevent unnecessary re-renders
  const colorFieldsMemo = useMemo(() => colorFields, [colorFields]);

  // Stable callback for color change to prevent infinite re-renders
  const handleColorChange = useCallback((key: keyof CustomThemeColors, color: string) => {
    try {
      onColorChange(key, color);
    } catch {
      // Silent error handling
    }
  }, [onColorChange]);

  // Stable callback for reset to prevent infinite re-renders
  const handleResetColors = useCallback(() => {
    try {
      onResetColors();
    } catch {
      // Silent error handling
    }
  }, [onResetColors]);

  // Memoize color pickers to prevent unnecessary re-renders
  const colorPickers = useMemo(() => {
    return colorFieldsMemo.map((field) => (
      <ColorPicker
        key={field.key}
        label={field.label}
        value={localCustomColors[field.key] || field.defaultColor}
        onValueChange={(color) => handleColorChange(field.key, color)}
        colors={field.colorPalette}
      />
    ));
  }, [colorFieldsMemo, localCustomColors, handleColorChange]);

  // Memoize reset button to prevent unnecessary re-renders
  const resetButton = useMemo(() => {
    if (!showResetButton) return null;

    return (
      <AtomicButton variant="outline" size="sm" onPress={handleResetColors}>
        {resetButtonText || "Reset"}
      </AtomicButton>
    );
  }, [showResetButton, resetButtonText, handleResetColors]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleContainer}>
          <AtomicText
            type="titleMedium"
            color="primary"
            style={styles.sectionTitle}
          >
            {title}
          </AtomicText>
          <AtomicText
            type="bodySmall"
            color="secondary"
            style={styles.sectionDescription}
          >
            {description}
          </AtomicText>
        </View>
        {resetButton}
      </View>

      {colorPickers}
    </View>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    section: {
      marginBottom: tokens.spacing.xl,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: tokens.spacing.md,
    },
    titleContainer: {
      flex: 1,
    },
    sectionTitle: {
      marginBottom: tokens.spacing.xs,
    },
    sectionDescription: {
      marginBottom: tokens.spacing.md,
    },
  });
