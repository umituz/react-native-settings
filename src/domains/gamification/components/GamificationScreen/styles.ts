/**
 * GamificationScreen Styles
 */

import { StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system/theme";

export const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.backgroundPrimary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
    },
    header: {
      marginBottom: tokens.spacing.lg,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: tokens.colors.textPrimary,
    },
    section: {
      marginBottom: tokens.spacing.xl,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: tokens.spacing.md,
      color: tokens.colors.textPrimary,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: tokens.spacing.md,
    },
    emptyText: {
      fontSize: 14,
      textAlign: "center",
      paddingVertical: tokens.spacing.lg,
      color: tokens.colors.textSecondary,
    },
  });
