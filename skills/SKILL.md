---
name: setup-react-native-settings
description: Sets up settings screens and navigation for React Native apps with localization, appearance, notifications, gamification, and more. Triggers on: Setup settings, install settings package, SettingsStackNavigator, settings screen, localization, i18n, theme switching, notifications setup.
---

# Setup React Native Settings

Comprehensive setup for `@umituz/react-native-settings` - Complete settings hub with multiple screens.

## Overview

This skill handles everything needed to integrate a settings system into your React Native or Expo app:
- Package installation and updates
- Settings stack navigation
- Localization/i18n setup
- Appearance/theme switching
- Notification settings
- Gamification/achievements
- FAQs and feedback forms
- Legal screens

## Quick Start

Just say: **"Setup settings screens in my app"** and this skill will handle everything.

**Settings Screens Included:**
- Main settings (with sections)
- Localization/language
- Appearance/theme
- Notification reminders
- Gamification/achievements
- Star ratings & app store prompts
- FAQs
- Feedback forms
- About screen
- Legal screens (privacy, terms)

## When to Use

Invoke this skill when you need to:
- Install @umituz/react-native-settings
- Set up settings navigation
- Add settings screens
- Configure localization/i18n
- Add theme switching
- Implement notification preferences
- Add gamification features

## Step 1: Analyze the Project

### Check package.json

```bash
cat package.json | grep "@umituz/react-native-settings"
npm list @umituz/react-native-settings
```

### Detect Project Type

```bash
cat app.json | grep -q "expo" && echo "Expo" || echo "Bare RN"
```

## Step 2: Install Package

### Install or Update

```bash
npm install @umituz/react-native-settings@latest
```

### Install Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack

# State management
npm install @tanstack/react-query zustand

# Design system
npm install @umituz/react-native-design-system

# Localization
npm install i18next react-i18next

# Firebase (if using cloud sync)
npm install firebase

# Expo modules
npx expo install expo-constants expo-device expo-haptics expo-localization expo-notifications expo-store-review

# Safe areas
npx expo install react-native-safe-area-context
```

## Step 3: Set Up Settings Stack

### Configure Settings Navigator

In your navigation structure:

```typescript
import { SettingsStackNavigator } from '@umituz/react-native-settings';
import { useSettingsScreenConfig } from '@umituz/react-native-settings';

export function SettingsTab() {
  const settingsConfig = useSettingsScreenConfig({
    // App info
    appInfo: {
      name: 'My App',
      version: '1.0.0',
      buildNumber: '100',
    },

    // Legal URLs
    legalUrls: {
      privacy: 'https://example.com/privacy',
      terms: 'https://example.com/terms',
    },

    // Support email
    supportEmail: 'support@example.com',

    // Enable/disable screens
    showLocalization: true,
    showAppearance: true,
    showNotifications: true,
    showGamification: true,
    showFAQs: true,
    showFeedback: true,
  });

  return (
    <SettingsStackNavigator
      config={settingsConfig}
      screenOptions={{
        headerShown: true,
      }}
    />
  );
}
```

### Check If Already Configured

```bash
grep -r "SettingsStackNavigator" app/ src/ 2>/dev/null
```

## Step 4: Configure Localization

### Set Up i18next

In your app entry point:

```typescript
import I18n from '@umituz/react-native-settings/locales/i18n';
import { useLocalization } from '@umituz/react-native-settings';

// Initialize i18next
I18n.init();

export default function RootLayout() {
  const { locale, setLocale, loadResources } = useLocalization();

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <LocalizationProvider>
      <Stack>{/* your screens */}</Stack>
    </LocalizationProvider>
  );
}
```

### Add Translations

```typescript
// locales/en.json
{
  "settings": {
    "title": "Settings",
    "appearance": "Appearance",
    "notifications": "Notifications",
    "language": "Language"
  }
}

// locales/tr.json
{
  "settings": {
    "title": "Ayarlar",
    "appearance": "Görünüm",
    "notifications": "Bildirimler",
    "language": "Dil"
  }
}
```

## Step 5: Configure Appearance

### Theme Switching

```typescript
import { useAppearance } from '@umituz/react-native-settings';

