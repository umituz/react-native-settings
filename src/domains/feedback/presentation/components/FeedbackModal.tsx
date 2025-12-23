/**
 * Feedback Modal Component
 * Modal wrapper for providing feedback
 */

import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResponsiveDesignTokens, AtomicText, AtomicIcon } from "@umituz/react-native-design-system";
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
    texts: any; // Type should ideally be shared or imported
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
    const tokens = useResponsiveDesignTokens();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.colors.backgroundPrimary }]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <View style={[styles.header, { borderBottomColor: tokens.colors.border }]}>
                        <View style={styles.headerText}>
                            <AtomicText type="headlineSmall" style={{ color: tokens.colors.textPrimary }}>
                                {title}
                            </AtomicText>
                            {subtitle && (
                                <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
                                    {subtitle}
                                </AtomicText>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.closeButton, { backgroundColor: tokens.colors.surface }]}
                        >
                            <AtomicIcon name="close" customSize={20} customColor={tokens.colors.textPrimary} />
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
        </Modal>
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
