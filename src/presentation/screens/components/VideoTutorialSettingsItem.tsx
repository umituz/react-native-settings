import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { VideoTutorialConfig } from "../types/UserFeatureConfig";
import { compareConfigAndTranslate } from "../../../infrastructure/utils/memoComparisonUtils";

export interface VideoTutorialSettingsItemProps {
  config: VideoTutorialConfig;
  t?: (key: string) => string;
  noBackground?: boolean;
  hideMargin?: boolean;
}

const VideoTutorialSettingsItemComponent: React.FC<VideoTutorialSettingsItemProps> = ({
  config,
  t,
  noBackground,
  hideMargin,
}) => {
  const navigation = useAppNavigation();

  const handlePress = React.useCallback(() => {
    if (config.onPress) {
      config.onPress();
    } else {
      const route = config.route || "VideoTutorial";
      navigation.navigate(route as never);
    }
  }, [navigation, config.onPress, config.route]);

  const icon = (config.icon || "play-circle-outline") as IconName;
  const title = config.title || t("settings.videoTutorial.title");
  const description = config.description || t("settings.videoTutorial.description");

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
