/**
 * Settings Content Component
 * Renders all settings sections and custom content
 */

import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../../components/SettingsFooter";
import { UserProfileHeader } from "../../components/UserProfileHeader";
import { SettingsSection } from "../../components/SettingsSection";
import { NotificationsSection } from "@umituz/react-native-notifications";
import { AboutSection } from "@umituz/react-native-about";
import { LegalSection } from "@umituz/react-native-legal";
import { AppearanceSection } from "@umituz/react-native-appearance";
import { LanguageSection } from "@umituz/react-native-localization";
import type { NormalizedConfig } from "../utils/normalizeConfig";
import type { CustomSettingsSection } from "../types";

interface SettingsContentProps {
  normalizedConfig: NormalizedConfig;
  config?: any; // Original config for emptyStateText
  features: {
    appearance: boolean;
    language: boolean;
    notifications: boolean;
    about: boolean;
    legal: boolean;
  };
  showUserProfile?: boolean;
  userProfile?: {
    displayName?: string;
    userId?: string;
    isAnonymous?: boolean;
    avatarUrl?: string;
    accountSettingsRoute?: string;
    onPress?: () => void;
    anonymousDisplayName?: string;
    avatarServiceUrl?: string;
  };
  showFooter?: boolean;
  footerText?: string;
  appVersion?: string;
  customSections?: CustomSettingsSection[];
  showCloseButton?: boolean;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({
  normalizedConfig,
  config,
  features,
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
  appVersion,
  customSections = [],
  showCloseButton = false,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();

  const hasAnyFeatures = useMemo(() =>
    features.appearance ||
    features.language ||
    features.notifications ||
    features.about ||
    features.legal ||
    customSections.length > 0,
    [features, customSections.length]
  );

  const sortedSections = useMemo(() => {
    return Array.from(customSections)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [customSections]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: showCloseButton ? tokens.spacing.md : insets.top + tokens.spacing.md,
          paddingBottom: tokens.spacing.xxxl + tokens.spacing.xl,
          paddingHorizontal: 0,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {showUserProfile && (
        <View style={styles.profileContainer}>
          <UserProfileHeader
            displayName={userProfile?.displayName}
            userId={userProfile?.userId}
            isAnonymous={userProfile?.isAnonymous}
            avatarUrl={userProfile?.avatarUrl}
            accountSettingsRoute={userProfile?.accountSettingsRoute}
            onPress={userProfile?.onPress}
            anonymousDisplayName={userProfile?.anonymousDisplayName}
            avatarServiceUrl={userProfile?.avatarServiceUrl}
          />
        </View>
      )}

      {features.appearance && (
        <AppearanceSection config={normalizedConfig.appearance.config} />
      )}

      {features.language && (
        <LanguageSection config={normalizedConfig.language.config} />
      )}

      {features.notifications && (
        <NotificationsSection config={normalizedConfig.notifications.config} />
      )}

      {features.about && (
        <AboutSection config={normalizedConfig.about.config} />
      )}

      {features.legal && (
        <LegalSection config={normalizedConfig.legal.config} />
      )}

      {customSections && customSections.length > 0 && (
        <>
          {sortedSections.map((section, index) => (
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
            title={config?.emptyStateText || t("settings.noOptionsAvailable") || "No settings available"}
          >
            <View />
          </SettingsSection>
        </View>
      )}

      {showFooter && <SettingsFooter versionText={footerText} appVersion={appVersion} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileContainer: {
    marginBottom: 32,
    paddingHorizontal: 0,
  },
  emptyContainer: {
    paddingVertical: 24,
  },
});