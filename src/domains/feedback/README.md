# Feedback Domain

The Feedback domain provides components and utilities for collecting user feedback in your React Native app, including feedback forms, modals, and support sections.

## Features

- **Feedback Form**: Comprehensive form with type selection, rating, and description
- **Feedback Modal**: Modal-based feedback submission
- **Support Section**: Display support resources and contact information
- **Type Categorization**: Categorize feedback by type (bug, feature, general, etc.)
- **Star Rating**: Interactive 1-5 star rating system
- **Form Validation**: Built-in validation and error handling
- **Customizable Texts**: Full localization support

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### FeedbackForm

A comprehensive feedback form with type selection, star rating, and text input.

```tsx
import { FeedbackForm } from '@umituz/react-native-settings';

function MyFeedbackForm() {
  const handleSubmit = async (data) => {
    // Send feedback to your backend
    await api.submitFeedback(data);
  };

  const texts = {
    ratingLabel: 'How would you rate this feature?',
    descriptionPlaceholder: 'Tell us more about your experience...',
    submitButton: 'Submit Feedback',
    submittingButton: 'Submitting...',
    feedbackTypes: [
      { type: 'bug', label: 'Report Bug' },
      { type: 'feature', label: 'Feature Request' },
      { type: 'general', label: 'General Feedback' },
    ],
    defaultTitle: (type) => `User ${type} submission`,
  };

  return <FeedbackForm onSubmit={handleSubmit} texts={texts} />;
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data) => Promise<void>` | **Required** | Submit handler |
| `texts` | `FeedbackFormTexts` | **Required** | Text configuration |
| `initialType` | `FeedbackType` | `undefined` | Initial feedback type |
| `isSubmitting` | `boolean` | `false` | Loading state |

### FeedbackModal

A modal wrapper for the feedback form.

```tsx
import { FeedbackModal } from '@umituz/react-native-settings';

function MyFeedbackModal() {
  const [visible, setVisible] = useState(false);

  return (
    <FeedbackModal
      visible={visible}
      onClose={() => setVisible(false)}
      onSubmit={async (data) => {
        await submitFeedback(data);
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
| `onClose` | `() => void` | **Required** | Close handler |
| `onSubmit` | `(data) => Promise<void>` | **Required** | Submit handler |
| `texts` | `FeedbackFormTexts` | `undefined` | Text configuration |

### SupportSection

Display support resources and contact information.

```tsx
import { SupportSection } from '@umituz/react-native-settings';

