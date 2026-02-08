/**
 * Feedback Modal Component
 * Modal wrapper for providing feedback
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon, BaseModal, ScreenLayout } from "@umituz/react-native-design-system";
import { FeedbackForm } from "./FeedbackForm";
import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";
import type { FeedbackFormProps } from "./FeedbackForm";

export interface FeedbackModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { type: FeedbackType; rating: FeedbackRating; description: string; title: string }) => Promise<void>;
    initialType?: FeedbackType;
    isSubmitting?: boolean;
    title?: string;
    subtitle?: string;
    texts: FeedbackFormProps['texts'];
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
    const styles = getStyles(tokens);

    return (
        <BaseModal visible={visible} onClose={onClose}>
            <ScreenLayout
                scrollable={true}
                edges={[]}
                keyboardAvoiding={true}
                contentContainerStyle={styles.content}
                hideScrollIndicator={false}
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

                <FeedbackForm
                    onSubmit={onSubmit}
                    initialType={initialType}
                    isSubmitting={isSubmitting}
                    texts={texts}
                />
            </ScreenLayout>
        </BaseModal>
    );
};


const getStyles = (_tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
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
