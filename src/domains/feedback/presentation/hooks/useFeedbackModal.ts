/**
 * useFeedbackModal Hook
 *
 * Refactored to use GenericModal and ModalConfig.
 * Replaces old FeedbackModal component.
 *
 * @example
 * ```ts
 * const { FeedbackModal, showFeedbackModal } = useFeedbackModal();
 *
 * return (
 *   <>
 *     <Button onPress={() => showFeedbackModal({ onSubmit: ... })} />
 *     <FeedbackModal />
 *   </>
 * );
 * ```
 */

import { useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseModal } from '@umituz/react-native-design-system/molecules';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system/atoms';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
import { FeedbackForm } from '../components/FeedbackForm';
import type { FeedbackType, FeedbackRating } from '../../domain/entities/FeedbackEntity';
import type { FeedbackFormProps } from '../components/FeedbackFormProps';

export interface FeedbackModalOptions {
  /**
   * Submit callback
   */
  onSubmit: (data: {
    type: FeedbackType;
    rating: FeedbackRating;
    description: string;
    title: string;
  }) => Promise<void>;

  /**
   * Initial feedback type
   */
  initialType?: FeedbackType;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal subtitle
   */
  subtitle?: string;

  /**
   * Form texts
   */
  texts: FeedbackFormProps['texts'];

  /**
   * Custom configuration
   */
  config?: {
    showHeader?: boolean;
    showCloseButton?: boolean;
  };
}

/**
 * Feedback modal hook
 */
export function useFeedbackModal() {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<FeedbackModalOptions | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const showFeedbackModal = useCallback((newOptions: FeedbackModalOptions) => {
    setOptions(newOptions);
    setVisible(true);
  }, []);

  const hideFeedbackModal = useCallback(() => {
    setVisible(false);
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(async (data: any) => {
    if (!options) return;

    setIsSubmitting(true);
    try {
      await options.onSubmit(data);
      hideFeedbackModal();
    } catch (error) {
      setIsSubmitting(false);
    }
  }, [options, hideFeedbackModal]);

  const header = options?.config?.showHeader !== false ? (
    <View style={styles.header}>
      <View style={styles.headerText}>
        {options?.title && (
          <AtomicText style={{ fontSize: 20, fontWeight: '600' }}>
            {options.title}
          </AtomicText>
        )}
        {options?.subtitle && (
          <AtomicText style={{ fontSize: 14, marginTop: 4 }}>
            {options.subtitle}
          </AtomicText>
        )}
      </View>
      {options?.config?.showCloseButton !== false && (
        <TouchableOpacity
          onPress={hideFeedbackModal}
          style={[styles.closeButton, { backgroundColor: tokens.colors.surfaceVariant }]}
        >
          <AtomicIcon name="close" size="sm" color="onSurface" />
        </TouchableOpacity>
      )}
    </View>
  ) : undefined;

  const FeedbackModal = useCallback(() => {
    if (!options) return null;

    return (
      <BaseModal visible={visible} onClose={hideFeedbackModal}>
        <ScreenLayout
          header={header}
          scrollable={true}
          edges={[]}
          keyboardAvoiding={true}
          contentContainerStyle={styles.content}
          hideScrollIndicator={false}
        >
          <FeedbackForm
            onSubmit={handleSubmit}
            initialType={options.initialType}
            isSubmitting={isSubmitting}
            texts={options.texts}
          />
        </ScreenLayout>
      </BaseModal>
    );
  }, [visible, options, header, styles, handleSubmit, isSubmitting, hideFeedbackModal]);

  return {
    FeedbackModal,
    showFeedbackModal,
    hideFeedbackModal,
    isVisible: visible,
  };
}

const getStyles = (_tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
    },
    headerText: {
      flex: 1,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 20,
    },
  });
