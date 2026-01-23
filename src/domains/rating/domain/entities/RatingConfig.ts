/**
 * Rating Configuration
 * Types and interfaces for app rating system
 */

import type React from "react";

/**
 * Rating prompt configuration
 */
export interface RatingConfig {
  /**
   * Type of event to track (e.g., "ai_generation", "onboarding_completed")
   */
  eventType: string;

  /**
   * Minimum number of events before showing prompt
   * @default 3
   */
  minEventCount?: number;

  /**
   * Cooldown period in days before showing prompt again
   * @default 90
   */
  cooldownDays?: number;

  /**
   * App name to display in prompt
   */
  appName?: string;

  /**
   * Custom translations for the prompt
   */
  translations?: RatingTranslations;

  /**
   * Callback when user gives positive feedback
   */
  onPositiveFeedback?: () => void | Promise<void>;

  /**
   * Callback when user gives negative feedback
   */
  onNegativeFeedback?: () => void | Promise<void>;

  /**
   * Callback after prompt is shown
   */
  onPromptShown?: () => void | Promise<void>;

  /**
   * Callback when prompt is dismissed
   */
  onPromptDismissed?: () => void | Promise<void>;
}

/**
 * Custom translations for rating prompt
 */
export interface RatingTranslations {
  title: string;
  message: string;
  positiveButton: string;
  negativeButton: string;
  laterButton?: string;
}

/**
 * Rating state stored in AsyncStorage
 */
export interface RatingState {
  /**
   * Event count for specific event type
   */
  eventCount: number;

  /**
   * Last time prompt was shown (ISO date string)
   */
  lastPromptDate: string | null;

  /**
   * Whether user has rated the app
   */
  hasRated: boolean;

  /**
   * Whether user permanently dismissed the prompt
   */
  dismissed: boolean;
}

/**
 * Result of useAppRating hook
 */
export interface UseAppRatingResult {
  /**
   * Track an event (e.g., generation completed)
   */
  trackEvent: () => Promise<void>;

  /**
   * Check if should show prompt and show it automatically
   */
  checkAndShow: () => Promise<boolean>;

  /**
   * Manually check if criteria is met (without showing)
   */
  shouldShow: () => Promise<boolean>;

  /**
   * Manually show the rating prompt
   */
  showPrompt: () => Promise<void>;

  /**
   * Reset all rating data (for testing)
   */
  reset: () => Promise<void>;

  /**
   * Get current rating state
   */
  getState: () => Promise<RatingState>;

  /**
   * Whether prompt is currently visible
   */
  isVisible: boolean;

  /**
   * Modal component to render in your screen
   */
  modal: React.ReactNode;
}

/**
 * Default rating configuration
 */
export const DEFAULT_RATING_CONFIG: Required<
  Omit<RatingConfig, "onPositiveFeedback" | "onNegativeFeedback" | "onPromptShown" | "onPromptDismissed">
> = {
  eventType: "app_usage",
  minEventCount: 3,
  cooldownDays: 90,
  appName: "this app",
  translations: {
    title: "Enjoying the app?",
    message: "If you love using our app, would you mind taking a moment to rate it?",
    positiveButton: "Yes, I love it!",
    negativeButton: "Not really",
    laterButton: "Maybe later",
  },
};
