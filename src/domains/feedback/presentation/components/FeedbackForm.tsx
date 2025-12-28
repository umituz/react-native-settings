/**
 * Feedback Form Component
 * Form for submitting user feedback with type, rating, and description
 */

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicButton, AtomicIcon } from "@umituz/react-native-design-system";
import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";
import { useFeedbackForm } from "../hooks/useFeedbackForm";

export interface FeedbackFormProps {
    onSubmit: (data: { type: FeedbackType; rating: FeedbackRating; description: string; title: string }) => Promise<void>;
    texts: {
        ratingLabel: string;
        descriptionPlaceholder: string;
        submitButton: string;
        submittingButton: string;
        feedbackTypes: Array<{ type: FeedbackType; label: string }>;
        defaultTitle: (type: FeedbackType) => string;
    };
    initialType?: FeedbackType;
    isSubmitting?: boolean;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
    onSubmit,
    texts,
    initialType,
    isSubmitting = false,
}) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);
    const [selectedType, setSelectedType] = useState<FeedbackType>(initialType || texts.feedbackTypes[0].type);
    const [rating, setRating] = useState<FeedbackRating>(5);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const handleSubmit = async () => {
        if (!description.trim()) return;

        await onSubmit({
            type: selectedType,
            rating,
            description,
            title: title || texts.defaultTitle(selectedType),
        });
    };

    const renderRating = () => (
        <View style={styles.ratingContainer}>
            <AtomicText type="bodyMedium" style={{ marginBottom: 8, color: tokens.colors.textSecondary }}>
                {texts.ratingLabel}
            </AtomicText>
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => setRating(star as FeedbackRating)}
                        style={styles.starButton}
                    >
                        <AtomicIcon
                            name={star <= rating ? "star" : "star-outline"}
                            customSize={32}
                            customColor={star <= rating ? tokens.colors.warning : tokens.colors.border}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderTypeSelector = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeScroll}
            style={styles.typeContainer}
        >
            {texts.feedbackTypes.map((item) => {
                const isSelected = selectedType === item.type;

                return (
                    <TouchableOpacity
                        key={item.type}
                        style={[
                            styles.typeButton,
                            {
                                backgroundColor: isSelected ? tokens.colors.primary : tokens.colors.surface,
                                borderColor: isSelected ? tokens.colors.primary : tokens.colors.border,
                            },
                        ]}
                        onPress={() => setSelectedType(item.type)}
                    >
                        <AtomicText
                            type="bodySmall"
                            style={{
                                color: isSelected ? tokens.colors.onPrimary : tokens.colors.textSecondary,
                                fontWeight: isSelected ? "600" : "400",
                            }}
                        >
                            {item.label}
                        </AtomicText>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            {renderTypeSelector()}

            {renderRating()}

            <View style={styles.inputContainer}>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder={texts.descriptionPlaceholder}
                    placeholderTextColor={tokens.colors.textTertiary}
                    multiline
                    numberOfLines={4}
                    style={[
                        styles.textArea,
                        {
                            color: tokens.colors.textPrimary,
                            backgroundColor: tokens.colors.surface,
                            borderColor: tokens.colors.border,
                        }
                    ]}
                />
            </View>

            <AtomicButton
                onPress={handleSubmit}
                disabled={isSubmitting || !description.trim()}
                style={styles.submitButton}
            >
                {isSubmitting ? texts.submittingButton : texts.submitButton}
            </AtomicButton>
        </View>
    );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
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
        fontSize: tokens.typography.bodyMedium.fontSize,
    },
    submitButton: {
        width: "100%",
    },
});
