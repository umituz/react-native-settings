# useFeatureDetection Hook

Hook for automatically detecting which settings features should be shown based on configuration and navigation state.

## Features

- **Auto Detection**: Automatically detects available screens
- **Config Override**: Respects explicit enabled/disabled flags
- **Service Check**: Checks for required services (e.g., notifications)
- **Navigation Check**: Verifies screen exists in navigation stack
- **Memoized**: Optimized with useMemo for performance

## Installation

This hook is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { useFeatureDetection } from '@umituz/react-native-settings';

function MySettingsScreen() {
  const navigation = useNavigation();
  const normalizedConfig = normalizeSettingsConfig(config);

  const features = useFeatureDetection(normalizedConfig, navigation);

  return (
    <View>
      {features.appearance && <Text>Appearance is available</Text>}
      {features.language && <Text>Language is available</Text>}
    </View>
  );
}
```

## API

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `normalizedConfig` | `NormalizedConfig` | Normalized configuration object |
| `navigation` | `NavigationProp` | React Navigation object |
| `options` | `DetectionOptions` | Optional detection options |

### DetectionOptions

```typescript
interface DetectionOptions {
  notificationServiceAvailable?: boolean;
}
```

### Returns

```typescript
interface FeatureFlags {
  appearance: boolean;     // Is appearance screen available?
  language: boolean;       // Is language screen available?
  notifications: boolean;  // Are notifications available?
  about: boolean;          // Is about screen available?
  legal: boolean;          // Is legal screen available?
  disclaimer: boolean;     // Is disclaimer available?
  userProfile: boolean;    // Should show user profile?
  feedback: boolean;       // Is feedback available?
  rating: boolean;         // Is rating available?
  faqs: boolean;           // Are FAQs available?
  subscription: boolean;   // Is subscription available?
  wallet: boolean;         // Is wallet available?
}
```

## Detection Logic

### Auto Detection Algorithm

For each feature:

```typescript
function shouldShowFeature(
  normalizedConfig,
  navigation,
  options
): boolean {
  const { enabled, config } = normalizedConfig;

  // Check normalized enabled flag
  if (!enabled) return false;

  // Explicit override in config object
  if (config?.enabled === true) return true;
  if (config?.enabled === false) return false;

  // Auto-detect based on navigation
  const defaultRoute = getDefaultRoute(feature);
  return hasNavigationScreen(navigation, defaultRoute);
}
```

### Navigation Screen Check

```typescript
function hasNavigationScreen(
  navigation: any,
  screenName: string
): boolean {
  try {
    const state = navigation.getState();
    if (!state) return false;

    const checkRoutes = (routes: any[]): boolean => {
      for (const route of routes) {
        if (route.name === screenName) return true;
        if (route.state?.routes && checkRoutes(route.state.routes)) {
          return true;
        }
      }
      return false;
    };

    return checkRoutes(state.routes || []);
  } catch {
    return false;
  }
}
```

## Examples

### With Auto Detection

```tsx
function AutoDetectedSettings() {
  const navigation = useNavigation();
  const config = {
    appearance: 'auto',  // Will detect Appearance screen
    language: 'auto',    // Will detect Language screen
    notifications: 'auto', // Will detect Notifications screen
  };

  const normalized = normalizeSettingsConfig(config);
  const features = useFeatureDetection(normalized, navigation);

  return (
    <SettingsContent
      normalizedConfig={normalized}
      features={features}
    />
  );
}
```

### With Service Check

```tsx
function SettingsWithServiceCheck() {
  const navigation = useNavigation();
  const notificationServiceAvailable = true; // From app state

  const features = useFeatureDetection(normalizedConfig, navigation, {
    notificationServiceAvailable,
  });

  // notifications will only be true if:
  // 1. enabled in config
  // 2. notificationServiceAvailable is true
  // 3. Notifications screen exists
}
```

### With Custom Routes

```tsx
function SettingsWithCustomRoutes() {
  const config = {
    appearance: {
      enabled: true,
      route: 'CustomAppearance',  // Custom screen name
    },
    language: {
      enabled: true,
      route: 'LanguagePicker',     // Custom screen name
    },
  };

  const features = useFeatureDetection(
    normalizeSettingsConfig(config),
    navigation
  );
}
```

### Explicit Enable/Disable

```tsx
function ExplicitlyConfiguredSettings() {
  const config = {
    appearance: true,           // Always show
    language: false,             // Never show
    notifications: {
      enabled: true,             // Explicitly enabled
      route: 'Notifications',    // Will check this route
    },
    about: {
      enabled: false,            // Explicitly disabled
      route: 'About',            // Won't check even if exists
    },
  };

  const features = useFeatureDetection(
    normalizeSettingsConfig(config),
    navigation
  );

  // features.appearance === true
  // features.language === false
  // features.notifications === (has Notifications screen)
  // features.about === false
}
```

### Combined Configuration

```tsx
function MixedConfiguration() {
  const config = {
    // Simple boolean
    appearance: true,

    // Auto-detect
    language: 'auto',

    // Advanced with explicit enabled
    notifications: {
      enabled: true,
      route: 'Notifications',
      showQuietHours: true,
    },

    // Advanced with auto-detection
    about: {
      enabled: 'auto',
      route: 'About',
    },

    // Explicitly disabled
    legal: false,
  };

  const features = useFeatureDetection(
    normalizeSettingsConfig(config),
    navigation
  );
}
```

## Default Routes

Default screen routes checked for each feature:

| Feature | Default Route |
|---------|--------------|
| `appearance` | `'Appearance'` |
| `language` | `'LanguageSelection'` |
| `notifications` | `'Notifications'` |
| `about` | `'About'` |
| `legal` | `'Legal'` |
| `disclaimer` | `'Disclaimer'` |

## Feature-Specific Logic

### Notifications

```typescript
notifications: notifications.enabled && (
  notifications.config?.enabled === true ||
  (notifications.config?.enabled !== false &&
    notificationServiceAvailable &&
    hasNavigationScreen(navigation, 'Notifications'))
)
```

Requires both:
- Service availability check
- Navigation screen check

### Profile, Feedback, Rating, FAQs

These features don't check navigation:

```typescript
userProfile: userProfile.enabled,
feedback: feedback.enabled,
rating: rating.enabled,
faqs: faqs.enabled,
```

## Performance

### Memoization

The hook uses `useMemo` to prevent unnecessary recalculations:

```typescript
const features = useMemo(() => {
  // Detection logic
}, [normalizedConfig, navigation, options]);
```

### Dependencies

Recalculates when:
- `normalizedConfig` changes
- `navigation` changes (should be stable)
- `options` changes

## Best Practices

1. **Normalize First**: Always normalize config before passing to hook
2. **Use Auto**: Prefer `'auto'` for automatic detection
3. **Service Checks**: Provide service availability in options
4. **Custom Routes**: Define custom routes in config objects
5. **Explicit Flags**: Use boolean for must-show/must-hide features
6. **Stable Navigation**: Pass stable navigation reference
7. **Memoization**: Hook is already memoized for performance

## Testing

```tsx
import { renderHook } from '@testing-library/react-native';
import { useFeatureDetection } from '@umituz/react-native-settings';

describe('useFeatureDetection', () => {
  it('detects available screens', () => {
    const navigation = {
      getState: () => ({
        routes: [
          { name: 'Appearance' },
          { name: 'LanguageSelection' },
        ],
      }),
    };

    const config = {
      appearance: 'auto',
      language: 'auto',
      notifications: 'auto',
    };

    const { result } = renderHook(() =>
      useFeatureDetection(normalizeSettingsConfig(config), navigation)
    );

    expect(result.current.appearance).toBe(true);
    expect(result.current.language).toBe(true);
  });

  it('respects explicit disabled', () => {
    const config = {
      appearance: false,  // Explicitly disabled
    };

    const { result } = renderHook(() =>
      useFeatureDetection(normalizeSettingsConfig(config), navigation)
    );

    expect(result.current.appearance).toBe(false);
  });
});
```

## Related

- **normalizeSettingsConfig**: Config normalization
- **SettingsContent**: Content component
- **Feature Detection**: Detection utility functions

## License

MIT
