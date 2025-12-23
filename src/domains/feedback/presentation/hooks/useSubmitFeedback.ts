/**
 * Submit Feedback Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IFeedbackRepository } from '../../domain/repositories/IFeedbackRepository';
import {
  createFeedback,
  type FeedbackType,
} from '../../domain/entities/FeedbackEntity';

interface SubmitFeedbackParams {
  userId: string | null;
  userEmail?: string | null;
  type: FeedbackType;
  title: string;
  description: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  deviceInfo?: {
    platform: string;
    osVersion: string;
    appVersion: string;
  };
  metadata?: Record<string, unknown>;
}

export function useSubmitFeedback(repository: IFeedbackRepository) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitFeedbackParams) => {
      const feedback = createFeedback(
        params.userId,
        params.type,
        params.title,
        params.description,
        params.userEmail,
        params.rating,
        params.deviceInfo,
        params.metadata
      );

      const result = await repository.submitFeedback(feedback);

      if (!result.success) {
        throw new Error(result.error.message);
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
}
