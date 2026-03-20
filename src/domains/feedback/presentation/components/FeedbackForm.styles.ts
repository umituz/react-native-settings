import { StyleSheet } from "react-native";
import type { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { withAlpha } from "@umituz/react-native-design-system/theme";

export const getFeedbackFormStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
        width: "100%",
    },
    typeContainer: {
        marginBottom: 24,
    },
    typeScroll: {
        gap: 8,
    },
    typeButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1.5,
        marginRight: 10,
    },
    ratingContainer: {
        alignItems: "center",
        marginVertical: 32,
        paddingVertical: 16,
        backgroundColor: withAlpha(tokens.colors.primary, 0.05),
        borderRadius: 16,
    },
    ratingLabel: {
        fontSize: 12,
        fontWeight: "900",
        letterSpacing: 1,
        marginBottom: 16,
        textTransform: "uppercase",
        color: tokens.colors.textSecondary,
    },
    stars: {
        flexDirection: "row",
        gap: 12,
    },
    starButton: {
        padding: 4,
    },
    inputContainer: {
        marginBottom: 32,
    },
    textArea: {
        textAlignVertical: "top",
        minHeight: 140,
        borderWidth: 1.5,
        borderRadius: 16,
        padding: 16,
        fontSize: 15,
        color: tokens.colors.textPrimary,
        backgroundColor: tokens.colors.surfaceSecondary,
        borderColor: tokens.colors.border,
    },
    errorText: {
        marginTop: 8,
        fontWeight: "600",
        color: tokens.colors.error,
    },
    submitButton: {
        width: "100%",
        height: 56,
        borderRadius: 16,
    },
});
