/**
 * Settings Screen Wrapper Component
 */
import React from "react";
import { SettingsScreen } from "../../../screens/SettingsScreen";
import type { SettingsConfig, CustomSettingsSection } from "../../../screens/types";
import type { UserProfileConfig } from "../../types";
import type { DevSettingsProps } from "../../../../domains/dev";

export interface SettingsScreenWrapperProps {
  config?: SettingsConfig;
  appVersion: string;
  showUserProfile: boolean;
  userProfile?: UserProfileConfig;
  devSettings?: DevSettingsProps;
  customSections?: CustomSettingsSection[];
  showHeader?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const SettingsScreenWrapper: React.FC<SettingsScreenWrapperProps> = ({
  config,
  appVersion,
  showUserProfile,
  userProfile,
  devSettings,
  customSections,
  showHeader,
  showCloseButton,
  onClose,
}) => (
  <SettingsScreen
    config={config}
    appVersion={appVersion}
    showUserProfile={showUserProfile}
    userProfile={userProfile}
    devSettings={devSettings}
    customSections={customSections}
    showHeader={showHeader}
    showCloseButton={showCloseButton}
    onClose={onClose}
  />
);
