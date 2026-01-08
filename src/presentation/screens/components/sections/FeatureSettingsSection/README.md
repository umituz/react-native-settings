# Feature Settings Section

Section component that displays appearance, language, and notification settings in the main settings screen.

## Features

- **Appearance Settings**: Theme and color customization
- **Language Selection**: Language picker with current display
- **Notification Settings**: Push notification preferences
- **Conditional Rendering**: Shows only enabled features
- **Internationalization**: Full i18n support

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { FeatureSettingsSection } from '@umituz/react-native-settings';

function MySettingsScreen() {
  const normalizedConfig = {
    appearance: { config: {} },
    language: { config: { route: 'LanguageSelection' } },
    notifications: { config: {} },
  };

  const features = {
    appearance: true,
    language: true,
    notifications: true,
  };

  return (
    <FeatureSettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

## Props

### FeatureSettingsSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `normalizedConfig` | `NormalizedConfig` | **Required** | Normalized settings configuration |
| `features` | `FeatureFlags` | **Required** | Feature visibility flags |

### FeatureFlags

```typescript
interface FeatureFlags {
  appearance: boolean;  // Show appearance section
  language: boolean;    // Show language selection
  notifications: boolean; // Show notification settings
}
```

## Component Structure

```
FeatureSettingsSection
├── AppearanceSection     (if features.appearance)
│   ├── Theme Mode
│   └── Custom Colors
├── Language Selection    (if features.language)
│   └── Current Language Display
└── NotificationsSection (if features.notifications)
    ├── Push Notifications
    ├── Quiet Hours
    └── Notification Categories
```

## Examples

### All Features Enabled

```tsx
function FullSettingsScreen() {
  const config = {
    appearance: { config: { showThemeSection: true } },
    language: { config: { route: 'LanguageSelection' } },
    notifications: { config: { showQuietHours: true } },
  };

  const features = {
    appearance: true,
    language: true,
    notifications: true,
  };

  return <FeatureSettingsSection normalizedConfig={config} features={features} />;
}
```

### Appearance Only

```tsx
function AppearanceOnlyScreen() {
  const config = {
    appearance: { config: { showColorsSection: false } },
  };

  const features = {
    appearance: true,
    language: false,
    notifications: false,
  };

  return <FeatureSettingsSection normalizedConfig={config} features={features} />;
}
```

### With Custom Language Route

```tsx
function CustomLanguageScreen() {
  const config = {
    language: {
      config: {
        route: 'CustomLanguagePicker',
        showFlags: true,
      },
    },
  };

  const features = {
    appearance: false,
    language: true,
    notifications: false,
  };

  return <FeatureSettingsSection normalizedConfig={config} features={features} />;
}
```

## Sub-Components

### AppearanceSection

Theme and appearance settings from Appearance domain.

```tsx
<AppearanceSection
  config={{
    title: "Appearance",
    description: "Customize your experience",
    showThemeSection: true,
    showColorsSection: true,
  }}
  sectionTitle="APPEARANCE"
/>
```

### Language Selection

Language picker item with current language display.

```tsx
<SettingsItemCard
  title="Language"
  description="🇺🇸 English"
  icon="globe-outline"
  onPress={() => navigation.navigate('LanguageSelection')}
  sectionTitle="LANGUAGE"
/>
```

### NotificationsSection

Notification settings from notifications domain.

```tsx
<NotificationsSection
  config={{
    title: "Notifications",
    description: "Manage your preferences",
    showQuietHours: true,
  }}
/>
```

## Feature Detection

Features are detected using `useFeatureDetection` hook:

```tsx
const features = useFeatureDetection(normalizedConfig, navigation);
// Returns: { appearance: boolean, language: boolean, notifications: boolean }
```

## Internationalization

All text uses translation keys:

```typescript
// Appearance
t("settings.appearance.title")
t("settings.appearance.description")

// Language
t("settings.languageSelection.title")

// Notifications
t("settings.notifications.title")
t("settings.notifications.description")
```

## Best Practices

1. **Normalize Config**: Always normalize config before passing
2. **Feature Detection**: Use feature detection for conditional rendering
3. **Translation Keys**: Provide all required translation keys
4. **Navigation Routes**: Define custom routes for language selection
5. **Feature Flags**: Use feature flags to control visibility
6. **Lazy Loading**: Load sections only when needed

## Related

- **Appearance Domain**: Theme customization
- **Localization**: Language management
- **Notifications**: Notification preferences

## License

MIT
