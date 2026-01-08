# Application Layer

The application layer defines the core business logic, interfaces, and types for the settings domain following Domain-Driven Design (DDD) principles.

## Architecture

The application layer serves as the bridge between the presentation and infrastructure layers, defining the contracts that both layers must follow.

```
application/
└── ports/
    └── ISettingsRepository.ts    # Repository interface and types
```

## Core Types

### UserSettings

The main data structure for user settings.

```typescript
interface UserSettings {
  userId: string;                      // Unique user identifier
  theme: 'light' | 'dark' | 'auto';    // Theme preference
  language: string;                    // Language code (e.g., 'en-US')
  notificationsEnabled: boolean;       // Master notification switch
  emailNotifications: boolean;          // Email notification preference
  pushNotifications: boolean;           // Push notification preference
  soundEnabled: boolean;               // Sound effects toggle
  vibrationEnabled: boolean;           // Haptic feedback toggle
  privacyMode: boolean;                // Privacy/screen shield mode
  disclaimerAccepted: boolean;         // Legal disclaimer acceptance
  updatedAt: Date;                     // Last update timestamp
}
```

### SettingsResult

Result wrapper for settings operations.

```typescript
interface SettingsResult<T> {
  success: boolean;                    // Operation success flag
  data?: T;                            // Result data (if successful)
  error?: SettingsError;               // Error details (if failed)
}
```

### SettingsError

Error structure for settings operations.

```typescript
interface SettingsError {
  code: string;                        // Error code for identification
  message: string;                     // Human-readable error message
}
```

## Repository Interface

### ISettingsRepository

The contract that all settings repository implementations must follow.

```typescript
interface ISettingsRepository {
  /**
   * Retrieve settings for a user
   * @param userId - Unique user identifier
   * @returns Promise resolving to settings result
   */
  getSettings(userId: string): Promise<SettingsResult<UserSettings>>;

  /**
   * Save settings for a user
   * @param settings - Complete settings object to save
   * @returns Promise resolving to operation result
   */
  saveSettings(settings: UserSettings): Promise<SettingsResult<void>>;

  /**
   * Delete settings for a user
   * @param userId - Unique user identifier
   * @returns Promise resolving to operation result
   */
  deleteSettings(userId: string): Promise<SettingsResult<void>>;
}
```

## Usage Examples

### Defining a Custom Repository

```typescript
import type { ISettingsRepository, UserSettings, SettingsResult } from '@umituz/react-native-settings';

class CustomSettingsRepository implements ISettingsRepository {
  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    try {
      // Your custom implementation
      const settings = await fetchFromAPI(userId);
      return { success: true, data: settings };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_FAILED',
          message: error.message,
        },
      };
    }
  }

  async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
    // Your implementation
  }

  async deleteSettings(userId: string): Promise<SettingsResult<void>> {
    // Your implementation
  }
}
```

### Using Repository Interface

```typescript
import type { ISettingsRepository } from '@umituz/react-native-settings';

class SettingsService {
  constructor(private repository: ISettingsRepository) {}

  async getUserSettings(userId: string) {
    const result = await this.repository.getSettings(userId);

    if (!result.success) {
      throw new Error(result.error?.message);
    }

    return result.data;
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserSettings>) {
    const current = await this.getUserSettings(userId);
    const updated = { ...current, ...preferences, updatedAt: new Date() };

    return this.repository.saveSettings(updated);
  }
}
```

### Testing with Mock Repository

```typescript
class MockSettingsRepository implements ISettingsRepository {
  private settings: Map<string, UserSettings> = new Map();

  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    const settings = this.settings.get(userId);
    if (!settings) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Settings not found' },
      };
    }
    return { success: true, data: settings };
  }

  async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
    this.settings.set(settings.userId, settings);
    return { success: true };
  }

  async deleteSettings(userId: string): Promise<SettingsResult<void>> {
    this.settings.delete(userId);
    return { success: true };
  }
}

// Usage in tests
const mockRepo = new MockSettingsRepository();
const service = new SettingsService(mockRepo);

await service.updateUserPreferences('user123', { theme: 'dark' });
```

## Default Settings

When no settings exist, the following defaults are used:

```typescript
const defaultSettings: UserSettings = {
  userId: '',
  theme: 'auto',                      // Follow system theme
  language: 'en-US',                  // English (US)
  notificationsEnabled: true,         // Notifications on
  emailNotifications: true,           // Email notifications on
  pushNotifications: true,            // Push notifications on
  soundEnabled: true,                 // Sound on
  vibrationEnabled: true,             // Vibration on
  privacyMode: false,                 // Privacy mode off
  disclaimerAccepted: false,          // Disclaimer not accepted
  updatedAt: new Date(),
};
```

## Error Handling

### Error Codes

Common error codes used throughout the application:

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

### Error Handling Pattern

```typescript
async function handleSettingsOperation<T>(
  operation: () => Promise<SettingsResult<T>>
): Promise<T> {
  const result = await operation();

  if (!result.success) {
    throw new SettingsError(
      result.error?.code || 'UNKNOWN_ERROR',
      result.error?.message || 'An unknown error occurred'
    );
  }

  return result.data!;
}

// Usage
try {
  const settings = await handleSettingsOperation(() =>
    repository.getSettings(userId)
  );
} catch (error) {
  if (error instanceof SettingsError) {
    console.error(`[${error.code}] ${error.message}`);
  }
}
```

## Best Practices

1. **Type Safety**: Always use the defined interfaces
2. **Error Handling**: Check `success` flag before accessing data
3. **Immutability**: Return new objects, don't mutate existing ones
4. **Validation**: Validate settings before saving
5. **Default Values**: Always provide sensible defaults
6. **Timestamp Updates**: Update `updatedAt` on every change
7. **Partial Updates**: Support partial updates when possible
8. **Repository Pattern**: Always program to the interface, not implementation

## Testing Utilities

```typescript
// Test factory for creating test settings
function createTestSettings(overrides?: Partial<UserSettings>): UserSettings {
  return {
    userId: 'test-user',
    theme: 'light',
    language: 'en-US',
    notificationsEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    privacyMode: false,
    disclaimerAccepted: true,
    updatedAt: new Date(),
    ...overrides,
  };
}

// Test factory for creating error results
function createErrorResult<T>(
  code: string,
  message: string
): SettingsResult<T> {
  return {
    success: false,
    error: { code, message },
  };
}

// Test factory for creating success results
function createSuccessResult<T>(data?: T): SettingsResult<T> {
  return {
    success: true,
    data,
  };
}
```

## Integration Points

The application layer integrates with:

- **Presentation Layer**: Provides interfaces for UI components
- **Infrastructure Layer**: Defines contracts for storage implementation
- **Domain Layer**: Contains business logic and entities

## Related

- **Infrastructure**: Repository implementations
- **Presentation Hooks**: React hooks for UI
- **Type Definitions**: Complete type definitions

## License

MIT
