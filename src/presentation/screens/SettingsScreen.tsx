/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */

import React from "react";
import {
  ScreenLayout,
  useAppNavigation,
} from "@umituz/react-native-design-system";
import { useSettingsScreen } from "./hooks/useSettingsScreen";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsContent } from "./components/SettingsContent";
import type { SettingsConfig, CustomSettingsSection } from "./types";
import type { DevSettingsProps } from "../../domains/dev";

export interface SettingsScreenProps {
  children?: React.ReactNode;
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
  devSettings?: DevSettingsProps;
  /** Gamification configuration */
  gamificationConfig?: import("../../domains/gamification").GamificationSettingsConfig;
  /** Show header (default: true) */
  showHeader?: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
  const {
    children,
    config = {},
    showUserProfile,
    userProfile,
    showFooter = true,
    footerText,
    appVersion: providedVersion,
    customSections = [],
    showCloseButton = false,
    showHeader = true,
    onClose,
    featureOptions,
    devSettings,
    gamificationConfig,
  } = props;

  const {
    normalizedConfig,
    features,
    shouldShowUserProfile,
    appVersion,
    handleClose,
  } = useSettingsScreen({
    config,
    showUserProfile,
    featureOptions,
    appVersion: providedVersion,
    onClose,
  });

  const header = showHeader ? (
    <SettingsHeader showCloseButton={showCloseButton} onClose={handleClose} />
  ) : undefined;

  return (
    <ScreenLayout header={header}>
      {children ?? (
        <SettingsContent
          normalizedConfig={normalizedConfig}
          features={features}
          showUserProfile={shouldShowUserProfile}
          userProfile={userProfile}
          showFooter={showFooter}
          footerText={footerText}
          appVersion={appVersion}
          customSections={customSections}
          devSettings={devSettings}
          gamificationConfig={gamificationConfig}
        />
      )}
    </ScreenLayout>
  );
};
