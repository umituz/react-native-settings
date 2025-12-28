/**
 * Appearance Header Component
 * Single Responsibility: Render appearance screen header
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import type { DesignTokens } from "@umituz/react-native-design-system";

export interface AppearanceHeaderProps {
  tokens: DesignTokens;
  title?: string;
  subtitle?: string;
  titleType?: "headlineLarge" | "headlineMedium" | "headlineSmall";
  subtitleType?: "bodyLarge" | "bodyMedium" | "bodySmall";
  titleColor?: "primary" | "secondary" | "tertiary";
  subtitleColor?: "primary" | "secondary" | "tertiary";
  style?: any;
}

export const AppearanceHeader: React.FC<AppearanceHeaderProps> = ({
  tokens,
  title,
  subtitle,
  titleType = "headlineLarge",
  subtitleType = "bodyMedium",
  titleColor = "primary",
  subtitleColor = "secondary",
  style,
}) => {
  // Don't render anything if there's no content
  if (!title && !subtitle) {
    return null;
  }

  const styles = getStyles(tokens);

  return (
    <View style={[styles.header, style]}>
      {title ? (
        <AtomicText type={titleType} color={titleColor}>
          {title}
        </AtomicText>
      ) : null}
      {subtitle ? (
        <AtomicText
          type={subtitleType}
          color={subtitleColor}
          style={styles.headerSubtitle}
        >
          {subtitle}
        </AtomicText>
      ) : null}
    </View>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    header: {
      marginBottom: tokens.spacing.lg,
    },
    headerSubtitle: {
      marginTop: tokens.spacing.sm,
    },
  });
