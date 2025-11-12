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
npm install zustand @umituz/react-native-storage @umituz/react-native-design-system @umituz/react-native-design-system-theme @umituz/react-native-localization @umituz/react-native-notifications react-native-paper expo-linear-gradient
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

// In your navigation stack
<Stack.Screen name="Settings" component={SettingsScreen} />
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

<SettingItem
  icon="Palette"
  title="Theme"
  description="Change app theme"
  value="Dark"
  onPress={() => navigation.navigate('Appearance')}
  iconGradient={['#FF6B6B', '#4ECDC4']}
/>
```

### Disclaimer Setting Component

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

// In AboutScreen
<DisclaimerSetting />
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

Main settings screen component with sections for Appearance, General, About & Legal.

### `AppearanceScreen`

Appearance settings screen with language and theme controls.

### `LanguageSelectionScreen`

Language selection screen with search functionality.

### `SettingItem`

Reusable setting item component with gradient icons and Material Design styling.

**Props:**
- `icon: IconName` - Icon name from Lucide library
- `title: string` - Main title text
- `description?: string` - Optional description
- `value?: string` - Optional value to display on right
- `onPress?: () => void` - Callback when pressed
- `showChevron?: boolean` - Show chevron arrow (default: true if onPress exists)
- `rightElement?: React.ReactNode` - Custom right element
- `iconGradient?: string[]` - Gradient colors for icon background
- `disabled?: boolean` - Disable item
- `testID?: string` - Test ID

### `DisclaimerSetting`

Disclaimer component for health/wellness apps with modal display.

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

## License

MIT

## Author

Ümit UZ <umit@umituz.com>

