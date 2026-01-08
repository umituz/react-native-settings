# Settings Footer

Footer component for displaying app version, build information, and additional metadata at the bottom of the settings screen.

## Features

- **Version Display**: Shows app version and build number
- **Customizable**: Support for custom footer text
- **Styled**: Uses design system tokens for consistent styling
- **Optional**: Can be shown/hidden based on configuration

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { SettingsFooter } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <ScrollView>
      <SettingsContent />
      <SettingsFooter
        appVersion="1.0.0"
        buildNumber="100"
      />
    </ScrollView>
  );
}
```

### With Custom Text

```tsx
function SettingsScreen() {
  return (
    <View>
      <SettingsContent />
      <SettingsFooter
        appVersion="1.0.0"
        buildNumber="100"
        customText="© 2025 My Company. All rights reserved."
      />
    </View>
  );
}
```

### With Development Build

```tsx
function SettingsScreen() {
  const isDev = __DEV__;

  return (
    <View>
      <SettingsContent />
      <SettingsFooter
        appVersion="1.0.0"
        buildNumber="100"
        showEnvironment={isDev}
        environment={isDev ? 'Development' : 'Production'}
      />
    </View>
  );
}
```

## Props

### SettingsFooterProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appVersion` | `string` | **Required** | App version number |
| `buildNumber` | `string` | `undefined` | Build number |
| `customText` | `string` | `undefined` | Custom footer text |
| `showEnvironment` | `boolean` | `false` | Show environment label |
| `environment` | `string` | `undefined` | Environment name (e.g., "Dev", "Staging") |
| `showBuildInfo` | `boolean` | `true` | Show build number |
| `style` | `ViewStyle` | `undefined` | Custom container style |

## Component Structure

```
SettingsFooter
├── Version Number      (e.g., "Version 1.0.0")
├── Build Number       (e.g., "Build 100")
├── Environment Label  (e.g., "Development")
└── Custom Text        (e.g., "© 2025 My Company")
```

## Examples

### Standard Footer

```tsx
<SettingsFooter
  appVersion="1.0.0"
  buildNumber="100"
/>
```

Displays:
```
Version 1.0.0
Build 100
```

### Minimal Footer

```tsx
<SettingsFooter
  appVersion="1.0.0"
  showBuildInfo={false}
/>
```

Displays:
```
Version 1.0.0
```

### Footer with Copyright

```tsx
<SettingsFooter
  appVersion="2.0.0"
  buildNumber="200"
  customText="© 2025 My Company. All rights reserved."
/>
```

Displays:
```
Version 2.0.0
Build 200
© 2025 My Company. All rights reserved.
```

### Development Build Footer

```tsx
<SettingsFooter
  appVersion="1.0.0"
  buildNumber="100"
  showEnvironment={true}
  environment="Development"
/>
```

Displays:
```
Version 1.0.0
Build 100
Development
```

### Production Footer

```tsx
<SettingsFooter
  appVersion="1.5.2"
  buildNumber="152"
  showEnvironment={true}
  environment="Production"
  customText="Made with ❤️ by My Team"
/>
```

Displays:
```
Version 1.5.2
Build 152
Production
Made with ❤️ by My Team
```

## Styling

### Default Styles

```typescript
const styles = StyleSheet.create({
  container: {
    paddingVertical: tokens.spacing.xl,      // 24px
    paddingHorizontal: tokens.spacing.lg,    // 16px
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
  },
  versionText: {
    fontSize: tokens.typography.fontSize.sm, // 14px
    color: tokens.colors.textSecondary,
    textAlign: 'center',
  },
  buildText: {
    fontSize: tokens.typography.fontSize.xs, // 12px
    color: tokens.colors.textTertiary,
    textAlign: 'center',
    marginTop: tokens.spacing.xs,           // 4px
  },
  customText: {
    fontSize: tokens.typography.fontSize.xs, // 12px
    color: tokens.colors.textTertiary,
    textAlign: 'center',
    marginTop: tokens.spacing.sm,           // 8px
  },
  environmentBadge: {
    backgroundColor: tokens.colors.warning,
    paddingHorizontal: tokens.spacing.sm,    // 8px
    paddingVertical: tokens.spacing.xs,     // 4px
    borderRadius: tokens.borderRadius.sm,   // 4px
    marginTop: tokens.spacing.sm,           // 8px
  },
  environmentText: {
    fontSize: tokens.typography.fontSize.xs, // 12px
    color: tokens.colors.surface,
    fontWeight: '600',
  },
});
```

