# Navigation Hooks

Custom React hooks for navigation utilities and helpers in the settings navigation system.

## Hooks

### useSettingsNavigation

Hook providing navigation utilities specific to the settings flow.

```tsx
import { useSettingsNavigation } from '@umituz/react-native-settings';

function SettingsScreen() {
  const { navigateToAppearance, navigateToLegal, navigateToAbout } = useSettingsNavigation();

  return (
    <Button onPress={() => navigateToAppearance()} title="Go to Appearance" />
  );
}
```

#### Returns

```typescript
interface SettingsNavigationHelpers {
  navigateToAppearance: (config?: AppearanceConfig) => void;
  navigateToLanguage: (config?: LanguageConfig) => void;
  navigateToNotifications: (config?: NotificationsConfig) => void;
  navigateToAbout: (config?: AboutConfig) => void;
  navigateToLegal: (documentType: LegalDocumentType) => void;
  navigateToFeedback: (config?: FeedbackConfig) => void;
  navigateToFAQs: (config?: FAQConfig) => void;
  navigateToSubscription: (config?: SubscriptionConfig) => void;
  navigateToWallet: (config?: WalletConfig) => void;
  goBack: () => void;
}
```

## Navigation Helpers

### Appearance Navigation

```typescript
navigateToAppearance(config?: {
  showThemeSection?: boolean;
  showColorsSection?: boolean;
  showPreviewSection?: boolean;
}): void;
```

Navigates to the Appearance settings screen with optional configuration.

#### Example

```tsx
<Button
  onPress={() => navigateToAppearance({
    showThemeSection: true,
    showColorsSection: true,
  })}
  title="Customize Appearance"
/>
```

### Language Navigation

```typescript
navigateToLanguage(config?: {
  showFlags?: boolean;
}): void;
```

Navigates to the Language selection screen.

#### Example

```tsx
<Button
  onPress={() => navigateToLanguage({ showFlags: true })}
  title="Change Language"
/>
```

### Legal Navigation

```typescript
navigateToLegal(documentType: 'privacy-policy' | 'terms-of-service' | 'eula'): void;
```

Navigates to legal document screens.

#### Example

```tsx
<TouchableOpacity onPress={() => navigateToLegal('privacy-policy')}>
  <Text>Privacy Policy</Text>
</TouchableOpacity>
```

### About Navigation

```typescript
navigateToAbout(config?: {
  appName?: string;
  version?: string;
  developer?: string;
  contactEmail?: string;
}): void;
```

Navigates to the About screen with app information.

#### Example

```tsx
<Button
  onPress={() => navigateToAbout({
    appName: 'My App',
    version: '1.0.0',
  })}
  title="About"
/>
```

### Feedback Navigation

```typescript
navigateToFeedback(config?: {
  feedbackTypes?: FeedbackType[];
  title?: string;
  description?: string;
}): void;
```

Opens the feedback modal or navigates to feedback screen.

#### Example

```tsx
<Button
  onPress={() => navigateToFeedback({
    feedbackTypes: ['bug', 'feature', 'general'],
    title: 'Send Feedback',
  })}
  title="Give Feedback"
/>
```

### FAQ Navigation

```typescript
navigateToFAQs(config?: {
  categories?: FAQCategory[];
  title?: string;
}): void;
```

Navigates to the FAQ screen.

#### Example

```tsx
<Button
  onPress={() => navigateToFAQs({
    title: 'Help Center',
  })}
  title="FAQs"
/>
```

### Subscription Navigation

```typescript
navigateToSubscription(config?: {
  title?: string;
  description?: string;
  onPress?: () => void;
}): void;
```

Navigates to subscription or upgrade screen.

#### Example

```tsx
<Button
  onPress={() => navigateToSubscription({
    title: 'Upgrade to Pro',
    description: 'Get all premium features',
  })}
  title="Upgrade"
/>
```

### Wallet Navigation

```typescript
navigateToWallet(config?: {
  title?: string;
  description?: string;
  route?: string;
}): void;
```

Navigates to wallet/payment settings.

