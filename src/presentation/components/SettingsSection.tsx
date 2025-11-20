/**
 * Settings Section Component
 * Single Responsibility: Render a settings section with title and container
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

export interface SettingsSectionProps {
  /** Section title */
  title: string;
  /** Section content */
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;
  const spacing = tokens.spacing;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        {title}
      </Text>
      <View
        style={[
          styles.content,
          { backgroundColor: `${colors.textSecondary}10` },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 32,
  },
  title: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginBottom: 0,
  },
  content: {
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
});

