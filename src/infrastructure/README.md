# Infrastructure Layer

The infrastructure layer provides concrete implementations of the interfaces defined in the application layer, handling data persistence and external service integrations.

## Architecture

```
infrastructure/
├── repositories/
│   └── SettingsRepository.ts         # Settings storage implementation
└── services/
    └── SettingsService.ts            # Settings business logic service
```

## Components

### SettingsRepository

Concrete implementation of `ISettingsRepository` using `@umituz/react-native-storage` for data persistence.

#### Features

- **Automatic Defaults**: Creates default settings for new users
- **Type Safety**: Full TypeScript support
- **Error Handling**: Comprehensive error catching and reporting
- **Storage Integration**: Uses storage repository for persistence

#### Usage

```typescript
import { SettingsRepository } from '@umituz/react-native-settings';

const repository = new SettingsRepository();

// Get settings
const result = await repository.getSettings('user123');
if (result.success) {
  console.log(result.data?.theme); // 'auto'
}

// Save settings
await repository.saveSettings({
  userId: 'user123',
  theme: 'dark',
  language: 'en-US',
  // ... other settings
});

// Delete settings
await repository.deleteSettings('user123');
```

#### Implementation Details

**getSettings(userId):**

1. Creates storage key from user ID
2. Attempts to retrieve from storage
3. Returns defaults if not found
4. Saves defaults for next time
5. Returns error on failure

```typescript
const storageKey = createUserKey(StorageKey.USER_PREFERENCES, userId);
const defaults = this.defaultSettings(userId);
const result = await storageRepository.getItem<UserSettings>(storageKey, defaults);

if (!result.success) {
  await this.saveSettings(defaults);
  return { success: true, data: defaults };
}

return { success: true, data: result.data || defaults };
```

**saveSettings(settings):**

1. Creates storage key from user ID
2. Saves settings to storage
3. Returns success or error

```typescript
const storageKey = createUserKey(StorageKey.USER_PREFERENCES, settings.userId);
const result = await storageRepository.setItem(storageKey, settings);

if (!result.success) {
  return {
    success: false,
    error: {
      code: 'SAVE_SETTINGS_FAILED',
      message: 'Failed to save settings to storage',
    },
  };
}

return { success: true };
```

**deleteSettings(userId):**

1. Creates storage key from user ID
2. Removes from storage
3. Returns success or error

```typescript
const storageKey = createUserKey(StorageKey.USER_PREFERENCES, userId);
const result = await storageRepository.removeItem(storageKey);

return result.success
  ? { success: true }
  : {
      success: false,
      error: {
        code: 'DELETE_SETTINGS_FAILED',
        message: 'Failed to delete settings',
      },
    };
```

### SettingsService

Business logic service for high-level settings operations.

#### Usage

```typescript
import { SettingsService } from '@umituz/react-native-settings';

const service = new SettingsService(repository);

// Initialize settings for new user
await service.initializeUser('user123');

// Update specific settings
await service.updateTheme('user123', 'dark');
await service.updateLanguage('user123', 'tr-TR');

// Reset to defaults
await service.resetToDefaults('user123');
```

## Storage Integration

### Storage Keys

The repository uses the following storage keys:

```typescript
enum StorageKey {
  USER_PREFERENCES = 'user_preferences',  // Main settings storage
}
```

### Storage Format

Settings are stored as JSON:

```json
{
  "userId": "user123",
  "theme": "dark",
  "language": "en-US",
  "notificationsEnabled": true,
  "emailNotifications": true,
  "pushNotifications": false,
  "soundEnabled": true,
  "vibrationEnabled": false,
  "privacyMode": false,
  "disclaimerAccepted": true,
  "updatedAt": "2025-01-08T10:30:00.000Z"
}
```

## Default Settings

When creating new settings, these defaults are used:

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

```typescript
// Success case
{ success: true, data: settings }

// Error case
{
  success: false,
  error: {
    code: 'GET_SETTINGS_FAILED',
    message: 'Detailed error message'
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `GET_SETTINGS_FAILED` | Failed to retrieve settings |
| `SAVE_SETTINGS_FAILED` | Failed to save settings |
| `DELETE_SETTINGS_FAILED` | Failed to delete settings |

## Examples

### Custom Repository Implementation

```typescript
import type { ISettingsRepository, UserSettings, SettingsResult } from '@umituz/react-native-settings';

class AsyncStorageRepository implements ISettingsRepository {
  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    try {
      const key = `settings_${userId}`;
      const json = await AsyncStorage.getItem(key);

      if (!json) {
        return {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Settings not found' },
        };
      }

      const data = JSON.parse(json);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'GET_SETTINGS_FAILED',
          message: error.message,
        },
      };
    }
  }

  async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
    try {
      const key = `settings_${settings.userId}`;
      const json = JSON.stringify(settings);
      await AsyncStorage.setItem(key, json);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SAVE_SETTINGS_FAILED',
          message: error.message,
        },
      };
    }
  }

  async deleteSettings(userId: string): Promise<SettingsResult<void>> {
    try {
      const key = `settings_${userId}`;
      await AsyncStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'DELETE_SETTINGS_FAILED',
          message: error.message,
        },
      };
    }
  }
}
```

### Using Custom Repository

```typescript
import { useSettings } from '@umituz/react-native-settings';

