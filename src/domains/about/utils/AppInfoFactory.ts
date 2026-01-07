/**
 * AppInfo Factory Utility
 * Creates AppInfo objects from AboutConfig
 */
import { AppInfo, AboutConfig } from '../domain/entities/AppInfo';

/**
 * Creates a default AppInfo object from AboutConfig
 */
export const createDefaultAppInfo = (config: AboutConfig): AppInfo => ({
  name: config.appInfo?.name || '',
  version: config.appInfo?.version || '1.0.0',
  description: config.appInfo?.description,
  developer: config.appInfo?.developer,
  contactEmail: config.appInfo?.contactEmail,
  websiteUrl: config.appInfo?.websiteUrl,
  websiteDisplay: config.appInfo?.websiteDisplay,
  moreAppsUrl: config.appInfo?.moreAppsUrl,
});
