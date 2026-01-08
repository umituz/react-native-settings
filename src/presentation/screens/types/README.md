# Settings Screen Types

TypeScript type definitions for settings screen configuration, components, and utilities.

## Types

### SettingsConfig

Main configuration object for the settings screen.

```typescript
interface SettingsConfig {
  appearance?: FeatureVisibility | AppearanceConfig;
  language?: FeatureVisibility | LanguageConfig;
  notifications?: FeatureVisibility | NotificationsConfig;
  about?: FeatureVisibility | AboutConfig;
  legal?: FeatureVisibility | LegalConfig;
  disclaimer?: FeatureVisibility | DisclaimerConfig;
  userProfile?: boolean | UserProfileConfig;
  feedback?: FeatureVisibility | FeedbackConfig;
  rating?: FeatureVisibility | RatingConfig;
  faqs?: FeatureVisibility | FAQConfig;
  cloudSync?: FeatureVisibility | CloudSyncConfig;
  subscription?: FeatureVisibility | SubscriptionConfig;
  wallet?: FeatureVisibility | WalletConfig;
  emptyStateText?: string;
}
```

#### Usage Examples

**Simple Configuration:**

```typescript
const config: SettingsConfig = {
  appearance: true,
  language: true,
  notifications: 'auto',
  about: false,
};
```

**Advanced Configuration:**

```typescript
const config: SettingsConfig = {
  appearance: {
    enabled: true,
    route: 'CustomAppearance',
    showThemeSection: true,
    showColorsSection: true,
  },
  language: {
    enabled: 'auto',
    route: 'LanguageSelection',
    showFlags: true,
  },
  subscription: {
    enabled: true,
    title: 'Upgrade to Pro',
    onPress: () => navigation.navigate('Upgrade'),
  },
};
```

### FeatureVisibility

Feature enablement type:

```typescript
type FeatureVisibility = boolean | 'auto';
```

- `true`: Always show feature
- `false`: Never show feature
- `'auto'`: Automatically detect based on navigation

### NormalizedConfig

Normalized configuration with consistent structure:

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
  // ... other features
}
```

### CustomSettingsSection

Type for custom settings sections:

```typescript
interface CustomSettingsSection {
  id?: string;
  title: string;
  order?: number;
  content?: ReactNode;
  items?: CustomSettingsItem[];
}
```

### CustomSettingsItem

Type for custom settings items:

```typescript
interface CustomSettingsItem {
  id?: string;
  title: string;
  subtitle?: string;
  icon: IconName;
  onPress?: () => void;
  rightIcon?: IconName;
  iconBgColor?: string;
  iconColor?: string;
}
```

## Content Configuration Types

### AppearanceConfig

```typescript
interface AppearanceConfig {
  enabled?: FeatureVisibility;
  route?: string;
  showThemeSection?: boolean;
  showColorsSection?: boolean;
  showPreviewSection?: boolean;
}
```

### LanguageConfig

```typescript
interface LanguageConfig {
  enabled?: FeatureVisibility;
  route?: string;
  showFlags?: boolean;
}
```

### NotificationsConfig

```typescript
interface NotificationsConfig {
  enabled?: FeatureVisibility;
  route?: string;
  showQuietHours?: boolean;
  showCategories?: boolean;
}
```

### AboutConfig

```typescript
interface AboutConfig {
  enabled?: FeatureVisibility;
  route?: string;
  appName?: string;
  version?: string;
  buildNumber?: string;
  developer?: string;
  contactEmail?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
  moreAppsUrl?: string;
}
```

### LegalConfig

```typescript
interface LegalConfig {
  enabled?: FeatureVisibility;
  route?: string;
  showPrivacy?: boolean;
  showTerms?: boolean;
  showEula?: boolean;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  eulaUrl?: string;
}
```

### DisclaimerConfig

```typescript
interface DisclaimerConfig {
  enabled?: FeatureVisibility;
  route?: string;
  title?: string;
  message?: string;
  shortMessage?: string;
}
```

## User Feature Types

### UserProfileConfig

```typescript
interface UserProfileConfig {
  displayName?: string;
  userId?: string;
  isAnonymous?: boolean;
  avatarUrl?: string;
  accountSettingsRoute?: string;
  onPress?: () => void;
  anonymousDisplayName?: string;
  avatarServiceUrl?: string;
}
```

### FeedbackConfig

```typescript
interface FeedbackConfig {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
  feedbackTypes?: FeedbackType[];
}
```

### RatingConfig

```typescript
interface RatingConfig {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
  storeUrl?: string;
}
```

### FAQConfig

```typescript
interface FAQConfig {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
  categories?: FAQCategory[];
}
```

### SubscriptionConfig

```typescript
interface SubscriptionConfig {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
  icon?: string;
  onPress?: () => void;
  sectionTitle?: string;
}
```

### WalletConfig

```typescript
interface WalletConfig {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
  icon?: string;
  route?: string;
  sectionTitle?: string;
}
```

### CloudSyncConfig

```typescript
interface CloudSyncConfig {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
}
```

## Base Types

### BaseTypes.ts

```typescript
type FeatureVisibility = boolean | 'auto';
```

### ContentConfig.ts

```typescript
export interface AppearanceConfig { ... }
export interface LanguageConfig { ... }
export interface NotificationsConfig { ... }
export interface AboutConfig { ... }
export interface LegalConfig { ... }
export interface DisclaimerConfig { ... }
```

### UserFeatureConfig.ts

```typescript
export interface UserProfileConfig { ... }
export interface FeedbackConfig { ... }
export interface RatingConfig { ... }
export interface FAQConfig { ... }
export interface CloudSyncConfig { ... }
export interface SubscriptionConfig { ... }
export interface WalletConfig { ... }
```

## Type Guards

### Checking Config Type

```typescript
function isAppearanceConfig(
  value: FeatureVisibility | AppearanceConfig
): value is AppearanceConfig {
  return typeof value === 'object' && value !== null;
}

