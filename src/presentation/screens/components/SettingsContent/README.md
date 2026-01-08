# Settings Content

Main content composer component that orchestrates all sections of the settings screen including profile, features, identity, support, and footer.

## Features

- **Section Composition**: Orchestrates all settings sections
- **Profile Header**: Optional user profile display
- **Custom Sections**: Support for app-specific sections
- **Feature Sections**: Appearance, language, notifications
- **Identity Sections**: About and legal information
- **Support Sections**: Feedback, rating, and FAQs
- **Empty State**: Graceful handling of empty configuration
- **Footer**: App version and build information

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { SettingsContent } from '@umituz/react-native-settings';

function MySettingsScreen() {
  const normalizedConfig = {
    appearance: { config: {} },
    language: { config: {} },
    notifications: { config: {} },
    about: { config: {} },
    legal: { config: {} },
    feedback: { config: {} },
  };

  const features = {
    appearance: true,
    language: true,
    notifications: true,
    about: true,
    legal: true,
    feedback: true,
  };

  return (
    <SettingsContent
      normalizedConfig={normalizedConfig}
      features={features}
      showFooter={true}
      appVersion="1.0.0"
    />
  );
}
```

## Props

### SettingsContentProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `normalizedConfig` | `NormalizedConfig` | **Required** | Normalized configuration object |
| `config` | `any` | `undefined` | Raw config object |
| `features` | `FeatureFlags` | **Required** | Feature visibility flags |
| `showUserProfile` | `boolean` | `false` | Show user profile header |
| `userProfile` | `UserProfile` | `undefined` | User profile data |
| `showFooter` | `boolean` | `true` | Show footer with version |
| `footerText` | `string` | `undefined` | Custom footer text |
| `appVersion` | `string` | `undefined` | App version number |
| `customSections` | `CustomSection[]` | `[]` | Custom settings sections |
| `showCloseButton` | `boolean` | `false` | Show close button (unused) |
| `devSettings` | `DevSettingsProps` | `undefined` | Dev settings configuration |

### FeatureFlags

```typescript
interface FeatureFlags {
  appearance: boolean;      // Show appearance settings
  language: boolean;        // Show language selection
  notifications: boolean;   // Show notification settings
  about: boolean;           // Show about section
  legal: boolean;           // Show legal section
  disclaimer: boolean;      // Show disclaimer
  userProfile: boolean;     // Show user profile
  feedback: boolean;        // Show feedback option
  rating: boolean;          // Show rating option
  faqs: boolean;            // Show FAQ access
  subscription: boolean;    // Show subscription option
  wallet: boolean;          // Show wallet option
}
```

## Component Structure

```
SettingsContent
├── ProfileSectionLoader        (if showUserProfile)
├── CustomSettingsList          (if customSections)
├── Subscription Item           (if features.subscription)
├── Wallet Item                 (if features.wallet)
├── FeatureSettingsSection
│   ├── AppearanceSection       (if features.appearance)
│   ├── Language Selection      (if features.language)
│   └── NotificationsSection    (if features.notifications)
├── IdentitySettingsSection
│   ├── AboutSection            (if features.about)
│   └── LegalSection            (if features.legal)
├── SupportSettingsSection
│   ├── Feedback                (if features.feedback)
│   ├── Rating                  (if features.rating)
│   └── FAQ                     (if features.faqs)
├── DisclaimerSetting           (if features.disclaimer)
├── Empty State                 (if no features)
├── DevSettingsSection          (if devSettings)
└── SettingsFooter              (if showFooter)
```

## Examples

### Minimal Settings

```tsx
function MinimalSettings() {
  return (
    <SettingsContent
      normalizedConfig={{}}
      features={{}}
      showFooter={true}
    />
  );
}
```

### With User Profile

```tsx
function SettingsWithProfile() {
  const userProfile = {
    displayName: 'John Doe',
    userId: 'user123',
    avatarUrl: 'https://example.com/avatar.jpg',
    onPress: () => navigation.navigate('Account'),
  };

  return (
    <SettingsContent
      normalizedConfig={{}}
      features={{ userProfile: true }}
      showUserProfile={true}
      userProfile={userProfile}
    />
  );
}
```

### Full Featured Settings

```tsx
function FullSettings() {
  const normalizedConfig = {
    appearance: { config: { showThemeSection: true } },
    language: { config: { route: 'LanguageSelection' } },
    notifications: { config: { showQuietHours: true } },
    about: {
      config: {
        appName: 'My App',
        version: '1.0.0',
        developer: 'My Company',
      },
    },
    legal: {
      config: {
        privacyPolicyUrl: 'https://example.com/privacy',
        termsOfServiceUrl: 'https://example.com/terms',
      },
    },
    subscription: {
      config: {
        title: 'Upgrade to Pro',
        description: 'Get all features',
        onPress: () => navigation.navigate('Upgrade'),
      },
    },
  };

  const features = {
    appearance: true,
    language: true,
    notifications: true,
    about: true,
    legal: true,
    disclaimer: true,
    feedback: true,
    rating: true,
    faqs: true,
    subscription: true,
  };

  return (
    <SettingsContent
      normalizedConfig={normalizedConfig}
      features={features}
      showUserProfile={true}
      userProfile={userProfile}
      showFooter={true}
      appVersion="1.0.0"
    />
  );
}
```

### With Custom Sections

```tsx
function SettingsWithCustomSections() {
  const customSections = [
    {
      title: 'INTEGRATIONS',
      items: [
        {
          title: 'Google',
          icon: 'logo-google',
          onPress: () => manageGoogle(),
        },
      ],
    },
  ];

  return (
    <SettingsContent
      normalizedConfig={{}}
      features={{}}
      customSections={customSections}
    />
  );
}
```

### With Dev Settings

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';

function DevelopmentSettings() {
  return (
    <SettingsContent
      normalizedConfig={{}}
      features={{}}
      devSettings={{
        enabled: true,
        onAfterClear: async () => {
          await resetApp();
          Updates.reloadAsync();
        },
      }}
    />
  );
}
```

