# @umituz/react-native-settings

Comprehensive settings management for React Native apps with modular domain-based architecture.

## 🌟 Features

### Core Features
- ✅ **User Settings Management** - Theme, language, notifications, privacy settings
- ✅ **Zustand State Management** - Global settings state with Zustand
- ✅ **Persistent Storage** - Uses @umituz/react-native-storage for persistence
- ✅ **Settings Screens** - Pre-built settings screens with modular architecture
- ✅ **Setting Components** - Reusable setting item components
- ✅ **Type-Safe** - Full TypeScript support

### Domain Features
- 🎨 **Appearance** - Theme customization (light/dark mode), custom color schemes
- ℹ️ **About** - App information, version details, developer contact
- ⚖️ **Legal** - Privacy policy, terms of service, legal documents
- ⚠️ **Disclaimer** - Legal notices, warnings, important information
- 💬 **Feedback** - User feedback forms, support resources
- ❓ **FAQs** - Searchable frequently asked questions
- ⭐ **Rating** - Star rating system with statistics
- 🎥 **Video Tutorials** - Tutorial browser with featured content
- ☁️ **Cloud Sync** - Sync status and management
- 🛠️ **Dev Tools** - Development utilities (DEV mode only)

## Installation

```bash
npm install @umituz/react-native-settings
```

## Peer Dependencies

```bash
npm install zustand @umituz/react-native-storage @umituz/react-native-design-system @umituz/react-native-localization @react-navigation/native @react-navigation/stack react-native-safe-area-context expo-linear-gradient
```

## Usage

### Basic Settings Hook

```tsx
import { useSettings } from '@umituz/react-native-settings';

const MyComponent = () => {
  const { settings, loading, updateSettings, loadSettings } = useSettings();

  useEffect(() => {
    loadSettings('user123');
  }, []);

  const handleThemeChange = async () => {
    await updateSettings({ theme: 'dark' });
  };

  return (
    <View>
      <AtomicText>Current Theme: {settings?.theme}</AtomicText>
      <AtomicButton onPress={handleThemeChange}>Toggle Theme</AtomicButton>
    </View>
  );
};
```

### Settings Screen

```tsx
import { SettingsScreen } from '@umituz/react-native-settings';

// Basic usage in navigation
<Stack.Screen name="Settings" component={SettingsScreen} />
```

### Settings Item Card

```tsx
import { SettingsItemCard } from '@umituz/react-native-settings';

// Basic setting item
<SettingsItemCard
  icon="brush-outline"
  title="Appearance"
  description="Theme and language settings"
  onPress={() => navigation.navigate('Appearance')}
/>

// With switch
<SettingsItemCard
  icon="notifications-outline"
  title="Notifications"
  showSwitch={true}
  switchValue={enabled}
  onSwitchChange={setEnabled}
/>
```

### Settings Section

```tsx
import { SettingsSection, SettingsItemCard } from '@umituz/react-native-settings';

<SettingsSection title="APP SETTINGS">
  <SettingsItemCard
    icon="brush-outline"
    title="Appearance"
    description="Theme and language settings"
    onPress={() => navigation.navigate('Appearance')}
  />
  <SettingsItemCard
    icon="notifications-outline"
    title="Notifications"
    showSwitch={true}
    switchValue={enabled}
    onSwitchChange={setEnabled}
  />
</SettingsSection>
```

### User Profile Header Component

```tsx
import { UserProfileHeader } from '@umituz/react-native-settings';

<UserProfileHeader
  displayName="John Doe"
  userId="user123"
  isGuest={false}
  avatarUrl="https://example.com/avatar.jpg"
  accountSettingsRoute="AccountSettings"
  onPress={() => navigation.navigate('AccountSettings')}
/>
```

### Settings Footer Component

```tsx
import { SettingsFooter } from '@umituz/react-native-settings';

<SettingsFooter versionText="Version 1.0.0" />
```

