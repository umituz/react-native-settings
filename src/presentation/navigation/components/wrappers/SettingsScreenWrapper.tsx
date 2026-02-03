/**
 * Settings Screen Wrapper Component
 */
import React from "react";
import { SettingsScreen } from "../../../screens/SettingsScreen";

export interface SettingsScreenWrapperProps {
  config: any;
  appVersion: string;
  showUserProfile: boolean;
  userProfile: any;
  devSettings: any;
  customSections: any[];
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
