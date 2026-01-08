# Navigation Hooks

## Purpose

Custom React hooks for navigation utilities and helpers in the settings navigation system.

## File Paths

- **Navigation Hook**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/hooks/useSettingsNavigation.ts`

## Strategy

1. **Type-Safe Navigation**: Provides type-safe navigation helpers for all settings screens
2. **Config Passing**: Handles configuration passing through navigation params
3. **Consistent API**: Uniform navigation methods across all screens
4. **Memoization**: Optimizes navigation handlers with useCallback
5. **Error Handling**: Includes error handling for navigation failures

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use navigation.navigate() directly (use hook helpers)
- ❌ DO NOT hardcode screen names (use constants from hook)
- ❌ DO NOT bypass type safety with incorrect params

### NEVER
- ❌ NEVER use these hooks outside of NavigationContext
- ❌ NEVER pass invalid configuration to navigation helpers
- ❌ NEVER ignore TypeScript errors for navigation params

### AVOID
- ❌ AVOID creating multiple navigation hooks (use the provided one)
- ❌ AVOID complex navigation logic in components (keep in hook)
- ❌ AVOID navigation side effects in render phase

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use useSettingsNavigation for settings navigation
- ✅ ALWAYS use proper TypeScript types for config parameters
- ✅ MUST memoize navigation handlers in components
- ✅ MUST handle navigation errors gracefully

### MUST
- ✅ MUST provide valid config objects for each screen
- ✅ MUST check screen availability before navigation (when needed)
- ✅ MUST use correct parameter types for each screen

### SHOULD
- ✅ SHOULD track navigation events for analytics
- ✅ SHOULD validate configuration before navigation
- ✅ SHOULD use navigation helpers for consistency

## AI Agent Guidelines

1. **File Reference**: When modifying navigation hooks, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/hooks/useSettingsNavigation.ts`
2. **Type Safety**: All navigation helpers are type-safe, respect TypeScript types
3. **Config Validation**: Validate config objects before passing to navigation helpers
4. **Memoization**: Navigation handlers are already memoized, but you can memoize callbacks that use them
5. **Analytics**: Track navigation events for insights

## Hook Reference

### useSettingsNavigation

**Purpose**: Provides type-safe navigation helpers for all settings screens

**Returns**: SettingsNavigationHelpers object

**Navigation Methods**:
- `navigateToAppearance(config?)`: Navigate to Appearance screen
- `navigateToLanguage(config?)`: Navigate to Language selection screen
- `navigateToNotifications(config?)`: Navigate to Notifications screen
- `navigateToAbout(config?)`: Navigate to About screen
- `navigateToLegal(documentType)`: Navigate to Legal screen
- `navigateToFeedback(config?)`: Navigate to Feedback screen/modal
- `navigateToFAQs(config?)`: Navigate to FAQ screen
- `navigateToSubscription(config?)`: Navigate to Subscription screen
- `navigateToWallet(config?)`: Navigate to Wallet screen
- `goBack()`: Navigate back

**Usage**: Call hook in component, use returned navigation helpers

## Parameter Types

**AppearanceConfig**: Appearance screen configuration
- `showThemeSection?: boolean`
- `showColorsSection?: boolean`
- `showPreviewSection?: boolean`

**LanguageConfig**: Language selection configuration
- `showFlags?: boolean`

**LegalDocumentType**: Legal document type
- 'privacy-policy' | 'terms-of-service' | 'eula'

**AboutConfig**: About screen configuration
- `appName?: string`
- `version?: string`
- `developer?: string`
- `contactEmail?: string`

## Related Components

- **Navigation Components**: Screen wrappers
- **Navigation Utils**: Utility functions for navigation
- **Screen Components**: Individual screen implementations
