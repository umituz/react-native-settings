# Disclaimer Components

Components for displaying legal disclaimers, warnings, and important information to users.

## Components

### DisclaimerCard

Compact card component for displaying disclaimer summary with expand/collapse functionality.

```tsx
import { DisclaimerCard } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <DisclaimerCard
      title="Important Notice"
      message="Please read our terms and conditions"
      icon="warning-outline"
      onPress={() => navigation.navigate('Disclaimer')}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Card title |
| `message` | `string` | **Required** | Disclaimer message |
| `icon` | `IconName` | `'warning-outline'` | Warning icon |
| `iconColor` | `string` | `'#FF9800'` | Icon color |
| `onPress` | `() => void` | **Required** | Press handler |
| `style` | `ViewStyle` | `undefined` | Custom container style |

#### Example

```tsx
<DisclaimerCard
  title="Beta Version"
  message="This is a beta version. Use at your own risk."
  icon="alert-circle-outline"
  iconColor="#F44336"
  onPress={() => showDisclaimer()}
/>
```

### DisclaimerModal

Full-screen modal component for displaying comprehensive disclaimer content.

```tsx
import { DisclaimerModal } from '@umituz/react-native-settings';

function DisclaimerModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <DisclaimerModal
      visible={visible}
      title="Disclaimer"
      message="This is the full disclaimer text..."
      onClose={() => setVisible(false)}
      onAccept={() => {
        acceptDisclaimer();
        setVisible(false);
      }}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **Required** | Modal visibility |
| `title` | `string` | **Required** | Modal title |
| `message` | `string` | **Required** | Disclaimer message |
| `onClose` | `() => void` | **Required** | Close handler |
| `onAccept` | `() => void` | **Required** | Accept handler |
| `acceptText` | `string` | `'I Accept'` | Accept button text |
| `closeText` | `string` | `'Close'` | Close button text |
| `scrollEnabled` | `boolean` | `true` | Enable content scroll |

#### Example

```tsx
<DisclaimerModal
  visible={showDisclaimer}
  title="Terms of Service"
  message="By using this app, you agree to our terms..."
  onClose={() => setShowDisclaimer(false)}
  onAccept={() => {
    saveAcceptance();
    setShowDisclaimer(false);
  }}
  acceptText="I Agree"
  closeText="Decline"
/>
```

### DisclaimerSetting

