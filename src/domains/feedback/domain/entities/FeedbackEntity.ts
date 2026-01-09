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

/**
 * Get feedback type label
 * @deprecated Use translation keys instead: `feedback.type.${type}`
 * This function is kept for backward compatibility but should not be used.
 * Use t(`feedback.type.${type}`) from useLocalization() instead.
 */
export function getFeedbackTypeLabel(type: FeedbackType): string {
  // Return type key for translation
  return type;
}

export function getFeedbackTypeEmoji(type: FeedbackType): string {
  const emojis: Record<FeedbackType, string> = {
    general: '💬',
    bug_report: '🐛',
    feature_request: '✨',
    improvement: '🔧',
    other: '📝',
  };
  return emojis[type] || '📝';
}

export function getFeedbackTypeIcon(type: FeedbackType): string {
  const icons: Record<FeedbackType, string> = {
    general: 'message-circle',
    bug_report: 'bug',
    feature_request: 'sparkles',
    improvement: 'wrench',
    other: 'file-text',
  };
  return icons[type] || 'file-text';
}
