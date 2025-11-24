/**
 * Appearance Settings Screen
 * Advanced appearance settings with theme customization and custom colors
 * Uses @umituz/react-native-appearance package
 */

import React from "react";
import { AppearanceScreen } from "@umituz/react-native-appearance";

export { AppearanceScreen };

const getStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.md,
    },
    headerSubtitle: {
      marginTop: tokens.spacing.xs,
    },
    sectionHeader: {
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.md,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: "600",
      fontSize: 12,
    },
  });
