# Settings Error Boundary

Error boundary component for catching and handling errors in settings screens and components.

## Features

- **Error Catching**: Catches JavaScript errors in component tree
- **Fallback UI**: Displays user-friendly error messages
- **Error Reporting**: Integrates with error tracking services
- **Recovery Options**: Provide retry or reset actions
- **Development Mode**: Detailed error info in development

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { SettingsErrorBoundary } from '@umituz/react-native-settings';

function App() {
  return (
    <SettingsErrorBoundary>
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}
```

### With Custom Fallback

```tsx
function App() {
  return (
    <SettingsErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error) => console.error(error)}
    >
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}

function ErrorFallback() {
  return (
    <View style={styles.container}>
      <Text>Something went wrong</Text>
      <Button title="Retry" onPress={() => window.location.reload()} />
    </View>
  );
}
```

### With Recovery Actions

```tsx
function App() {
  const handleReset = () => {
    // Clear cache
    clearSettingsCache();
    // Reload app
    Updates.reloadAsync();
  };

  return (
    <SettingsErrorBoundary
      onReset={handleReset}
      fallback={({ error, resetError }) => (
        <ErrorFallback error={error} onReset={resetError} />
      )}
    >
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}
```

## Props

### SettingsErrorBoundaryProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Component tree to wrap |
| `fallback` | `ReactNode \| FallbackRender` | Default fallback | Fallback UI when error occurs |
| `onError` | `(error: Error) => void` | `undefined` | Error callback |
| `onReset` | `() => void` | `undefined` | Reset callback |
| `retryButton` | `boolean` | `true` | Show retry button |
| `showDetails` | `boolean` | `__DEV__` | Show error details |

### FallbackRender

```typescript
type FallbackRender = (props: {
  error: Error;
  resetError: () => void;
}) => ReactNode;
```

## Fallback Component

### Default Fallback

```tsx
<SettingsErrorBoundary>
  <SettingsScreen />
</SettingsErrorBoundary>

// Renders on error:
// ┌────────────────────────────┐
// │                            │
// │      ⚠️ Error              │
// │                            │
// │  Something went wrong      │
// │  while loading settings    │
// │                            │
// │      [Try Again]           │
// │                            │
// └────────────────────────────┘
```

### Custom Fallback

```tsx
function CustomFallback({ error, resetError }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="red" />
      </View>

      <Text style={styles.title}>Oops! Something went wrong</Text>

      <Text style={styles.message}>
        {error.message || 'An unexpected error occurred'}
      </Text>

      {__DEV__ && (
        <Text style={styles.details}>
          {error.stack}
        </Text>
      )}

      <Button
        title="Try Again"
        onPress={resetError}
        style={styles.button}
      />

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        variant="secondary"
      />
    </View>
  );
}
```

## Usage Examples

### With Error Reporting

```tsx
function App() {
  const reportError = (error: Error) => {
    // Log to error tracking service
    Sentry.captureException(error);

    // Log to console
    console.error('Settings error:', error);

    // Report to analytics
    Analytics.track('settings_error', {
      message: error.message,
      stack: error.stack,
    });
  };

  return (
    <SettingsErrorBoundary onError={reportError}>
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}
```

### With Context Recovery

```tsx
function SettingsWithRecovery() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleReset = useCallback(() => {
    setHasError(false);
    setError(null);
  }, []);

  if (hasError) {
    return (
      <ErrorFallback
        error={error}
        onReset={handleReset}
      />
    );
  }

  return (
    <SettingsErrorBoundary
      onError={(error) => {
        setHasError(true);
        setError(error);
      }}
    >
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}
```

### With Automatic Retry

```tsx
function AutoRetryBoundary() {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleError = (error: Error) => {
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, 1000);
    } else {
      Alert.alert('Error', 'Failed after multiple retries');
    }
  };

  return (
    <SettingsErrorBoundary
      onError={handleError}
      key={retryCount} // Force remount on retry
    >
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}
```

### Conditional Error Boundary

```tsx
function ConditionalBoundary({ enabled, children }) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <SettingsErrorBoundary>
      {children}
    </SettingsErrorBoundary>
  );
}

// Usage
<ConditionalBoundary enabled={__DEV__}>
  <SettingsScreen />
</ConditionalBoundary>
```

## Error States

### Loading State Error

```tsx
function LoadingBoundary() {
  return (
    <SettingsErrorBoundary
      fallback={({ resetError }) => (
        <View style={styles.container}>
          <Text>Failed to load settings</Text>
          <Button
            title="Retry"
            onPress={resetError}
          />
        </View>
      )}
    >
      <SettingsScreen />
    </SettingsErrorBoundary>
  );
}
```

### Mutation Error

```tsx
function MutationBoundary() {
  return (
    <SettingsErrorBoundary
      fallback={({ error, resetError }) => (
        <View style={styles.container}>
          <Text>Failed to update settings</Text>
          <Text>{error.message}</Text>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Retry"
            onPress={resetError}
          />
        </View>
      )}
    >
      <SettingsForm />
    </SettingsErrorBoundary>
  );
}
```

### Navigation Error

```tsx
function NavigationBoundary() {
  return (
    <SettingsErrorBoundary
      fallback={({ error }) => (
        <View style={styles.container}>
          <Text>Navigation error occurred</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Home"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      )}
    >
      <SettingsNavigator />
    </SettingsErrorBoundary>
  );
}
```

## Styling

### Custom Styles

```tsx
function StyledFallback({ error, resetError }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Ionicons
            name="warning-outline"
            size={80}
            color="white"
            style={styles.icon}
          />

          <Text style={styles.title}>Oops!</Text>

          <Text style={styles.message}>
            Something went wrong
          </Text>

          {__DEV__ && (
            <View style={styles.details}>
              <Text style={styles.errorText}>
                {error.message}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={resetError}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: { marginBottom: 20 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  details: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
});
```

## Best Practices

1. **Wrap Strategically**: Place boundaries at strategic locations
2. **Custom Fallbacks**: Provide context-specific fallbacks
3. **Error Reporting**: Integrate with error tracking services
4. **Recovery Actions**: Offer retry or reset options
5. **Development Details**: Show details only in development
6. **User-Friendly**: Use clear, non-technical error messages
7. **Logging**: Always log errors for debugging

## Related

- **SettingsScreen**: Main screen component
- **SettingsContent**: Content component
- **React Error Boundaries**: Official React documentation

## License

MIT
