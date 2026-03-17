import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';
import { createRouteOrPressHandler } from '../../../../presentation/navigation/utils/navigationHelpers';

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
  const navigation = useSettingsNavigation();

  const handlePress = createRouteOrPressHandler(navigation.navigate, {
    route: config?.route || ('Notifications' as const),
    onPress: config?.onPress,
  });

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

