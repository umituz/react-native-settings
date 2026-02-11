import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { SettingsFooter } from "../../components/SettingsFooter";
import { SettingsSection } from "../../components/SettingsSection";
import { DevSettingsSection } from "../../../domains/dev";
import { DisclaimerSetting } from "../../../domains/disclaimer";
import { ProfileSectionLoader } from "./sections/ProfileSectionLoader";
import { FeatureSettingsSection } from "./sections/FeatureSettingsSection";
import { IdentitySettingsSection } from "./sections/IdentitySettingsSection";
import { SupportSettingsSection } from "./sections/SupportSettingsSection";
import { CustomSettingsList } from "./sections/CustomSettingsList";
import { hasAnyFeaturesEnabled } from "./utils/featureChecker";
import type { SettingsContentProps } from "./types/SettingsContentProps";

// Extracted Item Components
import { SubscriptionSettingsItem } from "./SubscriptionSettingsItem";
import { WalletSettingsItem } from "./WalletSettingsItem";
import { GamificationSettingsItem } from "./GamificationSettingsItem";
import { VideoTutorialSettingsItem } from "./VideoTutorialSettingsItem";

export const SettingsContent: React.FC<SettingsContentProps> = ({
  normalizedConfig,
  features,
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
  appVersion,
  customSections = [],
  emptyStateText,
  devSettings,
  gamificationConfig,
}) => {
  const translations = normalizedConfig.translations;
  const hasAnyFeatures = useMemo(
    () => hasAnyFeaturesEnabled(features, customSections),
    [features, customSections]
  );

  return (
    <View style={styles.container}>
      {showUserProfile && (
        <ProfileSectionLoader 
          userProfile={userProfile} 
          translations={translations?.profile}
        />
      )}

      <CustomSettingsList customSections={customSections} />

      {features.subscription && (normalizedConfig.subscription.config?.route || normalizedConfig.subscription.config?.onPress) && (
        <SettingsSection title={translations?.sections?.subscription}>
          <SubscriptionSettingsItem 
            config={normalizedConfig.subscription.config} 
          />
        </SettingsSection>
      )}

      {features.wallet && normalizedConfig.wallet.config?.route && (
        <WalletSettingsItem
          config={normalizedConfig.wallet.config}
        />
      )}

      <FeatureSettingsSection normalizedConfig={normalizedConfig} features={features} />

      {features.gamification && (
        <SettingsSection title={translations?.sections?.progress}>
          <GamificationSettingsItem
            config={normalizedConfig.gamification.config || {}}
            gamificationConfig={gamificationConfig}
            noBackground={true}
            hideMargin={true}
          />
        </SettingsSection>
      )}

      <IdentitySettingsSection normalizedConfig={normalizedConfig} features={features} />

      <SupportSettingsSection normalizedConfig={normalizedConfig} features={features} />

      {features.disclaimer && <DisclaimerSetting />}

      {!hasAnyFeatures && (
        <View style={styles.emptyContainer}>
          <SettingsSection title={emptyStateText || translations?.noOptionsAvailable}>
            <View />
          </SettingsSection>
        </View>
      )}

      {devSettings && <DevSettingsSection {...devSettings} />}

      {showFooter && (
        <SettingsFooter
          versionText={footerText}
          appVersion={appVersion}
          versionLabel={translations?.footer?.version}
        />
      )}
    </View>
  );
};

export const MemoizedSettingsContent = React.memo(SettingsContent, (prevProps, nextProps) => {
  return (
    prevProps.normalizedConfig === nextProps.normalizedConfig &&
    prevProps.features === nextProps.features &&
    prevProps.showUserProfile === nextProps.showUserProfile &&
    prevProps.userProfile === nextProps.userProfile &&
    prevProps.showFooter === nextProps.showFooter &&
    prevProps.footerText === nextProps.footerText &&
    prevProps.appVersion === nextProps.appVersion &&
    prevProps.customSections === nextProps.customSections &&
    prevProps.emptyStateText === nextProps.emptyStateText &&
    prevProps.devSettings === nextProps.devSettings &&
    prevProps.gamificationConfig === nextProps.gamificationConfig
  );
});

MemoizedSettingsContent.displayName = "MemoizedSettingsContent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  emptyContainer: { paddingVertical: 24 },
});