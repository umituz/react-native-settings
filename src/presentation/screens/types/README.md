# Settings Screen Types

## Purpose

TypeScript type definitions for settings screen configuration, components, and utilities.

## File Paths

- **Base Types**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/BaseTypes.ts`
- **Content Config**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/ContentConfig.ts`
- **User Features**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/UserFeatureConfig.ts`
- **Custom Sections**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/CustomSection.ts`
- **Settings Config**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/SettingsConfig.ts`
- **Index**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/index.ts`

## Strategy

1. **Type Safety**: Provides comprehensive TypeScript types for all settings functionality
2. **Config Validation**: Ensures configuration objects are properly typed
3. **Modular Organization**: Separates types by feature domain
4. **Reusability**: Exports types for use across the application
5. **Documentation**: Types serve as inline documentation

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use `any` type for configuration objects
- ❌ DO NOT bypass type checking with type assertions
- ❌ DO NOT create duplicate type definitions

### NEVER
- ❌ NEVER use config objects without proper typing
- ❌ NEVER assume optional properties exist without checking
- ❌ NEVER mix config types (e.g., pass AppearanceConfig where LanguageConfig expected)

### AVOID
- ❌ AVOID creating overly complex nested types
- ❌ AVOID circular type dependencies
- ❌ AVOID type definitions that don't match actual usage

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use proper TypeScript types for config objects
- ✅ ALWAYS use type guards for checking config object types
- ✅ MUST provide type exports for public API
- ✅ MUST keep types in sync with actual usage

### MUST
- ✅ MUST use FeatureVisibility type for feature enablement
- ✅ MUST validate config at runtime when needed
- ✅ MUST use proper generics for reusable types

### SHOULD
- ✅ SHOULD use type aliases for common patterns
- ✅ SHOULD document complex types with comments
- ✅ SHOULD keep types simple and focused

## AI Agent Guidelines

1. **File Reference**: When modifying types, refer to files in `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/types/`
2. **Type Safety**: Always use types from this module, never create inline types
3. **FeatureVisibility**: Understand the three values: true (enabled), false (disabled), 'auto' (detect)
4. **Type Guards**: Use type guards to safely check config object types
5. **Exports**: Import types from the main index file for consistency

## Type Reference

### Core Types

**FeatureVisibility**: `boolean | 'auto'`
- true: Always show feature
- false: Never show feature
- 'auto': Automatically detect based on navigation

**SettingsConfig**: Main configuration interface with all features
- Supports boolean, 'auto', or object config for each feature

**NormalizedConfig**: Normalized structure with enabled flags and config objects
- Consistent format for all features
- Used internally after normalization

### Feature Config Types

**AppearanceConfig**: Appearance settings configuration
**LanguageConfig**: Language selection configuration
**NotificationsConfig**: Notification settings configuration
**AboutConfig**: About screen configuration
**LegalConfig**: Legal screen configuration

### User Feature Types

**UserProfileConfig**: User profile display configuration
**FeedbackConfig**: Feedback functionality configuration
**RatingConfig**: App rating prompt configuration
**FAQConfig**: FAQ section configuration
**SubscriptionConfig**: Subscription/upgrade configuration
**WalletConfig**: Wallet settings configuration

### Custom Types

**CustomSettingsSection**: Custom section definition
**CustomSettingsItem**: Custom item within a section

## Related Components

- **normalizeSettingsConfig**: Uses these types for normalization
- **SettingsScreen**: Uses these types for props
- **useFeatureDetection**: Uses these types for feature flags
