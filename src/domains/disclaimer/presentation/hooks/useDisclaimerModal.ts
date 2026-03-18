/**
 * useDisclaimerModal Hook
 *
 * Refactored to use GenericModal and ModalConfig.
 * Replaces old DisclaimerModal component.
 *
 * @example
 * ```ts
 * const { DisclaimerModal, showDisclaimer } = useDisclaimerModal();
 *
 * return (
 *   <>
 *     <Button onPress={() => showDisclaimer({ title: 'Terms', content: '...' })} />
 *     <DisclaimerModal />
 *   </>
 * );
 * ```
 */

import { useCallback } from 'react';
import { GenericModal } from '../../../../presentation/components/GenericModal';
import { useModalState } from '../../../../core/patterns/Modal/useModalState';
import type { ModalConfig } from '../../../../core/patterns/Modal/ModalConfig';

export interface DisclaimerModalOptions {
  /**
   * Disclaimer title
   */
  title: string;

  /**
   * Disclaimer content
   */
  content: string;

  /**
   * Custom modal configuration
   */
  config?: Partial<ModalConfig>;
}

/**
 * Disclaimer modal hook
 */
export function useDisclaimerModal() {
  const modal = useModalState();

  const showDisclaimer = useCallback((options: DisclaimerModalOptions) => {
    const { title, content, config: customConfig } = options;

    const modalConfig: ModalConfig = {
      title,
      message: content,
      dismissible: true,
      closeOnBackdropPress: true,
      closeOnBackPress: true,
      ...customConfig,
    };

    modal.show(modalConfig);
  }, [modal]);

  const DisclaimerModal = useCallback(() => {
    return <GenericModal state={modal} testID="disclaimer-modal" />;
  }, [modal]);

  return {
    DisclaimerModal,
    showDisclaimer,
    modal,
  };
}
