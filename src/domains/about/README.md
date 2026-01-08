# About Domain

The About domain provides components and utilities for displaying app information, user details, version info, and contact information in your React Native app.

## Features

- **App Information Display**: Show app name, version, and build number
- **Contact Information**: Display developer, email, and website details
- **Customizable Actions**: Handle taps on email, website, and other links
- **Localized Texts**: Support for custom labels and messages
- **Loading & Error States**: Built-in loading and error handling
- **Fully Typed**: Complete TypeScript support

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### AboutScreen

The main screen component for displaying app information.

```tsx
import { AboutScreen } from '@umituz/react-native-settings';

function MyAboutScreen() {
  const config = {
    appName: 'My App',
    version: '1.0.0',
    buildNumber: '100',
    developer: 'Acme Inc',
    contactEmail: 'support@acme.com',
    websiteUrl: 'https://acme.com',
    actions: {
      onEmailPress: () => Linking.openURL('mailto:support@acme.com'),
      onWebsitePress: () => Linking.openURL('https://acme.com'),
    },
    texts: {
      versionPrefix: 'Version',
      contact: 'Contact Us',
      developer: 'Developer',
      email: 'Email',
      website: 'Website',
    },
  };

  return <AboutScreen config={config} />;
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `AboutConfig` | **Required** | Configuration object with app info |
| `containerStyle` | `ViewStyle` | `undefined` | Custom container style |
| `headerStyle` | `ViewStyle` | `undefined` | Custom header style |
| `titleStyle` | `TextStyle` | `undefined` | Custom title style |
| `versionStyle` | `TextStyle` | `undefined` | Custom version style |
| `showHeader` | `boolean` | `true` | Show app header with name and version |
| `headerComponent` | `ReactNode` | `undefined` | Custom header component |
| `footerComponent` | `ReactNode` | `undefined` | Custom footer component |
| `testID` | `string` | `undefined` | Test ID for E2E testing |

### AboutContent

Displays the list of about items organized in sections.

```tsx
import { AboutContent } from '@umituz/react-native-settings';

