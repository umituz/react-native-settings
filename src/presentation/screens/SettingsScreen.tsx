/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */

import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useAppDesignTokens,
  ScreenLayout,
} from "@umituz/react-native-design-system";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsContent } from "./components/SettingsContent";
import { SettingsErrorBoundary } from "../components/SettingsErrorBoundary";
import { normalizeSettingsConfig } from "./utils/normalizeConfig";
import { useFeatureDetection } from "./hooks/useFeatureDetection";
import type { SettingsConfig, CustomSettingsSection } from "./types";
import type { DevSettingsProps } from "../../domains/dev";

export interface SettingsScreenProps {
  config?: SettingsConfig;
  /** Show user profile header */
  showUserProfile?: boolean;
  /** User profile props */
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
  /** Show footer with version */
  showFooter?: boolean;
  /** Custom footer text (overrides appVersion) */
  footerText?: string;
  /** App version number from app config (e.g., "1.0.0") */
  appVersion?: string;
  /** Custom sections to render */
  customSections?: CustomSettingsSection[];
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Custom close handler */
  onClose?: () => void;
  /** Feature detection options */
  featureOptions?: {
    notificationServiceAvailable?: boolean;
  };
  /** Dev settings (only shown in __DEV__ mode) */
  /** Show header (default: true) */
  showHeader?: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  config = {},
  showUserProfile,
  userProfile,
  showFooter = true,
  footerText,
  appVersion,
  customSections = [],
  showCloseButton = false,
  showHeader = true,
  onClose,
  featureOptions,
  devSettings,
}) => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();

  const normalizedConfig = normalizeSettingsConfig(config);
  const features = useFeatureDetection(normalizedConfig, navigation, featureOptions);

  // Determine if user profile should be shown (explicit prop takes priority, then config)
  const shouldShowUserProfile = showUserProfile ?? features.userProfile;

  return (
    <ScreenLayout
      header={showHeader ? <SettingsHeader showCloseButton={showCloseButton} onClose={onClose} /> : undefined}
    >
      <SettingsErrorBoundary>
        <SettingsContent
          normalizedConfig={normalizedConfig}
          features={features}
          showUserProfile={shouldShowUserProfile}
          userProfile={userProfile}
          showFooter={showFooter}
          footerText={footerText}
          appVersion={appVersion}
          customSections={customSections}
          showCloseButton={showCloseButton}
          devSettings={devSettings}
        />
      </SettingsErrorBoundary>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
