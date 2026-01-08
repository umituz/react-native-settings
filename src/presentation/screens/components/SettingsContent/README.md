# Settings Content

## Purpose

Main content composer component that orchestrates all sections of the settings screen including profile, features, identity, support, and footer.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/SettingsContent/SettingsContent.tsx`

## Strategy

1. **Section Orchestration**: Manages rendering of all settings sections in defined order
2. **Feature Flags**: Uses feature flags to control section visibility
3. **Empty State**: Gracefully handles configuration with no enabled features
4. **Custom Sections**: Supports app-specific custom sections
5. **Footer Integration**: Includes app version and build information footer

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT manually render sections individually (use SettingsContent for all)
- ❌ DO NOT bypass normalized config system
- ❌ DO NOT modify section order after initial render

### NEVER
- ❌ NEVER pass non-normalized config to SettingsContent
- ❌ NEVER use SettingsContent without feature detection
- ❌ NEVER hardcode section visibility

### AVOID
- ❌ AVOID showing too many sections at once (impacts performance)
- ❌ AVOID frequent re-renders by keeping config stable
- ❌ AVOID mixing concerns (keep section logic in section components)

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS normalize config before passing to SettingsContent
- ✅ ALWAYS use feature flags to control visibility
- ✅ ALWAYS provide feature flags from useFeatureDetection hook
- ✅ MUST handle empty state when no features are enabled

### MUST
- ✅ MUST maintain section order: Profile → Custom → Features → Identity → Support → Footer
- ✅ MUST memoize section components for performance
- ✅ MUST provide translation function via context or props

### SHOULD
- ✅ SHOULD keep sections focused on specific feature groups
- ✅ SHOULD use custom sections for app-specific features
- ✅ SHOULD test with various feature combinations

## AI Agent Guidelines

1. **File Reference**: When modifying content structure, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/SettingsContent/SettingsContent.tsx`
2. **Config Normalization**: Always call `normalizeSettingsConfig()` before passing to component
3. **Feature Detection**: Always use `useFeatureDetection()` hook to generate feature flags
4. **Performance**: Component uses useMemo to prevent unnecessary recalculations
5. **Empty State**: Provide meaningful empty state message via translation key `settings.noOptionsAvailable`

## Component Reference

Sub-components managed:
- **ProfileSectionLoader**: User profile header (conditional)
- **CustomSettingsList**: App-specific custom sections
- **FeatureSettingsSection**: Appearance, Language, Notifications
- **IdentitySettingsSection**: About, Legal
- **SupportSettingsSection**: Feedback, Rating, FAQs
- **SettingsFooter**: App version and build info

Related:
- **SettingsScreen**: Main screen component
- **SettingsHeader**: Header component
- **useFeatureDetection**: Hook for feature detection