### Custom Styled Footer

```tsx
<SettingsFooter
  appVersion="1.0.0"
  buildNumber="100"
  style={{
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 20,
  }}
/>
```

## Environment Labels

### Development

```tsx
<SettingsFooter
  appVersion="1.0.0"
  showEnvironment={true}
  environment="Development"
/>
```

Shows a yellow badge with "Development".

### Staging

```tsx
<SettingsFooter
  appVersion="1.0.0"
  showEnvironment={true}
  environment="Staging"
/>
```

Shows an orange badge with "Staging".

### Production

```tsx
<SettingsFooter
  appVersion="1.0.0"
  showEnvironment={true}
  environment="Production"
/>
```

Shows a green badge with "Production".

## Getting Version Info

### From Constants

```tsx
import Constants from 'expo-constants';

function SettingsScreen() {
  return (
    <SettingsFooter
      appVersion={Constants.expoConfig.version}
      buildNumber={Constants.expoConfig.ios?.buildNumber || Constants.expoConfig.android?.versionCode}
    />
  );
}
```

### From React Native

```tsx
import { NativeModules, Platform } from 'react-native';

function SettingsScreen() {
  const version = Platform.select({
    ios: NativeModules.RNVersion?.version,
    android: NativeModules.RNVersion?.versionName,
  });

  const buildNumber = Platform.select({
    ios: NativeModules.RNVersion?.build,
    android: NativeModules.RNVersion?.versionCode,
  });

  return (
    <SettingsFooter
      appVersion={version}
      buildNumber={buildNumber}
    />
  );
}
```

### From App Config

```tsx
import appConfig from '../app.json';

function SettingsScreen() {
  const { expo } = appConfig;

  return (
    <SettingsFooter
      appVersion={expo.version}
      buildNumber={expo.ios?.buildNumber || expo.android?.versionCode}
    />
  );
}
```

## Layout Integration

### In ScrollView

```tsx
function SettingsScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <SettingsContent />
      <SettingsFooter appVersion="1.0.0" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
```

### In FlatList Footer

```tsx
function SettingsScreen() {
  const renderItem = ({ item }) => <SettingsItemCard {...item} />;

  const ListFooterComponent = () => (
    <SettingsFooter appVersion="1.0.0" />
  );

  return (
    <FlatList
      data={settingsItems}
      renderItem={renderItem}
      ListFooterComponent={ListFooterComponent}
    />
  );
}
```

### In SafeAreaView

```tsx
function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SettingsContent />
      <SettingsFooter appVersion="1.0.0" />
    </SafeAreaView>
  );
}
```

## Conditional Display

### Based on Build Mode

```tsx
function SettingsScreen() {
  const showBuildInfo = __DEV__;

  return (
    <SettingsFooter
      appVersion="1.0.0"
      buildNumber={showBuildInfo ? "100" : undefined}
      showBuildInfo={showBuildInfo}
    />
  );
}
```

### Based on Environment

```tsx
function SettingsScreen() {
  const environment = Constants.expoConfig.extra?.environment;
  const isProduction = environment === 'production';

  return (
    <SettingsFooter
      appVersion="1.0.0"
      showEnvironment={!isProduction}
      environment={environment}
    />
  );
}
```

## Best Practices

1. **Version Info**: Always display app version for support
2. **Build Numbers**: Show build numbers in development builds
3. **Environment**: Display environment in non-production builds
4. **Custom Text**: Keep custom text brief and relevant
5. **Styling**: Use design system tokens for consistency
6. **Placement**: Place at bottom of scrollable content
7. **Accessibility**: Ensure text is readable and accessible

## Related

- **SettingsContent**: Main content component
- **SettingsScreen**: Screen component
- **SettingsSection**: Section component

## License

MIT