export function AppearanceScreen() {
  const { theme, setTheme, isDarkMode } = useAppearance();

  return (
    <View>
      <SegmentedControl
        values={['light', 'dark', 'system']}
        selectedIndex={theme === 'light' ? 0 : theme === 'dark' ? 1 : 2}
        onChange={(event) => {
          const index = event.nativeEvent.selectedSegmentIndex;
          setTheme(['light', 'dark', 'system'][index]);
        }}
      />
    </View>
  );
}
```

## Step 6: Configure Notifications

### Notification Preferences

```typescript
import { useNotificationSettings } from '@umituz/react-native-settings';

export function NotificationSettingsScreen() {
  const {
    enabled,
    quietHours,
    setEnabled,
    setQuietHours,
  } = useNotificationSettings();

  return (
    <View>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
      />
      <Text>Quiet Hours</Text>
      <TimePicker
        value={quietHours.start}
        onChange={setQuietHours}
      />
    </View>
  );
}
```

## Step 7: Gamification Features

### Achievements

```typescript
import { useGamification } from '@umituz/react-native-settings';

export function AchievementsScreen() {
  const { achievements, unlockAchievement, progress } = useGamification();

  return (
    <FlatList
      data={achievements}
      renderItem={({ item }) => (
        <AchievementCard
          title={item.title}
          description={item.description}
          unlocked={item.unlocked}
          progress={progress[item.id]}
        />
      )}
    />
  );
}
```

### Star Ratings

```typescript
import { StarRating } from '@umituz/react-native-settings/components';

export function RatingPrompt() {
  const { requestRating } = useStarRating({
    daysUntilPrompt: 7,
    usesUntilPrompt: 5,
  });

  useEffect(() => {
    requestRating();
  }, []);

  return null; // Shows automatic prompt
}
```

## Step 8: FAQs Screen

### Configure FAQs

```typescript
import { FAQScreen } from '@umituz/react-native-settings';

export function SettingsFAQScreen() {
  const faqs = [
    {
      id: '1',
      question: 'How do I change my language?',
      answer: 'Go to Settings > Language and select your preferred language.',
      category: 'general',
    },
    {
      id: '2',
      question: 'How do I enable notifications?',
      answer: 'Go to Settings > Notifications and enable the types of notifications you want.',
      category: 'notifications',
    },
  ];

  return <FAQScreen faqs={faqs} />;
}
```

## Step 9: Verify Setup

### Run the App

```bash
npx expo start
# or
npx react-native run-ios
```

### Verification Checklist

- ✅ Package installed
- ✅ All dependencies installed
- ✅ Settings stack renders
- ✅ Localization works
- ✅ Theme switching works
- ✅ Notifications work
- ✅ Gamification features work

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing navigation dependencies | Install @react-navigation/native and @react-navigation/stack |
| i18next not configured | Initialize I18n.init() in app entry point |
| Theme not applying | Ensure DesignSystemProvider wraps the settings stack |
| Notifications not working | Request notification permissions first |
| FAQs not showing | Pass FAQs array to FAQScreen component |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"SettingsStackNavigator not found"** | Ensure package is installed and imported correctly |
| **"i18next not working"** | Check I18n.init() is called and translations are loaded |
| **"Theme not switching"** | Ensure DesignSystemProvider is configured for theme switching |
| **"Notifications not prompting"** | Request notification permissions before showing settings |
| **"Gamification not tracking"** | Check Firebase/firestore setup for achievement storage |

## Summary

After setup, provide:

1. ✅ Package version installed
2. ✅ Dependencies added
3. ✅ Settings stack location
4. ✅ Localization configured
5. ✅ Screens configured
6. ✅ Verification status

---

**Compatible with:** @umituz/react-native-settings@latest
**Platforms:** React Native (Expo & Bare)
**Dependencies:** @react-navigation/*, i18next, react-i18next, expo-*, @umituz/react-native-design-system
