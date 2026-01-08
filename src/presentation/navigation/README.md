# Navigation System

Complete navigation setup for settings screens using React Navigation with stack navigator, screen wrappers, and navigation utilities.

## Components

### SettingsStackNavigator

Main stack navigator for all settings-related screens.

```tsx
import { SettingsStackNavigator } from '@umituz/react-native-settings';

function App() {
  const appInfo = {
    name: 'My App',
    version: '1.0.0',
    // ... other app info
  };

  const legalUrls = {
    privacyPolicy: 'https://example.com/privacy',
    termsOfService: 'https://example.com/terms',
  };

  const faqData = {
    categories: [
      // FAQ categories
    ],
  };

  return (
    <NavigationContainer>
      <SettingsStackNavigator
        appInfo={appInfo}
        legalUrls={legalUrls}
        faqData={faqData}
      />
    </NavigationContainer>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appInfo` | `AppInfo` | **Required** | Application information |
| `legalUrls` | `LegalUrls` | **Required** | Legal document URLs |
| `faqData` | `FAQData` | `undefined` | FAQ data |
| `config` | `SettingsConfig` | `{}` | Settings configuration |
| `showUserProfile` | `boolean` | `false` | Show user profile header |
| `userProfile` | `UserProfile` | `undefined` | User profile data |
| `additionalScreens` | `Screen[]` | `[]` | Additional screens to add |
| `devSettings` | `DevSettingsProps` | `undefined` | Dev settings configuration |
| `customSections` | `CustomSection[]` | `[]` | Custom settings sections |

### Screen Wrappers

Wrapper components that handle configuration and props for each screen.

#### SettingsScreenWrapper

Wraps the main settings screen with configuration.

```tsx
import { SettingsScreenWrapper } from '@umituz/react-native-settings';

<SettingsScreenWrapper
  config={config}
  appVersion={appInfo.version}
  showUserProfile={showUserProfile}
  userProfile={userProfile}
  devSettings={devSettings}
  customSections={customSections}
/>
```

#### LegalScreenWrapper

Wraps the legal screen with proper handlers and translations.

```tsx
import { LegalScreenWrapper } from '@umituz/react-native-settings';

<LegalScreenWrapper
  onPrivacyPress={handlePrivacy}
  onTermsPress={handleTerms}
  onEulaPress={handleEula}
/>
```

#### AboutScreenWrapper

Wraps the about screen with app configuration.

```tsx
import { AboutScreenWrapper } from '@umituz/react-native-settings';

<AboutScreenWrapper
  config={aboutConfig}
/>
```

## Navigation Hooks

### useNavigationHandlers

Hook for managing navigation handlers and screen props.

```tsx
import { useNavigationHandlers } from '@umituz/react-native-settings';

function NavigationSetup() {
  const { handlePrivacyPress, handleTermsPress, handleEulaPress, aboutConfig } =
    useNavigationHandlers(appInfo, legalUrls);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Legal">
        {() => (
          <LegalScreen
            onPrivacyPress={handlePrivacyPress}
            onTermsPress={handleTermsPress}
            onEulaPress={handleEulaPress}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="About">
        {() => <AboutScreen config={aboutConfig} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
```

## Navigation Utilities

### Screen Options

Utility functions for creating screen options with translations.

```tsx
import {
  createScreenOptions,
  createAppearanceScreenOptions,
  createLegalScreenOptions,
  createAboutScreenOptions,
  createFAQScreenOptions,
} from '@umituz/react-native-settings';

// Create base screen options
const screenOptions = createScreenOptions(tokens);

// Create specific screen options
const appearanceOptions = createAppearanceScreenOptions(t);
const legalOptions = createLegalScreenOptions(t);
```

### Translation Utilities

```tsx
import {
  createNotificationTranslations,
  createQuietHoursTranslations,
} from '@umituz/react-native-settings';

const notificationTranslations = createNotificationTranslations(t);
const quietHoursTranslations = createQuietHoursTranslations(t);
```

## Complete Examples

### Basic Navigation Setup

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsStackNavigator } from '@umituz/react-native-settings';

