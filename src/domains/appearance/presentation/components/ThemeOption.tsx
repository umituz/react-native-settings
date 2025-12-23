/**
 * Theme Option Component
 *
 * Theme mode selection option (Light/Dark)
 * Single Responsibility: Render theme option UI
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system";
import { useResponsiveDesignTokens } from "@umituz/react-native-design-system";
import type { ThemeMode } from "../../types";

interface ThemeOptionProps {
  mode: ThemeMode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  isSelected: boolean;
  onSelect: () => void;
}

export const ThemeOption: React.FC<ThemeOptionProps> = ({
  mode,
  title,
  subtitle,
  description,
  features,
  isSelected,
  onSelect,
}) => {
  const tokens = useResponsiveDesignTokens();
  const styles = getStyles(tokens);
  const iconName = mode === "dark" ? "moon-outline" : mode === "light" ? "sunny-outline" : "desktop-outline";

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onSelect}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AtomicIcon name={iconName} customSize={24} customColor={tokens.colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <AtomicText type="titleLarge" color="primary">
            {title}
          </AtomicText>
          <AtomicText type="bodyMedium" color="secondary">
            {subtitle}
          </AtomicText>
        </View>
        <AtomicIcon
          name={isSelected ? "checkmark-circle-outline" : "ellipse-outline"}
          customSize={24}
          customColor={isSelected ? tokens.colors.primary : tokens.colors.secondary}
        />
      </View>

      <AtomicText
        type="bodyMedium"
        color="secondary"
        style={styles.description}
      >
        {description}
      </AtomicText>

      <View style={styles.featuresContainer}>
        <AtomicText
          type="labelLarge"
          color="primary"
          style={styles.featuresTitle}
        >
          Features
        </AtomicText>
        {features.map((feature, index) => (
          <AtomicText
            key={index}
            type="bodySmall"
            color="secondary"
            style={styles.feature}
          >
            • {feature}
          </AtomicText>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (tokens: ReturnType<typeof useResponsiveDesignTokens>) =>
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
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: `${tokens.colors.primary}15`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    description: {
      marginBottom: 12,
      lineHeight: 20,
    },
    featuresContainer: {
      backgroundColor: `${tokens.colors.primary}08`,
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
