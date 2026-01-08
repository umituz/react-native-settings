# Presentation Hooks

Custom React hooks for managing settings state, queries, and mutations in the presentation layer.

## Hooks

### useSettings

Primary hook for accessing and managing user settings with TanStack Query integration.

```tsx
import { useSettings } from '@umituz/react-native-settings';

function SettingsComponent() {
  const { settings, loading, error, updateSettings, resetSettings } = useSettings('user123');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View>
      <Text>Theme: {settings?.theme}</Text>
      <Button
        title="Toggle Dark Mode"
        onPress={() => updateSettings({ theme: 'dark' })}
      />
    </View>
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `settings` | `UserSettings \| null` | Current user settings |
| `loading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `updateSettings` | `(updates) => Promise<void>` | Update settings function |
| `resetSettings` | `() => Promise<void>` | Reset to defaults function |

#### Example

```tsx
function ThemeToggle() {
  const { settings, updateSettings } = useSettings(userId);

  const toggleTheme = () => {
    const newTheme = settings?.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  return (
    <Switch
      value={settings?.theme === 'dark'}
      onValueChange={toggleTheme}
    />
  );
}
```

### useSettingsQuery

Hook for querying user settings with TanStack Query.

```tsx
import { useSettingsQuery } from '@umituz/react-native-settings';

function SettingsData() {
  const { data, isLoading, error } = useSettingsQuery('user123');

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading settings</Text>;

  return <Text>Language: {data.language}</Text>;
}
```

### useUpdateSettingsMutation

Hook for updating settings with TanStack Query mutation.

```tsx
import { useUpdateSettingsMutation } from '@umituz/react-native-settings';

function UpdateSettings() {
  const mutation = useUpdateSettingsMutation('user123');

  const handleUpdate = async () => {
    await mutation.mutateAsync({ theme: 'dark' });
  };

  return <Button onPress={handleUpdate} title="Update Settings" />;
}
```

### useResetSettingsMutation

Hook for resetting settings to defaults.

```tsx
import { useResetSettingsMutation } from '@umituz/react-native-settings';

function ResetButton() {
  const mutation = useResetSettingsMutation('user123');

  return (
    <Button
      onPress={() => mutation.mutateAsync()}
      title="Reset to Defaults"
    />
  );
}
```

## Usage Examples

### Complete Settings Management

```tsx
import { useSettings } from '@umituz/react-native-settings';

function SettingsManager() {
  const { settings, loading, error, updateSettings, resetSettings } = useSettings(userId);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    updateSettings({ theme });
  };

  const handleLanguageChange = (language: string) => {
    updateSettings({ language });
  };

  const handleNotificationsToggle = () => {
    updateSettings({
      notificationsEnabled: !settings?.notificationsEnabled,
    });
  };

  const handleReset = async () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetSettings();
            Alert.alert('Success', 'Settings have been reset');
          },
        },
      ]
    );
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <ScreenLayout>
      <SettingsSection title="APPEARANCE">
        <SettingsItemCard
          icon="moon-outline"
          title="Dark Mode"
          showSwitch={true}
          switchValue={settings?.theme === 'dark'}
          onSwitchChange={() => handleThemeChange('dark')}
        />
        <SettingsItemCard
          icon="globe-outline"
          title="Language"
          description={settings?.language}
          onPress={() => setShowLanguageSelector(true)}
        />
      </SettingsSection>

      <SettingsSection title="NOTIFICATIONS">
        <SettingsItemCard
          icon="notifications-outline"
          title="Enable Notifications"
          showSwitch={true}
          switchValue={settings?.notificationsEnabled}
          onSwitchChange={handleNotificationsToggle}
        />
      </SettingsSection>

      <SettingsSection title="DANGER ZONE">
        <SettingsItemCard
          icon="refresh-outline"
          title="Reset Settings"
          description="Reset all settings to defaults"
          onPress={handleReset}
          iconColor="#DC2626"
        />
      </SettingsSection>
    </ScreenLayout>
  );
}
```

### Multiple Settings Updates

