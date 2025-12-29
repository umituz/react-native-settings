import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../../components/SettingsFooter";
import { SettingsSection } from "../../components/SettingsSection";
import { DevSettingsSection, DevSettingsProps } from "../../components/DevSettingsSection";
import { DisclaimerSetting } from "../../../domains/disclaimer";
import { ProfileSectionLoader } from "./sections/ProfileSectionLoader";
import { FeatureSettingsSection } from "./sections/FeatureSettingsSection";
import { IdentitySettingsSection } from "./sections/IdentitySettingsSection";
import { SupportSettingsSection } from "./sections/SupportSettingsSection";
import { SubscriptionSettingsSection } from "./sections/SubscriptionSettingsSection";
import { CustomSettingsList } from "./sections/CustomSettingsList";
import type { NormalizedConfig } from "../utils/normalizeConfig";
import type { CustomSettingsSection } from "../types";

interface SettingsContentProps {
  normalizedConfig: NormalizedConfig;
  config?: any;
  features: {
    appearance: boolean;
    language: boolean;
    notifications: boolean;
    about: boolean;
    legal: boolean;
    disclaimer: boolean;
    userProfile: boolean;
    feedback: boolean;
    rating: boolean;
    faqs: boolean;
    subscription: boolean;
  };
  showUserProfile?: boolean;
  userProfile?: any;
  showFooter?: boolean;
  footerText?: string;
  appVersion?: string;
  customSections?: CustomSettingsSection[];
  showCloseButton?: boolean;
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
    features.feedback ||
    features.rating ||
    features.faqs ||
    features.subscription ||
    customSections.length > 0,
    [features, customSections.length]
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: showCloseButton ? tokens.spacing.md : insets.top + tokens.spacing.md,
          paddingBottom: tokens.spacing.xxxl + tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.md,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {showUserProfile && <ProfileSectionLoader userProfile={userProfile} />}

      <CustomSettingsList customSections={customSections} />

      {features.subscription && (
        <SubscriptionSettingsSection config={normalizedConfig.subscription.config} />
      )}

      <FeatureSettingsSection normalizedConfig={normalizedConfig} features={features} />

      <IdentitySettingsSection normalizedConfig={normalizedConfig} features={features} />

      <SupportSettingsSection normalizedConfig={normalizedConfig} features={features} />

      {features.disclaimer && <DisclaimerSetting />}

      {!hasAnyFeatures && (
        <View style={styles.emptyContainer}>
          <SettingsSection title={config?.emptyStateText || t("settings.noOptionsAvailable")}>
            <View />
          </SettingsSection>
        </View>
      )}

      {devSettings && <DevSettingsSection {...devSettings} />}

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
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  emptyContainer: { paddingVertical: 24 },
});