function MySupportSection() {
  const supportItems = [
    {
      title: 'Help Center',
      description: 'Browse our help articles',
      onPress: () => navigation.navigate('HelpCenter'),
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our team',
      onPress: () => Linking.openURL('mailto:support@example.com'),
    },
    {
      title: 'Community',
      description: 'Join our community forum',
      onPress: () => Linking.openURL('https://community.example.com'),
    },
  ];

  return (
    <SupportSection
      title="Need Help?"
      description="We're here to assist you"
      items={supportItems}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Section title |
| `description` | `string` | `undefined` | Section description |
| `items` | `SupportItem[]` | `[]` | Support items array |

## Hooks

### useFeedbackForm

Hook for managing feedback form state.

```tsx
import { useFeedbackForm } from '@umituz/react-native-settings';

function FeedbackManager() {
  const {
    formState,
    setType,
    setTitle,
    setDescription,
    setRating,
    reset,
    isValid,
  } = useFeedbackForm({
    type: 'general',
    title: 'Default Title',
  });

  return (
    <View>
      <TextInput
        value={formState.title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        value={formState.description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <Button title="Submit" onPress={handleSubmit} disabled={!isValid} />
    </View>
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `formState` | `FeedbackFormState` | Current form state |
| `setType` | `(type) => void` | Set feedback type |
| `setTitle` | `(title) => void` | Set title |
| `setDescription` | `(desc) => void` | Set description |
| `setRating` | `(rating) => void` | Set rating (1-5) |
| `reset` | `() => void` | Reset form to initial state |
| `isValid` | `boolean` | Form validation status |

## Types

### FeedbackType

```typescript
type FeedbackType = 'bug' | 'feature' | 'general' | 'ui' | 'performance';
```

### FeedbackRating

```typescript
type FeedbackRating = 1 | 2 | 3 | 4 | 5;
```

### FeedbackFormState

```typescript
interface FeedbackFormState {
  type: FeedbackType;
  title: string;
  description: string;
  rating?: FeedbackRating;
}
```

### FeedbackFormTexts

```typescript
interface FeedbackFormTexts {
  ratingLabel: string;
  descriptionPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  feedbackTypes: Array<{
    type: FeedbackType;
    label: string;
  }>;
  defaultTitle: (type: FeedbackType) => string;
}
```

## Examples

### Basic Feedback Form

```tsx
import { FeedbackForm } from '@umituz/react-native-settings';

function BasicFeedback() {
  const handleSubmit = async (data) => {
    console.log('Feedback submitted:', data);
    // Send to backend
    await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  const texts = {
    ratingLabel: 'Rate your experience',
    descriptionPlaceholder: 'What did you like or dislike?',
    submitButton: 'Send Feedback',
    submittingButton: 'Sending...',
    feedbackTypes: [
      { type: 'general', label: 'General' },
      { type: 'bug', label: 'Bug Report' },
      { type: 'feature', label: 'Feature Request' },
    ],
    defaultTitle: (type) => `${type} feedback`,
  };

  return (
    <View style={{ padding: 20 }}>
      <FeedbackForm onSubmit={handleSubmit} texts={texts} />
    </View>
  );
}
```

### Feedback Modal in Settings

```tsx
import { FeedbackModal } from '@umituz/react-native-settings';

function SettingsScreen() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <ScreenLayout>
      <Button
        title="Send Feedback"
        onPress={() => setShowFeedback(true)}
      />

      <FeedbackModal
        visible={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={async (data) => {
          await submitFeedback(data);
          Alert.alert('Success', 'Thank you for your feedback!');
          setShowFeedback(false);
        }}
      />
    </ScreenLayout>
  );
}
```

### Using the Hook

```tsx
import { useFeedbackForm } from '@umituz/react-native-settings';

function CustomFeedbackForm() {
  const {
    formState,
    setType,
    setTitle,
    setDescription,
    setRating,
    reset,
    isValid,
  } = useFeedbackForm();

  const handleSubmit = async () => {
    if (!isValid) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    await api.submitFeedback(formState);
    reset();
    Alert.alert('Success', 'Feedback submitted!');
  };

  return (
    <View>
      <Picker
        selectedValue={formState.type}
        onValueChange={setType}
      >
        <Picker.Item label="Bug" value="bug" />
        <Picker.Item label="Feature" value="feature" />
        <Picker.Item label="General" value="general" />
      </Picker>

      <StarRating
        rating={formState.rating}
        onRatingChange={setRating}
      />

      <TextInput
        value={formState.title}
        onChangeText={setTitle}
        placeholder="Title"
      />

      <TextInput
        value={formState.description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />

      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!isValid}
      />
    </View>
  );
}
```

### Support Section

```tsx
import { SupportSection } from '@umituz/react-native-settings';

function HelpScreen() {
  const supportItems = [
    {
      title: 'FAQ',
      description: 'Frequently asked questions',
      onPress: () => navigation.navigate('FAQ'),
      iconName: 'help-circle',
    },
    {
      title: 'Email Support',
      description: 'support@example.com',
      onPress: () => Linking.openURL('mailto:support@example.com'),
      iconName: 'mail',
    },
    {
      title: 'Live Chat',
      description: 'Chat with our team',
      onPress: () => openChat(),
      iconName: 'message-circle',
    },
    {
      title: 'Report Issue',
      description: 'Report a bug or problem',
      onPress: () => navigation.navigate('ReportIssue'),
      iconName: 'alert-triangle',
    },
  ];

  return (
    <ScrollView>
      <SupportSection
        title="Support Options"
        items={supportItems}
      />
    </ScrollView>
  );
}
```

### Complete Feedback Flow

```tsx
import { FeedbackForm, SupportSection } from '@umituz/react-native-settings';

function FeedbackScreen() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Icon name="check-circle" size={64} color="#10B981" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
          Thank You!
        </Text>
        <Text style={{ marginTop: 8, textAlign: 'center' }}>
          Your feedback helps us improve the app.
        </Text>

        <SupportSection
          title="Need More Help?"
          items={[
            {
              title: 'Contact Support',
              description: 'Get direct assistance',
              onPress: () => Linking.openURL('mailto:support@example.com'),
            },
          ]}
        />
      </View>
    );
  }

  return (
    <FeedbackForm
      onSubmit={async (data) => {
        await submitFeedback(data);
        setSubmitted(true);
      }}
      texts={{
        ratingLabel: 'How would you rate this app?',
        descriptionPlaceholder: 'Tell us what you think...',
        submitButton: 'Submit Feedback',
        submittingButton: 'Sending...',
        feedbackTypes: [
          { type: 'bug', label: 'Bug Report' },
          { type: 'feature', label: 'Feature Request' },
          { type: 'general', label: 'General' },
        ],
        defaultTitle: (type) => `User ${type}`,
      }}
    />
  );
}
```

## Architecture

```
src/domains/feedback/
├── domain/
│   ├── entities/           # FeedbackEntity
│   └── repositories/       # IFeedbackRepository interface
├── presentation/
│   ├── components/
│   │   ├── FeedbackForm.tsx
│   │   ├── FeedbackModal.tsx
│   │   └── SupportSection.tsx
│   └── hooks/
│       └── useFeedbackForm.ts
└── index.ts                # Public API exports
```

## Best Practices

1. **Categorize Feedback**: Use clear categories to help route feedback
2. **Keep it Simple**: Don't ask for too much information upfront
3. **Provide Context**: Explain why you're collecting feedback
4. **Follow Up**: Consider providing a way to track feedback status
5. **Validate Input**: Ensure required fields are filled before submission
6. **Handle Errors**: Show clear error messages for submission failures
7. **Confirmation**: Always show confirmation after successful submission

## Testing

```tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FeedbackForm } from '@umituz/react-native-settings';

