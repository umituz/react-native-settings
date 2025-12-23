/**
 * Feedback Form Hook
 */

import { useState, useCallback } from 'react';
import type { FeedbackType, FeedbackRating } from '../../domain/entities/FeedbackEntity';

export interface FeedbackFormState {
  type: FeedbackType;
  title: string;
  description: string;
  rating?: FeedbackRating;
}

const initialState: FeedbackFormState = {
  type: 'general',
  title: '',
  description: '',
  rating: undefined,
};

export function useFeedbackForm(defaultValues?: Partial<FeedbackFormState>) {
  const [formState, setFormState] = useState<FeedbackFormState>({
    ...initialState,
    ...defaultValues,
  });

  const setType = useCallback((type: FeedbackType) => {
    setFormState((prev) => ({ ...prev, type }));
  }, []);

  const setTitle = useCallback((title: string) => {
    setFormState((prev) => ({ ...prev, title }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setFormState((prev) => ({ ...prev, description }));
  }, []);

  const setRating = useCallback((rating: FeedbackRating | undefined) => {
    setFormState((prev) => ({ ...prev, rating }));
  }, []);

  const reset = useCallback(() => {
    setFormState({ ...initialState, ...defaultValues });
  }, [defaultValues]);

  const isValid = formState.title.trim().length > 0 && formState.description.trim().length > 0;

  return {
    formState,
    setType,
    setTitle,
    setDescription,
    setRating,
    reset,
    isValid,
  };
}
