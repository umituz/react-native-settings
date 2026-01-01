import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../../components/SettingsFooter";
import { SettingsSection } from "../../components/SettingsSection";
import { DevSettingsSection, DevSettingsProps } from "../../components/DevSettingsSection";
import { DisclaimerSetting } from "../../../domains/disclaimer";
import { ProfileSectionLoader } from "./sections/ProfileSectionLoader";
import { FeatureSettingsSection } from "./sections/FeatureSettingsSection";
import { IdentitySettingsSection } from "./sections/IdentitySettingsSection";
import { SupportSettingsSection } from "./sections/SupportSettingsSection";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
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
    <View style={styles.container}>
      {showUserProfile && <ProfileSectionLoader userProfile={userProfile} />}

      <CustomSettingsList customSections={customSections} />

      {features.subscription && normalizedConfig.subscription.config?.onPress && (
        <SettingsItemCard
          title={normalizedConfig.subscription.config.title || t("settings.subscription.title")}
          description={normalizedConfig.subscription.config.description || t("settings.subscription.description")}
          icon={(normalizedConfig.subscription.config.icon || "star") as IconName}
          onPress={normalizedConfig.subscription.config.onPress}
          sectionTitle={normalizedConfig.subscription.config.sectionTitle}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  emptyContainer: { paddingVertical: 24 },
});