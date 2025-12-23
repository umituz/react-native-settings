/**
 * Appearance Screen
 *
 * Screen for managing appearance settings including theme mode and custom colors
 * Single Responsibility: Presentation orchestration only
 */

import React, { useMemo, useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useResponsiveDesignTokens } from "@umituz/react-native-design-system";
import { useAppearance, useAppearanceActions } from "../../hooks";
import {
  AppearanceHeader,
  ThemeModeSection,
  CustomColorsSection,
  AppearancePreview,
} from "../components";

import type { AppearanceTexts } from "../../types";

export interface AppearanceScreenProps {
  /** Texts for localization */
  texts?: AppearanceTexts;

  /**
   * Custom header component to override default header
   */
  headerComponent?: React.ReactNode;

  /**
   * Show/hide theme mode section
   */
  showThemeSection?: boolean;

  /**
   * Show/hide custom colors section
   */
  showColorsSection?: boolean;

  /**
   * Show/hide preview section
   */
  showPreviewSection?: boolean;

  /**
   * Custom container style
   */
  containerStyle?: any;

  /**
   * Custom content container style
   */
  contentContainerStyle?: any;
}

export const AppearanceScreen: React.FC<AppearanceScreenProps> = ({
  texts,
  headerComponent,
  showThemeSection = true,
  showColorsSection = true,
  showPreviewSection = true,
  containerStyle,
  contentContainerStyle,
}) => {
  const tokens = useResponsiveDesignTokens();
  const { themeMode } = useAppearance();
  const {
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  } = useAppearanceActions();

  // Memoize styles to prevent unnecessary re-creation
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  // Memoize header to prevent unnecessary re-renders
  const headerComponentMemo = useMemo(() => {
    return (
      headerComponent || (
        <AppearanceHeader
          tokens={tokens}
          title={texts?.title}
          subtitle={texts?.subtitle}
        />
      )
    );
  }, [headerComponent, tokens, texts?.title, texts?.subtitle]);

  // Stable callback for color change to prevent infinite re-renders
  const stableHandleColorChange = useCallback(
    (key: keyof typeof localCustomColors, color: string) => {
      handleColorChange(key, color);
    },
    [handleColorChange]
  );

  // Memoize sections to prevent unnecessary re-renders
  const themeSectionMemo = useMemo(() => {
    if (!showThemeSection) return null;

    // Construct themes from texts prop
    // This adheres to "Package Driven Design" where content is driven by the consumer (App)
    const themes = [];

    // We only add the theme option if the corresponding text config is provided
    if (texts?.lightMode) {
      themes.push({
        mode: 'light' as const,
        title: texts.lightMode.title,
        subtitle: texts.lightMode.subtitle,
        description: texts.lightMode.description,
        features: texts.lightMode.features
      });
    }

    if (texts?.darkMode) {
      themes.push({
        mode: 'dark' as const,
        title: texts.darkMode.title,
        subtitle: texts.darkMode.subtitle,
        description: texts.darkMode.description,
        features: texts.darkMode.features
      });
    }

    // If no texts provided, themes array is empty, section will return null.
    // This forces the consuming app to provide the texts.

    return (
      <ThemeModeSection
        tokens={tokens}
        themeMode={themeMode}
        onThemeSelect={handleThemeSelect}
        title={texts?.themeSectionTitle}
        description={texts?.themeSectionDescription}
        themes={themes.length > 0 ? themes : undefined}
      />
    );
  }, [
    showThemeSection,
    tokens,
    themeMode,
    handleThemeSelect,
    texts?.themeSectionTitle,
    texts?.themeSectionDescription,
    texts?.lightMode,
    texts?.darkMode,
  ]);

  const colorsSectionMemo = useMemo(() => {
    if (!showColorsSection) return null;

    return (
      <CustomColorsSection
        tokens={tokens}
        localCustomColors={localCustomColors}
        onColorChange={stableHandleColorChange}
        onResetColors={handleResetColors}
        title={texts?.colorsSectionTitle}
        description={texts?.colorsSectionDescription}
        resetButtonText={texts?.resetButtonText}
      />
    );
  }, [
    showColorsSection,
    tokens,
    localCustomColors,
    stableHandleColorChange,
    handleResetColors,
    texts?.colorsSectionTitle,
    texts?.colorsSectionDescription,
    texts?.resetButtonText,
  ]);

  const previewSectionMemo = useMemo(() => {
    if (!showPreviewSection) return null;

    return (
      <AppearancePreview
        tokens={tokens}
        localCustomColors={localCustomColors}
        title={texts?.previewSectionTitle}
        description={texts?.previewSectionDescription}
      />
    );
  }, [
    showPreviewSection,
    tokens,
    localCustomColors,
    texts?.previewSectionTitle,
    texts?.previewSectionDescription,
  ]);

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true} // Performance optimization for long lists
        scrollEventThrottle={16} // 60fps throttling
      >
        {headerComponentMemo}
        {themeSectionMemo}
        {colorsSectionMemo}
        {previewSectionMemo}
      </ScrollView>
    </View>
  );
};

const getStyles = (tokens: ReturnType<typeof useResponsiveDesignTokens>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.backgroundPrimary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
    },
  });
