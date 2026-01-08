# Settings Screen Utilities

## Purpose

Utility functions for normalizing settings configuration, detecting features, and managing screen state.

## File Paths

- **Config Normalization**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/utils/normalizeConfig.ts`

## Strategy

1. **Config Normalization**: Converts various config formats to consistent structure
2. **Feature Visibility**: Handles boolean, 'auto', and object config types
3. **Default Values**: Provides sensible defaults for all features
4. **Type Safety**: Ensures type safety through TypeScript
5. **Flexibility**: Supports simple and advanced configuration patterns

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use raw config values without normalizing
- ❌ DO NOT modify normalized config objects after creation
- ❌ DO NOT assume config structure (always normalize first)

### NEVER
- ❌ NEVER rely on implicit undefined behavior in config
- ❌ NEVER bypass normalization for "simple" configs
- ❌ NEVER use hardcoded default values in components

### AVOID
- ❌ AVOID creating multiple normalization functions for same purpose
- ❌ AVOID mixing normalized and non-normalized config
- ❌ AVOID changing normalization logic frequently

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS normalize config before passing to components
- ✅ ALWAYS use normalized config for feature detection
- ✅ MUST treat normalized config as immutable
- ✅ MUST provide defaults for all features

### MUST
- ✅ MUST handle boolean, 'auto', and object config types
- ✅ MUST preserve advanced config options in normalization
- ✅ MUST use TypeScript types for type safety

### SHOULD
- ✅ SHOULD normalize once and pass to multiple consumers
- ✅ SHOULD use 'auto' for conditionally shown features
- ✅ SHOULD keep normalization logic centralized

## AI Agent Guidelines

1. **File Reference**: When modifying normalization logic, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/utils/normalizeConfig.ts`
2. **Config Types**: Understand three input types: boolean (true/false), 'auto' (detect), or object (advanced config)
3. **Default Strategy**: Most features default to 'auto', some to false (userProfile, subscription, etc.)
4. **Immutable Pattern**: Never mutate normalized config, create new objects if needed
5. **Type Safety**: Leverage TypeScript for compile-time checking

## Utility Reference

### normalizeSettingsConfig

**Purpose**: Converts raw config to normalized format

**Parameters**:
- `config`: Raw SettingsConfig (boolean | 'auto' | object values)

**Returns**: NormalizedConfig with enabled flags and config objects

**Output Structure**:
```typescript
{
  appearance: { enabled: boolean, config?: AppearanceConfig },
  language: { enabled: boolean, config?: LanguageConfig },
  // ... other features
}
```

### normalizeConfigValue

**Purpose**: Normalizes a single config value

**Parameters**:
- `value`: FeatureVisibility | ConfigObject | undefined
- `defaultValue`: Default enabled state

**Returns**: { enabled: boolean, config?: ConfigObject }

**Usage**: Use for normalizing individual feature configs

## Related Components

- **useFeatureDetection**: Hook that uses normalized config
- **SettingsScreen**: Screen that uses normalized config
- **SettingsContent**: Content component that requires normalized config
