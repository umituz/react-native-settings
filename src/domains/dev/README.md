# Dev Domain

The Dev domain provides development-only utilities and settings for debugging and testing your React Native app during development.

## Features

- **Development Mode Only**: Components only render in `__DEV__` mode
- **Storage Clearing**: Reset app to initial state
- **Custom Dev Tools**: Add custom development utilities
- **Safe Production**: No dev code in production builds
- **Confirmation Dialogs**: Prevent accidental data loss

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### DevSettingsSection

Development settings section with storage clearing and custom dev tools. Only visible in `__DEV__` mode.

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';

function MySettings() {
  return (
    <ScrollView>
      {/* Regular settings */}

      <DevSettingsSection
        onAfterClear={async () => {
          // Reload app after clearing
          Updates.reloadAsync();
        }}
      />
    </ScrollView>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` in `__DEV__` | Enable dev section |
| `onAfterClear` | `() => Promise<void>` | `undefined` | Callback after clearing storage |
| `texts` | `Partial<DevTexts>` | `undefined` | Custom texts (English defaults) |
| `customDevComponents` | `ReactNode[]` | `[]` | Custom dev components |

### StorageClearSetting

Individual setting component for clearing app storage.

```tsx
import { StorageClearSetting } from '@umituz/react-native-settings';

function StorageClearButton() {
  return (
    <StorageClearSetting
      title="Clear Storage"
      description="Reset all data"
      onClear={() => console.log('Storage cleared')}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Clear All Data'` | Button title |
| `description` | `string` | `'Reset app to initial state'` | Button description |
| `onClear` | `() => void` | `undefined` | Clear handler |

## Examples

### Basic Dev Settings

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <ScreenLayout>
      {/* Regular settings */}
      <SettingsItemCard title="General" onPress={() => {}} />
      <SettingsItemCard title="Appearance" onPress={() => {}} />

      {/* Dev settings - only visible in __DEV__ mode */}
      <DevSettingsSection
        onAfterClear={async () => {
          // Reset app state and reload
          await resetAppState();
          Updates.reloadAsync();
        }}
      />
    </ScreenLayout>
  );
}
```

### With Custom Texts

```tsx
function CustomDevSettings() {
  return (
    <DevSettingsSection
      texts={{
        sectionTitle: 'Developer Tools',
        clearTitle: 'Reset Application',
        clearDescription: 'Clear all local data and reset',
        confirmTitle: 'Confirm Reset',
        confirmMessage: 'Are you sure you want to reset? All data will be lost.',
        cancelButton: 'Cancel',
        confirmButton: 'Reset',
      }}
      onAfterClear={async () => {
        // Custom clear logic
        await clearData();
        await resetOnboarding();
      }}
    />
  );
}
```

### With Custom Dev Components

```tsx
import { DevSettingsSection, SettingsItemCard } from '@umituz/react-native-settings';

function DevSettingsWithCustomTools() {
  const [mockMode, setMockMode] = useState(false);

  return (
    <DevSettingsSection
      customDevComponents={[
        <SettingsItemCard
          key="mock-mode"
          icon="flask"
          title="Mock API Mode"
          value={mockMode ? 'Enabled' : 'Disabled'}
          onPress={() => setMockMode(!mockMode)}
        />,
        <SettingsItemCard
          key="debug-logs"
          icon="bug"
          title="Show Debug Logs"
          onPress={() => console.log('Showing logs...')}
        />,
        <SettingsItemCard
          key="test-data"
          icon="database"
          title="Load Test Data"
          onPress={() => loadTestData()}
        />,
      ]}
      onAfterClear={async () => {
        await reloadApp();
      }}
    />
  );
}
```

### Complete Dev Tools

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';
import { SettingsItemCard } from '@umituz/react-native-settings';

function CompleteDevSettings() {
  const [devMode, setDevMode] = useState({
    mockApi: false,
    showLogs: false,
    forceError: false,
  });

  return (
    <DevSettingsSection
      texts={{
        sectionTitle: 'Developer Tools',
        clearTitle: 'Reset App State',
        clearDescription: 'Clear all data and reload',
      }}
      customDevComponents={[
        // Mock API Toggle
        <SettingsItemCard
          key="mock-api"
          icon="flask"
          title="Mock API"
          value={devMode.mockApi ? 'ON' : 'OFF'}
          onPress={() => setDevMode(prev => ({
            ...prev,
            mockApi: !prev.mockApi,
          }))}
        />,

        // Debug Logs
        <SettingsItemCard
          key="debug-logs"
          icon="terminal"
          title="Debug Logs"
          value={devMode.showLogs ? 'Visible' : 'Hidden'}
          onPress={() => setDevMode(prev => ({
            ...prev,
            showLogs: !prev.showLogs,
          }))}
        />,

        // Network Inspector
        <SettingsItemCard
          key="network-inspector"
          icon="globe"
          title="Network Inspector"
          onPress={() => openNetworkInspector()}
        />,

        // Test Notifications
        <SettingsItemCard
          key="test-notifications"
          icon="bell"
          title="Test Notification"
          onPress={() => sendTestNotification()}
        />,

        // Performance Monitor
        <SettingsItemCard
          key="perf-monitor"
          icon="activity"
          title="Performance Monitor"
          onPress={() => openPerformanceMonitor()}
        />,

        // Load Test Data
        <SettingsItemCard
          key="load-test-data"
          icon="database"
          title="Load Test Data"
          onPress={() => loadTestData()}
        />,

        // Force Error
        <SettingsItemCard
          key="force-error"
          icon="alert-octagon"
          title="Force Test Error"
          onPress={() => throw new Error('Test error')}
          iconColor="#DC2626"
        />,
      ]}
      onAfterClear={async () => {
        // Reset and reload
        await resetApp();
        Updates.reloadAsync();
      }}
    />
  );
}
```

### Onboarding Reset

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';
import { SettingsItemCard } from '@umituz/react-native-settings';

function DevSettingsWithOnboardingReset() {
  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('onboarding_completed');
    await AsyncStorage.removeItem('onboarding_version');
  };

  return (
    <DevSettingsSection
      customDevComponents={[
        <SettingsItemCard
          key="reset-onboarding"
          icon="refresh-cw"
          title="Reset Onboarding"
          description="Show onboarding again on next launch"
          onPress={resetOnboarding}
        />,
      ]}
      onAfterClear={async () => {
        await resetOnboarding();
        await reloadApp();
      }}
    />
  );
}
```

### Feature Flags

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';
import { SettingsItemCard } from '@umituz/react-native-settings';

function DevSettingsWithFeatureFlags() {
  const [features, setFeatures] = useState({
    newFeature: false,
    experimentalUI: false,
    betaIntegration: false,
  });

  const toggleFeature = (featureName: string) => {
    setFeatures(prev => ({
      ...prev,
      [featureName]: !prev[featureName],
    }));
  };

  return (
    <DevSettingsSection
      customDevComponents={[
        <SettingsItemCard
          key="feature-new"
          icon="zap"
          title="New Feature"
          value={features.newFeature ? 'Enabled' : 'Disabled'}
          onPress={() => toggleFeature('newFeature')}
        />,
        <SettingsItemCard
          key="feature-ui"
          icon="layout"
          title="Experimental UI"
          value={features.experimentalUI ? 'Enabled' : 'Disabled'}
          onPress={() => toggleFeature('experimentalUI')}
        />,
        <SettingsItemCard
          key="feature-beta"
          icon="package"
          title="Beta Integration"
          value={features.betaIntegration ? 'Enabled' : 'Disabled'}
          onPress={() => toggleFeature('betaIntegration')}
        />,
      ]}
      onAfterClear={resetApp}
    />
  );
}
```

## Default Texts

The component uses these default texts (English only, as it's a dev-only feature):

```typescript
const DEFAULT_TEXTS = {
  sectionTitle: "Developer",
  clearTitle: "Clear All Data",
  clearDescription: "Reset app to initial state (DEV only)",
  confirmTitle: "Clear All Data?",
  confirmMessage: "This will clear all app data and reset to initial state. This action cannot be undone.",
  cancelButton: "Cancel",
  confirmButton: "Clear",
  successTitle: "Success",
  successMessage: "All data cleared. Restarting app...",
  errorTitle: "Error",
  errorMessage: "Failed to clear data",
};
```

## Architecture

```
src/domains/dev/
├── presentation/
│   └── components/
│       ├── DevSettingsSection.tsx    # Main dev settings section
│       └── StorageClearSetting.tsx   # Storage clear component
└── index.ts                          # Public API exports
```

## Best Practices

1. **Dev Only**: Always verify components only render in `__DEV__` mode
2. **Clear Warnings**: Show clear warnings before destructive actions
3. **Confirm Actions**: Require confirmation for data clearing
4. **Custom Tools**: Add relevant debugging tools for your app
5. **Safe Defaults**: Don't enable dangerous features by default
6. **Production Safety**: Double-check no dev code leaks to production
7. **App Reload**: Always reload the app after clearing storage
8. **Reset State**: Reset all app state after clearing storage

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { DevSettingsSection } from '@umituz/react-native-settings';

describe('DevSettingsSection', () => {
  // Mock __DEV__
  const originalDev = __DEV__;

  beforeAll(() => {
    (global as any).__DEV__ = true;
  });

  afterAll(() => {
    (global as any).__DEV__ = originalDev;
  });

  it('renders in dev mode', () => {
    const { getByText } = render(
      <DevSettingsSection />
    );

    expect(getByText(/developer/i)).toBeTruthy();
  });

  it('does not render in production', () => {
    (global as any).__DEV__ = false;

    const { queryByText } = render(
      <DevSettingsSection />
    );

    expect(queryByText(/developer/i)).toBeNull();
  });

  it('shows confirmation dialog before clearing', () => {
    const mockClear = jest.fn();
    const { getByText } = render(
      <DevSettingsSection onAfterClear={mockClear} />
    );

    fireEvent.press(getByText(/clear all data/i));

    // Should show alert
    expect(Alert.alert).toHaveBeenCalled();
  });

  it('calls onAfterClear after confirmation', async () => {
    const mockClear = jest.fn();
    const { getByText } = render(
      <DevSettingsSection onAfterClear={mockClear} />
    );

    // Trigger clear and confirm
    fireEvent.press(getByText(/clear all data/i));

    // Get alert buttons and press confirm
    const alertCalls = (Alert.alert as jest.Mock).mock.calls;
    const confirmButton = alertCalls[0][2][1]; // Second button is confirm

    await confirmButton.onPress();

    expect(mockClear).toHaveBeenCalled();
  });
});
```

## Related

- **Settings**: Main settings management
- **Storage**: Data persistence and clearing
- **Cloud Sync**: Cloud synchronization utilities

## Important Notes

⚠️ **Development Only**: These components are designed for development use only and should never appear in production builds.

⚠️ **Data Loss**: The "Clear All Data" button will permanently delete all app data. Always use with confirmation dialogs.

⚠️ **No Localization**: Dev components use hardcoded English text since they don't need localization support.

## License

MIT
