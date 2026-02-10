import React, { useCallback } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useAppNavigation } from '@umituz/react-native-design-system';
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

  const handlePress = useCallback(() => {
    if (config?.onPress) {
      config.onPress();
    } else {
      const route = config?.route || 'Notifications';
      navigation.navigate(route as never);
    }
  }, [config?.route, config?.onPress, navigation]);

  const title = config?.title || "";
  const description = config?.description || "";

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

