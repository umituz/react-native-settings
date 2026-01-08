# Application Layer

Defines the core business logic, interfaces, and types for the settings domain following Domain-Driven Design (DDD) principles.

## Purpose

The application layer serves as the bridge between the presentation and infrastructure layers, defining the contracts that both layers must follow. It contains pure business logic without any dependencies on external frameworks or storage mechanisms.

## File Paths

```
src/application/
└── ports/
    └── ISettingsRepository.ts    # Repository interface and types
```

## Strategy

1. **Interface Segregation**: Define clear, focused interfaces that separate concerns between layers
2. **Type Safety**: Use TypeScript interfaces to ensure compile-time type checking across the entire application
3. **Result Pattern**: Wrap all operations in a Result type for consistent error handling
4. **Dependency Inversion**: High-level modules should not depend on low-level modules; both should depend on abstractions
5. **Domain Independence**: Keep business logic independent of frameworks, databases, and external services

## Restrictions

### DO NOT

- ❌ DO NOT include any implementation details in interfaces
- ❌ DO NOT import or use React Native components
- ❌ DO NOT include storage or persistence logic
- ❌ DO NOT add framework-specific dependencies
- ❌ DO NOT expose raw exceptions; use Result types

### NEVER

- ❌ NEVER couple interfaces to specific storage implementations
- ❌ NEVER change interface signatures without considering backward compatibility
- ❌ NEVER include UI-related types in domain interfaces
- ❌ NEVER use any concrete implementations in type definitions

### AVOID

- ❌ AVOID making interfaces too broad or unfocused
- ❌ AVOID circular dependencies between types
- ❌ AVOID optional properties in core data structures
- ❌ AVOID using primitive types where domain-specific types would be clearer

## Rules

### ALWAYS

- ✅ ALWAYS define interfaces before implementations
- ✅ ALWAYS use Result types for operations that can fail
- ✅ ALWAYS include comprehensive TypeScript documentation comments
- ✅ ALWAYS define error codes as string literals for type safety
- ✅ ALWAYS update timestamps when data changes

### MUST

- ✅ MUST export all public types from index files
- ✅ MUST keep interfaces framework-agnostic
- ✅ MUST validate all inputs at the application boundary
- ✅ MUST provide default values for all optional fields

### SHOULD

- ✅ SHOULD favor composition over inheritance
- ✅ SHOULD keep interfaces focused and single-purpose
- ✅ SHOULD use readonly properties where immutability is important
- ✅ SHOULD provide factory functions for complex object creation

## AI Agent Guidelines

1. **When adding new properties**: Update the UserSettings interface, add validation rules, and provide migration path
2. **When modifying interfaces**: Consider backward compatibility and provide deprecation warnings if needed
3. **When defining error codes**: Use descriptive, action-oriented codes (e.g., 'VALIDATION_ERROR' not 'ERR_001')
4. **When creating Result types**: Always include both success and error states with relevant data
5. **When documenting types**: Include examples of valid usage and common pitfalls

## Core Types Reference

### UserSettings

Main data structure for user settings containing theme, language, notifications, and other preferences.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/application/ports/ISettingsRepository.ts`

### SettingsResult<T>

Result wrapper for settings operations with success flag and optional data/error.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/application/ports/ISettingsRepository.ts`

### SettingsError

Error structure with code and message for structured error handling.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/application/ports/ISettingsRepository.ts`

## Repository Interface

### ISettingsRepository

Contract that all settings repository implementations must follow.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/application/ports/ISettingsRepository.ts`

**Methods**:
- `getSettings(userId: string): Promise<SettingsResult<UserSettings>>`
- `saveSettings(settings: UserSettings): Promise<SettingsResult<void>>`
- `deleteSettings(userId: string): Promise<SettingsResult<void>>`

## Error Handling

All operations return `SettingsResult<T>` type with the following structure:

**Success**: `{ success: true, data: T }`
**Error**: `{ success: false, error: { code: string, message: string } }`

## Common Error Codes

| Code | Description |
|------|-------------|
| `GET_SETTINGS_FAILED` | Failed to retrieve settings |
| `SAVE_SETTINGS_FAILED` | Failed to save settings |
| `DELETE_SETTINGS_FAILED` | Failed to delete settings |
| `INVALID_USER_ID` | Invalid user identifier |
| `VALIDATION_ERROR` | Settings validation failed |
| `NOT_FOUND` | Settings not found for user |
| `STORAGE_ERROR` | Underlying storage error |
| `NETWORK_ERROR` | Network communication error |

## License

MIT
