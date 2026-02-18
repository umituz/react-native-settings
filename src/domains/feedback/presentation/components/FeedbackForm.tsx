/**
 * Feedback Form Component
 * Form for submitting user feedback with type, rating, and description
 */

import React, { useReducer } from "react";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicButton, AtomicIcon } from "@umituz/react-native-design-system";
import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";
import { validateFeedbackForm } from "../../../../infrastructure/utils/validation";
import type { FeedbackFormProps } from "./FeedbackFormProps";
import { getFeedbackFormStyles as getStyles } from "./FeedbackForm.styles";
import type { DesignTokens } from "@umituz/react-native-design-system";

interface FeedbackFormState {
    selectedType: FeedbackType;
    rating: FeedbackRating;
    description: string;
    title: string;
    error: string | null;
    isSubmittingLocal: boolean;
}

type FeedbackFormAction =
    | { type: 'SET_TYPE'; payload: FeedbackType }
    | { type: 'SET_RATING'; payload: FeedbackRating }
    | { type: 'SET_DESCRIPTION'; payload: string }
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_SUBMITTING'; payload: boolean }
    | { type: 'RESET_FORM'; payload: FeedbackRating };

function feedbackFormReducer(state: FeedbackFormState, action: FeedbackFormAction): FeedbackFormState {
    switch (action.type) {
        case 'SET_TYPE':
            return { ...state, selectedType: action.payload };
        case 'SET_RATING':
            return { ...state, rating: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload, error: null };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_SUBMITTING':
            return { ...state, isSubmittingLocal: action.payload };
        case 'RESET_FORM':
            return { ...state, description: "", title: "", rating: action.payload };
    }
}

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

interface FeedbackRatingSectionProps {
    rating: FeedbackRating;
    onRatingChange: (star: FeedbackRating) => void;
    ratingLabel: string;
    styles: ReturnType<typeof getStyles>;
    tokens: DesignTokens;
}

const FeedbackRatingSection: React.FC<FeedbackRatingSectionProps> = ({
    rating,
    onRatingChange,
    ratingLabel,
    styles,
    tokens,
}) => (
    <View style={styles.ratingContainer}>
        <AtomicText type="bodyMedium" style={{ marginBottom: 8, color: tokens.colors.textSecondary }}>
            {ratingLabel}
        </AtomicText>
        <View style={styles.stars}>
            {STAR_VALUES.map((star) => (
                <TouchableOpacity
                    key={star}
                    onPress={() => onRatingChange(star as FeedbackRating)}
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

interface FeedbackTypeSelectorProps {
    feedbackTypes: Array<{ type: FeedbackType; label: string }>;
    selectedType: FeedbackType;
    onTypeSelect: (type: FeedbackType) => void;
    styles: ReturnType<typeof getStyles>;
    tokens: DesignTokens;
}

const FeedbackTypeSelector: React.FC<FeedbackTypeSelectorProps> = ({
    feedbackTypes,
    selectedType,
    onTypeSelect,
    styles,
    tokens,
}) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeScroll}
        style={styles.typeContainer}
    >
        {feedbackTypes.map((item) => {
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
                    onPress={() => onTypeSelect(item.type)}
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

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
    onSubmit,
    texts,
    initialType,
    isSubmitting = false,
}) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);

    const [state, dispatch] = useReducer(feedbackFormReducer, {
        selectedType: initialType || texts.feedbackTypes[0].type,
        rating: 5,
        description: "",
        title: "",
        error: null,
        isSubmittingLocal: false,
    });

    const { selectedType, rating, description, title, error, isSubmittingLocal } = state;

    const handleSubmit = async () => {
        const validationResult = validateFeedbackForm({
            type: selectedType,
            rating,
            description,
        });

        if (!validationResult.isValid) {
            dispatch({ type: 'SET_ERROR', payload: validationResult.error || "Validation failed" });
            return;
        }

        dispatch({ type: 'SET_SUBMITTING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        try {
            await onSubmit({
                type: selectedType,
                rating,
                description,
                title: title || texts.defaultTitle(selectedType),
            });

            dispatch({ type: 'RESET_FORM', payload: 5 });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to submit feedback";
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
        } finally {
            dispatch({ type: 'SET_SUBMITTING', payload: false });
        }
    };

    return (
        <View style={styles.container}>
            <FeedbackTypeSelector
                feedbackTypes={texts.feedbackTypes}
                selectedType={selectedType}
                onTypeSelect={(type: FeedbackType) => dispatch({ type: 'SET_TYPE', payload: type })}
                styles={styles}
                tokens={tokens}
            />

            <FeedbackRatingSection
                rating={rating}
                onRatingChange={(star: FeedbackRating) => dispatch({ type: 'SET_RATING', payload: star })}
                ratingLabel={texts.ratingLabel}
                styles={styles}
                tokens={tokens}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={description}
                    onChangeText={(text) => {
                        dispatch({ type: 'SET_DESCRIPTION', payload: text });
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

