/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */

import React from "react";
import { View, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { AtomicIcon } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsFooter } from "../components/SettingsFooter";
import { UserProfileHeader } from "../components/UserProfileHeader";
import { SettingsSection } from "../components/SettingsSection";
import { AppearanceSection } from "./components/AppearanceSection";
import { LanguageSection } from "./components/LanguageSection";
import { NotificationsSection } from "./components/NotificationsSection";
import { AboutLegalSection } from "./components/AboutLegalSection";
import { normalizeSettingsConfig } from "./utils/normalizeConfig";
import { useFeatureDetection } from "./hooks/useFeatureDetection";
import type { CustomSettingsSection } from "./types";

export interface SettingsScreenProps {
  config?: any;
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
  /** Custom sections to render */
  customSections?: CustomSettingsSection[];
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Custom close handler */
  onClose?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  config = {},
  showUserProfile = false,
  userProfile,
  showFooter = true,
  footerText,
  customSections = [],
  showCloseButton = false,
  onClose,
}) => {
  const navigation = useNavigation();
  const { themeMode } = useDesignSystemTheme();
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();

  const isDark = themeMode === "dark";
  const colors = tokens.colors;
  const spacing = tokens.spacing;

  const normalizedConfig = normalizeSettingsConfig(config);
  const features = useFeatureDetection(normalizedConfig, navigation);

  const hasAnyFeatures =
    features.appearance ||
    features.language ||
    features.notifications ||
    features.about ||
    features.legal ||
    customSections.length > 0;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {showCloseButton && (
        <View
          style={[
            styles.closeButtonContainer,
            {
              paddingTop: insets.top + spacing.xs,
              paddingRight: spacing.md,
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleClose}
            style={[
              styles.closeButton,
              {
                backgroundColor: colors.surface,
              },
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AtomicIcon name="X" size="lg" color="primary" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: showCloseButton ? spacing.md : insets.top + spacing.md,
            paddingBottom: spacing.xxxl + spacing.xl,
            paddingHorizontal: 0,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {showUserProfile && (
          <View style={styles.profileContainer}>
            <UserProfileHeader
              displayName={userProfile?.displayName}
              userId={userProfile?.userId}
              isGuest={userProfile?.isGuest}
              avatarUrl={userProfile?.avatarUrl}
              accountSettingsRoute={userProfile?.accountSettingsRoute}
              onPress={userProfile?.onPress}
            />
          </View>
        )}

        {features.appearance && (
          <AppearanceSection config={normalizedConfig.appearance.config} />
        )}

        {features.language && (
          <LanguageSection config={normalizedConfig.language.config} />
        )}

        {features.notifications && (
          <NotificationsSection config={normalizedConfig.notifications.config} />
        )}

        {(features.about || features.legal) && (
          <AboutLegalSection
            showAbout={features.about}
            showLegal={features.legal}
            aboutConfig={normalizedConfig.about.config}
            legalConfig={normalizedConfig.legal.config}
          />
        )}

        {customSections && customSections.length > 0 && (
          <>
            {Array.from(customSections)
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((section, index) => (
                <SettingsSection
                  key={section.id || `custom-${index}`}
                  title={section.title}
                >
                  {section.content}
                </SettingsSection>
              ))}
          </>
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
  closeButtonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    alignItems: "flex-end",
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileContainer: {
    marginBottom: 32,
    paddingHorizontal: 0,
  },
  emptyContainer: {
    paddingVertical: 24,
  },
});
