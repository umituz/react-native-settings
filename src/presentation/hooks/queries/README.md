# Settings Queries

Custom TanStack Query hooks for fetching user settings in the settings system.

## Queries

### useSettingsQuery

Query hook for fetching user settings.

```tsx
import { useSettingsQuery } from '@umituz/react-native-settings';

function SettingsScreen() {
  const { data, isLoading, isError, error } = useSettingsQuery('user123');

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <View>
      <Text>Theme: {data?.settings.theme}</Text>
      <Text>Language: {data?.settings.language}</Text>
    </View>
  );
}
```

#### Returns

```typescript
interface UseSettingsQueryResult {
  data: SettingsResult | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => void;
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | Unique user identifier |
| `options` | `UseQueryOptions` | No | TanStack Query options |

#### Examples

**Basic Query:**

```tsx
const { data, isLoading } = useSettingsQuery('user123');
```

**With Query Options:**

```tsx
const { data } = useSettingsQuery('user123', {
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  refetchOnMount: false,
});
```

**With Refetch:**

```tsx
const { data, refetch } = useSettingsQuery('user123');

const handleRefresh = () => {
  refetch();
};

return (
  <PullToRefresh onRefresh={handleRefresh}>
    <SettingsContent settings={data?.settings} />
  </PullToRefresh>
);
```

**With Conditional Query:**

```tsx
const { data } = useSettingsQuery(
  userId,
  { enabled: !!userId } // Only run query if userId exists
);
```

### useSettingsSuspenseQuery

Suspense version of settings query for React Suspense boundaries.

```tsx
import { useSettingsSuspenseQuery } from '@umituz/react-native-settings';

function SettingsScreen() {
  const { data } = useSettingsSuspenseQuery('user123');

  // Data is guaranteed to be available
  return (
    <View>
      <Text>Theme: {data.settings.theme}</Text>
    </View>
  );
}

// Wrap in Suspense boundary
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SettingsScreen />
    </Suspense>
  );
}
```

#### Returns

```typescript
interface UseSettingsSuspenseQueryResult {
  data: SettingsResult; // Always defined
}
```

## Query Options

### staleTime

Time in milliseconds after which data is considered stale.

```tsx
const { data } = useSettingsQuery('user123', {
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### cacheTime

Time in milliseconds that unused data remains in cache.

```tsx
const { data } = useSettingsQuery('user123', {
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

### refetchOnWindowFocus

Refetch query when window regains focus.

```tsx
const { data } = useSettingsQuery('user123', {
  refetchOnWindowFocus: true, // Default: true
});
```

### refetchOnMount

Refetch query on component mount.

```tsx
const { data } = useSettingsQuery('user123', {
  refetchOnMount: true, // Default: true
});
```

### refetchOnReconnect

Refetch query when network reconnects.

```tsx
const { data } = useSettingsQuery('user123', {
  refetchOnReconnect: true, // Default: true
});
```

### enabled

Conditionally enable/disable query.

```tsx
const { data } = useSettingsQuery('user123', {
  enabled: isLoggedIn, // Only run if logged in
});
```

### onSuccess

Callback executed on successful query.

```tsx
const { data } = useSettingsQuery('user123', {
  onSuccess: (data) => {
    console.log('Settings loaded:', data);
    Analytics.track('settings_loaded', { theme: data.settings.theme });
  },
});
```

### onError

Callback executed on query error.

```tsx
const { data } = useSettingsQuery('user123', {
  onError: (error) => {
    console.error('Failed to load settings:', error);
    Alert.alert('Error', 'Could not load settings');
  },
});
```

### onSettled

Callback executed after query succeeds or fails.

```tsx
const { data } = useSettingsQuery('user123', {
  onSettled: (data, error) => {
    if (error) {
      Analytics.track('settings_load_failed');
    } else {
      Analytics.track('settings_load_success');
    }
  },
});
```

## Usage Examples

### Complete Loading States

```tsx
function SettingsScreen() {
  const { data, isLoading, isError, error } = useSettingsQuery('user123');

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading settings...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <SettingsContent settings={data?.settings} />
  );
}
```

### Pull to Refresh

```tsx
function SettingsScreen() {
  const { data, refetch, isFetching } = useSettingsQuery('user123');

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => refetch()}
        />
      }
    >
      <SettingsContent settings={data?.settings} />
    </ScrollView>
  );
}
```

### Background Refetch

```tsx
function SettingsScreen() {
  const { data } = useSettingsQuery('user123', {
    refetchInterval: 60000, // Refetch every minute
    refetchIntervalInBackground: true,
  });

  return <SettingsContent settings={data?.settings} />;
}
```

### Conditional Query

```tsx
function SettingsScreen({ userId, enabled }) {
  const { data } = useSettingsQuery(userId, {
    enabled: enabled && !!userId,
  });

  if (!enabled) {
    return <Text>Please log in to view settings</Text>;
  }

  return <SettingsContent settings={data?.settings} />;
}
```

### Query Invalidation

```tsx
function SettingsUpdater() {
  const queryClient = useQueryClient();
  const updateSettings = useUpdateSettingsMutation();

  const handleUpdate = (newSettings) => {
    updateSettings.mutate(
      { userId: 'user123', settings: newSettings },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(['settings', 'user123']);
        },
      }
    );
  };

  return <Button onPress={handleUpdate} title="Update" />;
}
```

### Optimistic Updates with Query

```tsx
function SettingsScreen() {
  const queryClient = useQueryClient();
  const { data } = useSettingsQuery('user123');

  const handleThemeChange = (newTheme) => {
    // Optimistically update
    queryClient.setQueryData(['settings', 'user123'], (old: any) => ({
      ...old,
      settings: {
        ...old.settings,
        theme: newTheme,
      },
    }));

    // Then update on server
    updateSettings.mutate({
      userId: 'user123',
      settings: { theme: newTheme },
    });
  };

  return (
    <ThemeSelector
      value={data?.settings.theme}
      onChange={handleThemeChange}
    />
  );
}
```

## Query Keys

Query keys follow a consistent pattern for cache management:

```typescript
// Single user settings
['settings', userId]

// All settings (admin)
['settings']

// Settings with filters
['settings', userId, { type: 'appearance' }]

// Infinite settings (pagination)
['settings', 'infinite']
```

### Manual Invalidation

```tsx
// Invalidate specific user
queryClient.invalidateQueries(['settings', 'user123']);

// Invalidate all settings
queryClient.invalidateQueries(['settings']);

// Remove from cache
queryClient.removeQueries(['settings', 'user123']);

// Reset cache
queryClient.resetQueries(['settings']);
```

### Prefetching

```tsx
// Prefetch settings for expected navigation
const prefetchSettings = async (userId: string) => {
  await queryClient.prefetchQuery(['settings', userId], () =>
    fetchSettings(userId)
  );
};

// Usage
useEffect(() => {
  if (likelyToNavigate) {
    prefetchSettings('user123');
  }
}, [likelyToNavigate]);
```

## Best Practices

1. **Error Handling**: Always handle loading and error states
2. **Cache Strategy**: Configure staleTime and cacheTime appropriately
3. **Refetch Control**: Disable automatic refetch when not needed
4. **Query Keys**: Use consistent query keys for cache management
5. **Prefetching**: Prefetch data for smooth navigation
6. **Optimistic Updates**: Combine with mutations for instant feedback
7. **Suspense**: Use suspense queries for cleaner code

## Related

- **Settings Mutations**: Mutation hooks for updating settings
- **useSettings**: Combined hook for settings management
- **TanStack Query**: Official Query documentation

## License

MIT
