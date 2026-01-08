# Settings Mutations

Custom TanStack Query mutations for updating user settings in the settings system.

## Mutations

### useUpdateSettingsMutation

Mutation hook for updating user settings.

```tsx
import { useUpdateSettingsMutation } from '@umituz/react-native-settings';

function SettingsScreen() {
  const updateSettings = useUpdateSettingsMutation();

  const handleThemeChange = useCallback((theme: 'light' | 'dark') => {
    updateSettings.mutate(
      { userId: 'user123', settings: { theme } },
      {
        onSuccess: () => {
          console.log('Settings updated successfully');
        },
        onError: (error) => {
          console.error('Failed to update settings:', error);
        },
      }
    );
  }, [updateSettings]);

  return <ThemeSelector onThemeChange={handleThemeChange} />;
}
```

#### Returns

```typescript
interface UpdateSettingsMutationResult {
  mutate: (variables: UpdateSettingsVariables) => void;
  mutateAsync: (variables: UpdateSettingsVariables) => Promise<SettingsResult>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: SettingsResult | undefined;
  reset: () => void;
}
```

#### Mutation Variables

```typescript
interface UpdateSettingsVariables {
  userId: string;
  settings: Partial<UserSettings>;
}
```

#### Examples

**Update Single Setting:**

```tsx
const updateSettings = useUpdateSettingsMutation();

const toggleNotifications = () => {
  updateSettings.mutate({
    userId: 'user123',
    settings: { notificationsEnabled: !settings.notificationsEnabled },
  });
};
```

**Update Multiple Settings:**

```tsx
const updateSettings = useUpdateSettingsMutation();

const updateMultipleSettings = () => {
  updateSettings.mutate({
    userId: 'user123',
    settings: {
      theme: 'dark',
      language: 'tr-TR',
      notificationsEnabled: true,
    },
  });
};
```

**With Optimistic Updates:**

```tsx
const updateSettings = useUpdateSettingsMutation();

const handleOptimisticUpdate = (newTheme: 'light' | 'dark') => {
  updateSettings.mutate(
    { userId: 'user123', settings: { theme: newTheme } },
    {
      onMutate: async (newData) => {
        // Cancel ongoing queries
        await queryClient.cancelQueries(['settings', newData.userId]);

        // Snapshot previous value
        const previousSettings = queryClient.getQueryData(['settings', newData.userId]);

        // Optimistically update
        queryClient.setQueryData(['settings', newData.userId], (old: any) => ({
          ...old,
          ...newData.settings,
        }));

        // Return context for rollback
        return { previousSettings };
      },
      onError: (err, newData, context) => {
        // Rollback on error
        queryClient.setQueryData(['settings', newData.userId], context?.previousSettings);
      },
      onSettled: (data, error, newData) => {
        // Refetch on success or error
        queryClient.invalidateQueries(['settings', newData.userId]);
      },
    }
  );
};
```

### useResetSettingsMutation

Mutation hook for resetting user settings to defaults.

```tsx
import { useResetSettingsMutation } from '@umituz/react-native-settings';

function SettingsScreen() {
  const resetSettings = useResetSettingsMutation();

  const handleReset = useCallback(() => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetSettings.mutate('user123', {
              onSuccess: () => {
                Alert.alert('Success', 'Settings have been reset');
              },
            });
          },
        },
      ]
    );
  }, [resetSettings]);

  return <Button onPress={handleReset} title="Reset Settings" />;
}
```

#### Returns

```typescript
interface ResetSettingsMutationResult {
  mutate: (variables: string) => void;
  mutateAsync: (variables: string) => Promise<SettingsResult>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: SettingsResult | undefined;
  reset: () => void;
}
```

#### Examples

**Simple Reset:**

```tsx
const resetSettings = useResetSettingsMutation();

const handleReset = () => {
  resetSettings.mutate('user123');
};
```

**With Confirmation:**

```tsx
const resetSettings = useResetSettingsMutation();

const handleReset = () => {
  Alert.alert(
    'Confirm Reset',
    'This will reset all settings to default. Continue?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => resetSettings.mutate('user123'),
      },
    ]
  );
};
```

**With Post-Reset Actions:**

