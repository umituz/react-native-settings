/**
 * Environment Variables Viewer Screen
 * Displays environment configuration for debugging
 * DEV-only feature with hardcoded English text
 */

import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  AtomicTouchable,
  useAppDesignTokens,
  useSafeAreaInsets,
  AppNavigation,
  AlertService,
  NavigationHeader,
} from "@umituz/react-native-design-system";
import * as Clipboard from "expo-clipboard";
import type { EnvConfig } from "../../types";

export interface EnvViewerScreenProps {
  /** Environment configuration */
  config: EnvConfig;
}

export const EnvViewerScreen: React.FC<EnvViewerScreenProps> = ({ config }) => {
  const tokens = useAppDesignTokens();
  const { bottom } = useSafeAreaInsets();
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  const toggleReveal = (key: string) => {
    setRevealedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (value: string, key: string) => {
    try {
      await Clipboard.setStringAsync(value);
      AlertService.createSuccessAlert("Copied", `${key} copied to clipboard`);
    } catch {
      AlertService.createErrorAlert("Error", "Failed to copy to clipboard");
    }
  };

  const renderVariable = (item: typeof config.variables[0]) => {
    const isRevealed = revealedKeys.has(item.key);
    const displayValue = item.sensitive && !isRevealed ? "••••••••" : item.value;

    return (
      <View
        key={item.key}
        style={[
          styles.variableCard,
          { backgroundColor: tokens.colors.surfaceSecondary, borderRadius: tokens.borders.radius.md },
        ]}
      >
        <View style={styles.variableHeader}>
          <AtomicText type="labelLarge" color="textPrimary">
            {item.key}
          </AtomicText>
          <View style={styles.actions}>
            {item.sensitive && (
              <AtomicTouchable onPress={() => toggleReveal(item.key)}>
                <AtomicIcon
                  name={isRevealed ? "eye-off" : "eye"}
                  size="sm"
                  color="textSecondary"
                />
              </AtomicTouchable>
            )}
            <AtomicTouchable onPress={() => copyToClipboard(item.value, item.key)}>
              <AtomicIcon
                name="copy"
                size="sm"
                color="textSecondary"
                style={{ marginLeft: tokens.spacing.sm }}
              />
            </AtomicTouchable>
          </View>
        </View>
        <AtomicText type="bodyMedium" color="textSecondary" style={{ marginTop: tokens.spacing.xs }}>
          {displayValue}
        </AtomicText>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <NavigationHeader title="Environment Variables" onBackPress={() => AppNavigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + tokens.spacing.lg }}
      >
        {config.environmentName && (
          <View style={[styles.infoCard, { backgroundColor: tokens.colors.surfaceSecondary }]}>
            <AtomicText type="labelSmall" color="textSecondary">
              Environment
            </AtomicText>
            <AtomicText type="titleMedium" color="textPrimary">
              {config.environmentName}
            </AtomicText>
          </View>
        )}

        {config.version && (
          <View style={[styles.infoCard, { backgroundColor: tokens.colors.surfaceSecondary }]}>
            <AtomicText type="labelSmall" color="textSecondary">
              Version
            </AtomicText>
            <AtomicText type="titleMedium" color="textPrimary">
              {config.version}
              {config.buildNumber && ` (${config.buildNumber})`}
            </AtomicText>
          </View>
        )}

        <View style={styles.section}>
          <AtomicText type="titleMedium" color="textPrimary" style={{ marginBottom: tokens.spacing.md }}>
            Configuration
          </AtomicText>
          {config.variables.map(renderVariable)}
        </View>

        <View style={[styles.warningCard, { backgroundColor: tokens.colors.errorContainer }]}>
          <AtomicIcon name="alert-circle" size="sm" color="error" />
          <AtomicText
            type="bodySmall"
            color="error"
            style={{ marginLeft: tokens.spacing.sm, flex: 1 }}
          >
            This screen is only visible in development mode. Never share sensitive values.
          </AtomicText>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    padding: 16,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 12,
  },
  section: {
    padding: 20,
  },
  variableCard: {
    padding: 16,
    marginBottom: 12,
  },
  variableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  warningCard: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    alignItems: "flex-start",
  },
});
