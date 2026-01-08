# Settings Repository

Repository implementation for settings data persistence using storage abstraction.

## Purpose

Provides concrete implementation of the settings repository interface, handling all data persistence operations including CRUD operations, defaults creation, and storage management.

## File Paths

```
src/infrastructure/repositories/
└── SettingsRepository.ts    # Settings repository implementation
```

## Strategy

1. **Interface Implementation**: Implement ISettingsRepository from application layer
2. **Automatic Defaults**: Create defaults for new users automatically
3. **Error Transformation**: Convert storage errors to domain errors
4. **Performance**: Optimize for frequent reads with optional caching
5. **Migration Support**: Handle schema versioning and migrations

## Restrictions

### DO NOT

- ❌ DO NOT include business logic that belongs in services
- ❌ DO NOT expose storage-specific implementation details
- ❌ DO NOT make assumptions about storage backend
- ❌ DO NOT use synchronous operations
- ❌ DO NOT expose raw storage errors to upper layers

### NEVER

- ❌ NEVER return data without applying defaults
- ❌ NEVER assume storage always succeeds
- ❌ EVER bypass storage abstraction
- ❌ EVER cache without invalidation strategy

### AVOID

- ❌ AVOID hardcoding storage keys or formats
- ❌ AVOID tight coupling to specific storage implementation
- ❌ AVOID blocking operations on main thread
- ❌ AVOID ignoring storage capacity limits

## Rules

### ALWAYS

- ✅ ALWAYS implement the full repository interface
- ✅ ALWAYS provide default values for new users
- ✅ ALWAYS handle storage errors gracefully
- ✅ ALWAYS use async/await for I/O operations
- ✅ ALWAYS return typed results

### MUST

- ✅ MUST validate data before storage
- ✅ MUST transform storage errors to domain errors
- ✅ MUST use dependency injection for storage
- ✅ MUST handle concurrent operations safely

### SHOULD

- ✅ SHOULD cache frequently accessed data
- ✅ SHOULD provide migration path for schema changes
- ✅ SHOULD handle storage unavailability
- ✅ SHOULD log storage operations for debugging

## AI Agent Guidelines

1. **When implementing repositories**: Always inject storage dependencies
2. **When handling errors**: Transform technical errors to domain errors
3. **When adding caching**: Implement proper invalidation strategy
4. **When creating defaults**: Match application's expected behavior
5. **When handling migrations**: Ensure backward compatibility

## Repository Reference

### SettingsRepository

Concrete implementation of ISettingsRepository using storage abstraction.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/infrastructure/repositories/SettingsRepository.ts`

**Methods**:
- `get(userId: string): Promise<UserSettings>` - Get with auto-defaults
- `update(userId: string, updates: Partial<UserSettings>): Promise<UserSettings>` - Update settings
- `reset(userId: string): Promise<UserSettings>` - Reset to defaults

## Storage Keys

**Pattern**: `settings:{userId}`
**Example**: `settings:user123`, `settings:admin`

## Data Structure

Settings are stored as JSON containing all user preferences:
- User identification (userId)
- Theme preferences (theme, customColors)
- Localization (language)
- Notifications (enabled, email, push, quietHours)
- Audio (sound, vibration)
- Privacy (privacyMode)
- Legal (disclaimerAccepted)
- Metadata (updatedAt)

## Default Values

**Applied automatically** for new users or when data is missing:
- theme: 'auto'
- language: 'en-US'
- notificationsEnabled: true
- emailNotifications: true
- pushNotifications: true
- soundEnabled: true
- vibrationEnabled: true
- privacyMode: false
- disclaimerAccepted: false

## Error Handling

**Transformed Errors**:
- `NOT_FOUND` - Settings don't exist (returns defaults)
- `STORAGE_ERROR` - Storage operation failed
- `NETWORK_ERROR` - Network communication failed
- `VALIDATION_ERROR` - Data validation failed

## Best Practices

1. **Defaults**: Always provide defaults for new users
2. **Validation**: Validate data before storage
3. **Error Handling**: Handle storage errors gracefully
4. **Caching**: Cache frequently accessed settings
5. **Type Safety**: Use TypeScript for type checking
6. **Immutability**: Don't mutate stored objects
7. **Migrations**: Handle schema changes gracefully

## License

MIT
