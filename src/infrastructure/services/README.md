# Settings Service

Service layer for settings management including business logic, validation, and orchestration of repository operations.

## Features

- **Business Logic**: Encapsulates settings-related business rules
- **Validation**: Validates settings before persistence
- **Defaults Management**: Handles default value logic
- **Transformation**: Transforms data between layers
- **Error Handling**: Consistent error handling across operations
- **Caching**: Optional caching layer for performance

## Installation

This service is part of `@umituz/react-native-settings`.

## Usage

### Basic Service Usage

```typescript
import { SettingsService } from '@umituz/react-native-settings';

const settingsService = new SettingsService();

// Get user settings
const settings = await settingsService.getSettings('user123');

// Update settings
const updated = await settingsService.updateSettings('user123', {
  theme: 'dark',
  language: 'tr-TR',
});

// Reset settings
const defaults = await settingsService.resetSettings('user123');
```

### With Repository Injection

```typescript
import { SettingsService, ISettingsRepository } from '@umituz/react-native-settings';

const repository: ISettingsRepository = new SettingsRepository();
const settingsService = new SettingsService(repository);

const settings = await settingsService.getSettings('user123');
```

## Methods

### getSettings(userId: string): Promise<UserSettings>

Retrieves settings for a user with defaults applied.

```typescript
const settings = await settingsService.getSettings('user123');

console.log(settings.theme);        // 'light' | 'dark' | 'auto'
console.log(settings.language);     // 'en-US'
console.log(settings.notificationsEnabled); // true
```

**Returns**: Complete UserSettings object with defaults for missing values.

**Example**:

```typescript
async function loadUserSettings(userId: string) {
  try {
    const settings = await settingsService.getSettings(userId);
    applyTheme(settings.theme);
    applyLanguage(settings.language);
    return settings;
  } catch (error) {
    console.error('Failed to load settings:', error);
    throw error;
  }
}
```

### updateSettings(userId: string, updates: Partial<UserSettings>): Promise<UserSettings>

Updates user settings with validation and transformation.

```typescript
const updated = await settingsService.updateSettings('user123', {
  theme: 'dark',
  notificationsEnabled: false,
});

console.log(updated.theme); // 'dark'
```

**Validation**:

```typescript
// Valid updates
await settingsService.updateSettings('user123', {
  theme: 'dark',        // ✅ Valid
  language: 'tr-TR',     // ✅ Valid
  notificationsEnabled: true, // ✅ Valid
});

// Invalid updates
await settingsService.updateSettings('user123', {
  theme: 'invalid',      // ❌ Throws ValidationError
  language: '',          // ❌ Throws ValidationError
});
```

**Example**:

```typescript
async function updateUserPreferences(
  userId: string,
  theme: 'light' | 'dark',
  language: string
) {
  try {
    const updated = await settingsService.updateSettings(userId, {
      theme,
      language,
    });

    // Apply changes
    applyTheme(updated.theme);
    applyLanguage(updated.language);

    return updated;
  } catch (error) {
    if (error instanceof ValidationError) {
      Alert.alert('Invalid Settings', error.message);
    } else {
      Alert.alert('Error', 'Failed to update settings');
    }
    throw error;
  }
}
```

### resetSettings(userId: string): Promise<UserSettings>

Resets user settings to default values.

```typescript
const defaults = await settingsService.resetSettings('user123');

console.log(defaults.theme);        // 'light' (default)
console.log(defaults.language);     // 'en-US' (default)
```

**Example**:

```typescript
async function handleResetSettings(userId: string) {
  Alert.alert(
    'Reset Settings',
    'Are you sure you want to reset all settings to default?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          try {
            const defaults = await settingsService.resetSettings(userId);
            applySettings(defaults);
            Alert.alert('Success', 'Settings have been reset');
          } catch (error) {
            Alert.alert('Error', 'Failed to reset settings');
          }
        },
      },
    ]
  );
}
```

### validateSettings(settings: Partial<UserSettings>): void

Validates settings and throws ValidationError if invalid.

```typescript
try {
  settingsService.validateSettings({
    theme: 'dark',
    language: 'en-US',
  });
  // Valid
} catch (error) {
  // Invalid
  console.error(error.message);
}
```

**Validation Rules**:

```typescript
// Theme validation
validateSettings({ theme: 'dark' });      // ✅ Valid
validateSettings({ theme: 'light' });     // ✅ Valid
validateSettings({ theme: 'auto' });      // ✅ Valid
validateSettings({ theme: 'invalid' });   // ❌ Invalid

// Language validation
validateSettings({ language: 'en-US' });  // ✅ Valid
validateSettings({ language: 'tr-TR' });  // ✅ Valid
validateSettings({ language: '' });       // ❌ Invalid
validateSettings({ language: 'xx' });     // ❌ Invalid

// Boolean validation
validateSettings({ notificationsEnabled: true });  // ✅ Valid
validateSettings({ notificationsEnabled: 'yes' }); // ❌ Invalid
```

