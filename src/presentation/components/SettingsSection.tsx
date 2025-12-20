/**
 * Settings Section Component
 * Single Responsibility: Render a settings section with title and container
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

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

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    borderRadius: 0,
  },
});

