# Settings Repository

Repository implementation for settings data persistence using `@umituz/react-native-storage`.

## Features

- **Data Persistence**: Stores and retrieves user settings
- **Automatic Defaults**: Creates default settings for new users
- **Type Safety**: Full TypeScript support
- **Error Handling**: Comprehensive error catching
- **Storage Integration**: Uses storage repository
- **Performance**: Optimized for frequent reads

## Installation

This repository is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```typescript
import { SettingsRepository } from '@umituz/react-native-settings';

const repository = new SettingsRepository();

// Get settings
const settings = await repository.get('user123');

// Update settings
const updated = await repository.update('user123', {
  theme: 'dark',
  language: 'tr-TR',
});

// Reset settings
const defaults = await repository.reset('user123');
```

### With Custom Storage

```typescript
import { StorageRepository } from '@umituz/react-native-storage';

const storage = new StorageRepository();
const repository = new SettingsRepository(storage);

const settings = await repository.get('user123');
```

## Methods

### get(userId: string): Promise<UserSettings>

Retrieves settings for a user. Creates defaults if not found.

```typescript
const settings = await repository.get('user123');

console.log(settings.theme);        // 'light' | 'dark' | 'auto'
console.log(settings.language);     // 'en-US'
console.log(settings.notificationsEnabled); // true
```

**Returns**: Complete UserSettings object.

**Example**:

```typescript
async function loadSettings(userId: string) {
  try {
    const settings = await repository.get(userId);
    return settings;
  } catch (error) {
    console.error('Failed to load settings:', error);
    throw error;
  }
}
```

### update(userId: string, updates: Partial<UserSettings>): Promise<UserSettings>

Updates settings for a user.

```typescript
const updated = await repository.update('user123', {
  theme: 'dark',
  notificationsEnabled: false,
});

console.log(updated.theme); // 'dark'
```

**Returns**: Updated complete UserSettings object.

**Example**:

```typescript
async function updateTheme(userId: string, theme: 'light' | 'dark') {
  try {
    const updated = await repository.update(userId, { theme });
    return updated;
  } catch (error) {
    console.error('Failed to update theme:', error);
    throw error;
  }
}
```

### reset(userId: string): Promise<UserSettings>

Resets settings to default values.

```typescript
const defaults = await repository.reset('user123');

console.log(defaults.theme);        // 'light' (default)
console.log(defaults.language);     // 'en-US' (default)
```

**Returns**: Default UserSettings object.

**Example**:

```typescript
async function clearUserData(userId: string) {
  try {
    const defaults = await repository.reset(userId);
    return defaults;
  } catch (error) {
    console.error('Failed to reset settings:', error);
    throw error;
  }
}
```

## Data Structure

### UserSettings

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
  quietHoursEnabled: boolean;          // Quiet hours feature
  quietHoursStart: string;             // Start time (HH:MM format)
  quietHoursEnd: string;               // End time (HH:MM format)
}
```

### Storage Format

Settings are stored in the following format:

```typescript
{
  "settings:user123": {
    "userId": "user123",
    "theme": "dark",
    "language": "tr-TR",
    "notificationsEnabled": true,
    "emailNotifications": true,
    "pushNotifications": true,
    "soundEnabled": true,
    "vibrationEnabled": true,
    "quietHoursEnabled": false,
    "quietHoursStart": "22:00",
    "quietHoursEnd": "08:00"
  }
}
```

## Default Values

### Default Settings

```typescript
const defaultSettings: UserSettings = {
  userId: '',
  theme: 'auto',
  language: 'en-US',
  notificationsEnabled: true,
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
};
```

### Applying Defaults

```typescript
function applyDefaults(
  userId: string,
  existing?: Partial<UserSettings>
): UserSettings {
  return {
    ...defaultSettings,
    userId,
    ...existing,
  };
}
```

## Storage Keys

### Key Format

```typescript
function getStorageKey(userId: string): string {
  return `settings:${userId}`;
}
```

**Examples**:

```typescript
getStorageKey('user123'); // 'settings:user123'
getStorageKey('admin');   // 'settings:admin'
```

## Error Handling

### Storage Errors

```typescript
try {
  const settings = await repository.get('user123');
} catch (error) {
  if (error.code === 'STORAGE_ERROR') {
    console.error('Storage operation failed:', error.message);
  } else if (error.code === 'NETWORK_ERROR') {
    console.error('Network error:', error.message);
  } else {
    console.error('Unknown error:', error.message);
  }
}
```

### Error Types

```typescript
enum SettingsErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  STORAGE_ERROR = 'STORAGE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

