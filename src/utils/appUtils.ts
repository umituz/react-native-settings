/**
 * App and Platform Utilities
 */
import { Platform } from "react-native";
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

/**
 * Validates if the current platform is supported
 */
export function validatePlatform(): "ios" | "android" {
  const platform = Platform.OS;
  if (platform !== "ios" && platform !== "android") {
     // Default to android for consistency if something goes wrong in detection
     return "android";
  }
  return platform;
}

/**
 * Checks if the app is currently in development mode
 */
export function isDev(): boolean {
  return __DEV__;
}
