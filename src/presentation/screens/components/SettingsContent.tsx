/**
 * Settings Content Component
 * Renders all settings sections and custom content
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../../components/SettingsFooter";
import { UserProfileHeader } from "../../components/UserProfileHeader";
import { SettingsSection } from "../../components/SettingsSection";
import { AppearanceSection } from "./AppearanceSection";
import { LanguageSection } from "./LanguageSection";
import { NotificationsSection } from "./NotificationsSection";
import { AboutLegalSection } from "./AboutLegalSection";
import type { NormalizedConfig } from "../utils/normalizeConfig";
import type { CustomSettingsSection } from "../types";

interface SettingsContentProps {
  normalizedConfig: NormalizedConfig;
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
    isGuest?: boolean;
    avatarUrl?: string;
    accountSettingsRoute?: string;
    onPress?: () => void;
    guestDisplayName?: string;
    avatarServiceUrl?: string;
  };
  showFooter?: boolean;
  footerText?: string;
  customSections?: CustomSettingsSection[];
  showCloseButton?: boolean;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({
  normalizedConfig,
  features,
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
  customSections = [],
  showCloseButton = false,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();

  const hasAnyFeatures =
    features.appearance ||
    features.language ||
    features.notifications ||
    features.about ||
    features.legal ||
    customSections.length > 0;

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
            isGuest={userProfile?.isGuest}
            avatarUrl={userProfile?.avatarUrl}
            accountSettingsRoute={userProfile?.accountSettingsRoute}
            onPress={userProfile?.onPress}
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