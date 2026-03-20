/**
 * AIConsentSetting Component
 *
 * Settings list item for AI consent management.
 * Shows current consent status and navigates to full consent screen.
 *
 * Features:
 * - Displays consent status (accepted/declined/pending)
 * - Tappable card that opens AI consent screen
 * - Icon with background color
 * - Internationalized
 * - Universal across iOS, Android, Web
 *
 * Usage:
 *   import { AIConsentSetting } from '@umituz/react-native-settings/ai-consent';
 *
 *   <AIConsentSetting />
 */

import React, { useCallback, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens, withAlpha } from '@umituz/react-native-design-system/theme';
import { useAppNavigation } from '@umituz/react-native-design-system/molecules';
import { AtomicText } from '@umituz/react-native-design-system/atoms';
import { useAIConsent } from '../hooks/useAIConsent';

export interface AIConsentSettingProps {
  /** Custom title */
  title?: string;
  /** Custom description when consented */
  consentedDescription?: string;
  /** Custom description when not consented */
  notConsentedDescription?: string;
}

export const AIConsentSetting: React.FC<AIConsentSettingProps> = memo(({
  title = 'AI Technology Consent',
  consentedDescription = 'You have consented to use AI services',
  notConsentedDescription = 'Review AI service disclosure',
}) => {
  const tokens = useAppDesignTokens();
  const navigation = useAppNavigation();
  const { hasConsented, isLoading } = useAIConsent();

  const handlePress = useCallback(() => {
    navigation.push('AIConsent' as never);
  }, [navigation]);

  if (isLoading) {
    return null;
  }

  const iconColor = hasConsented ? tokens.colors.success : tokens.colors.warning;
  const backgroundColor = withAlpha(iconColor, 0.1);
  const description = hasConsented ? consentedDescription : notConsentedDescription;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
        <AtomicText style={styles.icon}>🤖</AtomicText>
      </View>

      <View style={styles.content}>
        <AtomicText style={styles.title}>{title}</AtomicText>
        <AtomicText style={styles.description}>{description}</AtomicText>
      </View>
    </View>
  );
});

AIConsentSetting.displayName = 'AIConsentSetting';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
