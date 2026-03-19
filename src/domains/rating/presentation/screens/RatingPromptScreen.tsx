/**
 * Rating Prompt Screen
 *
 * Full screen for app rating prompt.
 * Replaces modal approach with native navigation.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenLayout } from '@umituz/react-native-design-system/layouts';
import { AtomicText, AtomicButton, AtomicIcon } from '@umituz/react-native-design-system/atoms';
import { NavigationHeader, useAppNavigation } from '@umituz/react-native-design-system/molecules';
import { useAppDesignTokens } from '@umituz/react-native-design-system/theme';
import type { RatingTranslations } from '../../domain/entities/RatingConfig';

export interface RatingPromptScreenParams {
  appName?: string;
  translations?: RatingTranslations;
  onPositive?: () => void;
  onNegative?: () => void;
  onLater?: () => void;
  [key: string]: unknown;
}

export interface RatingPromptScreenProps {
  route: {
    params: RatingPromptScreenParams;
  };
}

export const RatingPromptScreen: React.FC<RatingPromptScreenProps> = ({ route }) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);
  const { appName = 'this app', translations, onPositive, onNegative, onLater } = route.params;

  const defaultTranslations: RatingTranslations = {
    title: translations?.title ?? 'Enjoying the app?',
    message:
      translations?.message ??
      `If you love using ${appName}, would you mind taking a moment to rate it?`,
    positiveButton: translations?.positiveButton ?? 'Yes, I love it!',
    negativeButton: translations?.negativeButton ?? 'Not really',
    laterButton: translations?.laterButton ?? 'Maybe later',
  };

  const handlePositive = async () => {
    try {
      // Lazy load expo-store-review
      const StoreReview = await import('expo-store-review');
      const isAvailable = await StoreReview.isAvailableAsync();

      if (isAvailable) {
        await StoreReview.requestReview();
      }
    } catch (error) {
      console.error('[RatingPromptScreen] Failed to request review:', error);
    }

    if (onPositive) {
      onPositive();
    }
    navigation.goBack();
  };

  const handleNegative = () => {
    if (onNegative) {
      onNegative();
    }
    navigation.goBack();
  };

  const handleLater = () => {
    if (onLater) {
      onLater();
    }
    navigation.goBack();
  };

  return (
    <ScreenLayout
      scrollable={true}
      edges={['top', 'bottom', 'left', 'right']}
      hideScrollIndicator={false}
    >
      <NavigationHeader title="" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.iconContainer}>
          <AtomicIcon name="star" size="xxl" color="primary" />
        </View>

        <AtomicText style={styles.title}>{defaultTranslations.title}</AtomicText>

        <AtomicText style={styles.message}>{defaultTranslations.message}</AtomicText>

        <View style={styles.buttonContainer}>
          <AtomicButton
            variant="primary"
            onPress={handlePositive}
            style={styles.button}
          >
            {defaultTranslations.positiveButton}
          </AtomicButton>

          <AtomicButton
            variant="outline"
            onPress={handleNegative}
            style={styles.button}
          >
            {defaultTranslations.negativeButton}
          </AtomicButton>

          <AtomicButton
            variant="text"
            onPress={handleLater}
            style={styles.button}
          >
            {defaultTranslations.laterButton}
          </AtomicButton>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const getStyles = (_tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100%',
    },
    iconContainer: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
    },
    message: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 24,
    },
    buttonContainer: {
      width: '100%',
      gap: 12,
    },
    button: {
      width: '100%',
    },
  });