### Custom Footer Text

```tsx
function CustomFooterSettings() {
  return (
    <SettingsContent
      normalizedConfig={{}}
      features={{}}
      showFooter={true}
      footerText="© 2025 My Company. All rights reserved."
    />
  );
}
```

## Empty State

When no features are enabled, shows empty state:

```tsx
// Renders empty state section
<SettingsContent
  normalizedConfig={{}}
  features={{}}
/>
```

Empty state text can be customized via `config.emptyStateText` or translation key `settings.noOptionsAvailable`.

## Sub-Components

### ProfileSectionLoader

Loads and displays user profile header.

```tsx
<ProfileSectionLoader userProfile={userProfile} />
```

### CustomSettingsList

Renders custom app-specific sections.

```tsx
<CustomSettingsList customSections={customSections} />
```

### Subscription Item

Special item for subscription/upgrade.

```tsx
<SettingsItemCard
  title="Upgrade to Pro"
  description="Get all features"
  icon="star"
  onPress={handleUpgrade}
  sectionTitle="SUBSCRIPTION"
/>
```

### Wallet Item

Special item for wallet/payment settings.

```tsx
<WalletSettingsItem
  config={{
    title: 'Wallet',
    description: 'Manage payment',
    icon: 'wallet',
    route: 'Wallet',
  }}
  t={t}
/>
```

## Feature Detection

Uses `hasAnyFeatures` to determine if empty state should be shown:

```typescript
const hasAnyFeatures = useMemo(() =>
  features.appearance ||
  features.language ||
  features.notifications ||
  features.about ||
  features.legal ||
  features.disclaimer ||
  features.feedback ||
  features.rating ||
  features.faqs ||
  features.subscription ||
  features.wallet ||
  customSections.length > 0,
[features, customSections.length]
);
```

## Internationalization

Translation keys used:

```typescript
// Section titles
t("settings.title")

// Subscription
t("settings.subscription.title")
t("settings.subscription.description")

// Wallet
t("wallet.title")
t("wallet.description")

// Footer
t("settings.footer.version")

// Empty state
t("settings.noOptionsAvailable")
```

## Best Practices

1. **Normalize Config**: Always normalize config before passing
2. **Feature Flags**: Use feature flags to control visibility
3. **Order Matters**: Sections render in defined order
4. **User Profile**: Show profile only for authenticated users
5. **Footer Info**: Always include app version in footer
6. **Empty State**: Provide meaningful empty state message
7. **Dev Settings**: Include dev settings for development builds
8. **Custom Sections**: Use custom sections for app-specific features

## Related

- **SettingsScreen**: Main screen component
- **SettingsHeader**: Header component
- **ProfileSectionLoader**: Profile component
- **Feature Sections**: Individual section components

## License

MIT
