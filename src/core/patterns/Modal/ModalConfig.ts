/**
 * Modal Configuration Types
 *
 * Standardized configuration for all modal components.
 * Ensures consistency across the application.
 *
 * @example
 * ```ts
 * const config: ModalConfig = {
 *   title: 'Rating',
 *   content: 'Rate this app',
 *   actions: [
 *     { label: 'OK', onPress: () => {}, variant: 'primary' }
 *   ]
 * };
 * ```
 */

import type { ReactNode } from 'react';

/**
 * Modal action button configuration
 */
export interface ModalAction {
  /**
   * Button label text
   */
  label: string;

  /**
   * Button press handler
   */
  onPress: () => void | Promise<void>;

  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';

  /**
   * Disable button
   */
  disabled?: boolean;

  /**
   * Show loading indicator
   */
  loading?: boolean;

  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

/**
 * Modal content configuration
 */
export interface ModalContent {
  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal subtitle or description
   */
  subtitle?: string;

  /**
   * Main content (can be string or React component)
   */
  message?: string | ReactNode;

  /**
   * Custom icon name
   */
  icon?: string;

  /**
   * Icon color
   */
  iconColor?: string;

  /**
   * Custom header component (overrides title/subtitle)
   */
  header?: ReactNode;

  /**
   * Custom body component (overrides message)
   */
  body?: ReactNode;

  /**
   * Custom footer component (overrides actions)
   */
  footer?: ReactNode;
}

/**
 * Modal behavior configuration
 */
export interface ModalBehavior {
  /**
   * Close on backdrop press
   */
  closeOnBackdropPress?: boolean;

  /**
   * Close on back button press (Android)
   */
  closeOnBackPress?: boolean;

  /**
   * Animation type
   */
  animation?: 'none' | 'slide' | 'fade' | 'scale';

  /**
   * Dismissible flag
   */
  dismissible?: boolean;
}

/**
 * Complete modal configuration
 */
export interface ModalConfig extends ModalContent, ModalBehavior {
  /**
   * Modal actions (buttons)
   */
  actions?: ModalAction[];

  /**
   * Maximum width (for responsive design)
   */
  maxWidth?: number;

  /**
   * Test ID for E2E testing
   */
  testID?: string;

  /**
   * Custom container style
   */
  containerStyle?: object;

  /**
   * Custom content style
   */
  contentStyle?: object;
}

/**
 * Modal state for useModalState hook
 */
export interface ModalState {
  /**
   * Modal visibility
   */
  visible: boolean;

  /**
   * Current modal configuration
   */
  config: ModalConfig | null;

  /**
   * Show modal with configuration
   */
  show: (config: ModalConfig) => void;

  /**
   * Hide modal
   */
  hide: () => void;

  /**
   * Update modal configuration
   */
  update: (config: Partial<ModalConfig>) => void;
}

/**
 * Modal result type for async operations
 */
export type ModalResult<T = void> =
  | { confirmed: true; data: T }
  | { confirmed: false };

/**
 * Create a confirmed modal result
 */
export function confirmed<T>(data?: T): ModalResult<T> {
  return { confirmed: true, data: data as T };
}

/**
 * Create a dismissed modal result
 */
export function dismissed(): ModalResult<never> {
  return { confirmed: false };
}

/**
 * Common preset configurations
 */
export const ModalPresets: {
  /**
   * Alert modal (single OK button)
   */
  alert: (title: string, message: string, okText?: string) => ModalConfig;

  /**
   * Confirm modal (OK and Cancel buttons)
   */
  confirm: (
    title: string,
    message: string,
    confirmText?: string,
    cancelText?: string
  ) => ModalConfig;

  /**
   * Info modal (just message with icon)
   */
  info: (title: string, message: string, icon?: string) => ModalConfig;

  /**
   * Error modal (error styling)
   */
  error: (title: string, message: string) => ModalConfig;

  /**
   * Loading modal (spinner)
   */
  loading: (message: string) => ModalConfig;
} = {
  alert: (title, message, okText = 'OK') => ({
    title,
    message,
    actions: [{ label: okText, onPress: () => {}, variant: 'primary' }],
    dismissible: true,
  }),

  confirm: (title, message, confirmText = 'Confirm', cancelText = 'Cancel') => ({
    title,
    message,
    actions: [
      { label: cancelText, onPress: () => {}, variant: 'outline' },
      { label: confirmText, onPress: () => {}, variant: 'primary' },
    ],
    dismissible: true,
  }),

  info: (title, message, icon = 'info') => ({
    title,
    message,
    icon,
    actions: [{ label: 'OK', onPress: () => {}, variant: 'primary' }],
    dismissible: true,
  }),

  error: (title, message) => ({
    title,
    message,
    icon: 'error',
    iconColor: 'error',
    actions: [{ label: 'OK', onPress: () => {}, variant: 'primary' }],
    dismissible: true,
  }),

  loading: (message) => ({
    message,
    actions: [],
    dismissible: false,
    closeOnBackdropPress: false,
    closeOnBackPress: false,
  }),
};