class SettingsRepositoryError extends Error {
  constructor(
    message: string,
    public code: SettingsErrorCode,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'SettingsRepositoryError';
  }
}
```

## Performance

### Optimized Reads

```typescript
class SettingsRepository {
  private cache = new Map<string, UserSettings>();

  async get(userId: string): Promise<UserSettings> {
    // Check cache first
    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    // Load from storage
    const settings = await this.loadFromStorage(userId);

    // Cache result
    this.cache.set(userId, settings);

    return settings;
  }

  async update(
    userId: string,
    updates: Partial<UserSettings>
  ): Promise<UserSettings> {
    const settings = await this.get(userId);

    const updated = {
      ...settings,
      ...updates,
    };

    // Save to storage
    await this.saveToStorage(userId, updated);

    // Update cache
    this.cache.set(userId, updated);

    return updated;
  }

  invalidateCache(userId?: string): void {
    if (userId) {
      this.cache.delete(userId);
    } else {
      this.cache.clear();
    }
  }
}
```

## Migrations

### Schema Versioning

```typescript
interface SettingsSchema {
  version: number;
  settings: UserSettings;
}

async function migrateSettings(
  oldVersion: number,
  newVersion: number,
  settings: any
): Promise<UserSettings> {
  if (oldVersion === 1 && newVersion === 2) {
    // Migration from v1 to v2
    return {
      ...settings,
      newField: defaultSettings.newField,
    };
  }

  return settings;
}
```

### Running Migrations

```typescript
class SettingsRepository {
  private readonly CURRENT_VERSION = 2;

  async get(userId: string): Promise<UserSettings> {
    const stored = await storage.get(`settings:${userId}`);

    if (!stored) {
      return this.createDefaults(userId);
    }

    // Check version
    if (stored.version < this.CURRENT_VERSION) {
      return this.migrate(stored);
    }

    return stored.settings;
  }

  private async migrate(stored: any): Promise<UserSettings> {
    const settings = await migrateSettings(
      stored.version,
      this.CURRENT_VERSION,
      stored.settings
    );

    // Save migrated settings
    await this.saveToStorage(stored.userId, settings);

    return settings;
  }
}
```

## Testing

### Mock Repository

```typescript
class MockSettingsRepository implements ISettingsRepository {
  private storage = new Map<string, UserSettings>();

  async get(userId: string): Promise<UserSettings> {
    if (!this.storage.has(userId)) {
      const defaults = applyDefaults(userId);
      this.storage.set(userId, defaults);
    }
    return this.storage.get(userId)!;
  }

  async update(
    userId: string,
    updates: Partial<UserSettings>
  ): Promise<UserSettings> {
    const current = await this.get(userId);
    const updated = { ...current, ...updates };
    this.storage.set(userId, updated);
    return updated;
  }

  async reset(userId: string): Promise<UserSettings> {
    const defaults = applyDefaults(userId);
    this.storage.set(userId, defaults);
    return defaults;
  }

  clear(): void {
    this.storage.clear();
  }
}
```

### Usage in Tests

```typescript
describe('SettingsService', () => {
  let repository: MockSettingsRepository;
  let service: SettingsService;

  beforeEach(() => {
    repository = new MockSettingsRepository();
    service = new SettingsService(repository);
  });

  afterEach(() => {
    repository.clear();
  });

  it('should return default settings for new user', async () => {
    const settings = await repository.get('new-user');

    expect(settings.theme).toBe('auto');
    expect(settings.language).toBe('en-US');
  });

  it('should update settings', async () => {
    await repository.update('user123', { theme: 'dark' });

    const settings = await repository.get('user123');
    expect(settings.theme).toBe('dark');
  });
});
```

## Best Practices

1. **Defaults**: Always provide defaults for new users
2. **Validation**: Validate data before storage
3. **Error Handling**: Handle storage errors gracefully
4. **Caching**: Cache frequently accessed settings
5. **Type Safety**: Use TypeScript for type checking
6. **Immutability**: Don't mutate stored objects
7. **Migrations**: Handle schema changes gracefully

## Related

- **Settings Service**: Business logic layer
- **Application Layer**: Interface definitions
- **Storage Package**: Data persistence

## License

MIT
