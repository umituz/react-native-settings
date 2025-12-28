/**
 * DisclaimerScreen Component
 *
 * Full-screen disclaimer display for navigation-based usage
 * Can be registered as a screen in navigation stack
 *
 * Features:
 * - SafeAreaView wrapper for proper display
 * - Scrollable content for long disclaimers
 * - Customizable title and content via props or translations
 * - NO shadows (CLAUDE.md compliance)
 * - Universal across iOS, Android, Web
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system';
import { AtomicText, AtomicIcon } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';

export interface DisclaimerScreenProps {
  /** Custom title (overrides translation) */
  title?: string;
  /** Custom title translation key */
  titleKey?: string;
  /** Custom content (overrides translation) */
  content?: string;
  /** Custom content translation key */
  contentKey?: string;
  /** Custom icon name */
  iconName?: string;
}

export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({
  title,
  titleKey = 'settings.disclaimer.title',
  content,
  contentKey = 'settings.disclaimer.message',
  iconName = 'alert-triangle',
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const displayTitle = title || t(titleKey);
  const displayContent = content || t(contentKey);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
      edges={['bottom']}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon Header */}
        <View style={styles.iconHeader}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: withAlpha(tokens.colors.warning, 0.1),
                borderColor: withAlpha(tokens.colors.warning, 0.3),
              },
            ]}
          >
            <AtomicIcon name={iconName as any} color="warning" size="xl" />
          </View>
        </View>

        {/* Title */}
        <AtomicText type="headlineMedium" color="primary" style={styles.title}>
          {displayTitle}
        </AtomicText>

        {/* Content */}
        <AtomicText type="bodyMedium" color="secondary" style={styles.content}>
          {displayContent}
        </AtomicText>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: tokens.spacing.lg * tokens.spacingMultiplier,
      paddingTop: tokens.spacing.xl * tokens.spacingMultiplier,
    },
    iconHeader: {
      alignItems: 'center',
      marginBottom: tokens.spacing.lg * tokens.spacingMultiplier,
    },
    iconContainer: {
      width: 72 * tokens.spacingMultiplier,
      height: 72 * tokens.spacingMultiplier,
      borderRadius: 36 * tokens.spacingMultiplier,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    },
    title: {
      textAlign: 'center',
      marginBottom: tokens.spacing.lg * tokens.spacingMultiplier,
    },
    content: {
      lineHeight: 24 * tokens.spacingMultiplier,
      textAlign: 'left',
    },
  });