Combined card + modal component for integrated disclaimer display.

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function DisclaimerSettingExample() {
  return (
    <DisclaimerSetting
      title="Legal Disclaimer"
      message="Important legal information"
      fullText="Full disclaimer text here..."
      onAccept={() => saveAcceptance()}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Disclaimer title |
| `message` | `string` | **Required** | Short message |
| `fullText` | `string` | **Required** | Full disclaimer text |
| `onAccept` | `() => void` | **Required** | Accept handler |
| `icon` | `IconName` | `'warning-outline'` | Icon name |
| `showOnce` | `boolean` | `false` | Show only once |
| `storageKey` | `string` | `'disclaimer'` | Storage key |

#### Example

```tsx
<DisclaimerSetting
  title="Privacy Notice"
  message="We care about your privacy"
  fullText="This is the full privacy policy text..."
  onAccept={() => {
    AsyncStorage.setItem('privacy-accepted', 'true');
  }}
  showOnce={true}
  storageKey="privacy-disclaimer-2024"
/>
```

### DisclaimerScreen

Dedicated screen component for comprehensive disclaimers.

```tsx
import { DisclaimerScreen } from '@umituz/react-native-settings';

function DisclaimerStack() {
  return (
    <Stack.Screen
      name="Disclaimer"
      component={DisclaimerScreen}
      options={{ title: 'Disclaimer' }}
      initialParams={{
        title: 'Legal Disclaimer',
        message: 'Full disclaimer content...',
      }}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `route` | `RouteProp` | **Required** | Route with params |
| `navigation` | `NavigationProp` | **Required** | Navigation object |

#### Route Params

```typescript
interface DisclaimerScreenParams {
  title: string;
  message: string;
  showAccept?: boolean;
  onAccept?: () => void;
}
```

## Examples

### One-Time Disclaimer

```tsx
function OneTimeDisclaimer() {
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('disclaimer-accepted').then(value => {
      setHasAccepted(!!value);
    });
  }, []);

  const handleAccept = async () => {
    await AsyncStorage.setItem('disclaimer-accepted', new Date().toISOString());
    setHasAccepted(true);
  };

  if (hasAccepted) {
    return null;
  }

  return (
    <DisclaimerModal
      visible={!hasAccepted}
      title="Welcome!"
      message="Please read and accept our disclaimer"
      fullText="Full disclaimer text..."
      onClose={() => {}}
      onAccept={handleAccept}
      acceptText="I Accept"
    />
  );
}
```

### Versioned Disclaimer

```tsx
function VersionedDisclaimer() {
  const DISCLAIMER_VERSION = '2.0';

  const checkDisclaimer = async () => {
    const acceptedVersion = await AsyncStorage.getItem('disclaimer-version');
    return acceptedVersion === DISCLAIMER_VERSION;
  };

  const acceptDisclaimer = async () => {
    await AsyncStorage.setItem('disclaimer-version', DISCLAIMER_VERSION);
  };

  return (
    <DisclaimerSetting
      title="Updated Disclaimer"
      message="Our disclaimer has been updated"
      fullText="New disclaimer content..."
      onAccept={acceptDisclaimer}
    />
  );
}
```

### Conditional Disclaimer

```tsx
function ConditionalDisclaimer({ featureEnabled }) {
  if (!featureEnabled) {
    return (
      <DisclaimerCard
        title="Feature Unavailable"
        message="This feature is not available in your region"
        icon="lock-closed-outline"
        onPress={() => {}}
      />
    );
  }

  return <FeatureContent />;
}
```

### Multiple Disclaimers

```tsx
function DisclaimerStack() {
  return (
    <View>
      <DisclaimerSetting
        title="Privacy Policy"
        message="We value your privacy"
        fullText="Privacy policy..."
        onAccept={() => {}}
        storageKey="privacy"
      />

      <DisclaimerSetting
        title="Terms of Service"
        message="Please read our terms"
        fullText="Terms of service..."
        onAccept={() => {}}
        storageKey="terms"
      />

      <DisclaimerSetting
        title="Beta Warning"
        message="This is beta software"
        fullText="Beta warning..."
        onAccept={() => {}}
        storageKey="beta"
      />
    </View>
  );
}
```

## Internationalization

### Translation Keys

```typescript
// Translation keys used
disclaimer.title = 'Disclaimer';
disclaimer.message = 'Important legal information';
disclaimer.accept = 'I Accept';
disclaimer.decline = 'Decline';
disclaimer.close = 'Close';
```

### Usage with i18n

```tsx
import { useTranslation } from 'react-i18next';

function LocalizedDisclaimer() {
  const { t } = useTranslation();

  return (
    <DisclaimerModal
      visible={visible}
      title={t('disclaimer.title')}
      message={t('disclaimer.message')}
      fullText={t('disclaimer.fullText')}
      onClose={() => setVisible(false)}
      onAccept={() => accept()}
      acceptText={t('disclaimer.accept')}
      closeText={t('disclaimer.decline')}
    />
  );
}
```

## Styling

### Custom Card Styles

```tsx
<DisclaimerCard
  title="Custom Warning"
  message="This is a custom styled disclaimer"
  style={{
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    padding: 16,
  }}
/>
```

### Custom Modal Styles

```tsx
<DisclaimerModal
  visible={visible}
  title="Disclaimer"
  message="Content..."
  containerStyle={{
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }}
  contentStyle={{
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  }}
/>
```

## Best Practices

1. **Clarity**: Use clear, concise language
2. **Visibility**: Make disclaimers prominent
3. **Acceptance**: Require explicit acceptance
4. **Storage**: Store acceptance properly
5. **Versions**: Version your disclaimers
6. **Updates**: Handle disclaimer updates
7. **Legal**: Ensure legal compliance

## Related

- **Disclaimer Domain**: Disclaimer domain documentation
- **Legal Domain**: Legal documents and policies

## License

MIT
