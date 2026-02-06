/**
 * Feedback Entity
 */

export type FeedbackType =
  | 'general'
  | 'bug_report'
  | 'feature_request'
  | 'improvement'
  | 'other';

export type FeedbackStatus = 'pending' | 'reviewed' | 'resolved' | 'closed';

export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

export interface FeedbackEntity {
  id: string;
  userId: string | null;
  userEmail?: string | null;
  type: FeedbackType;
  title: string;
  description: string;
  rating?: FeedbackRating;
  status: FeedbackStatus;
  deviceInfo?: {
    platform: string;
    osVersion: string;
    appVersion: string;
  };
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export function createFeedback(
  userId: string | null,
  type: FeedbackType,
  title: string,
  description: string,
  userEmail?: string | null,
  rating?: FeedbackRating,
  deviceInfo?: FeedbackEntity['deviceInfo'],
  metadata?: Record<string, unknown>
): Omit<FeedbackEntity, 'id'> {
  const now = new Date().toISOString();
  return {
    userId,
    userEmail,
    type,
    title,
    description,
    rating,
    status: 'pending',
    deviceInfo,
    metadata,
    createdAt: now,
    updatedAt: now,
  };
}
