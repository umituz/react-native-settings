/**
 * Rating Domain
 * Star ratings, user reviews, and statistics
 */

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type {
  RatingValue,
  Rating,
  RatingStats,
} from './domain/entities/Rating';

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { StarRating } from './presentation/components/StarRating';
export type { StarRatingProps } from './presentation/components/StarRating';


