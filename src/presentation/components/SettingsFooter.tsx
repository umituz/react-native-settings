/**
 * Settings Footer Component
 * Single Responsibility: Display app version information
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

export interface SettingsFooterProps {
  /** Custom version text (optional) - should include version number from app config */
  versionText?: string;
  /** App version number from app config (e.g., "1.0.0") */
  appVersion?: string;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
  versionText,
  appVersion,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;

  // If versionText is provided, use it directly
  // Otherwise build from translated label + appVersion
  const displayText = versionText || (appVersion
    ? `${t("settings.footer.version")} ${appVersion}`
    : undefined);

  // Don't render if no version info available
  if (!displayText) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {displayText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

