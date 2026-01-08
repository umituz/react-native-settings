# useFeedbackForm Hook

## Purpose

Custom hook for managing feedback form state, validation, and submission. Provides a complete form management solution with built-in validation, error handling, and submission workflows for collecting user feedback.

## File Paths

- **useFeedbackForm**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/hooks/useFeedbackForm.ts`
- **Feedback Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/components/`
- **Feedback Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/screens/FeedbackScreen.tsx`

## Strategy

1. **Centralized State Management**: Consolidates all feedback form state (type, rating, message) and associated logic in one place, reducing prop drilling and simplifying component implementations.

2. **Validation Framework**: Implements comprehensive validation with both default rules and support for custom validation logic, ensuring feedback data meets quality standards before submission.

3. **User Experience Optimization**: Provides immediate validation feedback, loading states during submission, and optional auto-reset functionality to create smooth, responsive form interactions.

4. **Flexible Submission Handling**: Supports custom submission handlers, success callbacks, and error handling to integrate with various backend services and analytics platforms.

5. **Character Limit Enforcement**: Includes optional character limits with real-time remaining character counts, helping users provide appropriate-length feedback.

## Restrictions

### ❌ DO NOT

- Submit feedback without validation - always check canSubmit
- Reset the form manually without using resetForm function
- Bypass loading states during submission
- Ignore validation errors when displaying the form
- Allow submission of empty or invalid feedback

### ❌ NEVER

- Mutate form state directly outside of provided setters
- Submit the same feedback multiple times
- Store sensitive user information in feedback data
- Disable validation without proper justification
- Use the hook for non-feedback form purposes

### ❌ AVOID

- Overly complex custom validation rules
- Excessive character limits that frustrate users
- Blocking UI during submission without loading indicators
- Immediate auto-reset without showing success message
- Collecting unnecessary personal information

## Rules

### ✅ ALWAYS

- Validate form before submission using canSubmit
- Display validation errors clearly to users
- Show loading state during submission (isSubmitting)
- Provide clear error messages on submission failure
- Reset form after successful submission

### ✅ MUST

- Require at minimum: feedbackType and rating
- Validate message length when message is required
- Handle submission errors gracefully
- Provide feedback on successful submission
- Prevent submission while already submitting

### ✅ SHOULD

- Use character limits for message fields (500 chars recommended)
- Implement auto-reset with delay (2-3 seconds)
- Provide context-specific validation rules
- Include feedback type categorization
- Support anonymous feedback options
- Test validation with various input combinations

## AI Agent Guidelines

1. **Validation Strategy**: Implement validation that provides immediate feedback. Use the errors object to display inline validation messages next to relevant form fields rather than showing a single error message.

2. **Submission Flow**: Always check canSubmit before allowing submission. Disable the submit button when canSubmit is false or isSubmitting is true. Show a loading indicator during submission to prevent duplicate submissions.

3. **Error Handling**: Display clear, actionable error messages when submission fails. Use the onError callback to log errors for debugging while showing user-friendly messages. Allow users to retry after failed submissions.

4. **User Feedback**: Provide positive feedback after successful submission. Consider using auto-reset with a 2-3 second delay to show success messages before clearing the form. Track feedback submissions for analytics.

5. **Form UX**: Group related feedback types together. Use clear labels for feedback type options. Show character count for message fields. Consider progressive disclosure - only show message field after rating is selected.

## Reference

- **Hook Implementation**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/hooks/useFeedbackForm.ts`
- **Feedback Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/screens/FeedbackScreen.tsx`
- **Feedback Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/components/`
- **Types**: Check FeedbackType and related types for all available options