function MyAboutContent() {
  const appInfo = {
    appName: 'My App',
    version: '1.0.0',
    developer: 'Acme Inc',
    contactEmail: 'support@acme.com',
  };

  const config = {
    actions: {
      onEmailPress: () => console.log('Email pressed'),
    },
  };

  return <AboutContent appInfo={appInfo} config={config} />;
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appInfo` | `AppInfo` | **Required** | App information to display |
| `config` | `AboutConfig` | **Required** | Configuration for actions |

### AboutSection

Renders a section of related about items.

```tsx
import { AboutSection } from '@umituz/react-native-settings';

function ContactSection() {
  const items = [
    {
      title: 'Developer',
      value: 'Acme Inc',
    },
    {
      title: 'Email',
      value: 'support@acme.com',
      onPress: () => Linking.openURL('mailto:support@acme.com'),
    },
  ];

  return <AboutSection title="Contact" items={items} />;
}
```

### AboutSettingItem

Individual setting item with title, value, and optional press handler.

```tsx
import { AboutSettingItem } from '@umituz/react-native-settings';

function EmailItem() {
  return (
    <AboutSettingItem
      title="Email"
      value="support@acme.com"
      onPress={() => Linking.openURL('mailto:support@acme.com')}
      showChevron={true}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Item title |
| `value` | `string` | `undefined` | Item value to display |
| `onPress` | `() => void` | `undefined` | Press handler |
| `showChevron` | `boolean` | `false` | Show navigation chevron |
| `testID` | `string` | `undefined` | Test ID for testing |

### AboutHeader

Header component displaying app name and version.

```tsx
import { AboutHeader } from '@umituz/react-native-settings';

function MyAboutHeader() {
  const appInfo = {
    appName: 'My App',
    version: '1.0.0',
  };

  return <AboutHeader appInfo={appInfo} />;
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appInfo` | `AppInfo` | **Required** | App information |
| `containerStyle` | `ViewStyle` | `undefined` | Custom container style |
| `titleStyle` | `TextStyle` | `undefined` | Custom title style |
| `versionStyle` | `TextStyle` | `undefined` | Custom version style |
| `versionPrefix` | `string` | `'Version'` | Version label prefix |

## Hooks

### useAboutInfo

Hook for managing About information with reactive state management.

```tsx
import { useAboutInfo } from '@umituz/react-native-settings';

function MyAboutComponent() {
  const {
    appInfo,
    loading,
    error,
    initialize,
    update,
    updateAppInfo,
    refresh,
    reset,
  } = useAboutInfo({
    autoInit: true,
    initialConfig: {
      appName: 'My App',
      version: '1.0.0',
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>{appInfo?.appName}</Text>
      <Text>{appInfo?.version}</Text>
    </View>
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `appInfo` | `AppInfo \| null` | Current app information |
| `loading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message if any |
| `initialize` | `(config) => Promise<void>` | Initialize with config |
| `update` | `(config) => Promise<void>` | Update with new config |
| `updateAppInfo` | `(updates) => Promise<void>` | Partial update |
| `refresh` | `() => Promise<void>` | Refresh from storage |
| `reset` | `() => void` | Reset state |

## Types

### AppInfo

```typescript
interface AppInfo {
  appName: string;
  version: string;
  buildNumber?: string;
  developer?: string;
  contactEmail?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
  moreAppsUrl?: string;
}
```

### AboutConfig

```typescript
interface AboutConfig {
  appName?: string;
  version?: string;
  buildNumber?: string;
  developer?: string;
  contactEmail?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
  moreAppsUrl?: string;
  actions?: {
    onEmailPress?: () => void;
    onWebsitePress?: () => void;
    onMoreAppsPress?: () => void;
  };
  texts?: {
    versionPrefix?: string;
    contact?: string;
    developer?: string;
    email?: string;
    website?: string;
    more?: string;
    moreApps?: string;
    loading?: string;
    errorPrefix?: string;
    noInfo?: string;
  };
}
```

## Examples

### Basic Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { AboutScreen } from '@umituz/react-native-settings';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AboutScreen
        config={{
          appName: 'My Awesome App',
          version: '2.1.0',
          buildNumber: '210',
          developer: 'My Company',
          contactEmail: 'hello@mycompany.com',
          websiteUrl: 'https://mycompany.com',
          actions: {
            onEmailPress: () => {
              // Handle email press
              Linking.openURL('mailto:hello@mycompany.com');
            },
            onWebsitePress: () => {
              // Handle website press
              Linking.openURL('https://mycompany.com');
            },
          },
        }}
      />
    </View>
  );
}
```

### Custom Styling

```tsx
import { AboutScreen } from '@umituz/react-native-settings';

function StyledAboutScreen() {
  return (
    <AboutScreen
      config={{ /* ... */ }}
      containerStyle={{ backgroundColor: '#f5f5f5' }}
      headerStyle={{ paddingVertical: 24 }}
      titleStyle={{ fontSize: 28, fontWeight: 'bold' }}
      versionStyle={{ fontSize: 16, color: '#666' }}
    />
  );
}
```

### Custom Header and Footer

```tsx
import { AboutScreen } from '@umituz/react-native-settings';

function CustomAboutScreen() {
  return (
    <AboutScreen
      config={{ /* ... */ }}
      showHeader={false}
      headerComponent={
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Image source={logo} style={{ width: 80, height: 80 }} />
          <Text>My Custom Header</Text>
        </View>
      }
      footerComponent={
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text>Made with ❤️</Text>
        </View>
      }
    />
  );
}
```

### Using the Hook

```tsx
import { useAboutInfo } from '@umituz/react-native-settings';

function AboutManager() {
  const { appInfo, updateAppInfo } = useAboutInfo({
    autoInit: true,
    initialConfig: {
      appName: 'My App',
      version: '1.0.0',
    },
  });

  const handleUpdate = async () => {
    await updateAppInfo({
      version: '1.0.1',
      developer: 'New Developer',
    });
  };

  return (
    <View>
      <Text>App: {appInfo?.appName}</Text>
      <Text>Version: {appInfo?.version}</Text>
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}
```

## Architecture

The About domain follows a clean architecture pattern:

```
src/domains/about/
├── domain/              # Domain entities and interfaces
│   ├── entities/       # AppInfo entity
│   └── repositories/   # Repository interfaces
├── infrastructure/      # Implementation details
│   └── repositories/   # AboutRepository implementation
├── presentation/        # UI components
│   ├── screens/        # AboutScreen
│   ├── components/     # AboutContent, AboutHeader, etc.
│   └── hooks/          # useAboutInfo hook
└── utils/              # Utility functions and factories
```

## Best Practices

1. **Always provide a config**: The `AboutConfig` is required for proper initialization
2. **Handle actions**: Implement press handlers for email, website, and other interactive elements
3. **Provide localized texts**: Use the `texts` property to support multiple languages
4. **Use the hook for dynamic updates**: The `useAboutInfo` hook is ideal for scenarios where app info changes
5. **Test with testIDs**: All components support `testID` prop for E2E testing

## Testing

```tsx
import { render } from '@testing-library/react-native';
import { AboutScreen } from '@umituz/react-native-settings';

describe('AboutScreen', () => {
  it('displays app name and version', () => {
    const { getByText } = render(
      <AboutScreen
        config={{
          appName: 'Test App',
          version: '1.0.0',
        }}
      />
    );

    expect(getByText('Test App')).toBeTruthy();
    expect(getByText('Version 1.0.0')).toBeTruthy();
  });
});
```

## Related

- **Settings**: Main settings management
- **Appearance**: Theme customization
- **Legal**: Privacy policy and terms

## License

MIT
