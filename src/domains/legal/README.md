# Legal Domain

The Legal domain provides screens and components for displaying legal documents such as privacy policies, terms of service, and other legal information in your React Native app.

## Features

- **Privacy Policy Screen**: Dedicated screen for privacy policy content
- **Terms of Service Screen**: Display terms and conditions
- **Generic Legal Content**: Reusable screen for any legal document
- **URL Handling**: Open external legal documents in browser
- **Content Validation**: Built-in validation for legal content
- **Style Caching**: Optimized rendering with cached styles
- **Accessible**: Full accessibility support

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### LegalScreen

Main screen displaying a list of legal documents (Privacy Policy, Terms of Service, EULA).

```tsx
import { LegalScreen } from '@umituz/react-native-settings';
import { useNavigation } from '@react-navigation/native';

function MyLegalScreen() {
  const navigation = useNavigation();

  return (
    <LegalScreen
      title="Legal"
      description="Important legal information"
      documentsHeader="Documents"
      privacyTitle="Privacy Policy"
      privacyDescription="Learn how we handle your data"
      termsTitle="Terms of Service"
      termsDescription="Rules and guidelines for using our app"
      onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
      onTermsPress={() => navigation.navigate('TermsOfService')}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Screen title |
| `description` | `string` | `undefined` | Screen description |
| `documentsHeader` | `string` | `undefined` | Section header for documents |
| `privacyTitle` | `string` | `undefined` | Privacy policy title |
| `privacyDescription` | `string` | `undefined` | Privacy policy description |
| `termsTitle` | `string` | `undefined` | Terms of service title |
| `termsDescription` | `string` | `undefined` | Terms of service description |
| `eulaTitle` | `string` | `undefined` | EULA title |
| `eulaDescription` | `string` | `undefined` | EULA description |
| `onPrivacyPress` | `() => void` | `undefined` | Privacy press handler |
| `onTermsPress` | `() => void` | `undefined` | Terms press handler |
| `onEulaPress` | `() => void` | `undefined` | EULA press handler |
| `eulaUrl` | `string` | `undefined` | External EULA URL |
| `testID` | `string` | `'legal-screen'` | Test ID for testing |

### PrivacyPolicyScreen

Dedicated screen for displaying privacy policy content.

```tsx
import { PrivacyPolicyScreen } from '@umituz/react-native-settings';

function MyPrivacyPolicyScreen() {
  return (
    <PrivacyPolicyScreen
      content="Your privacy policy content here..."
      title="Privacy Policy"
      viewOnlineText="View our full privacy policy online"
      openText="Open in Browser"
      url="https://yourapp.com/privacy"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | Privacy policy content |
| `url` | `string` | `undefined` | External privacy policy URL |
| `title` | `string` | `'Privacy Policy'` | Screen title |
| `viewOnlineText` | `string` | `undefined` | "View online" label text |
| `openText` | `string` | `'Open'` | Open button text |
| `onUrlPress` | `() => void` | `undefined` | Custom URL press handler |
| `testID` | `string` | `undefined` | Test ID for testing |

### TermsOfServiceScreen

Dedicated screen for displaying terms of service content.

```tsx
import { TermsOfServiceScreen } from '@umituz/react-native-settings';

function MyTermsScreen() {
  return (
    <TermsOfServiceScreen
      content="Your terms of service content here..."
      title="Terms of Service"
      viewOnlineText="View full terms online"
      openText="Open in Browser"
      url="https://yourapp.com/terms"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | Terms content |
| `url` | `string` | `undefined` | External terms URL |
| `title` | `string` | `'Terms of Service'` | Screen title |
| `viewOnlineText` | `string` | `undefined` | "View online" label text |
| `openText` | `string` | `'Open'` | Open button text |
| `onUrlPress` | `() => void` | `undefined` | Custom URL press handler |
| `testID` | `string` | `undefined` | Test ID for testing |

### LegalContentScreen

Generic screen for displaying any legal document content.

```tsx
import { LegalContentScreen } from '@umituz/react-native-settings';
import { StyleSheet } from 'react-native';

const createStyles = (tokens: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  content: {
    paddingBottom: 32,
  },
  title: {
    marginBottom: 16,
  },
  text: {
    lineHeight: 24,
  },
  urlContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
  },
  urlText: {
    marginBottom: 12,
  },
  urlButton: {
    marginTop: 8,
  },
});

