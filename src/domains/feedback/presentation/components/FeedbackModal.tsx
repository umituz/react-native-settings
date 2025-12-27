/**
 * Feedback Modal Component
 * Modal wrapper for providing feedback
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDesignTokens, AtomicText, AtomicIcon, BaseModal } from "@umituz/react-native-design-system";
import { FeedbackForm } from "./FeedbackForm";
import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";

export interface FeedbackModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { type: FeedbackType; rating: FeedbackRating; description: string; title: string }) => Promise<void>;
    initialType?: FeedbackType;
    isSubmitting?: boolean;
    title?: string;
    subtitle?: string;
    texts: any;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialType,
    isSubmitting,
    title,
    subtitle,
    texts,
}) => {
    const tokens = useAppDesignTokens();

    return (
        <BaseModal visible={visible} onClose={onClose}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <View style={[styles.header, { borderBottomColor: tokens.colors.border }]}>
                        <View style={styles.headerText}>
                            <AtomicText type="headlineSmall" color="textPrimary">
                                {title}
                            </AtomicText>
                            {subtitle && (
                                <AtomicText type="bodySmall" color="textSecondary" style={{ marginTop: 4 }}>
                                    {subtitle}
                                </AtomicText>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.closeButton, { backgroundColor: tokens.colors.surfaceVariant }]}
                        >
                            <AtomicIcon name="close" size="sm" color="onSurface" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.content}
                        keyboardShouldPersistTaps="handled"
                    >
                        <FeedbackForm
                            onSubmit={onSubmit}
                            initialType={initialType}
                            isSubmitting={isSubmitting}
                            texts={texts}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </BaseModal>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
    },
    headerText: {
        flex: 1,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 20,
    },
});
