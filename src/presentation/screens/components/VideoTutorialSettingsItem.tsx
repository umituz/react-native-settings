import React from "react";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { VideoTutorialConfig } from "../types/UserFeatureConfig";
import { compareConfigAndTranslate } from "../../../infrastructure/utils/memoComparisonUtils";
import { useSettingsNavigation } from "../../navigation/hooks/useSettingsNavigation";

export interface VideoTutorialSettingsItemProps {
  config: VideoTutorialConfig;
  noBackground?: boolean;
  hideMargin?: boolean;
}

const VideoTutorialSettingsItemComponent: React.FC<VideoTutorialSettingsItemProps> = ({
  config,
  noBackground,
  hideMargin,
}) => {
  const navigation = useSettingsNavigation();

  const handlePress = React.useCallback(() => {
    if (config.onPress) {
      config.onPress();
    } else {
      const route = config.route || "VideoTutorial";
      navigation.navigate(route as 'VideoTutorial');
    }
  }, [navigation, config.onPress, config.route]);

  const icon = (config.icon || "play-circle-outline") as IconName;
  const title = config.title;
  const description = config.description;

  return (
    <SettingsItemCard
      title={title}
      description={description}
      icon={icon}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
      noBackground={noBackground}
      hideMargin={hideMargin}
    />
  );
};

export const VideoTutorialSettingsItem = React.memo(
  VideoTutorialSettingsItemComponent,
  compareConfigAndTranslate
);
VideoTutorialSettingsItem.displayName = "VideoTutorialSettingsItem";
