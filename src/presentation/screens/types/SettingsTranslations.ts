/**
 * Settings Translations Type
 * Defines all translation keys for the settings package
 */

/**
 * Global Settings Translations
 */
export interface SettingsTranslations {
  title?: string;
  profile?: {
    guest?: string;
    anonymousName?: string;
    signIn?: string;
    signInDescription?: string;
    anonymousBenefits?: {
      title?: string;
      items?: string[];
    };
  };
  sections?: {
    app?: string;
    progress?: string;
    about?: string;
    support?: string;
    subscription?: string;
  };
  features?: {
    appearance?: {
      title?: string;
      description?: string;
      themeModes?: {
        light?: string;
        dark?: string;
        auto?: string;
      };
    };
    language?: {
      title?: string;
      description?: string;
      searchPlaceholder?: string;
    };
    notifications?: {
      title?: string;
      description?: string;
      masterToggleTitle?: string;
      masterToggleDescription?: string;
      soundTitle?: string;
      soundDescription?: string;
      vibrationTitle?: string;
      vibrationDescription?: string;
      remindersTitle?: string;
      remindersDescription?: string;
      quietHoursTitle?: string;
      quietHoursDescription?: string;
      quietHours?: {
        title?: string;
        description?: string;
        startTimeLabel?: string;
        endTimeLabel?: string;
        enabledLabel?: string;
      };
    };
    about?: {
      title?: string;
      description?: string;
      contact?: string;
      more?: string;
      developer?: string;
      email?: string;
      website?: string;
      moreApps?: string;
      versionPrefix?: string;
    };
    legal?: {
      title?: string;
      description?: string;
      documentsHeader?: string;
      privacyTitle?: string;
      privacyDescription?: string;
      termsTitle?: string;
      termsDescription?: string;
      eulaTitle?: string;
      eulaDescription?: string;
    };
    feedback?: { title?: string; description?: string };
    rating?: { title?: string; description?: string };
    faqs?: {
      title?: string;
      description?: string;
      searchPlaceholder?: string;
      emptySearchTitle?: string;
      emptySearchMessage?: string;
      headerTitle?: string;
    };
    languageSelection?: {
      searchPlaceholder?: string;
    };
    subscription?: {
      title?: string;
      description?: string;
    };
    videoTutorial?: {
      title?: string;
      description?: string;
    };
    gamification?: {
      title?: string;
      description?: string;
    };
  };
  feedbackModal?: {
    title?: string;
    ratingLabel?: string;
    descriptionPlaceholder?: string;
    submitButton?: string;
    submittingButton?: string;
    types?: {
      general?: string;
      bugReport?: string;
      featureRequest?: string;
      improvement?: string;
      other?: string;
    };
  };
  noOptionsAvailable?: string;
  footer?: {
    version?: string;
  };
  errors?: {
    common?: string;
    unknown?: string;
    unknownError?: string;
    appStoreUrlMissing?: string;
    appStoreUrlNotConfigured?: string;
    unableToOpenAppStore?: string;
    failedToOpenAppStore?: string;
    deleteAccountError?: string;
  };
}
