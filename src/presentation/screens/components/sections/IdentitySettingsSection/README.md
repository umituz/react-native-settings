# Identity Settings Section

Section component that displays user identity-related settings including About and Legal information.

## Features

- **About Section**: App information, version, developer details
- **Legal Section**: Privacy policy, terms of service, legal documents
- **Conditional Rendering**: Shows only enabled sections
- **Internationalization**: Full i18n support

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { IdentitySettingsSection } from '@umituz/react-native-settings';

function MySettingsScreen() {
  const normalizedConfig = {
    about: { config: {} },
    legal: { config: {} },
  };

  const features = {
    about: true,
    legal: true,
  };

  return (
    <IdentitySettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

## Props

### IdentitySettingsSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `normalizedConfig` | `NormalizedConfig` | **Required** | Normalized settings configuration |
| `features` | `FeatureFlags` | **Required** | Feature visibility flags |

### FeatureFlags

```typescript
interface FeatureFlags {
  about: boolean;  // Show about section
  legal: boolean;  // Show legal section
}
```

## Component Structure

```
IdentitySettingsSection
├── AboutSection      (if features.about)
│   ├── App Information
│   ├── Version
│   ├── Developer
│   └── Contact
└── LegalSection      (if features.legal)
    ├── Privacy Policy
    ├── Terms of Service
    └── EULA (if provided)
```

## Examples

### All Identity Features

```tsx
function FullIdentitySettings() {
  const normalizedConfig = {
    about: {
      config: {
        appName: 'My App',
        version: '1.0.0',
        developer: 'My Company',
      },
    },
    legal: {
      config: {
        privacyPolicyUrl: 'https://example.com/privacy',
        termsOfServiceUrl: 'https://example.com/terms',
      },
    },
  };

  const features = {
    about: true,
    legal: true,
  };

  return (
    <IdentitySettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

### About Only

```tsx
function AboutOnlySettings() {
  const normalizedConfig = {
    about: {
      config: {
        appName: 'My App',
        version: '1.0.0',
        showDeveloper: true,
        showContact: true,
      },
    },
  };

  const features = {
    about: true,
    legal: false,
  };

  return (
    <IdentitySettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

### Legal Only

```tsx
function LegalOnlySettings() {
  const normalizedConfig = {
    legal: {
      config: {
        showPrivacy: true,
        showTerms: true,
        showEula: false,
      },
    },
  };

  const features = {
    about: false,
    legal: true,
  };

  return (
    <IdentitySettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

### With Custom Configuration

```tsx
function CustomIdentitySettings() {
  const normalizedConfig = {
    about: {
      config: {
        appName: 'Custom App',
        version: '2.0.0',
        developer: 'Custom Developer',
        websiteUrl: 'https://custom.com',
        supportEmail: 'support@custom.com',
      },
    },
    legal: {
      config: {
        privacyPolicyContent: 'Our privacy policy...',
        termsOfServiceContent: 'Our terms...',
      },
    },
  };

  return (
    <IdentitySettingsSection
      normalizedConfig={normalizedConfig}
      features={{ about: true, legal: true }}
    />
  );
}
```

## Sub-Components

### AboutSection

From About domain, displays app information.

```tsx
<AboutSection
  config={{
    appName: 'My App',
    version: '1.0.0',
    developer: 'My Company',
    contactEmail: 'support@example.com',
    websiteUrl: 'https://example.com',
  }}
  sectionTitle="ABOUT"
/>
```

**AboutSection Props:**

- `appName`: Application name
- `version`: App version
- `buildNumber`: Build number
- `developer`: Developer/company name
- `contactEmail`: Support email
- `websiteUrl`: Website URL
- `actions`: Press handlers for email/website

### LegalSection

From Legal domain, displays legal document links.

```tsx
<LegalSection
  config={{
    title: 'Legal',
    description: 'Important information',
    privacyPolicyUrl: 'https://example.com/privacy',
    termsOfServiceUrl: 'https://example.com/terms',
    eulaUrl: 'https://example.com/eula',
  }}
  sectionTitle="LEGAL"
/>
```

**LegalSection Props:**

- `privacyPolicyUrl`: Privacy policy URL or content
- `termsOfServiceUrl`: Terms URL or content
- `eulaUrl`: EULA URL or content (optional)
- `onPrivacyPress`: Custom privacy handler
- `onTermsPress`: Custom terms handler
- `onEulaPress`: Custom EULA handler

## Configuration

### About Configuration

```typescript
interface AboutConfig {
  appName?: string;
  version?: string;
  buildNumber?: string;
  developer?: string;
  contactEmail?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
  moreAppsUrl?: string;
  actions?: {
    onEmailPress?: () => void;
    onWebsitePress?: () => void;
    onMoreAppsPress?: () => void;
  };
}
```

### Legal Configuration

```typescript
interface LegalConfig {
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  eulaUrl?: string;
  privacyPolicyContent?: string;
  termsOfServiceContent?: string;
  eulaContent?: string;
  onPrivacyPress?: () => void;
  onTermsPress?: () => void;
  onEulaPress?: () => void;
}
```

## Internationalization

Translation keys used:

```typescript
// About
t("settings.about.title")
t("settings.about.description")

// Legal
t("settings.legal.title")
t("settings.legal.description")
```

## Best Practices

1. **Separate Concerns**: Keep identity settings separate from other features
2. **Consistent Order**: About first, then Legal
3. **Navigation**: Provide proper navigation handlers
4. **URL Handling**: Handle both URLs and inline content
5. **Translation**: Use translation keys for all text
6. **Contact Info**: Always include contact information in About
7. **Legal Docs**: Include all required legal documents

## Related

- **About Domain**: App information features
- **Legal Domain**: Legal document features
- **Feature Settings**: Other setting sections

## License

MIT
