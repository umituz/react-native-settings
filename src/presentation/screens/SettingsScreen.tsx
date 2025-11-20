/**
 * Settings Screen
 * Modern settings screen with user profile header and organized sections
 */

import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { Palette, Bell, Info, FileText } from "lucide-react-native";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingItem } from "../components/SettingItem";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsFooter } from "../components/SettingsFooter";
import { UserProfileHeader } from "../components/UserProfileHeader";
import { SettingsConfig } from "./types";

// Optional notification service
let notificationService: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  notificationService = require("@umituz/react-native-notifications")
    .notificationService;
} catch {
  // Package not available
}

// Optional onboarding store
let useOnboardingStore: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const onboardingPackage = require("@umituz/react-native-onboarding");
  useOnboardingStore = onboardingPackage.useOnboardingStore;
} catch {
  // Package not available
}

/**
 * Check if navigation screen exists
 */
const hasNavigationScreen = (
  navigation: any,
  screenName: string,
): boolean => {
  try {
    const state = navigation.getState();
    if (!state) return false;

    const checkRoutes = (routes: any[]): boolean => {
      if (!routes || !Array.isArray(routes)) return false;

      for (const route of routes) {
        if (route.name === screenName) return true;
        if (route.state?.routes && checkRoutes(route.state.routes)) {
          return true;
        }
      }
      return false;
    };

    return checkRoutes(state.routes || []);
  } catch {
    return false;
  }
};

export interface SettingsScreenProps {
  config?: SettingsConfig;
  /** Show user profile header */
  showUserProfile?: boolean;
  /** User profile props */
  userProfile?: {
    displayName?: string;
    userId?: string;
    isGuest?: boolean;
    avatarUrl?: string;
    accountSettingsRoute?: string;
    onPress?: () => void;
  };
  /** Show footer with version */
  showFooter?: boolean;
  /** Custom footer text */
  footerText?: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  config = {},
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
}) => {
  const navigation = useNavigation();
  const { themeMode } = useDesignSystemTheme();
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const isDark = themeMode === "dark";
  const colors = tokens.colors;

  const features = useMemo(() => {
    const appearanceConfig = config?.appearance ?? "auto";
    const notificationsConfig = config?.notifications ?? "auto";
    const aboutConfig = config?.about ?? "auto";
    const legalConfig = config?.legal ?? "auto";

    return {
      appearance:
        appearanceConfig === true ||
        (appearanceConfig === "auto" &&
          hasNavigationScreen(navigation, "Appearance")),
      notifications:
        notificationsConfig === true ||
        (notificationsConfig === "auto" &&
          notificationService !== null &&
          hasNavigationScreen(navigation, "Notifications")),
      about:
        aboutConfig === true ||
        (aboutConfig === "auto" && hasNavigationScreen(navigation, "About")),
      legal:
        legalConfig === true ||
        (legalConfig === "auto" && hasNavigationScreen(navigation, "Legal")),
    };
  }, [config, navigation]);

  const handleNotificationsToggle = async (value: boolean) => {
    if (notificationService && !value) {
      const hasPermissions = await notificationService.hasPermissions();
      if (!hasPermissions) {
        await notificationService.requestPermissions();
      }
    }
    setNotificationsEnabled(value);
  };

  const handleNotificationsPress = async () => {
    if (notificationService) {
      const hasPermissions = await notificationService.hasPermissions();
      if (!hasPermissions) {
        await notificationService.requestPermissions();
      }
    }
    navigation.navigate("Notifications" as never);
  };

  const hasAnyFeatures =
    features.appearance ||
    features.notifications ||
    features.about ||
    features.legal;

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 16,
            paddingBottom: 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {showUserProfile && (
          <UserProfileHeader
            displayName={userProfile?.displayName}
            userId={userProfile?.userId}
            isGuest={userProfile?.isGuest}
            avatarUrl={userProfile?.avatarUrl}
            accountSettingsRoute={userProfile?.accountSettingsRoute}
            onPress={userProfile?.onPress}
          />
        )}

        {features.appearance && (
          <SettingsSection title={t("settings.sections.app.title")}>
            <SettingItem
              icon={Palette}
              title={t("settings.appearance.title")}
              value={t("settings.appearance.description")}
              onPress={() => navigation.navigate("Appearance" as never)}
            />
          </SettingsSection>
        )}

        {features.notifications && (
          <SettingsSection title={t("settings.sections.general")}>
            <SettingItem
              icon={Bell}
              title={t("settings.notifications.title")}
              showSwitch={true}
              switchValue={notificationsEnabled}
              onSwitchChange={handleNotificationsToggle}
              isLast={true}
            />
          </SettingsSection>
        )}

        {(features.about || features.legal) && (
          <SettingsSection title={t("settings.sections.about")}>
            {features.about && (
              <SettingItem
                icon={Info}
                title={t("settings.about.title")}
                value={t("settings.about.description")}
                onPress={() => navigation.navigate("About" as never)}
              />
            )}
            {features.legal && (
              <SettingItem
                icon={FileText}
                title={t("settings.legal.title")}
                value={t("settings.legal.description")}
                onPress={() => navigation.navigate("Legal" as never)}
                isLast={true}
              />
            )}
          </SettingsSection>
        )}

        {!hasAnyFeatures && (
          <View style={styles.emptyContainer}>
            <SettingsSection
              title={t("settings.noOptionsAvailable") || "No settings available"}
            >
              <View />
            </SettingsSection>
          </View>
        )}

        {showFooter && <SettingsFooter versionText={footerText} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    paddingVertical: 24,
  },
});
