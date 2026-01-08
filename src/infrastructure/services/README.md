# Settings Service

Service layer for settings management including business logic, validation, and orchestration of repository operations.

## Purpose

Provides high-level business logic for settings management, encapsulating validation, defaults management, and data transformation. The service layer sits between the presentation layer and the repository layer.

## File Paths

```
src/infrastructure/services/
└── SettingsService.ts    # Main settings service
```

## Strategy

1. **Business Logic Encapsulation**: Contain all settings-related business rules
2. **Validation**: Validate settings before persistence
3. **Defaults Management**: Handle default value logic consistently
4. **Data Transformation**: Transform data between layers
5. **Error Handling**: Provide consistent error handling across operations

## Restrictions

### DO NOT

- ❌ DO NOT include UI-specific logic in services
- ❌ DO NOT access storage directly; use repositories
- ❌ DO NOT bypass validation for any reason
- ❌ DO NOT swallow errors without proper handling
- ❌ DO NOT create circular dependencies with repositories

### NEVER

- ❌ NEVER save invalid data to storage
- ❌ EVER return partial results without proper error indication
- ❌ EVER assume data exists without checking
- ❌ EVER expose internal storage format

### AVOID

- ❌ AVOID creating services that are too broad
- ❌ AVOID mixing concerns (validation + persistence + presentation)
- ❌ AVOID synchronous operations that could block
- ❌ AVOID inconsistent error handling

## Rules

### ALWAYS

- ✅ ALWAYS validate settings before saving
- ✅ ALWAYS apply defaults for missing values
- ✅ ALWAYS handle errors consistently
- ✅ ALWAYS return typed results
- ✅ ALWAYS use repositories for persistence

### MUST

- ✅ MUST validate all inputs
- ✅ MUST provide default values
- ✅ MUST handle storage errors
- ✅ MUST maintain data integrity

### SHOULD

- ✅ SHOULD provide clear error messages
- ✅ SHOULD use immutable operations
- ✅ SHOULD cache frequently accessed settings
- ✅ SHOULD log important operations

## AI Agent Guidelines

1. **When adding validation**: Provide clear error messages for invalid data
2. **When handling defaults**: Apply defaults consistently across all operations
3. **When transforming data**: Keep transformations pure and predictable
4. **When handling errors**: Transform technical errors into domain errors
5. **When adding methods**: Follow existing patterns for consistency

## Service Reference

### SettingsService

Main service for settings management with validation, defaults, and transformation.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/infrastructure/services/SettingsService.ts`

**Methods**:
- `getSettings(userId: string): Promise<UserSettings>` - Get user settings with defaults
- `updateSettings(userId: string, updates: Partial<UserSettings>): Promise<UserSettings>` - Update with validation
- `resetSettings(userId: string): Promise<UserSettings>` - Reset to defaults
- `validateSettings(settings: Partial<UserSettings>): void` - Validate and throw on error
- `mergeSettings(base: UserSettings, updates: Partial<UserSettings>): UserSettings>` - Merge settings

## Default Values

**theme**: `'auto'` - Follow system theme
**language**: `'en-US'` - English (United States)
**notificationsEnabled**: `true` - Notifications on
**emailNotifications**: `true` - Email notifications on
**pushNotifications**: `true` - Push notifications on
**soundEnabled**: `true` - Sound on
**vibrationEnabled**: `true` - Vibration on

## Validation Rules

**Theme**: Must be 'light', 'dark', or 'auto'
**Language**: Must match format 'xx-XX' (e.g., 'en-US')
**Booleans**: Must be boolean type, not string/number
**Required Fields**: Cannot be empty or undefined

## Best Practices

1. **Validation**: Always validate before persistence
2. **Defaults**: Apply defaults for missing values
3. **Error Handling**: Provide clear error messages
4. **Type Safety**: Use TypeScript throughout
5. **Immutability**: Return new objects, don't mutate
6. **Caching**: Cache frequently accessed settings
7. **Logging**: Log important operations

## License

MIT
