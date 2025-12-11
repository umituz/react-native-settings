/**
 * @umituz/react-native-settings - Public API
 *
 * Settings management for React Native apps
 * User preferences, theme, language, notifications
 *
 * Usage:
 *   import { useSettings, useSettingsStore, SettingsScreen, AppearanceScreen, LanguageSelectionScreen, SettingItem, DisclaimerSetting } from '@umituz/react-native-settings';
 */
export type { ISettingsRepository, UserSettings, SettingsError, SettingsResult, } from './domain/repositories/ISettingsRepository';
export { useSettingsStore, useSettings, } from './infrastructure/storage/SettingsStore';
export { SettingsScreen } from './presentation/screens/SettingsScreen';
export type { SettingsScreenProps } from './presentation/screens/SettingsScreen';
export { AppearanceScreen } from './presentation/screens/AppearanceScreen';
export type { SettingsConfig, CustomSettingsSection } from './presentation/screens/types';
export { SettingItem } from './presentation/components/SettingItem';
export type { SettingItemProps } from './presentation/components/SettingItem';
export { SettingsSection } from './presentation/components/SettingsSection';
export type { SettingsSectionProps } from './presentation/components/SettingsSection';
export { SettingsFooter } from './presentation/components/SettingsFooter';
export type { SettingsFooterProps } from './presentation/components/SettingsFooter';
export { UserProfileHeader } from './presentation/components/UserProfileHeader';
export type { UserProfileHeaderProps } from './presentation/components/UserProfileHeader';
export { DisclaimerSetting } from './presentation/components/DisclaimerSetting';
export type { DisclaimerSettingProps } from './presentation/components/DisclaimerSetting';
export { CloudSyncSetting } from './presentation/components/CloudSyncSetting';
export type { CloudSyncSettingProps } from './presentation/components/CloudSyncSetting';
export { StorageClearSetting } from './presentation/components/StorageClearSetting';
export type { StorageClearSettingProps } from './presentation/components/StorageClearSetting';
//# sourceMappingURL=index.d.ts.map