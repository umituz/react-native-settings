/**
 * User Feedback Hook
 */

import { useQuery } from '@tanstack/react-query';
import type { IFeedbackRepository } from '../../domain/repositories/IFeedbackRepository';

export function useUserFeedback(
  repository: IFeedbackRepository,
  userId: string | null
) {
  return useQuery({
    queryKey: ['feedback', userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const result = await repository.getUserFeedback(userId);

      if (!result.success) {
        throw new Error(result.error.message);
      }

      return result.data;
    },
    enabled: !!userId,
  });
}