```tsx
const resetSettings = useResetSettingsMutation();

const handleReset = () => {
  resetSettings.mutate('user123', {
    onSuccess: (data) => {
      // Apply default theme
      applyTheme(data.settings.theme);

      // Restart app if needed
      if (needsRestart) {
        Updates.reloadAsync();
      }

      Alert.alert('Success', 'Settings reset successfully');
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to reset settings');
    },
  });
};
```

## Mutation Options

### onSuccess

Callback executed when mutation succeeds.

```typescript
const updateSettings = useUpdateSettingsMutation();

updateSettings.mutate(
  { userId: 'user123', settings: { theme: 'dark' } },
  {
    onSuccess: (data, variables) => {
      console.log('Updated settings:', data);
      console.log('User ID:', variables.userId);
    },
  }
);
```

### onError

Callback executed when mutation fails.

```typescript
const updateSettings = useUpdateSettingsMutation();

updateSettings.mutate(
  { userId: 'user123', settings: { theme: 'dark' } },
  {
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  }
);
```

### onMutate

Callback executed before mutation, useful for optimistic updates.

```typescript
updateSettings.mutate(
  { userId: 'user123', settings: { theme: 'dark' } },
  {
    onMutate: async (variables) => {
      // Cancel related queries
      await queryClient.cancelQueries(['settings', variables.userId]);

      // Snapshot previous value
      const previous = queryClient.getQueryData(['settings', variables.userId]);

      // Optimistically update
      queryClient.setQueryData(['settings', variables.userId], (old: any) => ({
        ...old,
        ...variables.settings,
      }));

      // Return context with snapshot
      return { previous };
    },
  }
);
```

### onSettled

Callback executed after mutation succeeds or fails.

```typescript
updateSettings.mutate(
  { userId: 'user123', settings: { theme: 'dark' } },
  {
    onSettled: (data, error, variables) => {
      // Always invalidate queries
      queryClient.invalidateQueries(['settings', variables.userId]);
    },
  }
);
```

## Usage Examples

### Complete Form Handler

```tsx
function SettingsForm() {
  const updateSettings = useUpdateSettingsMutation();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en-US');

  const handleSubmit = useCallback(() => {
    updateSettings.mutate(
      {
        userId: 'user123',
        settings: {
          theme,
          language,
          notificationsEnabled: true,
        },
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Settings saved successfully');
        },
        onError: (error) => {
          Alert.alert('Error', 'Failed to save settings');
        },
      }
    );
  }, [theme, language, updateSettings]);

  return (
    <View>
      <ThemeSelector value={theme} onChange={setTheme} />
      <LanguagePicker value={language} onChange={setLanguage} />
      <Button
        onPress={handleSubmit}
        loading={updateSettings.isLoading}
        title="Save Settings"
      />
    </View>
  );
}
```

### Batch Updates

```tsx
function BatchUpdateExample() {
  const updateSettings = useUpdateSettingsMutation();

  const updateMultiplePreferences = async () => {
    const updates = [
      { theme: 'dark' },
      { language: 'tr-TR' },
      { notificationsEnabled: true },
    ];

    // Update sequentially
    for (const update of updates) {
      await updateSettings.mutateAsync({
        userId: 'user123',
        settings: update,
      });
    }

    Alert.alert('Success', 'All settings updated');
  };

  return <Button onPress={updateMultiplePreferences} title="Update All" />;
}
```

### Debounced Updates

```tsx
function DebouncedSettings() {
  const updateSettings = useUpdateSettingsMutation();
  const debouncedUpdate = useMemo(
    () => debounce((settings: Partial<UserSettings>) => {
      updateSettings.mutate({
        userId: 'user123',
        settings,
      });
    }, 500),
    [updateSettings]
  );

  const handleThemeChange = (theme: 'light' | 'dark') => {
    debouncedUpdate({ theme });
  };

  return <ThemeSelector onChange={handleThemeChange} />;
}
```

## Best Practices

1. **Optimistic Updates**: Use onMutate for immediate UI feedback
2. **Error Handling**: Always handle errors gracefully
3. **Loading States**: Show loading indicators during mutations
4. **Confirmation**: Confirm destructive operations like reset
5. **Invalidation**: Invalidate queries after mutations
6. **Rollback**: Implement rollback for failed optimistic updates
7. **Type Safety**: Use TypeScript for mutation variables

## Related

- **Settings Queries**: Query hooks for fetching settings
- **useSettings**: Combined hook for settings management
- **Settings Repository**: Data persistence layer

## License

MIT
