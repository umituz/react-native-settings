/**
 * Feedback Screen
 *
 * Full screen for submitting feedback.
 * Replaces modal approach with native navigation.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import { NavigationHeader } from '@umituz/react-native-design-system/molecules';
import { FeedbackForm } from '../components/FeedbackForm';
import type { FeedbackType } from '../../domain/entities/FeedbackEntity';
import type { FeedbackFormProps } from '../components/FeedbackFormProps';
import { useAppNavigation } from '@umituz/react-native-design-system/molecules';

export interface FeedbackScreenParams {
  initialType?: FeedbackType;
  title?: string;
  texts: FeedbackFormProps['texts'];
  [key: string]: unknown;
}

export interface FeedbackScreenProps {
  route: {
    params: FeedbackScreenParams;
  };
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ route }) => {
  const navigation = useAppNavigation();
  const { initialType, title, texts } = route.params;
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (_data: { type: FeedbackType; rating: number; description: string; title: string }) => {
    setIsSubmitting(true);
    try {
      // Navigate back with result
      navigation.goBack();
      // Note: In a real app, you'd emit an event or call a callback here
      // For now, we'll just close the screen
    } catch (error) {
      console.error('[FeedbackScreen] Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenLayout
      scrollable={true}
      edges={['top', 'bottom', 'left', 'right']}
      keyboardAvoiding={true}
      hideScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <NavigationHeader
        title={title || 'Feedback'}
        onBackPress={() => navigation.goBack()}
      />
      <FeedbackForm
        onSubmit={handleSubmit}
        initialType={initialType}
        isSubmitting={isSubmitting}
        texts={texts}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
});
