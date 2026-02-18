/**
 * App and Platform Utilities
 */
import Constants from "expo-constants";

/**
 * Gets the current app version from Expo constants
 */
export function getAppVersion(): string {
  const version = Constants.expoConfig?.version ?? Constants.manifest2?.extra?.expoClient?.version;
  if (!version) {
    // Return a default if not found
    return "1.0.0";
  }
  return version;
}



