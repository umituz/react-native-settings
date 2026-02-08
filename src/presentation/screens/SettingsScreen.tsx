/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */

import React from "react";
import {
  ScreenLayout,
  useAppNavigation,
} from "@umituz/react-native-design-system";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsContent } from "./components/SettingsContent";
import { normalizeSettingsConfig } from "./utils/normalizeConfig";
import { useFeatureDetection } from "./hooks/useFeatureDetection";
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

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  children,
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
  gamificationConfig,
}) => {
  const navigation = useAppNavigation();

  // Memoize config normalization to prevent unnecessary recalculations
  const normalizedConfig = React.useMemo(
    () => normalizeSettingsConfig(config),
    [config]
  );

  // Feature detection hook (must be called at top level)
  const detectedFeatures = useFeatureDetection(normalizedConfig, navigation, featureOptions);

  // Memoize features to prevent unnecessary recalculations
  const features = React.useMemo(
    () => detectedFeatures,
    [detectedFeatures]
  );

  // Determine if user profile should be shown (explicit prop takes priority, then config)
  const shouldShowUserProfile = showUserProfile ?? features.userProfile;

  // Workaround: Use conditional rendering with type assertion
  if (showHeader) {
    return <ScreenLayout header={<SettingsHeader showCloseButton={showCloseButton} onClose={onClose} />}>
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
    </ScreenLayout>;
  }

  return <ScreenLayout>
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
  </ScreenLayout>;
};
