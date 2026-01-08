# Settings Screen

## Purpose

Main settings screen component with modular architecture for displaying app settings in an organized, user-friendly interface.

## File Paths

- **Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/SettingsScreen.tsx`
- **Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/`
- **Hooks**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/hooks/`
- **Utils**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/utils/`
- **Types**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/`

## Strategy

1. **Modular Architecture**: Composable sections for different feature groups (appearance, language, notifications, etc.)
2. **Configuration-Driven**: Uses configuration object to control which features and sections appear
3. **Feature Detection**: Automatically detects available screens and features
4. **User Profile Integration**: Optional user profile header for authenticated users
5. **Custom Sections**: Support for app-specific settings sections

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT manually manage individual section rendering (use config object)
- ❌ DO NOT hardcode section order or visibility
- ❌ DO NOT bypass the configuration system

### NEVER
- ❌ NEVER wrap SettingsScreen in additional error boundaries (already included)
- ❌ NEVER modify sections directly without updating config
- ❌ NEVER use SettingsScreen for non-settings content

### AVOID
- ❌ AVOID mixing configuration methods (stick to config object)
- ❌ AVOID showing too many sections at once (6-8 maximum recommended)
- ❌ AVOID inconsistent section ordering across different app versions

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use the config prop to control which sections appear
- ✅ ALWAYS normalize config before passing to screen components
- ✅ ALWAYS provide app version in footer for support purposes
- ✅ ALWAYS test with different configuration combinations

### MUST
- ✅ MUST include dev settings in development builds
- ✅ MUST handle empty state gracefully when no features are enabled
- ✅ MUST ensure proper navigation handlers are provided

### SHOULD
- ✅ SHOULD show user profile header for authenticated users
- ✅ SHOULD use custom sections for app-specific settings
- ✅ SHOULD include feature flags for experimental features

## AI Agent Guidelines

1. **File Reference**: When modifying screen behavior, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/SettingsScreen.tsx`
2. **Configuration**: Always use `normalizeSettingsConfig()` before passing config to the screen
3. **Feature Detection**: Use `useFeatureDetection()` hook to automatically detect available features
4. **Custom Sections**: Add app-specific settings via `customSections` prop, not by modifying core sections
5. **Navigation**: Ensure all section press handlers have proper navigation callbacks

## Component Reference

Sub-components:
- **SettingsHeader**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/SettingsHeader/SettingsHeader.tsx`
- **SettingsContent**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/SettingsContent/SettingsContent.tsx`

Related:
- **Core Components**: SettingsItemCard, SettingsSection
- **Feature Sections**: AppearanceSection, IdentitySection, NotificationSection, PrivacySection, SupportSection, AboutSection, LegalSection
