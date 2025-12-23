/**
 * Feedback Repository Interface
 */

import type { FeedbackEntity } from '../entities/FeedbackEntity';

export interface FeedbackError {
  message: string;
  code?: 'SUBMIT_FAILED' | 'FETCH_FAILED' | 'DELETE_FAILED' | 'VALIDATION_ERROR';
}

export type FeedbackResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: FeedbackError;
    };

export interface IFeedbackRepository {
  submitFeedback(
    feedback: FeedbackEntity | Omit<FeedbackEntity, 'id'>
  ): Promise<FeedbackResult<FeedbackEntity>>;
  getUserFeedback(userId: string): Promise<FeedbackResult<FeedbackEntity[]>>;
  deleteFeedback(feedbackId: string): Promise<FeedbackResult<boolean>>;
}
