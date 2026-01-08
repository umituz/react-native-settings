# Settings Screen

Main settings screen component with modular architecture for displaying app settings in an organized, user-friendly interface.

## Features

- **Modular Architecture**: Composable sections for different feature groups
- **User Profile Header**: Optional user profile display
- **Feature Detection**: Automatically detect available features
- **Custom Sections**: Support for custom settings sections
- **Error Boundaries**: Built-in error handling
- **Responsive Design**: Adapts to different screen sizes
- **Theme Support**: Automatic light/dark theme support

## Installation

This component is part of `@umituz/react-native-settings`:

```bash
npm install @umituz/react-native-settings
```

## Usage

### Basic Usage

```tsx
import { SettingsScreen } from '@umituz/react-native-settings';

function MySettingsScreen() {
  return (
    <SettingsScreen />
  );
}
```

### With Configuration

```tsx
import { SettingsScreen } from '@umituz/react-native-settings';

function ConfiguredSettingsScreen() {
  const config = {
    appearance: true,
    language: false,
    notifications: true,
    privacy: true,
    support: true,
    about: true,
    legal: true,
    feedback: true,
    faqs: true,
  };

  return (
    <SettingsScreen
      config={config}
      showUserProfile={true}
      userProfile={{
        displayName: 'John Doe',
        userId: 'user123',
        avatarUrl: 'https://example.com/avatar.jpg',
      }}
      showFooter={true}
      appVersion="1.0.0"
    />
  );
}
```

## Props

### SettingsScreenProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `SettingsConfig` | `{}` | Configuration for which features to show |
| `showUserProfile` | `boolean` | `undefined` | Show user profile header |
| `userProfile` | `UserProfileProps` | `undefined` | User profile data |
| `showFooter` | `boolean` | `true` | Show footer with version |
| `footerText` | `string` | `undefined` | Custom footer text |
| `appVersion` | `string` | `undefined` | App version number |
| `customSections` | `CustomSettingsSection[]` | `[]` | Custom sections to render |
| `showCloseButton` | `boolean` | `false` | Show close button in header |
| `onClose` | `() => void` | `undefined` | Close button handler |
| `featureOptions` | `FeatureOptions` | `undefined` | Feature detection options |
| `devSettings` | `DevSettingsProps` | `undefined` | Dev settings (DEV mode only) |

### SettingsConfig

```typescript
interface SettingsConfig {
  appearance?: boolean;        // Show appearance settings
  language?: boolean;          // Show language selection
  notifications?: boolean;     // Show notification settings
  privacy?: boolean;           // Show privacy settings
  support?: boolean;           // Show support section
  about?: boolean;             // Show about section
  legal?: boolean;             // Show legal section
  feedback?: boolean;          // Show feedback section
  faqs?: boolean;              // Show FAQ section
  cloudSync?: boolean;         // Show cloud sync settings
  // ... more feature flags
}
```

### UserProfileProps

```typescript
interface UserProfileProps {
  displayName?: string;        // User display name
  userId?: string;             // User ID
  isAnonymous?: boolean;       // Anonymous user flag
  avatarUrl?: string;          // Avatar image URL
  accountSettingsRoute?: string; // Navigation route
  onPress?: () => void;        // Custom press handler
  anonymousDisplayName?: string; // Anonymous display name
  avatarServiceUrl?: string;   // Avatar service base URL
}
```

## Examples

### Minimal Settings

```tsx
import { SettingsScreen } from '@umituz/react-native-settings';

export default function MinimalSettings() {
  return <SettingsScreen />;
}
```

### Custom Configuration

```tsx
function CustomSettings() {
  return (
    <SettingsScreen
      config={{
        appearance: true,
        notifications: true,
        privacy: true,
        support: true,
        about: true,
      }}
    />
  );
}
```

### With User Profile

```tsx
function SettingsWithProfile() {
  return (
    <SettingsScreen
      showUserProfile={true}
      userProfile={{
        displayName: 'Jane Doe',
        userId: 'user456',
        avatarUrl: 'https://api.example.com/avatars/user456.jpg',
        onPress: () => navigation.navigate('AccountSettings'),
      }}
    />
  );
}
```

### Anonymous User

```tsx
function SettingsForAnonymous() {
  return (
    <SettingsScreen
      showUserProfile={true}
      userProfile={{
        isAnonymous: true,
        anonymousDisplayName: 'Guest User',
        onPress: () => navigation.navigate('SignUp'),
      }}
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
          icon: 'logo-google',
          title: 'Google',
          description: 'Connected',
          showSwitch: true,
          switchValue: googleEnabled,
          onSwitchChange: setGoogleEnabled,
        },
        {
          icon: 'logo-apple',
          title: 'Apple',
          description: 'Not connected',
          onPress: () => connectApple(),
        },
      ],
    },
  ];

  return (
    <SettingsScreen
      customSections={customSections}
    />
  );
}
```

### With Close Button

```tsx
function ModalSettingsScreen() {
  return (
    <SettingsScreen
      showCloseButton={true}
      onClose={() => navigation.goBack()}
    />
  );
}
```

### With Dev Settings

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';

