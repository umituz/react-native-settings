/**
 * NotificationsSection Component
 * Settings section for notifications - navigates to full screen
 */

import React, { useCallback, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon, useAppNavigation } from '@umituz/react-native-design-system';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
// @ts-ignore - Optional peer dependency
import { useLocalization } from '@umituz/react-native-localization';

export interface NotificationsSectionConfig {
  route?: string;
  title?: string;
  description?: string;
  sectionTitle?: string;
}

export interface NotificationsSectionProps {
  config?: NotificationsSectionConfig;
  containerStyle?: StyleProp<ViewStyle>;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  config,
  containerStyle,
}) => {
  const navigation = useAppNavigation();
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const handlePress = useCallback(() => {
    const route = config?.route || 'Notifications';
    navigation.navigate(route as never);
  }, [config?.route, navigation]);

  const title = config?.title || t('settings.notifications.title');
  const description = config?.description || t('settings.notifications.description');
  const sectionTitle = config?.sectionTitle || t('settings.notifications.sectionTitle');

  return (
    <View style={[styles.container, containerStyle]}>
      <AtomicText type="bodyLarge" style={styles.sectionTitle}>{sectionTitle}</AtomicText>

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <AtomicIcon name="notifications" size="md" color="primary" />
        </View>
        <View style={styles.textContainer}>
          <AtomicText type="bodyLarge">{title}</AtomicText>
          <AtomicText type="bodySmall" style={styles.description}>{description}</AtomicText>
        </View>
        <AtomicIcon name="chevron-forward" size="md" color="secondary" />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: { marginBottom: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: tokens.colors.surface },
    sectionTitle: { fontWeight: '600', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
    itemContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, minHeight: 72 },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: tokens.colors.surfaceSecondary,
    },
    textContainer: { flex: 1, marginRight: 8 },
    description: { color: tokens.colors.textSecondary, marginTop: 4 },
  });
