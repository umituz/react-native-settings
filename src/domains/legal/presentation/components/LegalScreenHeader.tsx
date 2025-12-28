/**
 * Legal Screen Header Component
 * 
 * Displays title and description for legal screen.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";

interface LegalScreenHeaderProps {
  title?: string;
  description?: string;
}

export const LegalScreenHeader: React.FC<LegalScreenHeaderProps> = React.memo(({
  title,
  description,
}) => {
  const tokens = useAppDesignTokens();

  if (!title) return null;

  return (
    <View style={[styles.header, { paddingBottom: tokens.spacing.lg, paddingTop: tokens.spacing.md }]}>
      <AtomicText type="headlineLarge" color="textPrimary">
        {title}
      </AtomicText>
      {description && (
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={[styles.subtitle, { marginTop: tokens.spacing.xs }]}
        >
          {description}
        </AtomicText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {},
  subtitle: {},
});
