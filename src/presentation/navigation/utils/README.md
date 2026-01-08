# Navigation Utilities

Utility functions and helpers for managing navigation in the settings system, including screen options, params handling, and navigation helpers.

## Utilities

### getDefaultRoute

Gets the default route name for a given feature.

```typescript
import { getDefaultRoute } from '@umituz/react-native-settings';

const route = getDefaultRoute('appearance');
// Returns: 'Appearance'

const route = getDefaultRoute('language');
// Returns: 'LanguageSelection'
```

#### Signature

```typescript
function getDefaultRoute(feature: keyof DefaultRoutes): string;
```

#### Default Routes

| Feature | Route |
|---------|-------|
| `appearance` | `'Appearance'` |
| `language` | `'LanguageSelection'` |
| `notifications` | `'Notifications'` |
| `about` | `'About'` |
| `legal` | `'Legal'` |
| `disclaimer` | `'Disclaimer'` |

### hasNavigationScreen

Checks if a screen exists in the current navigation state.

```typescript
import { hasNavigationScreen } from '@umituz/react-native-settings';

const navigation = useNavigation();
const hasAppearance = hasNavigationScreen(navigation, 'Appearance');
// Returns: true if 'Appearance' screen exists in navigation
```

#### Signature

```typescript
function hasNavigationScreen(navigation: any, screenName: string): boolean;
```

#### Example

```tsx
function SettingsButton() {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    if (hasNavigationScreen(navigation, 'Appearance')) {
      navigation.navigate('Appearance');
    } else {
      console.warn('Appearance screen not found');
    }
  }, [navigation]);

  return <Button onPress={handlePress} title="Appearance" />;
}
```

### createSettingsScreenOptions

Creates screen options configuration for settings screens.

```typescript
import { createSettingsScreenOptions } from '@umituz/react-native-settings';

const options = createSettingsScreenOptions({
  title: 'Appearance',
  showHeader: true,
  headerStyle: { backgroundColor: '#fff' },
});
```

#### Signature

```typescript
function createSettingsScreenOptions(config: {
  title?: string;
  showHeader?: boolean;
  headerStyle?: any;
  headerTintColor?: string;
  headerTitleStyle?: any;
}): any;
```

### getLegalDocumentType

Extracts document type from route params or returns default.

```typescript
import { getLegalDocumentType } from '@umituz/react-native-settings';

const documentType = getLegalDocumentType(route.params);
// Returns: 'privacy-policy' | 'terms-of-service' | 'eula'
```

#### Signature

```typescript
function getLegalDocumentType(params: any): LegalDocumentType;
```

## Screen Options Helpers

### Default Screen Options

```typescript
const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: tokens.colors.surface,
  },
  headerTintColor: tokens.colors.textPrimary,
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 17,
  },
  cardStyle: {
    backgroundColor: tokens.colors.background,
  },
};
```

### Modal Screen Options

```typescript
const modalScreenOptions = {
  presentation: 'modal',
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardOverlayEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};
```

### Settings Screen Options

```typescript
const settingsScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
  cardStyle: {
    backgroundColor: tokens.colors.background,
  },
};
```

## Navigation Param Helpers

### validateParams

Validates navigation params for a given screen.

```typescript
import { validateParams } from '@umituz/react-native-settings';

const isValid = validateParams('Appearance', {
  showThemeSection: true,
  showColorsSection: false,
});
// Returns: true
```

#### Signature

```typescript
function validateParams(screen: string, params: any): boolean;
```

### sanitizeParams

Sanitizes and removes invalid params for navigation.

```typescript
import { sanitizeParams } from '@umituz/react-native-settings';

const cleanParams = sanitizeParams('Appearance', {
  showThemeSection: true,
  invalidParam: 'should be removed',
});
// Returns: { showThemeSection: true }
```

#### Signature

```typescript
function sanitizeParams(screen: string, params: any): any;
```

## Navigation State Helpers

### getActiveRouteName

Gets the name of the currently active route.

```typescript
import { getActiveRouteName } from '@umituz/react-native-settings';

const navigation = useNavigation();
const currentRoute = getActiveRouteName(navigation);
// Returns: 'Appearance'
```

#### Signature

```typescript
function getActiveRouteName(navigation: any): string;
```

#### Example

