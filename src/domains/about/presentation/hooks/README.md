# useAboutInfo Hook

Custom hook for managing app information display in the About screen and components.

## Features

- **App Info**: Retrieves app name, version, build number
- **Developer Info**: Gets developer contact details
- **Formatted Data**: Provides formatted strings for display
- **Cached**: Memoized for performance
- **Customizable**: Supports custom app info injection

## Installation

This hook is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { useAboutInfo } from '@umituz/react-native-settings';

function AboutScreen() {
  const { appInfo, developerInfo, versionString, isLoading } = useAboutInfo();

  if (isLoading) return <LoadingSpinner />;

  return (
    <View>
      <Text>{appInfo.name}</Text>
      <Text>{versionString}</Text>
      <Text>{developerInfo.name}</Text>
    </View>
  );
}
```

### With Custom App Info

```tsx
function AboutScreen() {
  const customAppInfo = {
    name: 'My App',
    version: '2.0.0',
    buildNumber: '200',
    developer: 'My Company',
    contactEmail: 'support@example.com',
    websiteUrl: 'https://example.com',
  };

  const { appInfo, versionString } = useAboutInfo(customAppInfo);

  return (
    <View>
      <Text>{appInfo.name}</Text>
      <Text>Version {versionString}</Text>
    </View>
  );
}
```

## Return Value

```typescript
interface UseAboutInfoResult {
  appInfo: {
    name: string;           // App name
    version: string;        // App version
    buildNumber: string;    // Build number
    developer: string;      // Developer name
    contactEmail?: string;  // Contact email
    websiteUrl?: string;    // Website URL
    websiteDisplay?: string; // Website display text
    moreAppsUrl?: string;   // More apps URL
  };
  versionString: string;    // Formatted version (e.g., "Version 1.0.0 (100)")
  developerInfo: {
    name: string;           // Developer name
    email?: string;         // Developer email
    website?: string;       // Developer website
  };
  isLoading: boolean;       // Loading state
}
```

## Examples

### Display App Information

```tsx
function AboutContent() {
  const { appInfo, versionString, isLoading } = useAboutInfo();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>{appInfo.name}</Text>
      <Text style={styles.version}>{versionString}</Text>

      {appInfo.developer && (
        <Text style={styles.developer}>
          Made by {appInfo.developer}
        </Text>
      )}
    </View>
  );
}
```

### Contact Actions

```tsx
function AboutActions() {
  const { appInfo } = useAboutInfo();

  const handleEmailPress = useCallback(() => {
    if (appInfo.contactEmail) {
      Linking.openURL(`mailto:${appInfo.contactEmail}`);
    }
  }, [appInfo.contactEmail]);

  const handleWebsitePress = useCallback(() => {
    if (appInfo.websiteUrl) {
      Linking.openURL(appInfo.websiteUrl);
    }
  }, [appInfo.websiteUrl]);

  return (
    <View>
      <Button
        title="Contact Support"
        onPress={handleEmailPress}
        disabled={!appInfo.contactEmail}
      />
      <Button
        title="Visit Website"
        onPress={handleWebsitePress}
        disabled={!appInfo.websiteUrl}
      />
    </View>
  );
}
```

### More Apps Link

```tsx
function MoreAppsButton() {
  const { appInfo } = useAboutInfo();

  if (!appInfo.moreAppsUrl) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(appInfo.moreAppsUrl)}
      style={styles.button}
    >
      <Text style={styles.buttonText}>
        More Apps by {appInfo.developer}
      </Text>
    </TouchableOpacity>
  );
}
```

### Custom Version Display

```tsx
function VersionDisplay() {
  const { appInfo } = useAboutInfo();

  return (
    <View style={styles.versionContainer}>
      <View style={styles.versionBadge}>
        <Text style={styles.versionText}>
          v{appInfo.version}
        </Text>
      </View>

      {__DEV__ && (
        <Text style={styles.buildText}>
          Build {appInfo.buildNumber}
        </Text>
      )}
    </View>
  );
}
```

### With Loading State

```tsx
function AboutScreen() {
  const { appInfo, versionString, isLoading } = useAboutInfo();

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Loading app info...</Text>
        </View>
      ) : (
        <>
          <AboutHeader appInfo={appInfo} />
          <AboutVersion versionString={versionString} />
          <AboutDeveloper developerInfo={appInfo.developer} />
        </>
      )}
    </ScrollView>
  );
}
```

### With Error Handling

```tsx
function AboutScreen() {
  const { appInfo, versionString, isLoading, error } = useAboutInfo();

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Failed to load app information</Text>
        <Button title="Retry" onPress={refetch} />
      </View>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <AboutContent appInfo={appInfo} versionString={versionString} />;
}
```

## Data Sources

### From App Config

```tsx
import Constants from 'expo-constants';

function useAboutInfo() {
  const appInfo = useMemo(() => ({
    name: Constants.expoConfig.name,
    version: Constants.expoConfig.version,
    buildNumber: Constants.expoConfig.ios?.buildNumber ||
                 Constants.expoConfig.android?.versionCode,
  }), []);

  return { appInfo };
}
```

### From Custom Props

```tsx
function useAboutInfo(customAppInfo?: AppInfo) {
  const defaultAppInfo = {
    name: 'My App',
    version: '1.0.0',
    buildNumber: '1',
  };

  const appInfo = useMemo(() => ({
    ...defaultAppInfo,
    ...customAppInfo,
  }), [customAppInfo]);

  return { appInfo };
}
```

### From Repository

```tsx
function useAboutInfo() {
  const { data, isLoading } = useQuery(['appInfo'], fetchAppInfo);

  const appInfo = useMemo(() => ({
    name: data?.name,
    version: data?.version,
    buildNumber: data?.buildNumber,
    developer: data?.developer,
  }), [data]);

  return { appInfo, isLoading };
}
```

## Formatting Helpers

### Version String

```tsx
const versionString = useMemo(() => {
  if (appInfo.buildNumber) {
    return `Version ${appInfo.version} (${appInfo.buildNumber})`;
  }
  return `Version ${appInfo.version}`;
}, [appInfo.version, appInfo.buildNumber]);
```

### Developer String

```tsx
const developerString = useMemo(() => {
  if (appInfo.contactEmail && appInfo.websiteUrl) {
    return `${appInfo.developer}\n${appInfo.contactEmail}\n${appInfo.websiteUrl}`;
  }
  return appInfo.developer || '';
}, [appInfo.developer, appInfo.contactEmail, appInfo.websiteUrl]);
```

### Copyright String

```tsx
const copyrightString = useMemo(() => {
  const year = new Date().getFullYear();
  return `© ${year} ${appInfo.developer}. All rights reserved.`;
}, [appInfo.developer]);
```

## Best Practices

1. **Memoization**: Use useMemo for expensive calculations
2. **Loading States**: Show loading indicator while fetching
3. **Error Handling**: Handle errors gracefully
4. **Caching**: Cache app info to avoid repeated fetches
5. **Validation**: Validate app info before displaying
6. **Accessibility**: Ensure all info is accessible
7. **Type Safety**: Use TypeScript for type checking

## Related

- **AboutScreen**: About screen component
- **AboutContent**: About content component
- **AppInfo Type**: App info type definition

## License

MIT
