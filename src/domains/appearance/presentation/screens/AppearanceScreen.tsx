/**
 * Appearance Screen
 *
 * Screen for managing appearance settings including theme mode and custom colors.
 * Uses ScreenLayout from design system for consistent UI.
 */

import React, { useMemo, useCallback } from "react";
import { 
  ScreenLayout, 
  useAppDesignTokens,
  NavigationHeader,
  useAppNavigation
} from "@umituz/react-native-design-system";
import { useLocalization } from "../../../localization";
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
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
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

    const themes: ThemeOptionConfig[] = [
      {
        mode: "light",
        title: texts?.lightMode?.title ?? t("settings.appearance.lightMode.title"),
        subtitle: texts?.lightMode?.subtitle ?? t("settings.appearance.lightMode.subtitle"),
        description: texts?.lightMode?.description ?? t("settings.appearance.lightMode.description"),
        features: texts?.lightMode?.features,
        featuresTitle: texts?.featuresSectionTitle,
      },
      {
        mode: "dark",
        title: texts?.darkMode?.title ?? t("settings.appearance.darkMode.title"),
        subtitle: texts?.darkMode?.subtitle ?? t("settings.appearance.darkMode.subtitle"),
        description: texts?.darkMode?.description ?? t("settings.appearance.darkMode.description"),
        features: texts?.darkMode?.features,
        featuresTitle: texts?.featuresSectionTitle,
      },
    ];

    return (
      <ThemeModeSection
        tokens={tokens}
        themeMode={themeMode}
        onThemeSelect={handleThemeSelect}
        title={texts?.themeSectionTitle ?? t("settings.appearance.themeSectionTitle")}
        description={texts?.themeSectionDescription ?? t("settings.appearance.themeSectionDescription")}
        themes={themes}
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
    texts?.featuresSectionTitle,
    t,
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
    <ScreenLayout 
      hideScrollIndicator
      header={
        <NavigationHeader 
          title={t("settings.appearance.title")} 
          onBackPress={() => navigation.goBack()} 
        />
      }
    >
      {headerComponentMemo}
      {themeSectionMemo}
      {colorsSectionMemo}
      {previewSectionMemo}
    </ScreenLayout>
  );
};
