import React, { useMemo } from 'react';
import type { StackScreen } from "@umituz/react-native-design-system/molecules";
import { LanguageSelectionScreen } from "../../../domains/localization";
import { NotificationSettingsScreen } from "../../../domains/notifications";
import { SettingsScreen } from "../../screens/SettingsScreen";
import { DisclaimerScreen } from "../../../domains/disclaimer/presentation/screens/DisclaimerScreen";
import { FeedbackScreen } from "../../../domains/feedback/presentation/screens/FeedbackScreen";
import { RatingPromptScreen } from "../../../domains/rating/presentation/screens/RatingPromptScreen";
import { AIConsentScreen } from "../../../domains/ai-consent/presentation/screens/AIConsentScreen";

// AccountScreen is an optional peer — lazy require so the package works without @umituz/react-native-auth
// Returns null if @umituz/react-native-auth is not installed
const getAccountScreen = (): React.ComponentType<Record<string, unknown>> | null => {
  try {
    return require("@umituz/react-native-auth").AccountScreen ?? null;
  } catch {
    // Auth package not available, silently return null
    return null;
  }
};
import { AppearanceScreen } from "../../screens/AppearanceScreen";
import { FAQScreen } from "../../../domains/faqs";
import { AboutScreen } from "../../../domains/about";
import { LegalScreen } from "../../../domains/legal";
import { GamificationScreen } from "../../../domains/gamification";
import { VideoTutorialsScreen } from "../../../domains/video-tutorials";
import { FeatureRequestScreen } from "../../../domains/feedback/presentation/screens/FeatureRequestScreen";
import {
  createScreenWithProps,
  convertAdditionalScreen,
  createConditionalScreen,
  combineScreens,
} from "../../utils/screenFactory";
import type { SettingsStackNavigatorProps } from "../types";
import type { AboutConfig } from "../../../domains/about/domain/entities/AppInfo";
import type { LegalScreenProps } from "../../../domains/legal/presentation/screens/LegalScreen";
import type {
  NotificationSettingsTranslations,
  QuietHoursTranslations
} from "../../../domains/notifications/infrastructure/services/types";

export interface UseSettingsScreensProps extends SettingsStackNavigatorProps {
  aboutConfig: AboutConfig;
  legalProps: LegalScreenProps;
  notificationTranslations: NotificationSettingsTranslations;
  quietHoursTranslations: QuietHoursTranslations;
  navigation?: Record<string, unknown>;
}