```tsx
function BulkUpdate() {
  const { updateSettings, settings } = useSettings(userId);

  const enableAllFeatures = async () => {
    await updateSettings({
      notificationsEnabled: true,
      soundEnabled: true,
      vibrationEnabled: true,
      emailNotifications: true,
      pushNotifications: true,
    });
  };

  const disableAllFeatures = async () => {
    await updateSettings({
      notificationsEnabled: false,
      soundEnabled: false,
      vibrationEnabled: false,
      emailNotifications: false,
      pushNotifications: false,
    });
  };

  return (
    <View>
      <Button title="Enable All" onPress={enableAllFeatures} />
      <Button title="Disable All" onPress={disableAllFeatures} />
    </View>
  );
}
```

### Optimistic Updates

```tsx
function OptimisticThemeToggle() {
  const { settings, updateSettings } = useSettings(userId);
  const [localTheme, setLocalTheme] = useState(settings?.theme);

  const handleToggle = async () => {
    const newTheme = localTheme === 'light' ? 'dark' : 'light';

    // Optimistic update
    setLocalTheme(newTheme);

    try {
      await updateSettings({ theme: newTheme });
    } catch (error) {
      // Revert on error
      setLocalTheme(settings?.theme);
      Alert.alert('Error', 'Failed to update theme');
    }
  };

  return (
    <Switch
      value={localTheme === 'dark'}
      onValueChange={handleToggle}
    />
  );
}
```

### Error Handling

```tsx
function SettingsWithErrorHandling() {
  const { settings, updateSettings, error } = useSettings(userId);

  const handleUpdate = async () => {
    try {
      await updateSettings({ theme: 'dark' });
      Alert.alert('Success', 'Settings updated');
    } catch (err) {
      Alert.alert('Error', 'Failed to update settings');
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Settings Error', error);
    }
  }, [error]);

  return (
    <Button
      title="Update Theme"
      onPress={handleUpdate}
      disabled={!settings}
    />
  );
}
```

### Loading States

```tsx
function SettingsWithLoadingStates() {
  const { settings, loading, updateSettings } = useSettings(userId);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateSettings({ theme: 'dark' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <Button
      title={isUpdating ? 'Updating...' : 'Update Theme'}
      onPress={handleUpdate}
      disabled={loading || isUpdating}
    />
  );
}
```

## Hook Dependencies

```
presentation/hooks/
├── useSettings.ts              # Main settings hook
├── queries/
│   └── useSettingsQuery.ts     # TanStack Query integration
└── mutations/
    └── useSettingsMutations.ts # Mutation hooks
```

## Integration with TanStack Query

These hooks use TanStack Query for:

- **Caching**: Automatic caching of settings data
- **Background Updates**: Automatic refetching
- **Optimistic Updates**: UI updates before server confirmation
- **Error Handling**: Built-in error management
- **Loading States**: Automatic loading state management

## Best Practices

1. **Use useSettings**: Prefer the main hook for most use cases
2. **Handle Loading**: Always handle loading state
3. **Error Handling**: Implement proper error handling
4. **Optimistic Updates**: Use optimistic updates for better UX
5. **Partial Updates**: Use partial updates to only change needed fields
6. **Reset Confirmation**: Always confirm before resetting settings

## Testing

```tsx
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useSettings } from '@umituz/react-native-settings';

describe('useSettings', () => {
  it('loads settings for user', async () => {
    const { result } = renderHook(() => useSettings('user123'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.settings).toBeDefined();
    });
  });

  it('updates settings', async () => {
    const { result } = renderHook(() => useSettings('user123'));

    await act(async () => {
      await result.current.updateSettings({ theme: 'dark' });
    });

    expect(result.current.settings?.theme).toBe('dark');
  });

  it('resets settings', async () => {
    const { result } = renderHook(() => useSettings('user123'));

    await act(async () => {
      await result.current.resetSettings();
    });

    expect(result.current.settings?.theme).toBe('auto');
  });
});
```

## Related

- **Application Layer**: Repository interfaces and types
- **Infrastructure**: Storage implementation
- **Presentation Components**: UI components

## License

MIT
