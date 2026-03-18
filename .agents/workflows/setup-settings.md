---
description: Sets up or updates the @umituz/react-native-settings package in a React Native app with its localization, appearance, and generic settings stack.
---

# Settings Hub Setup Skill

When this workflow/skill is invoked, follow these precise steps to set up or update the `@umituz/react-native-settings` package in the target project.

## Step 1: Check and Update `package.json`
- Read the target project's `package.json` file.
- Check if `@umituz/react-native-settings` is present in `dependencies`.
  - If missing: Install it via `npm install @umituz/react-native-settings`.
  - If outdated: Update it to the latest version.

## Step 2: Ensure Peer Dependencies
This package requires several core navigation, localization, and Expo dependencies. Check `package.json` and install the missing ones using the appropriate package manager (e.g. `npx expo install` for Expo packages):
- `@react-navigation/native` & `@react-navigation/stack`
- `@tanstack/react-query` & `zustand`
- `@umituz/react-native-design-system`
- `i18next` & `react-i18next`
- `firebase`
- `expo-constants`, `expo-device`, `expo-haptics`, `expo-localization`, `expo-notifications`, `expo-store-review`
- `react-native-safe-area-context`

// turbo
## Step 3: Run Pod Install (If bare React Native)
If the project has an `ios/` folder and a `Podfile`, run:
```bash
cd ios && pod install
```

## Step 4: Setup Settings Stack / Boilerplate
- Locate the main navigation or settings screen file (e.g. `src/navigation/MainTabNavigator` or `app/settings.tsx`).
- Introduce `SettingsStackNavigator` to the navigation flow. 
- Example boilerplate to inject:
  ```typescript
  import { SettingsStackNavigator } from '@umituz/react-native-settings';
  
  // Basic usage:
  <SettingsStackNavigator 
    appInfo={{ name: 'My App', version: '1.0.0' }}
    legalUrls={{ privacy: 'https://...', terms: 'https://...' }}
  />
  ```
- Make sure `i18next` configurations are correctly mapped if they need to be injected into the root.

## Step 5: Summary
State clearly what is updated and initialized. List the files that have been modified for the Settings Hub and which peer dependencies were installed.