```tsx
function SettingsScreen() {
  const navigation = useNavigation();
  const currentRoute = getActiveRouteName(navigation);

  useFocusEffect(
    useCallback(() => {
      Analytics.trackScreen(currentRoute);
    }, [currentRoute])
  );

  return <SettingsContent />;
}
```

### getNavigationDepth

Gets the depth of the current navigation stack.

```typescript
import { getNavigationDepth } from '@umituz/react-native-settings';

const depth = getNavigationDepth(navigation);
// Returns: 3 (three screens in stack)
```

#### Signature

```typescript
function getNavigationDepth(navigation: any): number;
```

### canGoBack

Checks if navigation can go back.

```typescript
import { canGoBack } from '@umituz/react-native-settings';

if (canGoBack(navigation)) {
  navigation.goBack();
}
```

#### Signature

```typescript
function canGoBack(navigation: any): boolean;
```

## Navigation Action Helpers

### safeNavigate

Safely navigates to a screen with error handling.

```typescript
import { safeNavigate } from '@umituz/react-native-settings';

safeNavigate(navigation, 'Appearance', { showThemeSection: true });
```

#### Signature

```typescript
function safeNavigate(
  navigation: any,
  routeName: string,
  params?: any
): boolean;
```

#### Example

```tsx
function NavigateButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    const success = safeNavigate(navigation, 'Appearance');
    if (!success) {
      Alert.alert('Error', 'Could not navigate to Appearance');
    }
  };

  return <Button onPress={handlePress} title="Go to Appearance" />;
}
```

### navigateWithFallback

Navigates to a screen with a fallback route if the primary doesn't exist.

```typescript
import { navigateWithFallback } from '@umituz/react-native-settings';

navigateWithFallback(
  navigation,
  'CustomAppearance',  // Try this first
  'Appearance'          // Fallback to this
);
```

#### Signature

```typescript
function navigateWithFallback(
  navigation: any,
  primaryRoute: string,
  fallbackRoute: string,
  params?: any
): void;
```

## Usage Examples

### Feature Detection Navigation

```tsx
function AutoNavigateButton() {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    // Try custom route first, fallback to default
    const customRoute = config?.appearance?.route || 'Appearance';
    navigateWithFallback(navigation, customRoute, 'Appearance', config);
  }, [navigation, config]);

  return <Button onPress={handlePress} title="Appearance" />;
}
```

### Conditional Navigation

```tsx
function ConditionalNavigation() {
  const navigation = useNavigation();

  const navigateToScreen = useCallback((screenName: string) => {
    if (hasNavigationScreen(navigation, screenName)) {
      safeNavigate(navigation, screenName);
    } else {
      console.warn(`Screen ${screenName} not available`);
    }
  }, [navigation]);

  return (
    <View>
      <Button onPress={() => navigateToScreen('Appearance')} title="Appearance" />
      <Button onPress={() => navigateToScreen('Language')} title="Language" />
    </View>
  );
}
```

### Navigation Analytics

```tsx
function useNavigationTracking() {
  const navigation = useNavigation();
  const currentRoute = getActiveRouteName(navigation);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const route = getActiveRouteName(navigation);
      Analytics.trackScreen(route);
    });

    return unsubscribe;
  }, [navigation]);

  return currentRoute;
}
```

### Param Validation

```tsx
function ValidatedNavigation() {
  const navigation = useNavigation();

  const handleNavigate = useCallback(() => {
    const params = {
      showThemeSection: true,
      showColorsSection: true,
    };

    if (validateParams('Appearance', params)) {
      navigation.navigate('Appearance', params);
    } else {
      Alert.alert('Error', 'Invalid parameters');
    }
  }, [navigation]);

  return <Button onPress={handleNavigate} title="Appearance" />;
}
```

## Best Practices

1. **Validation**: Always validate params before navigation
2. **Fallbacks**: Provide fallback routes for custom navigation
3. **Error Handling**: Use safeNavigate for error-prone navigation
4. **Screen Detection**: Check for screen existence before navigation
5. **Analytics**: Track navigation events for insights
6. **Type Safety**: Use TypeScript for all navigation utilities

## Related

- **Navigation Hooks**: Custom navigation hooks
- **Navigation Components**: Screen wrappers
- **React Navigation**: Official navigation library

## License

MIT
