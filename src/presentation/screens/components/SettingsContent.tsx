import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SettingsFooter } from "../../components/SettingsFooter";
import { SettingsSection } from "../../components/SettingsSection";
import { SettingsNavigationItem } from "../../components/SettingsNavigationItem";
import { DevSettingsSection } from "../../../domains/dev";
import { DisclaimerSetting } from "../../../domains/disclaimer";
import { ProfileSectionLoader } from "./sections/ProfileSectionLoader";
import { FeatureSettingsSection } from "./sections/FeatureSettingsSection";
import { IdentitySettingsSection } from "./sections/IdentitySettingsSection";
import { SupportSettingsSection } from "./sections/SupportSettingsSection";
import { CustomSettingsList } from "./sections/CustomSettingsList";
import { hasAnyFeaturesEnabled } from "./utils/featureChecker";
import { useGamification } from "../../../domains/gamification";
import type { SettingsContentProps } from "./types/SettingsContentProps";

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
  const { level } = useGamification(gamificationConfig);

  const hasAnyFeatures = useMemo(
    () => hasAnyFeaturesEnabled(features, customSections),
    [features, customSections]
  );

  const renderGamificationDescription = useCallback(
    (cfg: typeof normalizedConfig.gamification.config) => {
      return cfg?.description || `${level.currentLevel} • ${level.currentPoints}`;
    },
    [level.currentLevel, level.currentPoints]
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
          <SettingsNavigationItem
            config={normalizedConfig.subscription.config}
            defaultIcon="star"
          />
        </SettingsSection>
      )}

      {features.wallet && normalizedConfig.wallet.config?.route && (
        <SettingsNavigationItem
          config={normalizedConfig.wallet.config}
          defaultIcon="wallet"
        />
      )}

      <FeatureSettingsSection normalizedConfig={normalizedConfig} features={features} />

      {features.gamification && (
        <SettingsSection title={translations?.sections?.progress}>
          <SettingsNavigationItem
            config={normalizedConfig.gamification.config || {}}
            defaultIcon="trophy-outline"
            defaultRoute="Gamification"
            renderDescription={renderGamificationDescription}
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