// Usage
if (isAppearanceConfig(config.appearance)) {
  console.log(config.appearance.route); // TypeScript knows this exists
}
```

### Checking Feature Enabled

```typescript
function isFeatureEnabled(
  value: FeatureVisibility | any
): boolean {
  if (value === 'auto') return true; // Will be detected
  if (typeof value === 'boolean') return value;
  if (value?.enabled === 'auto') return true;
  return value?.enabled === true;
}

// Usage
if (isFeatureEnabled(config.appearance)) {
  // Feature is enabled
}
```

## Type Exports

All types are exported from:

```typescript
// types/index.ts
export * from './BaseTypes';
export * from './ContentConfig';
export * from './UserFeatureConfig';
export * from './CustomSection';
export * from './SettingsConfig';
```

## Usage Examples

### Type-Safe Config

```typescript
import type { SettingsConfig, AppearanceConfig } from '@umituz/react-native-settings';

const config: SettingsConfig = {
  appearance: {
    enabled: true,
    route: 'CustomAppearance',
    showThemeSection: true,
    showColorsSection: false,
  },
};
```

### Custom Section Type

```typescript
import type { CustomSettingsSection } from '@umituz/react-native-settings';

const customSection: CustomSettingsSection = {
  id: 'custom',
  title: 'CUSTOM SECTION',
  order: 1,
  items: [
    {
      id: 'item1',
      title: 'Custom Item',
      icon: 'settings-outline',
      onPress: () => console.log('Pressed'),
    },
  ],
};
```

### Type Inference

```typescript
import { normalizeSettingsConfig } from '@umituz/react-native-settings';
import type { NormalizedConfig } from '@umituz/react-native-settings';

const normalized: NormalizedConfig = normalizeSettingsConfig(config);
```

## Best Practices

1. **Type Safety**: Always use proper TypeScript types
2. **Type Guards**: Use type guards for config objects
3. **Defaults**: Provide sensible defaults for all config
4. **Validation**: Validate config at runtime
5. **Documentation**: Document custom config objects
6. **Type Exports**: Use centralized type exports
7. **Generic Types**: Leverage generics for reusability

## Related

- **normalizeConfig**: Config normalization utilities
- **useFeatureDetection**: Feature detection hook
- **SettingsScreen**: Main screen component

## License

MIT
