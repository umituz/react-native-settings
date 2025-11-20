/**
 * Notifications Section Component
 * Single Responsibility: Render notifications settings section
 */

import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingItem } from "../../components/SettingItem";
import { SettingsSection } from "../../components/SettingsSection";
import type { NotificationsConfig } from "../types";

// Optional notification service
let notificationService: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  notificationService = require("@umituz/react-native-notifications")
    .notificationService;
} catch {
  // Package not available
}

interface NotificationsSectionProps {
  config?: NotificationsConfig;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  config,
}) => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    config?.initialValue ?? true,
  );

  useEffect(() => {
    if (config?.initialValue !== undefined) {
      setNotificationsEnabled(config.initialValue);
    }
  }, [config?.initialValue]);

  const handleToggle = async (value: boolean) => {
    if (notificationService && !value) {
      const hasPermissions = await notificationService.hasPermissions();
      if (!hasPermissions) {
        await notificationService.requestPermissions();
      }
    }

    setNotificationsEnabled(value);
    config?.onToggleChange?.(value);
  };

  const handlePress = async () => {
    if (notificationService) {
      const hasPermissions = await notificationService.hasPermissions();
      if (!hasPermissions) {
        await notificationService.requestPermissions();
      }
    }
    navigation.navigate((config?.route || "Notifications") as never);
  };

  const title = config?.title || t("settings.notifications.title");
  const description = config?.description || t("settings.notifications.description");
  const showToggle = config?.showToggle ?? true;

  return (
    <SettingsSection title={t("settings.sections.general")}>
      {showToggle ? (
        <SettingItem
          icon={Bell}
          title={title}
          showSwitch={true}
          switchValue={notificationsEnabled}
          onSwitchChange={handleToggle}
          isLast={true}
        />
      ) : (
        <SettingItem
          icon={Bell}
          title={title}
          value={description}
          onPress={handlePress}
          isLast={true}
        />
      )}
    </SettingsSection>
  );
};

