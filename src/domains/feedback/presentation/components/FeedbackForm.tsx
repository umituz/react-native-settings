/**
 * Feedback Form Component
 * Form for submitting user feedback with type, rating, and description
 */

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicButton, AtomicIcon } from "@umituz/react-native-design-system";
import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";

import { getFeedbackFormStyles as getStyles } from "./FeedbackForm.styles";

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
    const [error, setError] = useState<string | null>(null);
    const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

    const handleSubmit = async () => {
        // Validate input
        if (!description.trim()) {
            setError("Please provide a description");
            return;
        }

        setIsSubmittingLocal(true);
        setError(null);

        try {
            await onSubmit({
                type: selectedType,
                rating,
                description,
                title: title || texts.defaultTitle(selectedType),
            });

            // Clear form on success
            setDescription("");
            setTitle("");
            setRating(5);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to submit feedback";
            setError(errorMessage);
        } finally {
            setIsSubmittingLocal(false);
        }
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
                    onChangeText={(text) => {
                        setDescription(text);
                        setError(null); // Clear error on input
                    }}
                    placeholder={texts.descriptionPlaceholder}
                    placeholderTextColor={tokens.colors.textTertiary}
                    multiline
                    numberOfLines={4}
                    style={[
                        styles.textArea,
                        {
                            color: tokens.colors.textPrimary,
                            backgroundColor: tokens.colors.surface,
                            borderColor: error ? tokens.colors.error : tokens.colors.border,
                            fontSize: tokens.typography.bodyMedium.fontSize,
                        }
                    ]}
                />
                {error && (
                    <AtomicText
                        type="bodySmall"
                        color="error"
                        style={styles.errorText}
                    >
                        {error}
                    </AtomicText>
                )}
            </View>

            <AtomicButton
                onPress={handleSubmit}
                disabled={isSubmitting || isSubmittingLocal || !description.trim()}
                style={styles.submitButton}
            >
                {(isSubmitting || isSubmittingLocal) ? texts.submittingButton : texts.submitButton}
            </AtomicButton>
        </View>
    );
};

