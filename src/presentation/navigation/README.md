# Navigation System

## Purpose

Complete navigation setup for settings screens using React Navigation with stack navigator, screen wrappers, and navigation utilities.

## File Paths

- **Navigator**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/SettingsStackNavigator.tsx`
- **Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/components/`
- **Hooks**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/hooks/`
- **Utils**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/utils/`

## Strategy

1. **Stack Navigator**: Provides stack-based navigation for all settings screens
2. **Screen Wrappers**: Handles configuration and props passing for each screen
3. **Type Safety**: TypeScript definitions for all navigation params
4. **Screen Options**: Consistent screen options with translations
5. **Custom Screens**: Support for additional screens via props

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT manually create screen wrappers (use provided ones)
- ❌ DO NOT bypass screen wrappers for props injection
- ❌ DO NOT hardcode screen options (use utility functions)

### NEVER
- ❌ NEVER use SettingsStackNavigator without NavigationContainer
- ❌ NEVER wrap SettingsStackNavigator in another error boundary
- ❌ NEVER pass navigation props directly to screen components

### AVOID
- ❌ AVOID creating multiple instances of SettingsStackNavigator
- ❌ AVOID mixing navigation patterns (stick to stack navigation)
- ❌ AVOID deep linking without proper configuration

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use screen wrappers for proper props injection
- ✅ ALWAYS provide required props: appInfo, legalUrls
- ✅ ALWAYS use TypeScript types for navigation params
- ✅ MUST wrap navigator in NavigationContainer

### MUST
- ✅ MUST pass configuration via props, not hardcoded
- ✅ MUST handle navigation errors gracefully
- ✅ MUST provide translation function to all screens

### SHOULD
- ✅ SHOULD use modal presentation for settings on iOS
- ✅ SHOULD support deep linking to settings screens
- ✅ SHOULD use additionalScreens prop for custom screens

## AI Agent Guidelines

1. **File Reference**: When modifying navigation, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/navigation/`
2. **Screen Wrappers**: Always use screen wrappers (SettingsScreenWrapper, LegalScreenWrapper, AboutScreenWrapper) for proper configuration
3. **Props Passing**: Configuration is passed via navigator props and injected by wrappers
4. **Type Safety**: Use SettingsStackParamList for type-safe navigation
5. **Custom Screens**: Add app-specific screens via `additionalScreens` prop

## Component Reference

### SettingsStackNavigator

**Purpose**: Main stack navigator for all settings screens

**Required Props**:
- `appInfo`: Application information object
- `legalUrls`: Legal document URLs

**Optional Props**:
- `faqData`: FAQ data
- `config`: Settings configuration
- `showUserProfile`: Show user profile header
- `userProfile`: User profile data
- `additionalScreens`: Additional screens to add
- `devSettings`: Dev settings configuration
- `customSections`: Custom settings sections

### Screen Wrappers

**SettingsScreenWrapper**: Wraps main settings screen with configuration
**LegalScreenWrapper**: Wraps legal screens with content and styling
**AboutScreenWrapper**: Wraps about screen with app information

### Navigation Utilities

**useNavigationHandlers**: Hook for managing navigation handlers
**createScreenOptions**: Utility for creating screen options
**createNotificationTranslations**: Utility for notification translations

## Related Components

- **Presentation Screens**: Screen components
- **Navigation Hooks**: Custom navigation hooks
- **React Navigation**: Official React Navigation documentation
