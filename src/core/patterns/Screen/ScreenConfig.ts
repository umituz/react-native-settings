/**
 * Screen Configuration Types
 *
 * Standardized configuration for all screen components.
 * Ensures consistency across the application.
 *
 * @example
 * ```ts
 * const config: ScreenConfig = {
 *   title: 'Settings',
 *   loadingMessage: 'Loading settings...',
 *   errorMessage: 'Failed to load settings'
 * };
 * ```
 */

import type { ReactNode } from 'react';

/**
 * Screen header configuration
 */
export interface ScreenHeader {
  /**
   * Header title
   */
  title?: string;

  /**
   * Header subtitle
   */
  subtitle?: string;

  /**
   * Show back button
   */
  showBackButton?: boolean;

  /**
   * Custom back button handler
   */
  onBackPress?: () => void;

  /**
   * Custom header component
   */
  custom?: ReactNode;

  /**
   * Right action buttons
   */
  actions?: Array<{
    icon: string;
    onPress: () => void;
    testID?: string;
  }>;

  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

/**
 * Screen loading state configuration
 */
export interface ScreenLoading {
  /**
   * Loading spinner size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Loading message
   */
  message?: string;

  /**
   * Custom loading component
   */
  custom?: ReactNode;

  /**
   * Show full container spinner
   */
  fullContainer?: boolean;
}

/**
 * Screen error state configuration
 */
export interface ScreenError {
  /**
   * Error message prefix
   */
  prefix?: string;

  /**
   * Default error message (when error details unknown)
   */
  message?: string;

  /**
   * Retry button text
   */
  retryText?: string;

  /**
   * Show retry button
   */
  showRetry?: boolean;

  /**
   * Retry handler
   */
  onRetry?: () => void;

  /**
   * Custom error component
   */
  custom?: ReactNode;

  /**
   * Error icon name
   */
  icon?: string;
}

/**
 * Screen empty state configuration
 */
export interface ScreenEmpty {
  /**
   * Empty state message
   */
  message?: string;

  /**
   * Empty state description
   */
  description?: string;

  /**
   * Empty state icon
   */
  icon?: string;

  /**
   * Custom empty component
   */
  custom?: ReactNode;

  /**
   * Action button label
   */
  actionLabel?: string;

  /**
   * Action button handler
   */
  onAction?: () => void;
}

/**
 * Screen layout configuration
 */
export interface ScreenLayout {
  /**
   * Safe area edges
   */
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;

  /**
   * Scrollable content
   */
  scrollable?: boolean;

  /**
   * Keyboard avoiding view
   */
  keyboardAvoiding?: boolean;

  /**
   * Hide scroll indicator
   */
  hideScrollIndicator?: boolean;

  /**
   * Content container style
   */
  contentContainerStyle?: object;

  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

/**
 * Complete screen configuration
 */
export interface ScreenConfig {
  /**
   * Screen header configuration
   */
  header?: ScreenHeader;

  /**
   * Loading state configuration
   */
  loading?: ScreenLoading;

  /**
   * Error state configuration
   */
  error?: ScreenError;

  /**
   * Empty state configuration
   */
  empty?: ScreenEmpty;

  /**
   * Layout configuration
   */
  layout?: ScreenLayout;

  /**
   * Custom container style
   */
  containerStyle?: object;

  /**
   * Screen test ID
   */
  testID?: string;
}

/**
 * Screen data state (for useScreenData hook)
 */
export interface ScreenDataState<T> {
  /**
   * Loading state
   */
  loading: boolean;

  /**
   * Error message
   */
  error: string | null;

  /**
   * Data
   */
  data: T | null;

  /**
   * Is initialized
   */
  initialized: boolean;
}

/**
 * Screen data actions (for useScreenData hook)
 */
export interface ScreenDataActions<T> {
  /**
   * Set loading state
   */
  setLoading: (loading: boolean) => void;

  /**
   * Set error state
   */
  setError: (error: string | null) => void;

  /**
   * Set data state
   */
  setData: (data: T | null) => void;

  /**
   * Reset state
   */
  reset: () => void;

  /**
   * Refresh data (calls fetch function)
   */
  refresh: () => Promise<void>;
}

/**
 * Screen data hook return type
 */
export type ScreenData<T> = ScreenDataState<T> & ScreenDataActions<T>;

/**
 * Screen fetch function type
 */
export type ScreenFetchFunction<T> = () => Promise<T>;

/**
 * Common preset configurations
 */
export const ScreenPresets: {
  /**
   * Default screen configuration
   */
  default: ScreenConfig;

  /**
   * Modal screen configuration (no back button, full edges)
   */
  modal: ScreenConfig;

  /**
   * Loading screen configuration
   */
  loading: (message?: string) => ScreenConfig;

  /**
   * Error screen configuration
   */
  error: (message?: string) => ScreenConfig;
} = {
  default: {
    header: {
      showBackButton: true,
    },
    layout: {
      edges: ['top', 'bottom', 'left', 'right'],
      scrollable: true,
    },
    loading: {
      size: 'lg',
      fullContainer: true,
    },
    error: {
      icon: 'error',
      showRetry: true,
    },
  },

  modal: {
    header: {
      showBackButton: false,
    },
    layout: {
      edges: [],
      scrollable: true,
      keyboardAvoiding: true,
    },
    loading: {
      size: 'md',
      fullContainer: true,
    },
  },

  loading: (message = 'Loading...') => ({
    loading: {
      size: 'lg',
      message,
      fullContainer: true,
    },
  }),

  error: (message = 'Something went wrong') => ({
    error: {
      icon: 'error',
      message,
      showRetry: true,
    },
  }),
};
