/**
 * Appearance Settings Screen
 * Modern appearance settings with language and theme controls
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Languages, Moon, Sun } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
  type DesignTokens,
} from "@umituz/react-native-design-system-theme";
import { ScreenLayout } from "@umituz/react-native-design-system-organisms";
import { useLocalization, getLanguageByCode } from "@umituz/react-native-localization";
import { SettingItem } from "../components/SettingItem";
import { SettingsSection } from "../components/SettingsSection";

export const AppearanceScreen: React.FC = () => {
  const { t, currentLanguage } = useLocalization();
  const navigation = useNavigation();
  const { themeMode, setThemeMode } = useDesignSystemTheme();
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const currentLang = getLanguageByCode(currentLanguage);
  const languageDisplay = currentLang
    ? `${currentLang.flag} ${currentLang.nativeName}`
    : "English";
  const themeDisplay =
    themeMode === "dark" ? t("settings.darkMode") : t("settings.lightMode");

  const handleLanguagePress = () => {
    navigation.navigate("LanguageSelection" as never);
  };

  const handleThemeToggle = () => {
    const newMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newMode);
  };

  return (
    <ScreenLayout testID="appearance-screen" hideScrollIndicator>
      {/* Language Section */}
      <SettingsSection title={t("settings.language")}>
        <SettingItem
          icon={Languages}
          title={t("settings.language")}
          value={languageDisplay}
          onPress={handleLanguagePress}
        />
      </SettingsSection>

      {/* Theme Section */}
      <SettingsSection title={t("settings.appearance.darkMode")}>
        <SettingItem
          icon={themeMode === "dark" ? Moon : Sun}
          title={t("settings.appearance.darkMode")}
          value={themeDisplay}
          onPress={handleThemeToggle}
          isLast={true}
        />
      </SettingsSection>
    </ScreenLayout>
  );
};

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.md,
    },
    headerSubtitle: {
      marginTop: tokens.spacing.xs,
    },
    sectionHeader: {
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.md,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: "600",
      fontSize: 12,
    },
  });