// Provide custom repository to your app
const customRepository = new AsyncStorageRepository();

function App() {
  return (
    <SettingsProvider repository={customRepository}>
      <MyApp />
    </SettingsProvider>
  );
}
```

### Migration Handler

```typescript
class MigrationSettingsRepository implements ISettingsRepository {
  constructor(private baseRepository: ISettingsRepository) {}

  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    const result = await this.baseRepository.getSettings(userId);

    if (result.success && result.data) {
      // Migration: Add new fields
      const migrated = this.migrateSettings(result.data);
      if (migrated !== result.data) {
        await this.saveSettings(migrated);
        return { success: true, data: migrated };
      }
    }

    return result;
  }

  private migrateSettings(settings: UserSettings): UserSettings {
    // Add new field with default
    if (!('newField' in settings)) {
      return { ...settings, newField: defaultValue };
    }
    return settings;
  }

  // Delegate other methods
  async saveSettings(settings: UserSettings) {
    return this.baseRepository.saveSettings(settings);
  }

  async deleteSettings(userId: string) {
    return this.baseRepository.deleteSettings(userId);
  }
}
```

### Encrypted Storage

```typescript
import * as SecureStore from 'expo-secure-store';

class SecureSettingsRepository implements ISettingsRepository {
  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    try {
      const key = `secure_settings_${userId}`;
      const json = await SecureStore.getItemAsync(key);

      if (!json) {
        return { success: false, error: { code: 'NOT_FOUND', message: 'Not found' } };
      }

      const data = JSON.parse(json);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: { code: 'GET_SETTINGS_FAILED', message: error.message },
      };
    }
  }

  async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
    try {
      const key = `secure_settings_${settings.userId}`;
      const json = JSON.stringify(settings);
      await SecureStore.setItemAsync(key, json);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: { code: 'SAVE_SETTINGS_FAILED', message: error.message },
      };
    }
  }

  async deleteSettings(userId: string): Promise<SettingsResult<void>> {
    try {
      const key = `secure_settings_${userId}`;
      await SecureStore.deleteItemAsync(key);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: { code: 'DELETE_SETTINGS_FAILED', message: error.message },
      };
    }
  }
}
```

## Testing

### Mock Repository

```typescript
class MockSettingsRepository implements ISettingsRepository {
  private storage: Map<string, UserSettings> = new Map();

  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    const settings = this.storage.get(userId);
    return settings
      ? { success: true, data: settings }
      : { success: false, error: { code: 'NOT_FOUND', message: 'Not found' } };
  }

  async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
    this.storage.set(settings.userId, settings);
    return { success: true };
  }

  async deleteSettings(userId: string): Promise<SettingsResult<void>> {
    this.storage.delete(userId);
    return { success: true };
  }

  // Test helper methods
  clear() {
    this.storage.clear();
  }

  hasSettings(userId: string): boolean {
    return this.storage.has(userId);
  }
}
```

### Test Example

```typescript
import { SettingsRepository } from '@umituz/react-native-settings';

describe('SettingsRepository', () => {
  let repository: SettingsRepository;

  beforeEach(() => {
    repository = new SettingsRepository();
  });

  it('should save and retrieve settings', async () => {
    const settings: UserSettings = {
      userId: 'test123',
      theme: 'dark',
      language: 'en-US',
      notificationsEnabled: true,
      emailNotifications: true,
      pushNotifications: false,
      soundEnabled: true,
      vibrationEnabled: false,
      privacyMode: false,
      disclaimerAccepted: true,
      updatedAt: new Date(),
    };

    const saveResult = await repository.saveSettings(settings);
    expect(saveResult.success).toBe(true);

    const getResult = await repository.getSettings('test123');
    expect(getResult.success).toBe(true);
    expect(getResult.data?.theme).toBe('dark');
  });

  it('should return defaults for new user', async () => {
    const result = await repository.getSettings('newuser');

    expect(result.success).toBe(true);
    expect(result.data?.theme).toBe('auto');
    expect(result.data?.language).toBe('en-US');
  });

  it('should delete settings', async () => {
    await repository.saveSettings({
      userId: 'deleteMe',
      theme: 'light',
      // ... other required fields
    } as any);

    const deleteResult = await repository.deleteSettings('deleteMe');
    expect(deleteResult.success).toBe(true);

    const getResult = await repository.getSettings('deleteMe');
    expect(getResult.data?.theme).toBe('auto'); // Returns defaults
  });
});
```

## Best Practices

1. **Use Repository Interface**: Program to `ISettingsRepository`, not concrete implementation
2. **Handle Errors**: Always check `success` flag
3. **Type Safety**: Use TypeScript types for all operations
4. **Validation**: Validate data before saving
5. **Default Values**: Always provide sensible defaults
6. **Error Messages**: Include detailed, helpful error messages
7. **Testing**: Use mock repositories in tests
8. **Migration**: Handle schema migrations gracefully

## Related

- **Application Layer**: Repository interfaces and types
- **Presentation Hooks**: React hooks for UI integration
- **Storage Package**: `@umituz/react-native-storage`

## License

MIT
