import { StyleSheet } from "react-native";
import type { useAppDesignTokens } from "@umituz/react-native-design-system";

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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        gap: 6,
    },
    ratingContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    stars: {
        flexDirection: "row",
        gap: 8,
    },
    starButton: {
        padding: 4,
    },
    inputContainer: {
        marginBottom: 24,
    },
    textArea: {
        textAlignVertical: "top",
        minHeight: 120,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    },
    errorText: {
        marginTop: 8,
    },
    submitButton: {
        width: "100%",
    },
});
