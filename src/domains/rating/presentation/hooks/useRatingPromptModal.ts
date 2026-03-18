/**
 * useRatingPromptModal Hook
 *
 * Refactored to use GenericModal and ModalConfig.
 * Replaces old RatingPromptModal component.
 *
 * @example
 * ```ts
 * const { RatingPrompt, showRatingPrompt } = useRatingPromptModal();
 *
 * return (
 *   <>
 *     <Button onPress={() => showRatingPrompt({ onPositive: ... })} />
 *     <RatingPrompt />
 *   </>
 * );
 * ```
 */

import { useCallback } from 'react';
import { GenericModal } from '../../../../presentation/components/GenericModal';
import { useModalState } from '../../../../core/patterns/Modal/useModalState';
import type { ModalConfig } from '../../../../core/patterns/Modal/ModalConfig';
import type { RatingTranslations } from '../../domain/entities/RatingConfig';

export interface RatingPromptOptions {
  /**
   * Callback when user clicks positive (loves the app)
   */
  onPositive: () => void | Promise<void>;

  /**
   * Callback when user clicks negative (doesn't love the app)
   */
  onNegative: () => void | Promise<void>;

  /**
   * Callback when user clicks later
   */
  onLater: () => void | Promise<void>;

  /**
   * App name for message
   */
  appName?: string;

  /**
   * Custom translations
   */
  translations?: RatingTranslations;

  /**
   * Custom modal configuration
   */
  config?: Partial<ModalConfig>;
}

/**
 * Rating prompt modal hook
 */
export function useRatingPromptModal() {
  const modal = useModalState();

  const showRatingPrompt = useCallback((options: RatingPromptOptions) => {
    const {
      onPositive,
      onNegative,
      onLater,
      appName = 'this app',
      translations,
      config: customConfig,
    } = options;

    const defaultTranslations: RatingTranslations = {
      title: translations?.title ?? 'Enjoying the app?',
      message:
        translations?.message ??
        `If you love using ${appName}, would you mind taking a moment to rate it?`,
      positiveButton: translations?.positiveButton ?? 'Yes, I love it!',
      negativeButton: translations?.negativeButton ?? 'Not really',
      laterButton: translations?.laterButton ?? 'Maybe later',
    };

    const modalConfig: ModalConfig = {
      title: defaultTranslations.title,
      message: defaultTranslations.message,
      icon: 'star',
      iconColor: 'primary',
      actions: [
        {
          label: defaultTranslations.positiveButton,
          onPress: onPositive,
          variant: 'primary',
        },
        {
          label: defaultTranslations.negativeButton,
          onPress: onNegative,
          variant: 'outline',
        },
        {
          label: defaultTranslations.laterButton,
          onPress: onLater,
          variant: 'text',
        },
      ],
      dismissible: true,
      ...customConfig,
    };

    modal.show(modalConfig);
  }, [modal]);

  const RatingPrompt = useCallback(() => {
    return <GenericModal state={modal} testID="rating-prompt-modal" />;
  }, [modal]);

  return {
    RatingPrompt,
    showRatingPrompt,
    modal,
  };
}
