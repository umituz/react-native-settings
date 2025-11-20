/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */

import React from "react";
import { View, ScrollView, StatusBar, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../components/SettingsFooter";
import { UserProfileHeader } from "../components/UserProfileHeader";
import { SettingsSection } from "../components/SettingsSection";
import { AppearanceSection } from "./components/AppearanceSection";
import { NotificationsSection } from "./components/NotificationsSection";
import { AboutLegalSection } from "./components/AboutLegalSection";
import { normalizeSettingsConfig } from "./utils/normalizeConfig";
import { useFeatureDetection } from "./hooks/useFeatureDetection";
import type { CustomSettingsSection } from "./types";

export interface SettingsScreenProps {
  config?: any;
  /** Show user profile header */
  showUserProfile?: boolean;
  /** User profile props */
  userProfile?: {
    displayName?: string;
    userId?: string;
    isGuest?: boolean;
    avatarUrl?: string;
    accountSettingsRoute?: string;
    onPress?: () => void;
  };
  /** Show footer with version */
  showFooter?: boolean;
  /** Custom footer text */
  footerText?: string;
  /** Custom sections to render */
  customSections?: CustomSettingsSection[];
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  config = {},
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
  customSections = [],
}) => {
  const navigation = useNavigation();
  const { themeMode } = useDesignSystemTheme();
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();

  const isDark = themeMode === "dark";
  const colors = tokens.colors;

  const normalizedConfig = normalizeSettingsConfig(config);
  const features = useFeatureDetection(normalizedConfig, navigation);

  const hasAnyFeatures =
    features.appearance ||
    features.notifications ||
    features.about ||
    features.legal ||
    customSections.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 16,
            paddingBottom: 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {showUserProfile && (
          <UserProfileHeader
            displayName={userProfile?.displayName}
            userId={userProfile?.userId}
            isGuest={userProfile?.isGuest}
            avatarUrl={userProfile?.avatarUrl}
            accountSettingsRoute={userProfile?.accountSettingsRoute}
            onPress={userProfile?.onPress}
          />
        )}

        {features.appearance && (
          <AppearanceSection config={normalizedConfig.appearance.config} />
        )}

        {features.notifications && (
          <NotificationsSection config={normalizedConfig.notifications.config} />
        )}

        {(features.about || features.legal) && (
          <AboutLegalSection
            showAbout={features.about}
            showLegal={features.legal}
            aboutConfig={normalizedConfig.about.config}
            legalConfig={normalizedConfig.legal.config}
          />
        )}

        {customSections && customSections.length > 0 && (
          <>
            {Array.from(customSections)
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((section, index) => (
                <SettingsSection
                  key={section.id || `custom-${index}`}
                  title={section.title}
                >
                  {section.content}
                </SettingsSection>
              ))}
          </>
        )}

        {!hasAnyFeatures && (
          <View style={styles.emptyContainer}>
            <SettingsSection
              title={t("settings.noOptionsAvailable") || "No settings available"}
            >
              <View />
            </SettingsSection>
          </View>
        )}

        {showFooter && <SettingsFooter versionText={footerText} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    paddingVertical: 24,
  },
});
