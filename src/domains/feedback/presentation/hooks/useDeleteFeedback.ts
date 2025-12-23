/**
 * Delete Feedback Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IFeedbackRepository } from '../../domain/repositories/IFeedbackRepository';

export function useDeleteFeedback(repository: IFeedbackRepository) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feedbackId: string) => {
      const result = await repository.deleteFeedback(feedbackId);

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
