/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */

import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsContent } from "./components/SettingsContent";
import { SettingsErrorBoundary } from "../components/SettingsErrorBoundary";
import { normalizeSettingsConfig } from "./utils/normalizeConfig";
import { useFeatureDetection } from "./hooks/useFeatureDetection";
import type { SettingsConfig, CustomSettingsSection } from "./types";

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
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  config = {},
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
  appVersion,
  customSections = [],
  showCloseButton = false,
  onClose,
  featureOptions,
}) => {
  const navigation = useNavigation();
  const { themeMode } = useDesignSystemTheme();
  const tokens = useAppDesignTokens();

  const isDark = themeMode === "dark";
  const colors = tokens.colors;

  const normalizedConfig = normalizeSettingsConfig(config);
  const features = useFeatureDetection(normalizedConfig, navigation, featureOptions);

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SettingsHeader showCloseButton={showCloseButton} onClose={onClose} />

      <SettingsErrorBoundary>
        <SettingsContent
          normalizedConfig={normalizedConfig}
          features={features}
          showUserProfile={showUserProfile}
          userProfile={userProfile}
          showFooter={showFooter}
          footerText={footerText}
          appVersion={appVersion}
          customSections={customSections}
          showCloseButton={showCloseButton}
        />
      </SettingsErrorBoundary>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
