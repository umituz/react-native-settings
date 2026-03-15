/**
 * Theme Option Component
 *
 * Theme mode selection option (Light/Dark)
 * Single Responsibility: Render theme option UI
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ThemeMode } from "../../types";

interface ThemeOptionProps {
  mode: ThemeMode;
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  featuresTitle?: string;
  isSelected: boolean;
  onSelect: () => void;
}

// Valid theme modes for validation
const VALID_THEME_MODES: readonly ThemeMode[] = ["light", "dark", "auto"];

// Utility function to add opacity to hex color
const addOpacityToHex = (hexColor: string, opacity: string): string => {
  // Remove # if present
  const color = hexColor.replace("#", "");
  return `#${color}${opacity}`;
};

export const ThemeOption: React.FC<ThemeOptionProps> = React.memo(({
  mode,
  title,
  subtitle,
  description,
  features,
  featuresTitle,
  isSelected,
  onSelect,
}) => {
  const tokens = useAppDesignTokens();

  // Memoize styles to prevent unnecessary re-creation
  const styles = useMemo(() => getStyles(tokens), [tokens]);


  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onSelect}
      accessibilityLabel={`${title} theme ${isSelected ? 'selected' : 'not selected'}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <AtomicText type="titleLarge" color="primary">
            {title}
          </AtomicText>
          {subtitle ? (
            <AtomicText type="bodyMedium" color="secondary">
              {subtitle}
            </AtomicText>
          ) : null}
        </View>
        <AtomicIcon
          name={isSelected ? "checkmark-circle-outline" : "ellipse-outline"}
          customSize={24}
          customColor={isSelected ? tokens.colors.primary : tokens.colors.secondary}
        />
      </View>

      {description ? (
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={styles.description}
        >
          {description}
        </AtomicText>
      ) : null}

      {features && features.length > 0 ? (
        <View style={styles.featuresContainer}>
          {featuresTitle ? (
            <AtomicText
              type="labelLarge"
              color="primary"
              style={styles.featuresTitle}
            >
              {featuresTitle}
            </AtomicText>
          ) : null}
          {features.map((feature) => (
            <AtomicText
              key={feature}
              type="bodySmall"
              color="secondary"
              style={styles.feature}
            >
              • {feature}
            </AtomicText>
          ))}
        </View>
      ) : null}
    </TouchableOpacity>
  );
});

ThemeOption.displayName = "ThemeOption";

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 2,
      borderColor: tokens.colors.border,
    },
    selectedContainer: {
      borderColor: tokens.colors.primary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    textContainer: {
      flex: 1,
    },
    description: {
      marginBottom: 12,
      lineHeight: 20,
    },
    featuresContainer: {
      backgroundColor: addOpacityToHex(tokens.colors.primary, "08"),
      borderRadius: 8,
      padding: 12,
    },
    featuresTitle: {
      marginBottom: 8,
    },
    feature: {
      marginBottom: 4,
      lineHeight: 18,
    },
  });
