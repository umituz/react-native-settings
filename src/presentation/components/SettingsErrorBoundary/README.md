# Settings Error Boundary

## Purpose

Error boundary component for catching and handling errors in settings screens and components, providing fallback UI and error recovery options.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsErrorBoundary/SettingsErrorBoundary.tsx`

## Strategy

1. **Error Containment**: Catches JavaScript errors in the component tree below it, preventing app crashes
2. **User-Friendly Fallback**: Displays clear, non-technical error messages to users
3. **Error Recovery**: Provides retry or reset actions to recover from errors
4. **Development Support**: Shows detailed error information in development mode for debugging
5. **Error Reporting**: Integrates with error tracking services for monitoring

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT wrap individual small components (use at screen or major section level)
- ❌ DO NOT use error boundaries to handle expected errors (e.g., network failures)
- ❌ DO NOT show technical stack traces to end users in production

### NEVER
- ❌ NEVER use error boundaries inside event handlers or async code
- ❌ NEVER use error boundaries to control flow or business logic
- ❌ NEVER expose sensitive information in error messages

### AVOID
- ❌ AVOID nesting multiple error boundaries without clear purpose
- ❌ AVOID generic error messages that don't help users understand what happened
- ❌ AVOID blocking the entire app when a recoverable error occurs

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS provide a clear fallback UI when errors occur
- ✅ ALWAYS log errors for debugging and monitoring
- ✅ ALWAYS integrate with error tracking services (e.g., Sentry)
- ✅ ALWAYS show user-friendly error messages in production

### MUST
- ✅ MUST offer recovery options (retry, reset, or navigation) to users
- ✅ MUST ensure error boundaries don't interfere with normal error handling
- ✅ MUST test error scenarios during development

### SHOULD
- ✅ SHOULD provide context-specific error messages when possible
- ✅ SHOULD include development-only error details for debugging
- ✅ SHOULD offer a way to report errors or contact support

## AI Agent Guidelines

1. **File Reference**: When implementing error handling, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsErrorBoundary/SettingsErrorBoundary.tsx`
2. **Placement Strategy**: Place error boundaries at strategic locations (screen level, major feature sections)
3. **Fallback Design**: Design fallback UIs that match your app's visual design
4. **Error Tracking**: Always integrate with error tracking services like Sentry or Crashlytics
5. **Recovery Logic**: Implement appropriate recovery actions based on error type and context

## Component Reference

Related components:
- **SettingsScreen**: Main screen component that uses error boundaries
- **SettingsContent**: Content component wrapped by error boundaries
- **React Error Boundaries**: Official React documentation for error boundaries
