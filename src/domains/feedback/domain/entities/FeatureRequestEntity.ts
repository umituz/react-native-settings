/**
 * Feature Request Entity
 * Represents a community feature request that all users can see and vote on
 */

export type FeatureRequestStatus = 'pending' | 'planned' | 'review' | 'completed' | 'dismissed';

export type VoteType = 'up' | 'down';

export interface FeatureRequestItem {
  id: string;
  title: string;
  description: string;
  type: string;
  status: FeatureRequestStatus;
  votes: number;
  commentCount: number;
  createdBy: string;
  isAnonymous: boolean;
  platform: string;
  createdAt: string;
  updatedAt: string;
}
