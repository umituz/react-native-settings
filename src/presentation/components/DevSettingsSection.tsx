/**
 * Dev Settings Section Component
 * Only visible in __DEV__ mode
 * Provides development utilities like clearing storage
 *
 * NOTE: This component uses hardcoded English text since it's DEV-only
 * and doesn't need localization support.
 */

import React from "react";
import { Alert } from "react-native";
import { useResponsiveDesignTokens } from "@umituz/react-native-design-system";
import { storageRepository } from "@umituz/react-native-storage";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";

// Default texts (English only - DEV feature)
const DEFAULT_TEXTS = {
  sectionTitle: "Developer",
  clearTitle: "Clear All Data",
  clearDescription: "Reset app to initial state (DEV only)",
  confirmTitle: "Clear All Data?",
  confirmMessage: "This will clear all app data and reset to initial state. This action cannot be undone.",
  cancelButton: "Cancel",
  confirmButton: "Clear",
  successTitle: "Success",
  successMessage: "All data cleared. Restarting app...",
  errorTitle: "Error",
  errorMessage: "Failed to clear data",
};

export interface DevSettingsProps {
  /** Enable dev settings section (default: true in __DEV__ mode) */
  enabled?: boolean;
  /** Callback after storage is cleared - use this to reload the app and reset app state (e.g., onboarding) */
  onAfterClear?: () => Promise<void>;
  /** Custom texts (optional - defaults to English) */
  texts?: Partial<typeof DEFAULT_TEXTS>;
  /** Custom dev components to render BEFORE the "Clear All Data" button (e.g., OnboardingResetSetting) */
  customDevComponents?: React.ReactNode[];
}

export const DevSettingsSection: React.FC<DevSettingsProps> = ({
  enabled = true,
  onAfterClear,
  texts = {},
  customDevComponents = [],
}) => {
  const tokens = useResponsiveDesignTokens();

  // Merge custom texts with defaults
  const t = { ...DEFAULT_TEXTS, ...texts };

  // Only render in development mode and when enabled
  if (!__DEV__ || !enabled) {
    return null;
  }

  const handleClearData = () => {
    Alert.alert(
      t.confirmTitle,
      t.confirmMessage,
      [
        {
          text: t.cancelButton,
          style: "cancel",
        },
        {
          text: t.confirmButton,
          style: "destructive",
          onPress: async () => {
            try {
              // Clear all storage and check result
              const result = await storageRepository.clearAll();

              if (!result.success) {
                Alert.alert(t.errorTitle, t.errorMessage);
                return;
              }

              // If callback provided, call it (e.g., reload app)
              if (onAfterClear) {
                Alert.alert(t.successTitle, t.successMessage);
                // Small delay to show the alert before reload
                setTimeout(async () => {
                  await onAfterClear();
                }, 500);
              } else {
                Alert.alert(t.successTitle, "All data cleared successfully");
              }
            } catch {
              Alert.alert(t.errorTitle, t.errorMessage);
            }
          },
        },
      ]
    );
  };

  return (
    <SettingsSection title={t.sectionTitle}>
      {customDevComponents.map((component) => component)}
      <SettingItem
        icon="trash-outline"
        title={t.clearTitle}
        value={t.clearDescription}
        onPress={handleClearData}
        iconColor={tokens.colors.error}
        titleColor={tokens.colors.error}
        isLast={true}
      />
    </SettingsSection>
  );
};
