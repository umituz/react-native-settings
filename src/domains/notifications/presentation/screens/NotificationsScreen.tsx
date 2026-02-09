/**
 * Notifications Screen - Dynamic and Reusable
 *
 * A clean notification settings screen that accepts all text and configuration
 * as props to make it completely reusable across different applications.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  AtomicIcon, 
  AtomicCard, 
  AtomicText, 
  ScreenLayout, 
  BASE_TOKENS, 
  AtomicSpinner, 
  type IconColor, 
  NavigationHeader, 
  useAppNavigation,
  useAppDesignTokens,
  type DesignTokens
} from '@umituz/react-native-design-system';
import { Switch } from 'react-native';
import { useNotificationSettings } from '../../infrastructure/hooks/useNotificationSettings';

export interface NotificationsScreenProps {
  translations: {
    title: string;
    description: string;
    loadingText?: string;
  };
  iconName?: string;
  iconColor?: string;
  testID?: string;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  translations,
  iconName = 'notifications',
  iconColor = 'primary',
  testID = 'notifications-screen',
}) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => getStyles(tokens), [tokens]);
  const { notificationsEnabled, setNotificationsEnabled, isLoading } = useNotificationSettings();

  const header = (
    <NavigationHeader
      title={translations.title}
      onBackPress={() => navigation.goBack()}
    />
  );

  if (isLoading) {
    return (
      <ScreenLayout testID={testID} header={header}>
        <AtomicSpinner
          size="lg"
          color="primary"
          text={translations.loadingText || 'Loading...'}
          fullContainer
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout 
      testID={testID} 
      hideScrollIndicator 
      header={header}
    >
      <View style={styles.content}>
        <AtomicCard style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <AtomicIcon name={iconName} size="lg" color={iconColor as IconColor} />
            </View>
            <View style={styles.textContainer}>
              <AtomicText type="bodyLarge" style={{ color: tokens.colors.textPrimary }}>
                {translations.title}
              </AtomicText>
              <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: BASE_TOKENS.spacing.xs }}>
                {translations.description}
              </AtomicText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: tokens.colors.surfaceSecondary, true: tokens.colors.primary }}
              thumbColor={tokens.colors.surface}
              testID="notifications-toggle"
            />
          </View>
        </AtomicCard>
      </View>
    </ScreenLayout>
  );
};

const getStyles = (tokens: DesignTokens) => StyleSheet.create({
  content: {
    padding: BASE_TOKENS.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: BASE_TOKENS.spacing.lg,
    backgroundColor: tokens.colors.surface,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: tokens.colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: BASE_TOKENS.spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: BASE_TOKENS.spacing.md,
  },
});

export default NotificationsScreen;