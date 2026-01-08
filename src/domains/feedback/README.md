# Feedback Domain

## Purpose

Provides components and utilities for collecting user feedback including feedback forms, modals, support sections, and categorization.

## File Paths

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/components/FeedbackForm.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/components/FeedbackModal.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/components/SupportSection.tsx`

**Hooks:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/presentation/hooks/useFeedbackForm.ts`

**Domain:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/domain/entities/FeedbackEntity.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/domain/repositories/IFeedbackRepository.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/feedback/index.ts`

## Strategy

1. **Form State Management**: Use useFeedbackForm hook for centralized form state and validation
2. **Type Categorization**: Categorize feedback by type (bug, feature, general, etc.) for better routing
3. **Star Rating Integration**: Integrate with Rating domain for 1-5 star ratings
4. **Repository Pattern**: Use IFeedbackRepository interface for abstracted feedback submission
5. **Validation First**: Always validate form state before submission to prevent invalid data

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT submit feedback without validating required fields (type, title)
- ❌ DO NOT bypass the repository pattern when submitting feedback
- ❌ DO NOT use FeedbackForm without providing texts configuration
- ❌ DO NOT handle feedback submission manually when the hook provides everything needed

### NEVER
- ❌ NEVER use FeedbackForm without onSubmit handler
- ❌ NEVER submit feedback with empty or invalid form state
- ❌ NEVER skip error handling for feedback submission failures
- ❌ NEVER use feedback components without proper loading states

### AVOID
- ❌ AVOID creating custom feedback forms when FeedbackForm can be configured
- ❌ AVOID collecting too much information upfront - keep forms simple
- ❌ AVOID mixing feedback logic directly with UI components
- ❌ AVOID using FeedbackModal without handling close state

## Rules

### ALWAYS
- ✅ ALWAYS provide onSubmit handler when using FeedbackForm or FeedbackModal
- ✅ ALWAYS provide texts configuration with all required strings
- ✅ ALWAYS use useFeedbackForm hook for form state management
- ✅ ALWAYS validate form before submission (use isValid from hook)
- ✅ ALWAYS handle loading states during submission

### MUST
- ✅ MUST provide feedbackTypes array in texts configuration
- ✅ MUST handle submission errors gracefully with user feedback
- ✅ MUST show confirmation message after successful submission
- ✅ MUST include all required fields in form (type, title, description)
- ✅ MUST use TypeScript types from the domain (FeedbackType, FeedbackFormState)

### SHOULD
- ✅ SHOULD categorize feedback clearly to help route it correctly
- ✅ SHOULD provide context for why feedback is being collected
- ✅ SHOULD keep forms simple and don't ask for too much upfront
- ✅ SHOULD provide a way to track feedback status
- ✅ SHOULD include rating component for user satisfaction feedback

## AI Agent Guidelines

1. **Component Selection**: Use FeedbackForm for inline forms, FeedbackModal for modal-based collection, SupportSection for displaying support resources
2. **Hook Usage**: Always use useFeedbackForm for form state - never manage form state locally
3. **Configuration**: Always provide complete texts configuration including feedbackTypes array and defaultTitle function
4. **Validation**: Always check isValid from useFeedbackForm before enabling submission
5. **Error Handling**: Always handle both submission errors and success states with proper user feedback

## Related

- **Settings**: Main settings management
- **Rating**: Star rating component
- **FAQs**: Frequently asked questions

## License

MIT
