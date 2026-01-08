# Settings Screen Hooks

## Purpose

Custom React hooks for settings screen feature detection, configuration normalization, and navigation management.

## File Paths

- **Feature Detection**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/hooks/useFeatureDetection.ts`
- **Config Utils**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/utils/normalizeConfig.ts`

## Strategy

1. **Auto Detection**: Automatically detects available screens based on navigation state
2. **Config Normalization**: Converts various config formats to consistent structure
3. **Feature Flags**: Generates boolean flags for each feature based on config and availability
4. **Performance Optimization**: Uses useMemo to prevent unnecessary recalculations
5. **Service Integration**: Checks for required services (e.g., notifications)

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use raw config without normalizing first
- ❌ DO NOT bypass feature detection for dynamic features
- ❌ DO NOT mutate normalized config objects

### NEVER
- ❌ NEVER hardcode feature availability (use detection)
- ❌ NEVER use feature flags without first normalizing config
- ❌ NEVER rely on auto-detection for must-show features

### AVOID
- ❌ AVOID changing config structure after normalization
- ❌ AVOID unnecessary hook re-renders by keeping dependencies stable
- ❌ AVOID mixing auto-detection with explicit booleans inconsistently

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS normalize config before passing to components or hooks
- ✅ ALWAYS use useFeatureDetection for dynamic features
- ✅ ALWAYS provide stable navigation reference to hooks
- ✅ MUST use memoization for performance optimization

### MUST
- ✅ MUST check navigation state for screen availability
- ✅ MUST respect explicit enabled/disabled flags in config
- ✅ MUST provide service availability for features that require it

### SHOULD
- ✅ SHOULD use 'auto' for features that should be conditionally shown
- ✅ SHOULD use boolean for must-show/must-hide features
- ✅ SHOULD keep feature detection logic in hooks, not components

## AI Agent Guidelines

1. **File Reference**: When modifying feature detection, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/hooks/useFeatureDetection.ts`
2. **Normalization**: Always call `normalizeSettingsConfig()` before using config
3. **Feature Types**: Understand three config types: boolean (true/false), 'auto' (detect), or object (advanced)
4. **Navigation Checks**: Auto-detection checks if screen exists in navigation stack
5. **Service Checks**: Some features (notifications) require service availability checks

## Hook Reference

### useFeatureDetection

**Purpose**: Detects which features should be shown based on config and navigation state

**Parameters**:
- `normalizedConfig`: Normalized configuration object
- `navigation`: React Navigation object
- `options`: Detection options (e.g., notificationServiceAvailable)

**Returns**: FeatureFlags object with boolean flags for each feature

**Usage**: Use in SettingsScreen or SettingsContent to control section visibility

### normalizeSettingsConfig

**Purpose**: Converts raw config to normalized format with enabled flags and config objects

**Parameters**:
- `config`: Raw SettingsConfig object

**Returns**: NormalizedConfig with consistent structure

**Usage**: Always call before passing config to components or hooks

## Related Components

- **SettingsScreen**: Main screen that uses these hooks
- **SettingsContent**: Content component that uses feature flags
- **Navigation Utils**: Helper functions for navigation checks
