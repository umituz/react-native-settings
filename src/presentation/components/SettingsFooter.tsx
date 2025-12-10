/**
 * Settings Footer Component
 * Single Responsibility: Display app version information
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

export interface SettingsFooterProps {
  /** Custom version text (optional) */
  versionText?: string;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
  versionText,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;

  const displayText =
    versionText ||
    `${t("settings.about.version")} ${t("settings.about.versionNumber")}`;

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

