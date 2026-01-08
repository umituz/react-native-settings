# Disclaimer Domain

The Disclaimer domain provides components for displaying legal notices, warnings, and important information to users in your React Native app through cards, modals, and dedicated screens.

## Features

- **Disclaimer Card**: Compact card component for displaying disclaimer summary
- **Disclaimer Modal**: Full-screen modal with scrollable content
- **Disclaimer Setting**: Integrated card + modal component
- **Disclaimer Screen**: Dedicated screen for comprehensive disclaimers
- **Internationalization**: Full i18n support with translation keys
- **Customizable Icons**: Custom icons and colors for different warning levels
- **Cross-Platform**: Universal design for iOS, Android, and Web

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### DisclaimerSetting

The main component that displays a disclaimer card and opens a modal when tapped.

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function MySettingsScreen() {
  return (
    <View>
      <DisclaimerSetting />
    </View>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titleKey` | `string` | `'settings.disclaimer.title'` | Translation key for title |
| `messageKey` | `string` | `'settings.disclaimer.message'` | Translation key for full message |
| `shortMessageKey` | `string` | `'settings.disclaimer.shortMessage'` | Translation key for short message |
| `iconName` | `string` | `'alert-triangle'` | Icon name from design system |
| `iconColor` | `string` | `tokens.colors.warning` | Custom icon color |
| `backgroundColor` | `string` | `withAlpha(iconColor, 0.1)` | Custom background color |
| `modalTitle` | `string` | `undefined` | Override modal title (bypasses i18n) |
| `modalContent` | `string` | `undefined` | Override modal content (bypasses i18n) |

#### Example with Custom Content

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function CustomDisclaimer() {
  return (
    <DisclaimerSetting
      modalTitle="Beta Version Notice"
      modalContent="This is a beta version of the app. Features may change and bugs may occur. Use at your own risk."
      iconName="flask"
      iconColor="#9333EA"
    />
  );
}
```

### DisclaimerCard

A compact card displaying disclaimer summary with icon and message.

```tsx
import { DisclaimerCard } from '@umituz/react-native-settings';

function DisclaimerCardExample() {
  return (
    <DisclaimerCard
      title="Warning"
      shortMessage="This is an important notice"
      iconName="alert-triangle"
      iconColor="#F59E0B"
      backgroundColor="rgba(245, 158, 11, 0.1)"
      onPress={() => console.log('Card pressed')}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Card title |
| `shortMessage` | `string` | **Required** | Short message text |
| `iconName` | `string` | **Required** | Icon name |
| `iconColor` | `string` | **Required** | Icon color |
| `backgroundColor` | `string` | **Required** | Background color |
| `onPress` | `() => void` | **Required** | Press handler |

### DisclaimerModal

Full-screen modal with scrollable disclaimer content.

```tsx
import { DisclaimerModal } from '@umituz/react-native-settings';

function DisclaimerModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <DisclaimerModal
      visible={visible}
      title="Legal Disclaimer"
      content="Full disclaimer content goes here..."
      onClose={() => setVisible(false)}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **Required** | Modal visibility |
| `title` | `string` | **Required** | Modal title |
| `content` | `string` | **Required** | Modal content |
| `onClose` | `() => void` | **Required** | Close handler |

### DisclaimerScreen

A dedicated screen for displaying comprehensive disclaimer information.

```tsx
import { DisclaimerScreen } from '@umituz/react-native-settings';

function DisclaimerScreenExample() {
  return (
    <DisclaimerScreen
      title="Disclaimer"
      content="This is the full disclaimer text..."
      iconName="alert-circle"
      iconColor="#DC2626"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Screen title |
| `content` | `string` | **Required** | Disclaimer content |
| `iconName` | `string` | `undefined` | Custom icon name |
| `iconColor` | `string` | `undefined` | Custom icon color |

## Examples

### Basic Usage with i18n

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <ScrollView>
      {/* Other settings */}

      <DisclaimerSetting />
    </ScrollView>
  );
}

// In your localization files:
// en.json:
// {
//   "settings": {
//     "disclaimer": {
//       "title": "Disclaimer",
//       "message": "This is the full disclaimer content...",
//       "shortMessage": "Important legal information"
//     }
//   }
// }
```

### Custom Medical Disclaimer

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function MedicalAppSettings() {
  return (
    <DisclaimerSetting
      modalTitle="Medical Disclaimer"
      modalContent="This app is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
      iconName="heart-pulse"
      iconColor="#DC2626"
    />
  );
}
```

### Financial Warning

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function FinancialAppSettings() {
  return (
    <DisclaimerSetting
      modalTitle="Risk Warning"
      modalContent="Trading financial instruments carries a high level of risk and may not be suitable for all investors. You could lose all of your invested capital. Past performance is not indicative of future results."
      iconName="trending-down"
      iconColor="#7C3AED"
    />
  );
}
```

### Beta Software Notice

```tsx
import { DisclaimerSetting } from '@umituz/react-native-settings';

function BetaAppSettings() {
  return (
    <DisclaimerSetting
      modalTitle="Beta Software Notice"
      modalContent="This is pre-release software. Features may be incomplete or change before final release. Data may be lost. Please back up your important data before using."
      iconName="flask"
      iconColor="#0891B2"
    />
  );
}
```

### Custom Card without Modal

```tsx
import { DisclaimerCard } from '@umituz/react-native-settings';

function CustomDisclaimerCard() {
  return (
    <DisclaimerCard
      title="Age Restriction"
      shortMessage="You must be 18+ to use this app"
      iconName="shield"
      iconColor="#059669"
      backgroundColor="rgba(5, 150, 105, 0.1)"
      onPress={() => {
        // Navigate to verification screen
        navigation.navigate('AgeVerification');
      }}
    />
  );
}
```

### Standalone Modal

```tsx
import { DisclaimerModal, useState } from '@umituz/react-native-settings';

function TermsModal() {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button
        title="Show Disclaimer"
        onPress={() => setVisible(true)}
      />

      <DisclaimerModal
        visible={visible}
        title="Terms & Conditions"
        content="By using this app, you agree to our terms..."
        onClose={() => setVisible(false)}
      />
    </View>
  );
}
```

### Custom Disclaimer Screen

```tsx
import { DisclaimerScreen } from '@umituz/react-native-settings';

function LegalDisclaimerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Disclaimer"
        component={DisclaimerScreen}
        initialParams={{
          title: 'Legal Disclaimer',
          content: 'Full legal disclaimer text...',
          iconName: 'gavel',
          iconColor: '#DC2626',
        }}
      />
    </Stack.Navigator>
  );
}
```

## Translation Keys

The default DisclaimerSetting uses these translation keys. Make sure to include them in your localization files:

```json
{
  "settings": {
    "disclaimer": {
      "title": "Disclaimer",
      "message": "Full disclaimer text that appears in the modal...",
      "shortMessage": "Important notice - tap to read more"
    }
  }
}
```

## Styling

The disclaimer components use the design system tokens for consistent styling:

- **Icon Size**: Medium (24px)
- **Card Background**: Semi-transparent version of icon color
- **Modal Animation**: Slide from bottom (iOS) / Fade (Android)
- **Text**: Uses design system typography tokens

Custom colors are supported through props:

```tsx
<DisclaimerSetting
  iconColor="#DC2626"  // Red for critical
  iconColor="#F59E0B"  // Amber for warning
  iconColor="#3B82F6"  // Blue for info
  iconColor="#10B981"  // Emerald for success
/>
```

## Architecture

```
src/domains/disclaimer/
├── presentation/
│   ├── screens/
│   │   └── DisclaimerScreen.tsx
│   ├── components/
│   │   ├── DisclaimerSetting.tsx    # Main component
│   │   ├── DisclaimerCard.tsx       # Card component
│   │   └── DisclaimerModal.tsx      # Modal component
│   └── components/__tests__/        # Component tests
└── index.ts                         # Public API exports
```

## Best Practices

1. **Keep Messages Clear**: Use simple, non-technical language
2. **Be Specific**: Clearly state what the disclaimer covers
3. **Short + Full**: Use short message on card, full content in modal
4. **Color Coding**: Use appropriate colors for warning levels:
   - Red: Critical/legal warnings
   - Amber: Cautionary notices
   - Blue: Informational
   - Emerald: Confirmations
5. **Test Translations**: Ensure all languages have proper translations
6. **Accessibility**: Icons should have proper accessibility labels
7. **Cross-Platform**: Test on iOS, Android, and Web

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { DisclaimerSetting } from '@umituz/react-native-settings';

describe('DisclaimerSetting', () => {
  it('renders disclaimer card', () => {
    const { getByText } = render(<DisclaimerSetting />);
    expect(getByText(/disclaimer/i)).toBeTruthy();
  });

  it('opens modal on card press', () => {
    const { getByText, getByTestId } = render(<DisclaimerSetting />);

    fireEvent.press(getByText(/disclaimer/i));
    expect(getByTestId('close-disclaimer-modal')).toBeTruthy();
  });

  it('closes modal on close button press', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <DisclaimerSetting />
    );

    // Open modal
    fireEvent.press(getByText(/disclaimer/i));

    // Close modal
    fireEvent.press(getByTestId('close-disclaimer-modal'));

    expect(queryByTestId('close-disclaimer-modal')).toBeNull();
  });
});
```

## Related

- **Legal Domain**: Privacy policy, terms of service
- **Settings Domain**: Main settings management
- **Design System**: Icons, colors, and typography

## License

MIT
