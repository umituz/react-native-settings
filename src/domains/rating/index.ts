/**
 * Rating Domain
 * Star ratings, user reviews, statistics, and app store rating prompts
 */

// =============================================================================
// DOMAIN LAYER - Entities (Star Ratings)
// =============================================================================

export type {
  RatingValue,
  Rating,
  RatingStats,
} from './domain/entities/Rating';

// =============================================================================
// DOMAIN LAYER - Entities (App Store Rating)
// =============================================================================

export type {
  RatingConfig,
  RatingState,
  RatingTranslations,
  UseAppRatingResult,
} from './domain/entities/RatingConfig';

export { DEFAULT_RATING_CONFIG } from './domain/entities/RatingConfig';

// =============================================================================
// PRESENTATION LAYER - Components (Star Ratings)
// =============================================================================

export { StarRating } from './presentation/components/StarRating';
export type { StarRatingProps } from './presentation/components/StarRating';

// =============================================================================
// PRESENTATION LAYER - Components (App Store Rating)
// =============================================================================

export { RatingPromptModal } from './presentation/components/RatingPromptModal';
export type { RatingPromptModalProps } from './presentation/components/RatingPromptModal';

// =============================================================================
// PRESENTATION LAYER - Hooks (App Store Rating)
// =============================================================================

export { useAppRating } from './presentation/hooks/useAppRating';


