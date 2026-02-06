/**
 * Navigation Translations Utility
 * Creates translation objects for navigation screens
 */

export const createNotificationTranslations = (t: (key: string) => string) => ({
  screenTitle: t("settings.notifications.title"),
  masterToggleTitle: t("settings.notifications.masterToggleTitle"),
  masterToggleDescription: t("settings.notifications.masterToggleDescription"),
  soundTitle: t("settings.notifications.soundTitle"),
  soundDescription: t("settings.notifications.soundDescription"),
  vibrationTitle: t("settings.notifications.vibrationTitle"),
  vibrationDescription: t("settings.notifications.vibrationDescription"),
  remindersTitle: t("settings.notifications.remindersTitle"),
  remindersDescription: t("settings.notifications.remindersDescription"),
  quietHoursTitle: t("settings.notifications.quietHoursTitle"),
  quietHoursDescription: t("settings.notifications.quietHoursDescription"),
});

export const createQuietHoursTranslations = (t: (key: string) => string) => ({
  title: t("settings.notifications.quietHours.title"),
  description: t("settings.notifications.quietHours.description"),
  startTimeLabel: t("settings.notifications.quietHours.startTimeLabel"),
  endTimeLabel: t("settings.notifications.quietHours.endTimeLabel"),
  enabledLabel: t("settings.notifications.quietHours.enabledLabel"),
});

export const createLegalScreenProps = (
  t: any,
  handlePrivacyPress: () => void,
  handleTermsPress: () => void,
  handleEulaPress: () => void
) => ({
  title: t("settings.legal.title"),
  description: t("settings.legal.description"),
  documentsHeader: t("settings.legal.documentsHeader"),
  privacyTitle: t("settings.legal.privacyTitle"),
  privacyDescription: t("settings.legal.privacyDescription"),
  termsTitle: t("settings.legal.termsTitle"),
  termsDescription: t("settings.legal.termsDescription"),
  eulaTitle: t("settings.legal.eulaTitle"),
  eulaDescription: t("settings.legal.eulaDescription"),
  onPrivacyPress: handlePrivacyPress,
  onTermsPress: handleTermsPress,
  onEulaPress: handleEulaPress,
});
