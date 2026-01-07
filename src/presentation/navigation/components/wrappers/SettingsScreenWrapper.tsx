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
}

export const SettingsScreenWrapper: React.FC<SettingsScreenWrapperProps> = ({
  config,
  appVersion,
  showUserProfile,
  userProfile,
  devSettings,
  customSections,
}) => (
  <SettingsScreen
    config={config}
    appVersion={appVersion}
    showUserProfile={showUserProfile}
    userProfile={userProfile}
    devSettings={devSettings}
    customSections={customSections}
  />
);
