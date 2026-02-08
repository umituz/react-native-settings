/**
 * Appearance Preview Component
 * Single Responsibility: Render color preview section
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import type { DesignTokens } from "@umituz/react-native-design-system";
import type { CustomThemeColors } from "../../types";

export interface PreviewColorItem {
  key: keyof CustomThemeColors;
  label: string;
  fallbackColor: string;
}

export interface AppearancePreviewProps {
  tokens: DesignTokens;
  localCustomColors: CustomThemeColors;
  title?: string;
  description?: string;
  previewColors?: PreviewColorItem[];
  showPreview?: boolean;
}

const DEFAULT_PREVIEW_COLORS: PreviewColorItem[] = [
  {
    key: "primary",
    label: "Primary",
    fallbackColor: "#007AFF",
  },
  {
    key: "secondary", 
    label: "Secondary",
    fallbackColor: "#8E8E93",
  },
  {
    key: "accent",
    label: "Accent",
    fallbackColor: "#FF6B6B",
  },
  {
    key: "buttonPrimary",
    label: "Button",
    fallbackColor: "#007AFF",
  },
];

export const AppearancePreview: React.FC<AppearancePreviewProps> = ({
  tokens,
  localCustomColors,
  title,
  description,
  previewColors = DEFAULT_PREVIEW_COLORS,
  showPreview = true,
}) => {
  const styles = getStyles(tokens);

  const colors = previewColors.map((item) => ({
    label: item.label,
    color: localCustomColors[item.key] ?? item.fallbackColor,
  }));

  if (!showPreview) {
    return null;
  }

  return (
    <View style={styles.previewSection}>
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
      <View style={styles.previewContainer}>
        <View style={styles.previewColorRow}>
          {colors.map((item) => (
            <View key={`preview-color-${item.label}`} style={styles.previewColorItem}>
              <View
                style={[
                  styles.previewColorCircle,
                  { backgroundColor: item.color },
                ]}
              />
              <AtomicText type="bodySmall" color="secondary">
                {item.label}
              </AtomicText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    previewSection: {
      marginBottom: tokens.spacing.lg,
    },
    sectionTitle: {
      marginBottom: tokens.spacing.xs,
    },
    sectionDescription: {
      marginBottom: tokens.spacing.md,
    },
    previewContainer: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: tokens.colors.primary,
    },
    previewColorRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: tokens.spacing.md,
      marginTop: tokens.spacing.sm,
    },
    previewColorItem: {
      alignItems: "center",
    },
    previewColorCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginBottom: tokens.spacing.xs,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
  });
