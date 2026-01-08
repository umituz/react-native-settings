# Settings Screen Utilities

Utility functions for normalizing and managing settings screen configuration.

## Functions

### normalizeSettingsConfig

Normalizes the settings configuration object to a consistent format.

```typescript
import { normalizeSettingsConfig } from '@umituz/react-native-settings';

const config = {
  appearance: true,
  notifications: 'auto',
  about: false,
};

const normalized = normalizeSettingsConfig(config);
// Returns: NormalizedConfig with enabled flags and config objects
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `SettingsConfig \| undefined` | Raw configuration object |

#### Returns

`NormalizedConfig` - Normalized configuration with consistent structure

#### Examples

**Basic Config:**

```typescript
const config = {
  appearance: true,
  language: true,
};

const normalized = normalizeSettingsConfig(config);
// {
//   appearance: { enabled: true },
//   language: { enabled: true },
//   notifications: { enabled: false },
//   // ... others default to { enabled: false }
// }
```

**Auto Detection:**

```typescript
const config = {
  appearance: 'auto',  // Enable if screen exists
  language: 'auto',
};

const normalized = normalizeSettingsConfig(config);
// Will check navigation for screen availability
```

**Advanced Config:**

```typescript
const config = {
  appearance: {
    enabled: true,
    route: 'CustomAppearance',
    showThemeSection: true,
  },
};

const normalized = normalizeSettingsConfig(config);
// {
//   appearance: { enabled: true, config: { route: '...', showThemeSection: true } }
// }
```

### normalizeConfigValue

Normalizes a single config value to enabled/config format.

```typescript
import { normalizeConfigValue } from '@umituz/react-native-settings';

// Boolean
normalizeConfigValue(true, false)
// { enabled: true }

// Auto
normalizeConfigValue('auto', false)
// { enabled: false } (will be determined dynamically)

// Object
normalizeConfigValue({ enabled: true, route: 'Custom' }, false)
// { enabled: true, config: { enabled: true, route: 'Custom' } }

// Undefined
normalizeConfigValue(undefined, true)
// { enabled: true }
```

#### Type Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `T` | Config object type | Type of config object |
| `value` | `FeatureVisibility \| T \| undefined` | Config value to normalize |
| `defaultValue` | `FeatureVisibility` | Default enabled state |

## NormalizedConfig Structure

```typescript
interface NormalizedConfig {
  appearance: {
    enabled: boolean;
    config?: AppearanceConfig;
  };
  language: {
    enabled: boolean;
    config?: LanguageConfig;
  };
  notifications: {
    enabled: boolean;
    config?: NotificationsConfig;
  };
  about: {
    enabled: boolean;
    config?: AboutConfig;
  };
  legal: {
    enabled: boolean;
    config?: LegalConfig;
  };
  disclaimer: {
    enabled: boolean;
    config?: DisclaimerConfig;
  };
  userProfile: {
    enabled: boolean;
    config?: UserProfileConfig;
  };
  feedback: {
    enabled: boolean;
    config?: FeedbackConfig;
  };
  rating: {
    enabled: boolean;
    config?: RatingConfig;
  };
  faqs: {
    enabled: boolean;
    config?: FAQConfig;
  };
  subscription: {
    enabled: boolean;
    config?: SubscriptionConfig;
  };
  wallet: {
    enabled: boolean;
    config?: WalletConfig;
  };
}
```

## FeatureVisibility

Type alias for feature enablement:

```typescript
type FeatureVisibility = boolean | 'auto';
```

- `true`: Feature is enabled
- `false`: Feature is disabled
- `'auto'`: Feature is automatically detected (checks navigation)

## Default Values

Default values for each feature:

| Feature | Default | Description |
|---------|---------|-------------|
| `appearance` | `'auto'` | Auto-detect |
| `language` | `'auto'` | Auto-detect |
| `notifications` | `'auto'` | Auto-detect |
| `about` | `'auto'` | Auto-detect |
| `legal` | `'auto'` | Auto-detect |
| `disclaimer` | `false` | Disabled |
| `userProfile` | `false` | Disabled |
| `feedback` | `false` | Disabled |
| `rating` | `false` | Disabled |
| `faqs` | `false` | Disabled |
| `subscription` | `false` | Disabled |
| `wallet` | `false` | Disabled |

## Usage Examples

### Complete Normalization

```typescript
import { normalizeSettingsConfig } from '@umituz/react-native-settings';

function SettingsScreenWrapper() {
  const rawConfig = {
    appearance: true,
    language: {
      enabled: true,
      route: 'LanguageSelection',
      showFlags: true,
    },
    notifications: 'auto',
  };

  const normalized = normalizeSettingsConfig(rawConfig);

  return (
    <SettingsContent
      normalizedConfig={normalized}
      features={normalized}
    />
  );
}
```

### Feature Detection Integration

```typescript
import { normalizeSettingsConfig, useFeatureDetection } from '@umituz/react-native-settings';

function SettingsScreenWithDetection() {
  const navigation = useNavigation();
  const config = {
    appearance: 'auto',
    language: 'auto',
    notifications: 'auto',
  };

  const normalized = normalizeSettingsConfig(config);
  const features = useFeatureDetection(normalized, navigation, {
    notificationServiceAvailable: true,
  });

  return (
    <SettingsContent
      normalizedConfig={normalized}
      features={features}
    />
  );
}
```

## Auto Detection

When using `'auto'`, features are detected based on:

1. **Navigation State**: Checks if screen exists in navigation stack
2. **Config Override**: Respects `enabled: true/false` in config object
3. **Service Availability**: Checks if required services are available

```typescript
// Auto detection flow
appearance.config?.enabled === true  // Explicitly enabled
|| (appearance.config?.enabled !== false  // Not explicitly disabled
  && hasNavigationScreen(navigation, 'Appearance'))  // Screen exists
```

## Best Practices

1. **Always Normalize**: Normalize config before passing to components
2. **Use Auto**: Use `'auto'` for features that should be conditionally shown
3. **Explicit Control**: Use boolean for features that must be shown/hidden
4. **Advanced Config**: Use config objects for detailed customization
5. **Feature Detection**: Always use with `useFeatureDetection` hook
6. **Type Safety**: Leverage TypeScript for config type checking

## Related

- **useFeatureDetection**: Hook for detecting features
- **SettingsConfig**: Configuration types
- **SettingsContent**: Content component

## License

MIT
