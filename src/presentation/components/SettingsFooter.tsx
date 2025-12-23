/**
 * Settings Footer Component
 * Single Responsibility: Display app version information
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useResponsiveDesignTokens } from "@umituz/react-native-design-system";

export interface SettingsFooterProps {
  /** Custom version text (optional) - should include version number from app config */
  versionText?: string;
  /** App version number from app config (e.g., "1.0.0") */
  appVersion?: string;
  /** Label for version (e.g., "Version") */
  versionLabel?: string;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
  versionText,
  appVersion,
  versionLabel = "Version",
}) => {
  const tokens = useResponsiveDesignTokens();
  const colors = tokens.colors;

  // If versionText is provided, use it directly
  // Otherwise build from label + appVersion
  const displayText = versionText || (appVersion
    ? `${versionLabel} ${appVersion}`
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

