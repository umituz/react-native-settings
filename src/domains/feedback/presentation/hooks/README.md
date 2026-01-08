# useFeedbackForm Hook

Custom hook for managing feedback form state, validation, and submission.

## Features

- **Form State**: Manages feedback type, rating, and message
- **Validation**: Validates form before submission
- **Submission**: Handles feedback submission with callbacks
- **Reset**: Resets form after successful submission
- **Rating Management**: Handles star rating state

## Installation

This hook is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { useFeedbackForm } from '@umituz/react-native-settings';

function FeedbackScreen() {
  const {
    feedbackType,
    rating,
    message,
    setFeedbackType,
    setRating,
    setMessage,
    submitFeedback,
    canSubmit,
    isSubmitting,
  } = useFeedbackForm();

  return (
    <View>
      <FeedbackTypeSelector
        selected={feedbackType}
        onSelect={setFeedbackType}
      />

      <StarRating
        rating={rating}
        onRatingChange={setRating}
      />

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Describe your feedback..."
      />

      <Button
        onPress={submitFeedback}
        disabled={!canSubmit || isSubmitting}
        title={isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      />
    </View>
  );
}
```

## Return Value

```typescript
interface UseFeedbackFormResult {
  // Form state
  feedbackType: FeedbackType | null;
  rating: number;
  message: string;

  // Setters
  setFeedbackType: (type: FeedbackType) => void;
  setRating: (rating: number) => void;
  setMessage: (message: string) => void;

  // Actions
  submitFeedback: () => Promise<void>;
  resetForm: () => void;

  // State
  canSubmit: boolean;
  isSubmitting: boolean;
  error?: string;

  // Validation
  errors: {
    feedbackType?: string;
    rating?: string;
    message?: string;
  };
}
```

## Examples

### With Callbacks

```tsx
function FeedbackForm() {
  const feedbackForm = useFeedbackForm({
    onSubmit: async (data) => {
      await api.submitFeedback(data);
      Alert.alert('Success', 'Thank you for your feedback!');
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to submit feedback');
    },
  });

  return (
    <View>
      <FeedbackTypeSelector
        selected={feedbackForm.feedbackType}
        onSelect={feedbackForm.setFeedbackType}
      />
      <StarRating
        rating={feedbackForm.rating}
        onRatingChange={feedbackForm.setRating}
      />
      <TextInput
        value={feedbackForm.message}
        onChangeText={feedbackForm.setMessage}
      />
      <Button
        onPress={feedbackForm.submitFeedback}
        disabled={!feedbackForm.canSubmit}
        title="Submit"
      />
    </View>
  );
}
```

### With Custom Validation

```tsx
function ValidatedFeedbackForm() {
  const { feedbackType, rating, message, submitFeedback, canSubmit } = useFeedbackForm({
    validate: (data) => {
      const errors = {};

      if (!data.feedbackType) {
        errors.feedbackType = 'Please select a feedback type';
      }

      if (data.rating === 0) {
        errors.rating = 'Please provide a rating';
      }

      if (data.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
      }

      return errors;
    },
  });

  return (
    <View>
      {/* Form fields */}
    </View>
  );
}
```

### With Auto-Reset

```tsx
function AutoResetFeedbackForm() {
  const { submitFeedback, resetForm } = useFeedbackForm({
    autoReset: true,
    resetDelay: 2000, // Reset after 2 seconds
    onSubmitSuccess: () => {
      Alert.alert('Success', 'Feedback submitted!');
    },
  });

  return (
    <View>
      <Button onPress={submitFeedback} title="Submit" />
    </View>
  );
}
```

### With Character Limit

```tsx
function LimitedFeedbackForm() {
  const { message, setMessage, submitFeedback, canSubmit } = useFeedbackForm({
    maxLength: 500,
  });

  const remainingChars = 500 - message.length;

  return (
    <View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Your feedback..."
        maxLength={500}
        multiline
      />

      <Text>
        {remainingChars} characters remaining
      </Text>

      <Button
        onPress={submitFeedback}
        disabled={!canSubmit}
        title="Submit"
      />
    </View>
  );
}
```

### With Categories

```tsx
function CategorizedFeedbackForm() {
  const categories = [
    { id: 'bug', label: 'Bug Report', icon: 'bug-outline' },
    { id: 'feature', label: 'Feature Request', icon: 'lightbulb-outline' },
    { id: 'general', label: 'General Feedback', icon: 'chatbubble-outline' },
  ];

  const { feedbackType, setFeedbackType, submitFeedback } = useFeedbackForm();

  return (
    <View>
      <Text style={styles.label}>Feedback Type</Text>

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => setFeedbackType(category.id as FeedbackType)}
          style={[
            styles.category,
            feedbackType === category.id && styles.selectedCategory,
          ]}
        >
          <Ionicons
            name={category.icon}
            size={24}
            color={feedbackType === category.id ? 'white' : 'black'}
          />
          <Text>{category.label}</Text>
        </TouchableOpacity>
      ))}

      <Button onPress={submitFeedback} title="Submit" />
    </View>
  );
}
```

## Form Options

```typescript
interface FeedbackFormOptions {
  onSubmit?: (data: FeedbackData) => Promise<void>;
  onSubmitSuccess?: () => void;
  onError?: (error: Error) => void;
  validate?: (data: FeedbackData) => ValidationErrors;
  autoReset?: boolean;
  resetDelay?: number;
  maxLength?: number;
  minRating?: number;
  requireMessage?: boolean;
  minMessageLength?: number;
}
```

## Feedback Types

```typescript
type FeedbackType =
  | 'bug'           // Bug report
  | 'feature'       // Feature request
  | 'improvement'   // Improvement suggestion
  | 'compliment'    // Positive feedback
  | 'complaint'     // Complaint
  | 'general';      // General feedback