export default function App() {
  const appInfo = {
    name: 'My Application',
    version: '1.0.0',
    buildNumber: '100',
    developer: 'My Company',
    contactEmail: 'support@example.com',
    websiteUrl: 'https://example.com',
  };

  const legalUrls = {
    privacyPolicy: 'https://example.com/privacy',
    termsOfService: 'https://example.com/terms',
    eula: 'https://example.com/eula',
  };

  const faqData = {
    categories: [
      {
        id: 'general',
        title: 'General',
        questions: [
          {
            id: 'q1',
            question: 'What is this app?',
            answer: 'Description here...',
          },
        ],
      },
    ],
  };

  return (
    <NavigationContainer>
      <SettingsStackNavigator
        appInfo={appInfo}
        legalUrls={legalUrls}
        faqData={faqData}
      />
    </NavigationContainer>
  );
}
```

### With User Profile

```tsx
function AppWithUserProfile() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <SettingsStackNavigator
        appInfo={appInfo}
        legalUrls={legalUrls}
        showUserProfile={true}
        userProfile={{
          displayName: user?.displayName,
          userId: user?.uid,
          avatarUrl: user?.photoURL,
          onPress: () => navigation.navigate('AccountSettings'),
        }}
      />
    </NavigationContainer>
  );
}
```

### With Custom Configuration

```tsx
function AppWithCustomConfig() {
  const config = {
    appearance: true,
    language: false,
    notifications: true,
    privacy: true,
    support: true,
    about: true,
    legal: true,
    feedback: true,
    faqs: true,
  };

  return (
    <NavigationContainer>
      <SettingsStackNavigator
        config={config}
        appInfo={appInfo}
        legalUrls={legalUrls}
      />
    </NavigationContainer>
  );
}
```

### With Additional Screens

```tsx
function AppWithAdditionalScreens() {
  const additionalScreens = [
    {
      name: 'AccountSettings' as const,
      component: AccountSettingsScreen,
      options: { title: 'Account' },
    },
    {
      name: 'Integrations' as const,
      options: { title: 'Integrations' },
      children: () => <IntegrationsScreen />,
    },
  ];

  return (
    <NavigationContainer>
      <SettingsStackNavigator
        appInfo={appInfo}
        legalUrls={legalUrls}
        additionalScreens={additionalScreens}
      />
    </NavigationContainer>
  );
}
```

### With Custom Sections

```tsx
function AppWithCustomSections() {
  const customSections = [
    {
      title: 'INTEGRATIONS',
      items: [
        {
          icon: 'logo-google',
          title: 'Google',
          description: 'Connected',
          showSwitch: true,
          switchValue: googleEnabled,
          onSwitchChange: setGoogleEnabled,
        },
      ],
    },
  ];

  return (
    <NavigationContainer>
      <SettingsStackNavigator
        appInfo={appInfo}
        legalUrls={legalUrls}
        customSections={customSections}
      />
    </NavigationContainer>
  );
}
```

### With Dev Settings

```tsx
import { DevSettingsSection } from '@umituz/react-native-settings';

function AppWithDevSettings() {
  return (
    <NavigationContainer>
      <SettingsStackNavigator
        appInfo={appInfo}
        legalUrls={legalUrls}
        devSettings={{
          enabled: true,
          onAfterClear: async () => {
            await resetApp();
            Updates.reloadAsync();
          },
        }}
      />
    </NavigationContainer>
  );
}
```

## Navigation Types

### SettingsStackParamList

Type definition for all navigation params:

```typescript
type SettingsStackParamList = {
  SettingsMain: undefined;
  Appearance: undefined;
  About: { config?: AboutConfig };
  Legal: LegalScreenProps;
  Notifications: undefined;
  FAQ: undefined;
  LanguageSelection: undefined;
  // ... additional screens
};
```

### SettingsStackNavigatorProps

```typescript
interface SettingsStackNavigatorProps {
  appInfo: AppInfo;
  legalUrls: LegalUrls;
  faqData?: FAQData;
  config?: SettingsConfig;
  showUserProfile?: boolean;
  userProfile?: UserProfile;
  additionalScreens?: AdditionalScreen[];
  devSettings?: DevSettingsProps;
  customSections?: CustomSettingsSection[];
}
```

## Screen Navigation

### Navigate to Screens

```tsx
import { useNavigation } from '@react-navigation/native';

function SettingsComponent() {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Go to Appearance"
        onPress={() => navigation.navigate('Appearance')}
      />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Button
        title="Go to Legal"
        onPress={() => navigation.navigate('Legal')}
      />
    </View>
  );
}
```

### With Parameters

```tsx
<Button
  title="Go to About"
  onPress={() =>
    navigation.navigate('About', {
      config: {
        appName: 'My App',
        version: '1.0.0',
      },
    })
  }
/>
```

## Screen Wrappers Usage

Screen wrappers handle configuration and provide props to screens automatically:

```tsx
// Instead of this:
<Stack.Screen name="About">
  {() => (
    <AboutScreen
      config={{
        appName: appInfo.name,
        version: appInfo.version,
        // ... manually pass all props
      }}
    />
  )}
</Stack.Screen>

// Use this:
<Stack.Screen name="About">
  {() => <AboutScreenWrapper config={aboutConfig} />}
</Stack.Screen>
```

## Best Practices

1. **Screen Wrappers**: Always use screen wrappers for consistent configuration
2. **Type Safety**: Use TypeScript types for navigation params
3. **Error Boundaries**: Include error boundaries in navigation
4. **Translation Keys**: Use translation keys for all text
5. **Deep Linking**: Support deep linking to settings screens
6. **Custom Screens**: Use `additionalScreens` for custom screens
7. **Configuration**: Pass config through props, not hardcoded
8. **User Profile**: Show user profile when user is authenticated

## Testing

```tsx
import { render } from '@testing-library/react-native';
import { SettingsStackNavigator } from '@umituz/react-native-navigation';
import { NavigationContainer } from '@react-navigation/native';

describe('SettingsStackNavigator', () => {
  const mockAppInfo = {
    name: 'Test App',
    version: '1.0.0',
  };

  const mockLegalUrls = {
    privacyPolicy: 'https://test.com/privacy',
    termsOfService: 'https://test.com/terms',
  };

  it('renders settings stack', () => {
    const { getByText } = render(
      <NavigationContainer>
        <SettingsStackNavigator
          appInfo={mockAppInfo}
          legalUrls={mockLegalUrls}
        />
      </NavigationContainer>
    );

    expect(getByText(/settings/i)).toBeTruthy();
  });

  it('navigates to appearance screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <SettingsStackNavigator
          appInfo={mockAppInfo}
          legalUrls={mockLegalUrls}
        />
      </NavigationContainer>
    );

    fireEvent.press(getByText(/appearance/i));
    expect(getByText(/theme/i)).toBeTruthy();
  });
});
```

## Related

- **Presentation Screens**: Screen components
- **Navigation Hooks**: Custom navigation hooks
- **React Navigation**: Official React Navigation docs

## License

MIT
