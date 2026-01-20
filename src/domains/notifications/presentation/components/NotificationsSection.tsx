import React, { useCallback } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useAppNavigation } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';

export interface NotificationsSectionConfig {
  route?: string;
  onPress?: () => void;
  title?: string;
  description?: string;
  sectionTitle?: string;
}

export interface NotificationsSectionProps {
  config?: NotificationsSectionConfig;
  containerStyle?: StyleProp<ViewStyle>;
  noBackground?: boolean;
  hideMargin?: boolean;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  config,
  containerStyle,
  noBackground,
  hideMargin,
}) => {
  const navigation = useAppNavigation();
  const { t } = useLocalization();

  const handlePress = useCallback(() => {
    if (config?.onPress) {
      config.onPress();
    } else {
      const route = config?.route || 'Notifications';
      navigation.navigate(route as never);
    }
  }, [config?.route, config?.onPress, navigation]);

  const title = config?.title || t('settings.notifications.title');
  const description = config?.description || t('settings.notifications.description');

  return (
    <SettingsItemCard
      title={title}
      description={description}
      icon="notifications"
      onPress={handlePress}
      containerStyle={containerStyle}
      noBackground={noBackground}
      hideMargin={hideMargin}
    />
  );
};