### mergeSettings(base: UserSettings, updates: Partial<UserSettings>): UserSettings

Merges updates with base settings, preserving undefined values.

```typescript
const base = {
  theme: 'light',
  language: 'en-US',
  notificationsEnabled: true,
};

const merged = settingsService.mergeSettings(base, {
  theme: 'dark',
});

console.log(merged);
// {
//   theme: 'dark',
//   language: 'en-US',  // Preserved
//   notificationsEnabled: true, // Preserved
// }
```

## Validation

### Theme Validation

```typescript
function validateTheme(theme: string): boolean {
  const validThemes = ['light', 'dark', 'auto'];
  return validThemes.includes(theme);
}
```

### Language Validation

```typescript
function validateLanguage(language: string): boolean {
  // Check format (e.g., 'en-US', 'tr-TR')
  const languageRegex = /^[a-z]{2}-[A-Z]{2}$/;
  return languageRegex.test(language);
}
```

### Boolean Validation

```typescript
function validateBoolean(value: any): boolean {
  return typeof value === 'boolean';
}
```

### Complete Validation

```typescript
interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

function validateSettingsComplete(
  settings: Partial<UserSettings>
): ValidationResult {
  const errors: Record<string, string> = {};

  if (settings.theme !== undefined) {
    if (!validateTheme(settings.theme)) {
      errors.theme = 'Invalid theme mode';
    }
  }

  if (settings.language !== undefined) {
    if (!validateLanguage(settings.language)) {
      errors.language = 'Invalid language format';
    }
  }

  if (settings.notificationsEnabled !== undefined) {
    if (!validateBoolean(settings.notificationsEnabled)) {
      errors.notificationsEnabled = 'Must be a boolean';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
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
function applyDefaults(settings: Partial<UserSettings>): UserSettings {
  return {
    ...defaultSettings,
    ...settings,
  };
}

const userSettings = applyDefaults({
  theme: 'dark',
  language: 'tr-TR',
});
// Returns: { theme: 'dark', language: 'tr-TR', notificationsEnabled: true, ... }
```

## Error Handling

### ValidationError

```typescript
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

**Example**:

```typescript
try {
  await settingsService.updateSettings('user123', {
    theme: 'invalid',
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Field: ${error.field}`);
    console.error(`Value: ${error.value}`);
    console.error(`Message: ${error.message}`);
  }
}
```

### SettingsError

```typescript
class SettingsError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'SettingsError';
  }
}
```

**Example**:

```typescript
try {
  await settingsService.getSettings('user123');
} catch (error) {
  if (error instanceof SettingsError) {
    switch (error.code) {
      case 'NOT_FOUND':
        console.log('User not found');
        break;
      case 'STORAGE_ERROR':
        console.log('Storage error');
        break;
      case 'NETWORK_ERROR':
        console.log('Network error');
        break;
    }
  }
}
```

## Transformations

### Data Normalization

```typescript
function normalizeSettings(raw: any): UserSettings {
  return {
    userId: raw.userId || '',
    theme: raw.theme || 'auto',
    language: raw.language || 'en-US',
    notificationsEnabled: raw.notificationsEnabled ?? true,
    emailNotifications: raw.emailNotifications ?? true,
    pushNotifications: raw.pushNotifications ?? true,
    soundEnabled: raw.soundEnabled ?? true,
    vibrationEnabled: raw.vibrationEnabled ?? true,
  };
}
```

### Data Serialization

```typescript
function serializeSettings(settings: UserSettings): any {
  return {
    user_id: settings.userId,
    theme: settings.theme,
    language: settings.language,
    notifications_enabled: settings.notificationsEnabled,
    email_notifications: settings.emailNotifications,
    push_notifications: settings.pushNotifications,
    sound_enabled: settings.soundEnabled,
    vibration_enabled: settings.vibrationEnabled,
  };
}
```

## Caching

### In-Memory Cache

```typescript
class CachedSettingsService extends SettingsService {
  private cache = new Map<string, UserSettings>();

  async getSettings(userId: string): Promise<UserSettings> {
    // Check cache
    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    // Fetch from repository
    const settings = await super.getSettings(userId);

    // Cache result
    this.cache.set(userId, settings);

    return settings;
  }

  async updateSettings(
    userId: string,
    updates: Partial<UserSettings>
  ): Promise<UserSettings> {
    const settings = await super.updateSettings(userId, updates);

    // Update cache
    this.cache.set(userId, settings);

    return settings;
  }

  invalidateCache(userId: string): void {
    this.cache.delete(userId);
  }
}
```

## Best Practices

1. **Validation**: Always validate before persistence
2. **Defaults**: Apply defaults for missing values
3. **Error Handling**: Provide clear error messages
4. **Type Safety**: Use TypeScript types throughout
5. **Immutability**: Return new objects, don't mutate
6. **Caching**: Cache frequently accessed settings
7. **Logging**: Log important operations

## Related

- **Settings Repository**: Data persistence layer
- **Application Layer**: Interface definitions
- **Settings Mutations**: Mutation hooks

## License

MIT
