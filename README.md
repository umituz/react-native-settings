# @umituz/react-native-settings

Settings management for React Native apps - user preferences, theme, language, notifications.

## Features

- ✅ **User Settings Management** - Theme, language, notifications, privacy settings
- ✅ **Zustand State Management** - Global settings state with Zustand
- ✅ **Persistent Storage** - Uses @umituz/react-native-storage for persistence
- ✅ **Settings Screens** - Pre-built settings screens (Settings, Appearance, Language Selection)
- ✅ **Setting Components** - Reusable setting item components
- ✅ **Type-Safe** - Full TypeScript support

## Installation

```bash
npm install @umituz/react-native-settings
```

## Peer Dependencies

```bash
npm install zustand lucide-react-native @umituz/react-native-storage @umituz/react-native-design-system @umituz/react-native-design-system-atoms @umituz/react-native-design-system-organisms @umituz/react-native-design-system-theme @umituz/react-native-localization @umituz/react-native-appearance @react-navigation/native react-native-safe-area-context expo-linear-gradient
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
      <Text>Current Theme: {settings?.theme}</Text>
      <Button onPress={handleThemeChange}>Toggle Theme</Button>
    </View>
  );
};
```

### Settings Screen

```tsx
import { SettingsScreen } from '@umituz/react-native-settings';

// Basic usage
<Stack.Screen name="Settings" component={SettingsScreen} />

// With user profile header
<SettingsScreen
  showUserProfile={true}
  userProfile={{
    displayName: "John Doe",
    userId: "user123",
    isGuest: false,
    accountSettingsRoute: "AccountSettings",
  }}
  config={{
    appearance: true,
    notifications: true,
    about: true,
    legal: true,
  }}
/>
```

### Appearance Screen

```tsx
import { AppearanceScreen } from '@umituz/react-native-settings';

// In your navigation stack
<Stack.Screen name="Appearance" component={AppearanceScreen} />
```

### Language Selection Screen

```tsx
import { LanguageSelectionScreen } from '@umituz/react-native-settings';

// In your navigation stack
<Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
```

### Setting Item Component

```tsx
import { SettingItem } from '@umituz/react-native-settings';
import { Palette, Bell } from 'lucide-react-native';

// Basic setting item
<SettingItem
  icon={Palette}
  title="Appearance"
  value="Theme and language settings"
  onPress={() => navigation.navigate('Appearance')}
/>

// With switch
<SettingItem
  icon={Bell}
  title="Notifications"
  showSwitch={true}
  switchValue={enabled}
  onSwitchChange={setEnabled}
/>

// Custom colors
<SettingItem
  icon={Palette}
  title="Appearance"
  iconColor="#F59E0B"
  titleColor="#F59E0B"
  onPress={() => {}}
/>
```

### Settings Section Component

```tsx
import { SettingsSection, SettingItem } from '@umituz/react-native-settings';
import { Palette, Bell } from 'lucide-react-native';

<SettingsSection title="APP SETTINGS">
  <SettingItem
    icon={Palette}
    title="Appearance"
    value="Theme and language settings"
    onPress={() => navigation.navigate('Appearance')}
  />
  <SettingItem
    icon={Bell}
    title="Notifications"
    showSwitch={true}
    switchValue={enabled}
    onSwitchChange={setEnabled}
    isLast={true}
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

### `SettingItem`

Modern setting item component with Lucide icons and switch support.

**Props:**
- `icon: React.ComponentType` - Icon component from lucide-react-native
- `title: string` - Main title text
- `value?: string` - Optional description/value text (shown below title)
- `onPress?: () => void` - Callback when pressed
- `showSwitch?: boolean` - Show switch instead of chevron
- `switchValue?: boolean` - Switch value
- `onSwitchChange?: (value: boolean) => void` - Switch change handler
- `isLast?: boolean` - Is last item (no divider)
- `iconColor?: string` - Custom icon color
- `titleColor?: string` - Custom title color

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

## Version History

- **v2.2.0**: Major refactor - removed hardcoded text, improved architecture, added comprehensive tests
- **v2.1.0**: Enhanced component structure and TypeScript support
- **v2.0.0**: Breaking changes - removed LanguageSelectionScreen, improved API
- **v1.x.x**: Initial releases with basic settings functionality

## License

MIT

## Author

Ümit UZ <umit@umituz.com>