#### Example

```tsx
<Button
  onPress={() => navigateToWallet({
    title: 'My Wallet',
    route: 'WalletScreen',
  })}
  title="Wallet"
/>
```

## Usage Examples

### Basic Navigation

```tsx
import { useSettingsNavigation } from '@umituz/react-native-settings';

function SettingsMenu() {
  const { navigateToAppearance, navigateToAbout, navigateToLegal } = useSettingsNavigation();

  return (
    <View>
      <SettingsItemCard
        icon="color-palette-outline"
        title="Appearance"
        onPress={navigateToAppearance}
      />
      <SettingsItemCard
        icon="information-circle-outline"
        title="About"
        onPress={navigateToAbout}
      />
      <SettingsItemCard
        icon="document-text-outline"
        title="Legal"
        onPress={() => navigateToLegal('privacy-policy')}
      />
    </View>
  );
}
```

### With Configuration

```tsx
function SettingsWithOptions() {
  const { navigateToAppearance, navigateToLanguage } = useSettingsNavigation();

  return (
    <View>
      <SettingsItemCard
        icon="moon-outline"
        title="Theme"
        onPress={() => navigateToAppearance({
          showThemeSection: true,
          showColorsSection: false,
        })}
      />
      <SettingsItemCard
        icon="globe-outline"
        title="Language"
        onPress={() => navigateToLanguage({ showFlags: true })}
      />
    </View>
  );
}
```

### Conditional Navigation

```tsx
function ConditionalNavigation() {
  const { navigateToSubscription, navigateToFeedback } = useSettingsNavigation();
  const isPremium = useIsPremium();

  return (
    <View>
      {!isPremium && (
        <SettingsItemCard
          icon="star-outline"
          title="Upgrade"
          onPress={() => navigateToSubscription({
            title: 'Go Premium',
            description: 'Unlock all features',
          })}
        />
      )}
      <SettingsItemCard
        icon="chatbubble-outline"
        title="Send Feedback"
        onPress={() => navigateToFeedback({
          feedbackTypes: ['bug', 'feature'],
        })}
      />
    </View>
  );
}
```

### Custom Navigation Handler

```tsx
function CustomNavigation() {
  const { navigateToAppearance } = useSettingsNavigation();

  const handleAppearancePress = useCallback(() => {
    // Custom logic before navigation
    Analytics.track('appearance_opened');
    navigateToAppearance({ showThemeSection: true });
  }, [navigateToAppearance]);

  return (
    <Button onPress={handleAppearancePress} title="Appearance" />
  );
}
```

## Navigation Parameters

### Appearance Config

```typescript
interface AppearanceNavConfig {
  showThemeSection?: boolean;      // Show theme mode selection
  showColorsSection?: boolean;      // Show custom color selection
  showPreviewSection?: boolean;     // Show live preview
}
```

### Language Config

```typescript
interface LanguageNavConfig {
  showFlags?: boolean;              // Show language flags
}
```

### Legal Config

```typescript
type LegalDocumentType =
  | 'privacy-policy'
  | 'terms-of-service'
  | 'eula';

interface LegalNavConfig {
  documentType: LegalDocumentType;
  content?: string;                 // Custom content
  title?: string;                   // Custom title
}
```

### Feedback Config

```typescript
interface FeedbackNavConfig {
  feedbackTypes?: FeedbackType[];
  title?: string;
  description?: string;
}
```

### FAQ Config

```typescript
interface FAQNavConfig {
  categories?: FAQCategory[];
  title?: string;
  description?: string;
}
```

## Best Practices

1. **Type Safety**: Always use proper TypeScript types for config
2. **Memoization**: Memoize navigation handlers for performance
3. **Analytics**: Track navigation events for insights
4. **Conditional**: Use conditional navigation based on user state
5. **Validation**: Validate config before navigation
6. **Error Handling**: Handle navigation errors gracefully

## Related

- **Navigation Components**: Screen wrappers and components
- **Navigation Utils**: Utility functions for navigation
- **Screen Components**: Individual screen implementations

## License

MIT
