/**
 * Appearance Screen
 *
 * Screen for managing appearance settings including theme mode and custom colors.
 * Uses ScreenLayout from design system for consistent UI.
 */

import React, { useMemo, useCallback } from "react";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useAppearance, useAppearanceActions } from "../../hooks";
import {
  AppearanceHeader,
  ThemeModeSection,
  CustomColorsSection,
  AppearancePreview,
  type ThemeOptionConfig,
} from "../components";
import type { AppearanceTexts } from "../../types";

export interface AppearanceScreenProps {
  texts?: AppearanceTexts;
  headerComponent?: React.ReactNode;
  showThemeSection?: boolean;
  showColorsSection?: boolean;
  showPreviewSection?: boolean;
}

export const AppearanceScreen: React.FC<AppearanceScreenProps> = ({
  texts,
  headerComponent,
  showThemeSection = true,
  showColorsSection = true,
  showPreviewSection = true,
}) => {
  const tokens = useAppDesignTokens();
  const { themeMode } = useAppearance();
  const {
    localCustomColors,
    handleThemeSelect,
    handleColorChange,
    handleResetColors,
  } = useAppearanceActions();

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

  const stableHandleColorChange = useCallback(
    (key: keyof typeof localCustomColors, color: string) => {
      handleColorChange(key, color);
    },
    [handleColorChange]
  );

  const themeSectionMemo = useMemo(() => {
    if (!showThemeSection) return null;

    const themes: ThemeOptionConfig[] = [];

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
    <ScreenLayout hideScrollIndicator>
      {headerComponentMemo}
      {themeSectionMemo}
      {colorsSectionMemo}
      {previewSectionMemo}
    </ScreenLayout>
  );
};