describe('FeedbackForm', () => {
  it('renders feedback type selector', () => {
    const onSubmit = jest.fn();
    const texts = {
      ratingLabel: 'Rate',
      descriptionPlaceholder: 'Describe',
      submitButton: 'Submit',
      submittingButton: 'Submitting',
      feedbackTypes: [
        { type: 'bug', label: 'Bug' },
        { type: 'feature', label: 'Feature' },
      ],
      defaultTitle: (t) => t,
    };

    const { getByText } = render(
      <FeedbackForm onSubmit={onSubmit} texts={texts} />
    );

    expect(getByText('Bug')).toBeTruthy();
    expect(getByText('Feature')).toBeTruthy();
  });

  it('submits form with correct data', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const texts = {
      ratingLabel: 'Rate',
      descriptionPlaceholder: 'Describe',
      submitButton: 'Submit',
      submittingButton: 'Submitting',
      feedbackTypes: [{ type: 'general', label: 'General' }],
      defaultTitle: (t) => t,
    };

    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm onSubmit={onSubmit} texts={texts} />
    );

    const input = getByPlaceholderText('Describe');
    fireEvent.changeText(input, 'Great app!');

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Great app!',
          type: 'general',
          rating: 5,
        })
      );
    });
  });
});
```

## Related

- **Settings**: Main settings management
- **Rating**: Star rating component
- **FAQs**: Frequently asked questions

## License

MIT