```

## Validation

### Default Validation

```typescript
const defaultValidation = {
  // Feedback type is required
  feedbackType: (value) => !value ? 'Required' : undefined,

  // Rating must be at least 1
  rating: (value) => value === 0 ? 'Required' : undefined,

  // Message must be at least 10 characters
  message: (value) => value.length < 10 ? 'Too short' : undefined,
};
```

### Custom Validation Rules

```tsx
function CustomValidatedForm() {
  const { message, setMessage, canSubmit } = useFeedbackForm({
    validate: (data) => {
      const errors = {};

      // Custom feedback type validation
      if (!data.feedbackType) {
        errors.feedbackType = 'Please select a type';
      }

      // Custom rating validation
      if (data.rating < 3 && data.message.length < 50) {
        errors.message = 'Low ratings require detailed explanation';
      }

      // Custom message validation
      if (data.message.includes('spam')) {
        errors.message = 'Inappropriate content detected';
      }

      return errors;
    },
  });

  return (
    <View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Your feedback..."
      />
      <Button disabled={!canSubmit} title="Submit" />
    </View>
  );
}
```

## Error Handling

### Display Errors

```tsx
function FeedbackFormWithErrorDisplay() {
  const { errors, submitFeedback, feedbackType } = useFeedbackForm();

  return (
    <View>
      <FeedbackTypeSelector
        selected={feedbackType}
        onSelect={setFeedbackType}
      />

      {errors.feedbackType && (
        <Text style={styles.error}>{errors.feedbackType}</Text>
      )}

      {errors.rating && (
        <Text style={styles.error}>{errors.rating}</Text>
      )}

      {errors.message && (
        <Text style={styles.error}>{errors.message}</Text>
      )}

      <Button onPress={submitFeedback} title="Submit" />
    </View>
  );
}
```

### Submission Errors

```tsx
function FeedbackFormWithErrorHandling() {
  const { submitFeedback, error, isSubmitting } = useFeedbackForm({
    onError: (error) => {
      console.error('Submission error:', error);
      Alert.alert(
        'Submission Failed',
        'Please check your connection and try again'
      );
    },
  });

  return (
    <View>
      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        onPress={submitFeedback}
        disabled={isSubmitting}
        title={isSubmitting ? 'Submitting...' : 'Submit'}
      />
    </View>
  );
}
```

## Best Practices

1. **Validation**: Always validate form before submission
2. **Feedback**: Provide immediate feedback on errors
3. **Loading States**: Show loading indicator during submission
4. **Reset**: Reset form after successful submission
5. **Character Limits**: Enforce reasonable message length limits
6. **Clear Errors**: Display clear, actionable error messages
7. **Accessibility**: Ensure form is accessible to all users

## Related

- **FeedbackForm**: Feedback form component
- **FeedbackModal**: Feedback modal component
- **StarRating**: Star rating component

## License

MIT