function SettingsWithDevTools() {
  return (
    <SettingsScreen
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

### Complete Example

```tsx
import React from 'react';
import { SettingsScreen } from '@umituz/react-native-settings';
import { useAuth } from './auth';

export default function CompleteSettingsScreen() {
  const { user } = useAuth();

  const config = {
    appearance: true,
    notifications: true,
    privacy: true,
    support: true,
    about: true,
    legal: true,
  };

  const customSections = [
    {
      title: 'PRO FEATURES',
      items: [
        {
          icon: 'star-outline',
          title: 'Upgrade to Pro',
          description: 'Unlock all features',
          onPress: () => navigation.navigate('Upgrade'),
        },
      ],
    },
  ];

  return (
    <SettingsScreen
      config={config}
      showUserProfile={true}
      userProfile={{
        displayName: user?.displayName,
        userId: user?.uid,
        avatarUrl: user?.photoURL,
        onPress: () => navigation.navigate('Account'),
      }}
      showFooter={true}
      footerText={`Version ${Constants.expoConfig.version}`}
      customSections={customSections}
      showCloseButton={true}
      onClose={() => navigation.goBack()}
      devSettings={{
        onAfterClear: async () => {
          await signOut();
          navigation.reset('Welcome');
        },
      }}
    />
  );
}
```

## Component Structure

The SettingsScreen is composed of several sub-components:

```
SettingsScreen
├── SettingsHeader          # Header with title and close button
└── SettingsContent         # Main content area
    ├── UserProfileHeader   # User profile display (optional)
    ├── Feature Sections    # Dynamic sections based on config
    │   ├── AppearanceSection
    │   ├── IdentitySection
    │   ├── NotificationSection
    │   ├── PrivacySection
    │   ├── SupportSection
    │   ├── AboutSection
    │   └── LegalSection
    ├── Custom Sections     # User-defined sections
    ├── Dev Settings        # Development tools (DEV only)
    └── SettingsFooter      # App version footer
```

## Custom Sections

You can add custom settings sections using the `customSections` prop:

```tsx
const customSections: CustomSettingsSection[] = [
  {
    title: 'SECTION TITLE',
    items: [
      {
        icon: 'icon-name',
        title: 'Item Title',
        description: 'Optional description',
        onPress: () => {},
        // OR
        showSwitch: true,
        switchValue: true,
        onSwitchChange: (value) => {},
      },
    ],
  },
];
```

### Custom Section Types

**Navigation Items:**

```tsx
{
  icon: 'chevron-forward-outline',
  title: 'Advanced Settings',
  onPress: () => navigation.navigate('Advanced'),
}
```

**Toggle Items:**

```tsx
{
  icon: 'notifications-outline',
  title: 'Enable Feature',
  showSwitch: true,
  switchValue: enabled,
  onSwitchChange: setEnabled,
}
```

**Info Items:**

```tsx
{
  icon: 'information-circle-outline',
  title: 'App Version',
  description: '1.0.0 (123)',
}
```

## Feature Detection

The screen uses feature detection to show/hide sections:

```tsx
const featureOptions = {
  notificationServiceAvailable: true, // Enable notification features
};

<SettingsScreen
  featureOptions={featureOptions}
/>
```

## Styling

All styling uses the design system tokens:

```tsx
// Theme integration handled automatically
// Supports light/dark mode switching
// Responsive design for all screen sizes
```

## Error Handling

The screen includes built-in error boundaries:

```tsx
<SettingsErrorBoundary>
  <SettingsScreen />
</SettingsErrorBoundary>
```

Custom error messages:

```tsx
<SettingsScreen
  // Screen will use these translation keys for errors
  // "settings.error.title"
  // "settings.error.message"
/>
```

## Best Practices

1. **Configuration**: Use `config` prop to control which sections appear
2. **User Profile**: Show user profile for signed-in users
3. **Custom Sections**: Add app-specific settings via `customSections`
4. **Version Info**: Always show app version in footer
5. **Error Boundaries**: Don't wrap in additional error boundaries
6. **Navigation**: Provide proper navigation handlers
7. **Dev Settings**: Include dev tools for development builds
8. **Feature Flags**: Use feature flags for experimental features

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsScreen } from '@umituz/react-native-settings';

describe('SettingsScreen', () => {
  it('renders with default config', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText(/settings/i)).toBeTruthy();
  });

  it('shows user profile when configured', () => {
    const { getByText } = render(
      <SettingsScreen
        showUserProfile={true}
        userProfile={{ displayName: 'John Doe' }}
      />
    );
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('renders custom sections', () => {
    const customSections = [
      {
        title: 'CUSTOM',
        items: [
          {
            icon: 'star',
            title: 'Custom Item',
            onPress: () => {},
          },
        ],
      },
    ];

    const { getByText } = render(
      <SettingsScreen customSections={customSections} />
    );
    expect(getByText('Custom Item')).toBeTruthy();
  });
});
```

## Architecture

The SettingsScreen follows a clean architecture:

```
presentation/screens/
├── SettingsScreen.tsx          # Main screen component
├── components/
│   ├── SettingsHeader.tsx      # Header component
│   ├── SettingsContent.tsx     # Content composer
│   └── sections/               # Section components
│       ├── AppearanceSection.tsx
│       ├── IdentitySection.tsx
│       ├── NotificationSection.tsx
│       ├── PrivacySection.tsx
│       ├── SupportSection.tsx
│       ├── AboutSection.tsx
│       └── LegalSection.tsx
├── hooks/
│   └── useFeatureDetection.ts  # Feature detection logic
├── utils/
│   └── normalizeConfig.ts      # Config normalization
└── types/                      # TypeScript definitions
```

## Related

- **Core Components**: SettingsItemCard, SettingsSection
- **Domains**: Feature-specific domain documentation
- **Design System**: UI components and theming

## License

MIT
