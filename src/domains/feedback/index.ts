/**
 * Feedback Domain
 * User feedback, bug reports, feature requests
 */

export * from './presentation/components/FeedbackForm';
export { SupportSection } from './presentation/components/SupportSection';
export type { SupportSectionProps, FeedbackModalTexts } from './presentation/components/SupportSection';
export * from './presentation/hooks/useFeedbackForm';
export * from './domain/entities/FeedbackEntity';
export * from './domain/entities/FeatureRequestEntity';
export { FeedbackScreen } from './presentation/screens/FeedbackScreen';
export type { FeedbackScreenProps, FeedbackScreenParams } from './presentation/screens/FeedbackScreen';
