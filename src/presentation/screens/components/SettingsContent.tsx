/**
 * Settings Content Component
 * Renders all settings sections and custom content
 */

import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../../components/SettingsFooter";
import { ProfileSection } from "@umituz/react-native-auth";
import { SettingsSection } from "../../components/SettingsSection";
import { DevSettingsSection, DevSettingsProps } from "../../components/DevSettingsSection";
import { NotificationsSection } from "@umituz/react-native-notifications";
import { AboutSection } from "@umituz/react-native-about";
import { LegalSection } from "@umituz/react-native-legal";
import { AppearanceSection } from "@umituz/react-native-appearance";
import { LanguageSection } from "@umituz/react-native-localization";
import { SupportSection } from "@umituz/react-native-feedback";
import { SettingItem } from "../../components/SettingItem";
import type { NormalizedConfig } from "../utils/normalizeConfig";
import type { CustomSettingsSection } from "../types";

// Optional FAQ component
let FAQSection: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const module = require("@umituz/react-native-faqs");
  if (module?.FAQSection) {
    FAQSection = module.FAQSection;
  }
} catch {
  // Package not available
}

// Optional disclaimer component
let DisclaimerSetting: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const module = require("@umituz/react-native-disclaimer");
  if (module?.DisclaimerSetting) {
    DisclaimerSetting = module.DisclaimerSetting;
  }
} catch {
  // Package not available
}

// Optional subscription component
let SubscriptionSection: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const module = require("@umituz/react-native-subscription");
  if (module?.SubscriptionSection) {
    SubscriptionSection = module.SubscriptionSection;
  }
} catch {
  // Package not available
}

interface SettingsContentProps {
  normalizedConfig: NormalizedConfig;
  config?: any; // Original config for emptyStateText
  features: {
    appearance: boolean;
    language: boolean;
    notifications: boolean;
    about: boolean;
    legal: boolean;
    disclaimer: boolean;
    userProfile: boolean;
    subscription: boolean;
    feedback: boolean;
    rating: boolean;
    faqs: boolean;
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
  /** Dev settings (only shown in __DEV__ mode) */
  devSettings?: DevSettingsProps;
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
  devSettings,
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
    features.disclaimer ||
    features.subscription ||
    features.feedback ||
    features.rating ||
    features.faqs ||
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
          <ProfileSection
            profile={{
              displayName: userProfile?.displayName || t("settings.profile.guestName") || "Guest",
              userId: userProfile?.userId,
              isAnonymous: userProfile?.isAnonymous ?? true,
              avatarUrl: userProfile?.avatarUrl,
              accountSettingsRoute: userProfile?.accountSettingsRoute,
            }}
            onPress={userProfile?.onPress}
            onSignIn={userProfile?.onPress}
            signInText={t("auth.signIn") || "Sign In"}
            anonymousText={t("settings.profile.anonymousName") || "Guest"}
          />
        </View>
      )}

      {features.subscription &&
        SubscriptionSection &&
        normalizedConfig.subscription.config?.sectionConfig && (
          <SubscriptionSection
            config={normalizedConfig.subscription.config.sectionConfig}
          />
        )}

      {features.appearance && (
        <AppearanceSection
          config={{
            ...normalizedConfig.appearance.config,
            title:
              normalizedConfig.appearance.config?.title ||
              t("settings.appearance.title"),
            description:
              normalizedConfig.appearance.config?.description ||
              t("settings.appearance.description"),
          }}
          sectionTitle={t("settings.appearance.title")}
        />
      )}

      {features.language && (
        <LanguageSection
          config={{
            ...normalizedConfig.language.config,
            title: t("settings.languageSelection.title"),
            description:
              normalizedConfig.language.config?.description ||
              t("settings.languageSelection.description"),
          }}
          sectionTitle={t("settings.languageSelection.title")}
        />
      )}

      {features.notifications && (
        <NotificationsSection
          config={{
            ...normalizedConfig.notifications.config,
            title:
              normalizedConfig.notifications.config?.title ||
              t("settings.notifications.title"),
            description:
              normalizedConfig.notifications.config?.description ||
              t("settings.notifications.description"),
          }}
        />
      )}

      {features.about && (
        <AboutSection
          config={{
            ...normalizedConfig.about.config,
            title:
              normalizedConfig.about.config?.title ||
              t("settings.about.title"),
            description:
              normalizedConfig.about.config?.description ||
              t("settings.about.description"),
          }}
          sectionTitle={t("settings.about.title")}
        />
      )}

      {features.legal && (
        <LegalSection
          config={{
            ...normalizedConfig.legal.config,
            title:
              normalizedConfig.legal.config?.title ||
              t("settings.legal.title"),
            description:
              normalizedConfig.legal.config?.description ||
              t("settings.legal.description"),
          }}
          sectionTitle={t("settings.legal.title")}
        />
      )}

      {(features.feedback || features.rating) && (
        <SupportSection
          renderSection={(props: any) => <SettingsSection {...props} />}
          renderItem={(props: any) => <SettingItem {...props} />}
          feedbackConfig={{
            enabled: features.feedback,
            config: {
              ...normalizedConfig.feedback.config,
              title: normalizedConfig.feedback.config?.title || t("settings.support.title") || "Support",
              description: normalizedConfig.feedback.config?.description || t("settings.feedback.description") || "Send Feedback",
            }
          }}
          ratingConfig={{
            enabled: features.rating,
            config: {
              ...normalizedConfig.rating.config,
              title: normalizedConfig.rating.config?.title || t("settings.support.title") || "Support",
              description: normalizedConfig.rating.config?.description || t("settings.rating.description") || "Rate Us",
            }
          }}
        />
      )}

      {features.faqs && FAQSection && (
        <FAQSection
          renderSection={(props: any) => <SettingsSection {...props} />}
          renderItem={(props: any) => <SettingItem {...props} />}
          config={{
            enabled: features.faqs,
            ...normalizedConfig.faqs.config,
            title: normalizedConfig.faqs.config?.title || t("settings.support.title") || "Support",
            description: normalizedConfig.faqs.config?.description || t("settings.faqs.description") || "FAQs",
          }}
        />
      )}

      {features.disclaimer && DisclaimerSetting && (
        <DisclaimerSetting />
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

      {devSettings && (
        <DevSettingsSection
          enabled={devSettings.enabled}
          onAfterClear={devSettings.onAfterClear}
          texts={devSettings.texts}
        />
      )}

      {showFooter && (
        <SettingsFooter
          versionText={footerText}
          appVersion={appVersion}
          versionLabel={t("settings.footer.version")}
        />
      )}
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