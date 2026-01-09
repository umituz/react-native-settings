import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../../components/SettingsFooter";
import { SettingsSection } from "../../components/SettingsSection";
import { DevSettingsSection, DevSettingsProps } from "../../../domains/dev";
import { DisclaimerSetting } from "../../../domains/disclaimer";
import { ProfileSectionLoader } from "./sections/ProfileSectionLoader";
import { FeatureSettingsSection } from "./sections/FeatureSettingsSection";
import { IdentitySettingsSection } from "./sections/IdentitySettingsSection";
import { SupportSettingsSection } from "./sections/SupportSettingsSection";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import { CustomSettingsList } from "./sections/CustomSettingsList";
import type { NormalizedConfig } from "../utils/normalizeConfig";
import type { CustomSettingsSection, WalletConfig } from "../types";

const WalletSettingsItem: React.FC<{ config: WalletConfig; t: (key: string) => string }> = ({ config, t }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (config.route) {
      navigation.navigate(config.route as never);
    }
  };
  return (
    <SettingsItemCard
      title={config.title || t("wallet.title")}
      description={config.description || t("wallet.description")}
      icon={(config.icon || "wallet") as IconName}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
    />
  );
};

const SubscriptionSettingsItem: React.FC<{ config: any; t: (key: string) => string }> = ({ config, t }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (config.route) {
      navigation.navigate(config.route as never);
    } else if (config.onPress) {
      config.onPress();
    }
  };
  return (
    <SettingsItemCard
      title={config.title || t("settings.subscription.title")}
      description={config.description || t("settings.subscription.description")}
      icon={(config.icon || "star") as IconName}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
    />
  );
};

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
    wallet: boolean;
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
    features.wallet ||
    customSections.length > 0,
    [features, customSections.length]
  );

  return (
    <View style={styles.container}>
      {showUserProfile && <ProfileSectionLoader userProfile={userProfile} />}

      <CustomSettingsList customSections={customSections} />

      {features.subscription && (normalizedConfig.subscription.config?.route || normalizedConfig.subscription.config?.onPress) && (
        <SubscriptionSettingsItem config={normalizedConfig.subscription.config} t={t} />
      )}

      {features.wallet && normalizedConfig.wallet.config?.route && (
        <WalletSettingsItem
          config={normalizedConfig.wallet.config}
          t={t}
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