function MyLegalDocumentScreen() {
  return (
    <LegalContentScreen
      content="Legal document content..."
      title="Legal Document"
      viewOnlineText="View online"
      openText="Open"
      url="https://yourapp.com/legal"
      styleCacheKey="my-legal-document"
      createStyles={createStyles}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | Document content |
| `url` | `string` | `undefined` | External document URL |
| `title` | `string` | **Required** | Screen title |
| `viewOnlineText` | `string` | `undefined` | "View online" label text |
| `openText` | `string` | `undefined` | Open button text |
| `onUrlPress` | `() => void` | `undefined` | Custom URL press handler |
| `testID` | `string` | `undefined` | Test ID for testing |
| `styleCacheKey` | `string` | **Required** | Unique key for style caching |
| `createStyles` | `(tokens) => StyleSheet` | **Required** | Stylesheet factory function |

## Components (Internal)

These components are used internally by the screens but can also be used directly:

### LegalScreenHeader

Header component for legal screens.

```tsx
import { LegalScreenHeader } from '@umituz/react-native-settings';

<LegalScreenHeader
  title="Legal Information"
  description="Please review our legal documents"
/>
```

### LegalDocumentsList

List component for displaying legal documents.

```tsx
import { LegalDocumentsList } from '@umituz/react-native-settings';

<LegalDocumentsList
  documentsHeader="Legal Documents"
  privacyTitle="Privacy Policy"
  privacyDescription="How we handle your data"
  termsTitle="Terms of Service"
  termsDescription="Rules and guidelines"
  onPrivacyPress={handlePrivacy}
  onTermsPress={handleTerms}
/>
```

### LegalLinks

Component for rendering legal document links.

```tsx
import { LegalLinks } from '@umituz/react-native-settings';

<LegalLinks
  items={[
    {
      title: 'Privacy Policy',
      description: 'Learn about our data practices',
      onPress: () => navigateToPrivacy(),
    },
    {
      title: 'Terms of Service',
      description: 'Rules for using our service',
      onPress: () => navigateToTerms(),
    },
  ]}
/>
```

### LegalSection

Section container for legal content.

```tsx
import { LegalSection } from '@umituz/react-native-settings';

<LegalSection title="Important">
  <Text>Please read these documents carefully</Text>
</LegalSection>
```

### LegalItem

Individual legal document item.

```tsx
import { LegalItem } from '@umituz/react-native-settings';

<LegalItem
  title="Privacy Policy"
  description="Last updated: Jan 2025"
  onPress={() => console.log('Navigate to privacy')}
/>
```

## Services

### UrlHandlerService

Service for handling external URL opening.

```typescript
import { UrlHandlerService } from '@umituz/react-native-settings';

// Open URL in browser
await UrlHandlerService.openUrl('https://example.com/privacy');
```

### ContentValidationService

Service for validating legal screen content.

```typescript
import { ContentValidationService } from '@umituz/react-native-settings';

// Validate screen has proper content
ContentValidationService.validateScreenContent(
  content,
  url,
  title,
  viewOnlineText,
  openText,
  styleCacheKey
);

// Check if URL section should be shown
const showUrl = ContentValidationService.shouldShowUrlSection(url, onUrlPress);
```

### StyleCacheService

Service for caching styles to optimize performance.

```typescript
import { StyleCacheService } from '@umituz/react-native-settings';

// Create cache key from tokens
const cacheKey = StyleCacheService.createTokenCacheKey(tokens);

// Get or create cached styles
const styles = StyleCacheService.getCachedStyles(
  'privacy-policy',
  cacheKey,
  () => createStyles(tokens)
);
```

## Examples

### Basic Legal Hub

```tsx
import React from 'react';
import { View } from 'react-native';
import { LegalScreen } from '@umituz/react-native-settings';
import { useNavigation } from '@react-navigation/native';

export default function LegalHub() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <LegalScreen
        title="Legal Information"
        description="Please review our legal documents"
        onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
        onTermsPress={() => navigation.navigate('TermsOfService')}
      />
    </View>
  );
}
```

### Privacy Policy with Content

```tsx
import { PrivacyPolicyScreen } from '@umituz/react-native-settings';

const PRIVACY_CONTENT = `
# Privacy Policy

We collect minimal data to provide our services...

## Data Collection

We collect the following information:
- Email address
- Usage statistics
- Crash reports

## Data Usage

Your data is used to:
- Improve our services
- Fix bugs
- Send important updates
`;

export default function PrivacyPolicy() {
  return (
    <PrivacyPolicyScreen
      content={PRIVACY_CONTENT}
      title="Privacy Policy"
    />
  );
}
```

### Terms with External URL

```tsx
import { TermsOfServiceScreen } from '@umituz/react-native-settings';

export default function TermsOfService() {
  return (
    <TermsOfServiceScreen
      title="Terms of Service"
      viewOnlineText="Read our full terms and conditions online"
      openText="View Terms"
      url="https://myapp.com/terms"
    />
  );
}
```

### Custom Legal Document

```tsx
import { LegalContentScreen } from '@umituz/react-native-settings';
import { StyleSheet } from 'react-native';

const createStyles = (tokens: any) => StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  content: { paddingBottom: 40 },
  title: { marginBottom: 20, fontSize: 28 },
  text: { lineHeight: 26, fontSize: 16 },
  urlContainer: { marginTop: 30, padding: 20 },
  urlText: { marginBottom: 12 },
  urlButton: { marginTop: 10 },
});

export default function LicenseAgreement() {
  return (
    <LegalContentScreen
      title="License Agreement"
      content="This is the content of the license agreement..."
      url="https://myapp.com/license"
      viewOnlineText="View license online"
      openText="Open License"
      styleCacheKey="license-agreement"
      createStyles={createStyles}
    />
  );
}
```

### With Navigation Integration

```tsx
import { LegalScreen, PrivacyPolicyScreen, TermsOfServiceScreen } from '@umituz/react-native-settings';

const LegalStack = createStackNavigator();

function LegalNavigation() {
  return (
    <LegalStack.Navigator>
      <LegalStack.Screen
        name="LegalHub"
        component={LegalHub}
        options={{ title: 'Legal' }}
      />
      <LegalStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Privacy Policy' }}
      />
      <LegalStack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{ title: 'Terms of Service' }}
      />
    </LegalStack.Navigator>
  );
}
```

## Architecture

The Legal domain follows a clean architecture pattern:

```
src/domains/legal/
├── domain/              # Domain layer
│   ├── entities/       # LegalConfig entity
│   └── services/       # UrlHandler, ContentValidation, StyleCache
├── presentation/        # Presentation layer
│   ├── screens/       # LegalScreen, PrivacyPolicyScreen, etc.
│   └── components/    # LegalDocumentsList, LegalItem, etc.
└── __tests__/         # Test files
```

## Best Practices

1. **Keep Content Updated**: Regularly update legal documents as regulations change
2. **Provide Offline Content**: Include basic content inline, with URL for full version
3. **Handle URL Errors**: Always use try-catch when opening external URLs
4. **Accessible Text**: Use proper text sizes and contrast for readability
5. **Version Your Documents**: Track last updated dates
6. **Localize Texts**: Translate legal documents for all supported languages

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { LegalScreen } from '@umituz/react-native-settings';

describe('LegalScreen', () => {
  it('renders legal documents list', () => {
    const mockPrivacyPress = jest.fn();
    const mockTermsPress = jest.fn();

    const { getByText } = render(
      <LegalScreen
        privacyTitle="Privacy Policy"
        termsTitle="Terms of Service"
        onPrivacyPress={mockPrivacyPress}
        onTermsPress={mockTermsPress}
      />
    );

    expect(getByText('Privacy Policy')).toBeTruthy();
    expect(getByText('Terms of Service')).toBeTruthy();
  });

  it('handles document press', () => {
    const mockPrivacyPress = jest.fn();

    const { getByText } = render(
      <LegalScreen
        privacyTitle="Privacy Policy"
        onPrivacyPress={mockPrivacyPress}
      />
    );

    fireEvent.press(getByText('Privacy Policy'));
    expect(mockPrivacyPress).toHaveBeenCalled();
  });
});
```

## Related

- **Settings**: Main settings management
- **Disclaimer**: Disclaimer notices and modals
- **Storage**: Persistent legal content storage

## License

MIT
