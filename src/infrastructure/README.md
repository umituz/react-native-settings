# Infrastructure Layer

Provides concrete implementations of the interfaces defined in the application layer, handling data persistence and external service integrations.

## Purpose

The infrastructure layer is responsible for all external interactions including storage, network calls, and third-party integrations. It implements the interfaces defined in the application layer and provides concrete implementations for data persistence and retrieval.

## File Paths

```
src/infrastructure/
├── repositories/
│   └── SettingsRepository.ts         # Settings storage implementation
└── services/
    └── SettingsService.ts            # Settings business logic service
```

## Strategy

1. **Interface Implementation**: Implement all interfaces defined in the application layer
2. **Dependency Injection**: Accept dependencies through constructors for testability
3. **Error Transformation**: Convert external errors into domain-specific error types
4. **Default Management**: Automatically create and apply default values for new users
5. **Storage Abstraction**: Use abstract storage interfaces to remain implementation-agnostic

## Restrictions

### DO NOT

- ❌ DO NOT include business logic that belongs in the application layer
- ❌ DO NOT expose storage-specific details to upper layers
- ❌ DO NOT directly access React Native components
- ❌ DO NOT make network calls without proper error handling
- ❌ DO NOT store raw exceptions; transform to domain errors

### NEVER

- ❌ NEVER bypass validation rules when saving data
- ❌ NEVER expose internal storage format to external layers
- ❌ EVER couple to specific storage implementations without abstraction
- ❌ EVER assume data always exists; handle null/undefined cases

### AVOID

- ❌ AVOID hardcoding storage keys or paths
- ❌ AVOID synchronous operations that could block the UI
- ❌ AVOID caching without proper invalidation strategies
- ❌ AVOID exposing implementation details in error messages

## Rules

### ALWAYS

- ✅ ALWAYS implement interfaces from the application layer
- ✅ ALWAYS return Results with proper error handling
- ✅ ALWAYS provide default values for missing data
- ✅ ALWAYS use dependency injection for external services
- ✅ ALWAYS handle storage errors gracefully

### MUST

- ✅ MUST validate data before persistence
- ✅ MUST transform storage errors to domain errors
- ✅ MUST use async/await for all I/O operations
- ✅ MUST ensure thread safety for concurrent operations

### SHOULD

- ✅ SHOULD cache frequently accessed data
- ✅ SHOULD provide retry logic for transient failures
- ✅ SHOULD log all storage operations for debugging
- ✅ SHOULD handle schema migrations gracefully

## AI Agent Guidelines

1. **When implementing repositories**: Always inject storage dependencies and implement the full interface
2. **When handling errors**: Transform technical errors into user-friendly domain errors with actionable messages
3. **When adding caching**: Implement proper cache invalidation and consider cache coherence
4. **When dealing with defaults**: Provide sensible defaults that match the application's expected behavior
5. **When creating migrations**: Ensure backward compatibility and provide migration paths for existing data

## Components Reference

### SettingsRepository

Concrete implementation of `ISettingsRepository` using storage abstraction for data persistence.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/infrastructure/repositories/SettingsRepository.ts`

**Features**:
- Automatic defaults creation for new users
- Full TypeScript type safety
- Comprehensive error catching and reporting
- Storage repository integration

### SettingsService

Business logic service for high-level settings operations.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/infrastructure/services/SettingsService.ts`

**Features**:
- User initialization
- Partial setting updates
- Reset to defaults functionality

## Storage Integration

### Storage Keys

The repository uses the following storage keys:

- `USER_PREFERENCES` - Main settings storage key

### Storage Format

Settings are stored as JSON with all user preferences including theme, language, notifications, and timestamps.

## Default Values

| Setting | Default Value | Description |
|---------|---------------|-------------|
| `theme` | `'auto'` | Follow system theme |
| `language` | `'en-US'` | English (United States) |
| `notificationsEnabled` | `true` | Notifications enabled |
| `emailNotifications` | `true` | Email notifications enabled |
| `pushNotifications` | `true` | Push notifications enabled |
| `soundEnabled` | `true` | Sound effects enabled |
| `vibrationEnabled` | `true` | Haptic feedback enabled |
| `privacyMode` | `false` | Privacy mode disabled |
| `disclaimerAccepted` | `false` | Disclaimer not accepted |

## Error Handling

All repository methods return `SettingsResult<T>`:

**Success case**: `{ success: true, data: settings }`
**Error case**: `{ success: false, error: { code: string, message: string } }`

### Error Codes

| Code | Description |
|------|-------------|
| `GET_SETTINGS_FAILED` | Failed to retrieve settings |
| `SAVE_SETTINGS_FAILED` | Failed to save settings |
| `DELETE_SETTINGS_FAILED` | Failed to delete settings |

## Testing

### Mock Repository Pattern

Create mock implementations for testing that implement `ISettingsRepository`:

1. Use in-memory storage (Map or object)
2. Implement all interface methods
3. Provide test helper methods (clear, hasSettings, etc.)
4. Simulate errors for error handling tests

## License

MIT
