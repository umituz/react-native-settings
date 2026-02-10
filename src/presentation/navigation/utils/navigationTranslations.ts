import type { SettingsTranslations } from "../../screens/types/SettingsConfig";

export const createNotificationTranslations = (translations?: SettingsTranslations["features"]) => ({
  screenTitle: translations?.notifications?.title || "",
  masterToggleTitle: translations?.notifications?.masterToggleTitle || "",
  masterToggleDescription: translations?.notifications?.masterToggleDescription || "",
  soundTitle: translations?.notifications?.soundTitle || "",
  soundDescription: translations?.notifications?.soundDescription || "",
  vibrationTitle: translations?.notifications?.vibrationTitle || "",
  vibrationDescription: translations?.notifications?.vibrationDescription || "",
  remindersTitle: translations?.notifications?.remindersTitle || "",
  remindersDescription: translations?.notifications?.remindersDescription || "",
  quietHoursTitle: translations?.notifications?.quietHoursTitle || "",
  quietHoursDescription: translations?.notifications?.quietHoursDescription || "",
});

export const createQuietHoursTranslations = (translations?: SettingsTranslations["features"]) => ({
  title: translations?.notifications?.quietHours?.title || "",
  description: translations?.notifications?.quietHours?.description || "",
  startTimeLabel: translations?.notifications?.quietHours?.startTimeLabel || "",
  endTimeLabel: translations?.notifications?.quietHours?.endTimeLabel || "",
  enabledLabel: translations?.notifications?.quietHours?.enabledLabel || "",
});

export const createLegalScreenProps = (
  translations: SettingsTranslations["features"],
  handlePrivacyPress: () => void,
  handleTermsPress: () => void,
  handleEulaPress: () => void
) => ({
  title: translations?.legal?.title || "",
  description: translations?.legal?.description || "",
  documentsHeader: translations?.legal?.documentsHeader || "",
  privacyTitle: translations?.legal?.privacyTitle || "",
  privacyDescription: translations?.legal?.privacyDescription || "",
  termsTitle: translations?.legal?.termsTitle || "",
  termsDescription: translations?.legal?.termsDescription || "",
  eulaTitle: translations?.legal?.eulaTitle || "",
  eulaDescription: translations?.legal?.eulaDescription || "",
  onPrivacyPress: handlePrivacyPress,
  onTermsPress: handleTermsPress,
  onEulaPress: handleEulaPress,
});
