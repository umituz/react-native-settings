/**
 * Theme Mode Section Component
 * Single Responsibility: Render theme mode selection section
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import { ThemeOption } from "./ThemeOption";
import type { DesignTokens } from "@umituz/react-native-design-system";
import type { ThemeMode } from "../../types";

export interface ThemeOptionConfig {
  mode: ThemeMode;
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  featuresTitle?: string;
}

export interface ThemeModeSectionProps {
  tokens: DesignTokens;
  themeMode: ThemeMode;
  onThemeSelect: (mode: ThemeMode) => void;
  title?: string;
  description?: string;
  themes?: ThemeOptionConfig[];
}

export const ThemeModeSection: React.FC<ThemeModeSectionProps> = ({
  tokens,
  themeMode,
  onThemeSelect,
  title,
  description,
  themes,
}) => {
  // Memoize styles to prevent unnecessary re-creation
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  // Stable callback for theme selection to prevent infinite re-renders
  const handleThemeSelect = useCallback((mode: ThemeMode) => {
    try {
      onThemeSelect(mode);
    } catch {
      // Silent error handling
    }
  }, [onThemeSelect]);

  // Memoize theme options
  const themeOptions = useMemo(() => {
    // If no themes provided, we shouldn't render anything or maybe we assume the parent MUST provide them.
    // To be safe and "Package Driven", we require the consumer to provide the content.
    if (!themes || themes.length === 0) return null;

    return themes.map((theme) => (
      <ThemeOption
        key={theme.mode}
        mode={theme.mode}
        title={theme.title}
        subtitle={theme.subtitle}
        description={theme.description}
        features={theme.features}
        featuresTitle={theme.featuresTitle}
        isSelected={themeMode === theme.mode}
        onSelect={() => handleThemeSelect(theme.mode)}
      />
    ));
  }, [themes, themeMode, handleThemeSelect]);

  if (!themeOptions) return null;

  return (
    <View style={styles.section}>
      {!!title && (
        <AtomicText
          type="titleMedium"
          color="primary"
          style={styles.sectionTitle}
        >
          {title}
        </AtomicText>
      )}
      {!!description && (
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={styles.sectionDescription}
        >
          {description}
        </AtomicText>
      )}
      {themeOptions}
    </View>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    section: {
      marginBottom: tokens.spacing.xl,
    },
    sectionTitle: {
      marginBottom: tokens.spacing.xs,
    },
    sectionDescription: {
      marginBottom: tokens.spacing.md,
    },
  });