export const useSettingsScreens = (props: UseSettingsScreensProps): StackScreen[] => {
  const {
    appInfo,
    config,
    showUserProfile,
    userProfile,
    devSettings,
    customSections,
    showHeader,
    showCloseButton,
    onClose,
    aboutConfig,
    legalProps,
    notificationTranslations,
    quietHoursTranslations,
    faqData,
    additionalScreens,
    gamificationConfig,
    videoTutorialConfig,
    accountConfig,
    navigation,
  } = props;

  const translations = config?.translations;
  const featureTranslations = translations?.features;

  return useMemo(() => {
    const settingsMainScreen = createScreenWithProps(
      "SettingsMain",
      SettingsScreen,
      {
        config,
        appVersion: appInfo.version,
        showUserProfile,
        userProfile,
        devSettings,
        customSections,
        showHeader,
        showCloseButton,
        onClose,
        navigation,
      }
    );

    const appearanceScreen = {
      name: "Appearance",
      component: AppearanceScreen,
      options: { headerShown: false },
    };

    const aboutScreen = createScreenWithProps("About", AboutScreen, { config: aboutConfig });
    const legalScreen = createScreenWithProps("Legal", LegalScreen, legalProps);

    const notificationScreen = createScreenWithProps(
      "Notifications",
      NotificationSettingsScreen,
      {
        translations: notificationTranslations,
        quietHoursTranslations,
      }
    );

    const baseScreens: StackScreen[] = [
      settingsMainScreen,
      appearanceScreen,
      aboutScreen,
      legalScreen,
      notificationScreen,
    ];

    const faqScreen = createConditionalScreen(
      !!(faqData && faqData.categories?.length > 0),
      () => createScreenWithProps("FAQ", FAQScreen, {
        categories: faqData?.categories ?? [],
        searchPlaceholder: featureTranslations?.faqs?.searchPlaceholder || "",
        emptySearchTitle: featureTranslations?.faqs?.emptySearchTitle || "",
        emptySearchMessage: featureTranslations?.faqs?.emptySearchMessage || "",
        headerTitle: featureTranslations?.faqs?.headerTitle || "",
      })
    );

    const additionalStackScreens: StackScreen[] = (additionalScreens || []).map(convertAdditionalScreen);

    const gamificationScreen = createScreenWithProps("Gamification", GamificationScreen, { config: gamificationConfig });

    const languageScreen = createScreenWithProps("LanguageSelection", LanguageSelectionScreen, {
      headerTitle: featureTranslations?.language?.title || "",
      searchPlaceholder: featureTranslations?.languageSelection?.searchPlaceholder || "",
    });

    const accountScreen = createConditionalScreen(
      !!accountConfig && !!getAccountScreen(),
      () => {
        const AccountScreen = getAccountScreen();
        return AccountScreen ? createScreenWithProps("Account", AccountScreen, { config: accountConfig }) : null;
      }
    );

    const videoTutorialScreen = createScreenWithProps("VideoTutorial", VideoTutorialsScreen, {
      ...videoTutorialConfig,
      title: videoTutorialConfig?.title || featureTranslations?.videoTutorial?.title || "",
    });

    const featureRequestScreen = createScreenWithProps("FeatureRequest", FeatureRequestScreen, {
      config: {
        translations: translations?.feedback,
      },
      texts: {
        feedbackTypes: [
          { type: 'general', label: translations?.feedbackModal?.types?.general || 'General' },
          { type: 'bug_report', label: translations?.feedbackModal?.types?.bugReport || 'Bug Report' },
          { type: 'feature_request', label: translations?.feedbackModal?.types?.featureRequest || 'Feature Request' },
          { type: 'improvement', label: translations?.feedbackModal?.types?.improvement || 'Improvement' },
          { type: 'other', label: translations?.feedbackModal?.types?.other || 'Other' },
        ],
        ratingLabel: translations?.feedbackModal?.ratingLabel || 'How would you rate your experience?',
        descriptionPlaceholder: translations?.feedbackModal?.descriptionPlaceholder || 'Tell us more...',
        submitButton: translations?.feedbackModal?.submitButton || 'Submit',
        submittingButton: translations?.feedbackModal?.submittingButton || 'Submitting...',
        title: translations?.feedbackModal?.title || 'Submit Feedback',
        defaultTitle: (type: string) => {
          const titles: Record<string, string> = {
            general: translations?.feedbackModal?.types?.general || type,
            bug_report: translations?.feedbackModal?.types?.bugReport || type,
            feature_request: translations?.feedbackModal?.types?.featureRequest || type,
            improvement: translations?.feedbackModal?.types?.improvement || type,
            other: translations?.feedbackModal?.types?.other || type,
          };
          return titles[type] || type;
        },
      }
    });

    // New screens to replace modals
    const disclaimerScreen = {
      name: "Disclaimer" as const,
      component: DisclaimerScreen,
      options: { headerShown: false },
    };

    const feedbackScreen = {
      name: "Feedback" as const,
      component: FeedbackScreen,
      options: { headerShown: false },
    };

    const ratingPromptScreen = {
      name: "RatingPrompt" as const,
      component: RatingPromptScreen,
      options: { headerShown: false },
    };

    const aiConsentScreen = {
      name: "AIConsent" as const,
      component: AIConsentScreen,
      options: { headerShown: false },
    };

    return combineScreens(
      baseScreens,
      faqScreen,
      additionalStackScreens,
      gamificationScreen,
      languageScreen,
      accountScreen,
      videoTutorialScreen,
      featureRequestScreen,
      disclaimerScreen,
      feedbackScreen,
      ratingPromptScreen,
      aiConsentScreen
    );
  }, [
    translations,
    showHeader,
    showCloseButton,
    onClose,
    config,
    appInfo.version,
    showUserProfile,
    userProfile,
    devSettings,
    customSections,
    aboutConfig,
    legalProps,
    notificationTranslations,
    quietHoursTranslations,
    faqData,
    additionalScreens,
    gamificationConfig,
    videoTutorialConfig,
    accountConfig,
    navigation,
  ]);
};
