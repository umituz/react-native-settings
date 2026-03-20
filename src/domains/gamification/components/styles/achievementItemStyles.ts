/**
 * AchievementItem Styles
 */

import { StyleSheet } from 'react-native';
import type { DesignTokens } from "@umituz/react-native-design-system/theme";

export const createAchievementItemStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      marginBottom: tokens.spacing.sm,
      borderWidth: 1,
      borderColor: tokens.colors.borderLight,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      marginRight: tokens.spacing.md,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
      color: "inherit",
    },
    checkmark: {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    checkmarkText: {
      fontSize: 12,
      fontWeight: "bold",
    },
    description: {
      fontSize: 13,
      lineHeight: 18,
      color: "inherit",
    },
    progressContainer: {
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    progressBar: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 2,
    },
    progressText: {
      fontSize: 11,
      minWidth: 40,
      textAlign: "right",
      color: "inherit",
    },
  });