### Disclaimer Setting Component

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

// Basic usage with translation keys
<DisclaimerSetting />

// Custom props
<DisclaimerSetting
  titleKey="custom.disclaimer.title"
  messageKey="custom.disclaimer.message"
  shortMessageKey="custom.disclaimer.shortMessage"
  iconName="Info"
  iconColor="#F59E0B"
  modalTitle="Custom Disclaimer"
  modalContent="This is a custom disclaimer message for your app."
/>
```

### Cloud Sync Setting Component

```tsx
import { CloudSyncSetting } from '@umituz/react-native-settings';

// Basic usage
<CloudSyncSetting />

// With custom props
<CloudSyncSetting
  title="Cloud Sync"
  description="Sync your data across devices"
  isSyncing={false}
  lastSynced={new Date()}
  onPress={() => handleSync()}
  iconColor="#3B82F6"
/>
```

### Settings Error Boundary

```tsx
import { SettingsErrorBoundary } from '@umituz/react-native-settings';

<SettingsErrorBoundary
  fallbackTitle="custom.error.title"
  fallbackMessage="custom.error.message"
>
  <YourSettingsComponents />
</SettingsErrorBoundary>
```

## API Reference

### `useSettings()`

React hook for accessing settings state.

**Returns:**
- `settings: UserSettings | null` - Current settings
- `loading: boolean` - Loading state
- `error: string | null` - Error message
- `loadSettings(userId: string)` - Load settings for user
- `updateSettings(updates: Partial<UserSettings>)` - Update settings
- `resetSettings(userId: string)` - Reset to default settings
- `clearError()` - Clear error state

### `useSettingsStore()`

Direct access to Zustand store.

### `SettingsScreen`

Modern settings screen with organized sections and optional user profile header.

**Props:**
- `config?: SettingsConfig` - Configuration for which features to show
- `showUserProfile?: boolean` - Show user profile header
- `userProfile?: UserProfileHeaderProps` - User profile props
- `showFooter?: boolean` - Show footer with version
- `footerText?: string` - Custom footer text

### `AppearanceScreen`

Appearance settings screen with language and theme controls.

### `LanguageSelectionScreen`

Language selection screen with search functionality.

### `SettingsItemCard`

Modern settings item component with Ionicons support and switch support.

**Props:**
- `icon: IconName` - Icon name from Ionicons
- `title: string` - Main title text
- `description?: string` - Optional description/value text (shown below title)
- `onPress?: () => void` - Callback when pressed
- `showSwitch?: boolean` - Show switch instead of chevron
- `switchValue?: boolean` - Switch value
- `onSwitchChange?: (value: boolean) => void` - Switch change handler
- `iconColor?: string` - Custom icon color
- `iconBgColor?: string` - Custom icon background color
- `rightIcon?: IconName` - Custom right icon (defaults to chevron-forward)
- `disabled?: boolean` - Disable the item

### `SettingsSection`

Section container with title and styled content area.

**Props:**
- `title: string` - Section title (uppercase)
- `children: React.ReactNode` - Section content

### `UserProfileHeader`

User profile header with avatar, name, and ID.

**Props:**
- `displayName?: string` - User display name
- `userId?: string` - User ID
- `isGuest?: boolean` - Whether user is guest
- `avatarUrl?: string` - Custom avatar URL
- `accountSettingsRoute?: string` - Navigation route for account settings
- `onPress?: () => void` - Custom onPress handler

### `SettingsFooter`

Footer component displaying app version.

**Props:**
- `versionText?: string` - Custom version text (optional)

### `DisclaimerSetting`

Disclaimer component with modal display for legal notices.

**Props:**
- `titleKey?: string` - Translation key for title (default: "settings.disclaimer.title")
- `messageKey?: string` - Translation key for message (default: "settings.disclaimer.message")
- `shortMessageKey?: string` - Translation key for short message (default: "settings.disclaimer.shortMessage")
- `iconName?: string` - Icon name (default: "AlertTriangle")
- `iconColor?: string` - Custom icon color
- `backgroundColor?: string` - Custom background color
- `modalTitle?: string` - Custom modal title (overrides translation)
- `modalContent?: string` - Custom modal content (overrides translation)

### `CloudSyncSetting`

Cloud sync setting component with status display.

**Props:**
- `title?: string` - Custom title (default: "cloud_sync" translation key)
- `description?: string` - Custom description
- `isSyncing?: boolean` - Whether currently syncing
- `lastSynced?: Date | null` - Last sync time
- `onPress?: () => void` - Press handler
- `iconColor?: string` - Custom icon color
- `titleColor?: string` - Custom title color

### `DisclaimerCard`

Card component for disclaimer display (used internally by DisclaimerSetting).

### `DisclaimerModal`

Modal component for full disclaimer display (used internally by DisclaimerSetting).

### `SettingsErrorBoundary`

Error boundary component for settings screens.

**Props:**
- `children: ReactNode` - Child components
- `fallback?: ReactNode` - Custom fallback component
- `fallbackTitle?: string` - Custom error title translation key
- `fallbackMessage?: string` - Custom error message translation key

## Types

- `UserSettings` - User settings interface
- `SettingsError` - Settings error interface
- `SettingsResult<T>` - Result type for settings operations
- `ISettingsRepository` - Repository interface

## UserSettings Interface

```typescript
interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  privacyMode: boolean;
  updatedAt: Date;
}
```

## Important Notes

⚠️ **Storage**: This package uses `@umituz/react-native-storage` for all storage operations. Make sure to install it as a peer dependency.

⚠️ **Navigation**: Settings screens require navigation setup. Make sure to add them to your navigation stack.

⚠️ **Translations**: Settings screens require i18n translations. Make sure to provide translations for settings keys.

⚠️ **Dynamic Text**: All text in this package uses translation keys to be app-agnostic. Provide translations like:
  - `cloud_sync`, `syncing`, `sync_to_cloud`, `never_synced`, `just_now`, `Xm_ago`, `Xh_ago`, `Xd_ago`
  - `error_boundary.title`, `error_boundary.message`, `error_boundary.dev_title`, `error_boundary.dev_message`
  - `settings.disclaimer.title`, `settings.disclaimer.message`, `settings.disclaimer.shortMessage`

⚠️ **Design System**: Uses @umituz/react-native-design-system packages for consistent styling across apps.

⚠️ **Development Logs**: All console logs are wrapped in `__DEV__` checks for production safety.

## Architecture

This package follows **Domain-Driven Design (DDD)** principles:

- **Domain Layer**: Repository interfaces and business entities
- **Infrastructure Layer**: Storage implementation with Zustand
- **Presentation Layer**: UI components and screens

### Key Principles

✅ **SOLID**: Single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion  
✅ **DRY**: No code duplication, reusable components  
✅ **KISS**: Simple, maintainable code  
✅ **200-line limit**: All files under 200 lines for maintainability  
✅ **TypeScript**: Full type safety  
✅ **Memory Leak Prevention**: Proper cleanup and error handling  
✅ **App-Agnostic**: No hardcoded app-specific text or logic  
✅ **Test Coverage**: Comprehensive test suite  

## Performance

- ✅ **Optimized Rendering**: React.memo and useMemo where appropriate
- ✅ **Memory Management**: Proper cleanup in useEffect hooks
- ✅ **Error Boundaries**: Prevent crashes and provide graceful fallbacks
- ✅ **Development Logs**: __DEV__ only logging for production safety

## Domain Documentation

Each domain has comprehensive documentation with usage examples, API references, and best practices:

- **[About Domain Documentation](./src/domains/about/README.md)** - App information, version details, contact information
- **[Appearance Domain Documentation](./src/domains/appearance/README.md)** - Theme management, dark mode, custom colors
- **[Legal Domain Documentation](./src/domains/legal/README.md)** - Privacy policy, terms of service, legal documents
- **[Disclaimer Domain Documentation](./src/domains/disclaimer/README.md)** - Legal notices, warnings, important information
- **[Feedback Domain Documentation](./src/domains/feedback/README.md)** - Feedback forms, support resources
- **[FAQs Domain Documentation](./src/domains/faqs/README.md)** - Searchable FAQ system
- **[Rating Domain Documentation](./src/domains/rating/README.md)** - Star rating component
- **[Video Tutorials Domain Documentation](./src/domains/video-tutorials/README.md)** - Video tutorial browser
- **[Cloud Sync Domain Documentation](./src/domains/cloud-sync/README.md)** - Cloud sync status and management
- **[Dev Domain Documentation](./src/domains/dev/README.md)** - Development utilities (DEV mode only)

## Quick Start Examples

### Complete Settings App

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SettingsScreen,
  AppearanceScreen,
  AboutScreen,
  LegalScreen,
  FAQScreen,
} from '@umituz/react-native-settings';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Appearance" component={AppearanceScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Legal" component={LegalScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Custom Settings Screen

```tsx
import { SettingsSection, SettingsItemCard } from '@umituz/react-native-settings';

