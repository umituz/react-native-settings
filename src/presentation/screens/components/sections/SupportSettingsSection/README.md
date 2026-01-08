# Support Settings Section

Section component that displays user support features including feedback, rating, and FAQs.

## Features

- **Feedback System**: User feedback collection and submission
- **Rating System**: App rating and review functionality
- **FAQ Access**: Quick access to frequently asked questions
- **Modals**: Feedback modal with rating and description
- **Internationalization**: Full i18n support

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { SupportSettingsSection } from '@umituz/react-native-settings';

function MySettingsScreen() {
  const normalizedConfig = {
    feedback: { config: {} },
    rating: { config: {} },
    faqs: { config: {} },
  };

  const features = {
    feedback: true,
    rating: true,
    faqs: true,
  };

  return (
    <SupportSettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

## Props

### SupportSettingsSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `normalizedConfig` | `NormalizedConfig` | **Required** | Normalized settings configuration |
| `features` | `FeatureFlags` | **Required** | Feature visibility flags |

### FeatureFlags

```typescript
interface FeatureFlags {
  feedback: boolean;  // Show feedback option
  rating: boolean;    // Show rating option
  faqs: boolean;      // Show FAQ access
}
```

## Component Structure

```
SupportSettingsSection
└── SettingsSection "Support"
    ├── SupportSection
    │   ├── Feedback Item   (if features.feedback)
    │   └── Rating Item     (if features.rating)
    └── FAQ Item            (if features.faqs)
```

## Examples

### All Support Features

```tsx
function FullSupportSettings() {
  const normalizedConfig = {
    feedback: {
      config: {
        title: 'Send Feedback',
        description: 'Help us improve',
      },
    },
    rating: {
      config: {
        title: 'Rate This App',
        description: 'Love it? Rate us!',
      },
    },
    faqs: {
      config: {
        title: 'Help & FAQs',
        description: 'Find answers',
      },
    },
  };

  const features = {
    feedback: true,
    rating: true,
    faqs: true,
  };

  return (
    <SupportSettingsSection
      normalizedConfig={normalizedConfig}
      features={features}
    />
  );
}
```

### Feedback Only

```tsx
function FeedbackOnlySettings() {
  const features = {
    feedback: true,
    rating: false,
    faqs: false,
  };

  return (
    <SupportSettingsSection
      normalizedConfig={{}}
      features={features}
    />
  );
}
```

### Custom Feedback Configuration

```tsx
function CustomFeedbackSettings() {
  const normalizedConfig = {
    feedback: {
      config: {
        title: 'Share Your Thoughts',
        description: 'We value your feedback',
        feedbackTypes: ['general', 'bug', 'feature'],
      },
    },
  };

  return (
    <SupportSettingsSection
      normalizedConfig={normalizedConfig}
      features={{ feedback: true, rating: false, faqs: false }}
    />
  );
}
```

## Sub-Components

### SupportSection

Wrapper component for feedback and rating items.

```tsx
<SupportSection
  renderSection={(props) => <SettingsSection>{props.children}</SettingsSection>}
  renderItem={(props) => <SettingsItemCard {...props} />}
  feedbackConfig={{
    enabled: true,
    config: {
      title: 'Send Feedback',
      description: 'Tell us what you think',
    },
  }}
  ratingConfig={{
    enabled: true,
    config: {
      title: 'Rate Us',
      description: '5 stars would be great!',
    },
  }}
/>
```

### SupportSection Props

| Prop | Type | Description |
|------|------|-------------|
| `renderSection` | `(props) => ReactNode` | Section renderer |
| `renderItem` | `(props) => ReactNode` | Item renderer |
| `feedbackConfig` | `FeedbackConfig` | Feedback configuration |
| `ratingConfig` | `RatingConfig` | Rating configuration |

### FeedbackModalTexts

Configuration for feedback modal texts:

```typescript
interface FeedbackModalTexts {
  title: string;
  ratingLabel: string;
  descriptionPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  feedbackTypes: Array<{
    type: FeedbackType;
    label: string;
  }>;
  defaultTitle: (type) => string;
}
```

## Feedback Configuration

```typescript
interface FeedbackConfig {
  enabled: boolean;
  config?: {
    title?: string;
    description?: string;
    feedbackTypes?: FeedbackType[];
  };
}
```

### Rating Configuration

```typescript
interface RatingConfig {
  enabled: boolean;
  config?: {
    title?: string;
    description?: string;
    storeUrl?: string;
  };
}
```

### FAQ Configuration

```typescript
interface FAQConfig {
  enabled: boolean;
  config?: {
    title?: string;
    description?: string;
    categories?: FAQCategory[];
  };
}
```

## Internationalization

Translation keys used:

```typescript
// Section
t("settings.support.title")

// Feedback
t("settings.feedback.title")
t("settings.feedback.description")
t("settings.feedback.modal.title")
t("settings.feedback.modal.ratingLabel")
t("settings.feedback.modal.descriptionPlaceholder")
t("settings.feedback.modal.submitButton")
t("settings.feedback.modal.submittingButton")

// Feedback Types
t("settings.feedback.types.general")
t("settings.feedback.types.bugReport")
t("settings.feedback.types.featureRequest")
t("settings.feedback.types.improvement")
t("settings.feedback.types.other")

// Rating
t("settings.rating.title")
t("settings.rating.description")

// FAQ
t("settings.faqs.title")
t("settings.faqs.description")
```

## Examples

### With Store Rating

```tsx
function StoreRatingSupport() {
  const config = {
    rating: {
      config: {
        title: 'Rate Us on App Store',
        description: 'Your feedback helps us improve',
        storeUrl: 'https://apps.apple.com/app/id123',
      },
    },
  };

  return (
    <SupportSettingsSection
      normalizedConfig={config}
      features={{ rating: true }}
    />
  );
}
```

### Custom Feedback Types

```tsx
function CustomFeedbackTypes() {
  const config = {
    feedback: {
      config: {
        feedbackTypes: ['bug_report', 'feature_request', 'ui_issue'],
      },
    },
  };

  return (
    <SupportSettingsSection
      normalizedConfig={config}
      features={{ feedback: true }}
    />
  );
}
```

### With FAQ Categories

```tsx
function FAQWithCategories() {
  const config = {
    faqs: {
      config: {
        categories: [
          {
            id: 'getting-started',
            title: 'Getting Started',
            questions: [
              { id: 'q1', question: 'How to begin?', answer: '...' },
            ],
          },
        ],
      },
    },
  };

  return (
    <SupportSettingsSection
      normalizedConfig={config}
      features={{ faqs: true }}
    />
  );
}
```

## Navigation

FAQ navigation handler:

```tsx
const handleFAQPress = useCallback(() => {
  navigation.navigate("FAQ");
}, [navigation]);
```

## Best Practices

1. **User Feedback**: Always provide feedback option
2. **Rating Prompt**: Show rating prompt at appropriate times
3. **FAQ Access**: Make FAQs easily accessible
4. **Modal Design**: Keep feedback modal simple and clear
5. **Feedback Types**: Provide relevant feedback categories
6. **Thank Users**: Always thank users for feedback
7. **Follow Up**: Consider providing support contact

## Related

- **Feedback Domain**: Feedback system components
- **Rating Domain**: Rating components
- **FAQs Domain**: FAQ system
- **Support Section**: Support components

## License

MIT
