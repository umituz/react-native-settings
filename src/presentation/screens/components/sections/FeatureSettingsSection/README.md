# Feature Settings Section

Section component that displays appearance, language, and notification settings in the main settings screen.

## Purpose

Provides a unified section component that aggregates multiple feature-related settings (appearance, language, notifications) into a single, configurable display area with conditional rendering based on feature flags.

## File Paths

```
src/presentation/screens/components/sections/FeatureSettingsSection/
├── index.ts                    # Main section component
└── README.md                   # This file
```

## Strategy

1. **Conditional Rendering**: Show only enabled features based on feature flags
2. **Composition**: Compose multiple domain-specific sections into one
3. **Configuration Driven**: Use normalized config to determine section behavior
4. **Feature Detection**: Automatically detect available features
5. **Internationalization**: Full i18n support for all text

## Restrictions

### DO NOT

- ❌ DO NOT hardcode feature visibility; use feature flags
- ❌ DO NOT mix concerns; delegate to domain sections
- ❌ DO NOT assume all features are enabled
- ❌ DO NOT include business logic in this component
- ❌ DO NOT duplicate section implementations

### NEVER

- ❌ NEVER bypass feature detection
- ❌ EVER hardcode navigation routes
- ❌ EVER assume config is always valid
- ❌ EVER render sections that are disabled

### AVOID

- ❌ AVOID complex state management; lift to parent
- ❌ AVOID deep component nesting
- ❌ AVOID duplicating translation keys
- ❌ AVOID tight coupling to specific domains

## Rules

### ALWAYS

- ✅ ALWAYS normalize config before passing to sections
- ✅ ALWAYS use feature detection for conditional rendering
- ✅ ALWAYS provide translation keys for all text
- ✅ ALWAYS respect feature flags
- ✅ ALWAYS delegate to domain-specific components

### MUST

- ✅ MUST validate config before rendering
- ✅ MUST handle missing features gracefully
- ✅ MUST provide navigation for interactive items
- ✅ MUST maintain consistent styling

### SHOULD

- ✅ SHOULD use lazy loading for sections
- ✅ SHOULD provide loading states
- ✅ SHOULD handle errors gracefully
- ✅ SHOULD maintain consistent spacing

## AI Agent Guidelines

1. **When adding new features**: Add feature detection and conditional rendering
2. **When modifying layout**: Maintain consistent spacing and alignment
3. **When updating translations**: Add all required translation keys
4. **When debugging**: Check feature flags and normalized config
5. **When adding sections**: Follow existing section composition pattern

## Component Reference

### FeatureSettingsSection

Main section component that displays multiple feature settings.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/FeatureSettingsSection/index.tsx`

**Props**:
- `normalizedConfig: NormalizedConfig` - Normalized settings configuration
- `features: FeatureFlags` - Feature visibility flags

**Sub-Components**:
- AppearanceSection (if features.appearance)
- Language Selection (if features.language)
- NotificationsSection (if features.notifications)

## Feature Detection

Features are detected using `useFeatureDetection` hook:
- Returns: `{ appearance: boolean, language: boolean, notifications: boolean }`
- Checks config availability and route definitions

## Configuration Structure

### NormalizedConfig

```typescript
interface NormalizedConfig {
  appearance?: { config: AppearanceConfig };
  language?: { config: LanguageConfig };
  notifications?: { config: NotificationsConfig };
}
```

### FeatureFlags

```typescript
interface FeatureFlags {
  appearance: boolean;
  language: boolean;
  notifications: boolean;
}
```

## Best Practices

1. **Normalize Config**: Always normalize config before passing
2. **Feature Detection**: Use feature detection for conditional rendering
3. **Translation Keys**: Provide all required translation keys
4. **Navigation Routes**: Define custom routes for language selection
5. **Feature Flags**: Use feature flags to control visibility
6. **Lazy Loading**: Load sections only when needed

## License

MIT
