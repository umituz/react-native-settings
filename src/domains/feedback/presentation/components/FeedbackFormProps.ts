/**
 * FeedbackForm Props Types
 */

import type { FeedbackType, FeedbackRating } from "../../domain/entities/FeedbackEntity";

export interface FeedbackFormTexts {
    ratingLabel: string;
    descriptionPlaceholder: string;
    submitButton: string;
    submittingButton: string;
    feedbackTypes: Array<{ type: FeedbackType; label: string }>;
    defaultTitle: (type: FeedbackType) => string;
}

export interface FeedbackFormProps {
    onSubmit: (data: {
        type: FeedbackType;
        rating: FeedbackRating;
        description: string;
        title: string;
    }) => Promise<void>;
    texts: FeedbackFormTexts;
    initialType?: FeedbackType;
    isSubmitting?: boolean;
}