function CustomSettingsScreen() {
  return (
    <ScreenLayout>
      <SettingsSection title="PREFERENCES">
        <SettingsItemCard
          icon="moon-outline"
          title="Dark Mode"
          showSwitch={true}
          switchValue={isDarkMode}
          onSwitchChange={setDarkMode}
        />
        <SettingsItemCard
          icon="globe-outline"
          title="Language"
          description="English"
          onPress={() => {}}
        />
      </SettingsSection>

      <SettingsSection title="SUPPORT">
        <SettingsItemCard
          icon="help-circle-outline"
          title="Help & FAQs"
          onPress={() => navigation.navigate('FAQ')}
        />
        <SettingsItemCard
          icon="chatbubble-outline"
          title="Send Feedback"
          onPress={() => navigation.navigate('Feedback')}
        />
      </SettingsSection>
    </ScreenLayout>
  );
}
```

## Project Structure

```
src/
├── domains/                    # Feature domains (DDD architecture)
│   ├── about/                  # App information & about
│   ├── appearance/             # Theme & appearance settings
│   ├── legal/                  # Privacy policy & terms
│   ├── disclaimer/             # Legal disclaimers
│   ├── feedback/               # User feedback system
│   ├── faqs/                   # FAQ management
│   ├── rating/                 # Rating system
│   ├── video-tutorials/        # Video tutorials
│   ├── cloud-sync/             # Cloud synchronization
│   └── dev/                    # Development tools
├── presentation/               # Shared UI components
│   ├── screens/               # Settings screens
│   ├── components/            # Reusable components
│   └── hooks/                 # Shared hooks
├── application/               # Application logic
├── infrastructure/            # External dependencies
└── index.ts                   # Main exports
```

## Version History

- **v4.20.56**: Added comprehensive domain documentation with README files for each feature
- **v4.20.55**: Enhanced domain structure with individual README documentation
- **v4.20.54**: Refactored package structure - split files under 200 lines
- **v2.2.0**: Major refactor - removed hardcoded text, improved architecture, added comprehensive tests
- **v2.1.0**: Enhanced component structure and TypeScript support
- **v2.0.0**: Breaking changes - removed LanguageSelectionScreen, improved API
- **v1.x.x**: Initial releases with basic settings functionality

## Contributing

When contributing to this package:
1. Follow the domain-driven design structure
2. Keep files under 200 lines
3. Add tests for new features
4. Update relevant domain README
5. Follow TypeScript best practices

## License

MIT

## Author

Ümit UZ <umit@umituz.com>

---

**Made with ❤️ for the React Native community**

