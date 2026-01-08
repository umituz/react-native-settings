# Architecture Overview

Comprehensive architecture documentation for the `@umituz/react-native-settings` package following Domain-Driven Design (DDD) principles.

## Table of Contents

1. [Overview](#overview)
2. [Architecture Layers](#architecture-layers)
3. [Directory Structure](#directory-structure)
4. [Domain Layer](#domain-layer)
5. [Application Layer](#application-layer)
6. [Infrastructure Layer](#infrastructure-layer)
7. [Presentation Layer](#presentation-layer)
8. [Data Flow](#data-flow)
9. [Design Patterns](#design-patterns)
10. [Best Practices](#best-practices)

## Overview

The `@umituz/react-native-settings` package is built using **Domain-Driven Design (DDD)** principles with clear separation of concerns across four main layers:

```
┌─────────────────────────────────────────┐
│      Presentation Layer                 │
│  (UI Components, Screens, Hooks)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Application Layer                 │
│   (Business Logic, Interfaces)          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Infrastructure Layer               │
│  (Data Persistence, Services)           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Domain Layer                    │
│   (Business Entities, Rules)            │
└─────────────────────────────────────────┘
```

## Architecture Layers

### Presentation Layer

**Responsibility**: UI rendering and user interaction

```
src/presentation/
├── components/         # Reusable UI components
├── screens/            # Screen components
│   ├── components/     # Screen-specific components
│   ├── hooks/          # Screen-specific hooks
│   ├── types/          # Screen types
│   └── utils/          # Screen utilities
├── hooks/              # Presentation hooks
└── navigation/         # Navigation setup
```

**Key Components**:
- `SettingsScreen`: Main settings screen
- `SettingsContent`: Content composer
- `SettingsItemCard`: Reusable item component
- `useSettings`: Main settings hook
- `useFeatureDetection`: Feature detection hook

### Application Layer

**Responsibility**: Business logic and interfaces

```
src/application/
└── ports/
    └── ISettingsRepository.ts    # Repository interface
```

**Key Interfaces**:
- `ISettingsRepository`: Settings repository contract
- `UserSettings`: Settings data structure
- `SettingsResult`: Operation result types
- `SettingsError`: Error definitions

### Infrastructure Layer

**Responsibility**: Data persistence and external services

```
src/infrastructure/
├── repositories/
│   └── SettingsRepository.ts       # Repository implementation
└── services/
    └── SettingsService.ts          # Business logic service
```

**Key Implementations**:
- `SettingsRepository`: Data persistence
- `SettingsService`: Business logic

### Domain Layer

**Responsibility**: Business entities and domain rules

```
src/domains/
├── about/                          # About domain
├── appearance/                     # Appearance domain
├── legal/                          # Legal domain
├── disclaimer/                     # Disclaimer domain
├── feedback/                       # Feedback domain
├── faqs/                          # FAQs domain
├── rating/                         # Rating domain
├── video-tutorials/               # Video tutorials domain
├── cloud-sync/                    # Cloud sync domain
└── dev/                           # Development tools domain
```

Each domain follows the structure:

```
domain/
├── domain/            # Business entities
├── application/       # Domain-specific application logic
├── infrastructure/    # Domain-specific infrastructure
├── presentation/      # Domain-specific UI
├── types/            # Domain types
└── utils/            # Domain utilities
```

## Directory Structure

```
src/
├── domains/                    # Business domains
│   ├── about/
│   │   ├── domain/
│   │   │   ├── entities/       # Business entities
│   │   │   └── repositories/   # Repository interfaces
│   │   ├── infrastructure/
│   │   │   └── repositories/   # Repository implementations
│   │   └── presentation/
│   │       ├── screens/        # Screen components
│   │       ├── components/     # UI components
│   │       └── hooks/          # Custom hooks
│   └── appearance/
│       ├── application/
│       │   └── ports/          # Domain ports
│       ├── data/               # Domain data
│       ├── hooks/              # Domain hooks
│       ├── infrastructure/
│       │   ├── repositories/   # Implementations
│       │   └── services/       # Services
│       ├── presentation/
│       │   ├── screens/        # Screens
│       │   └── components/     # Components
│       └── types/              # Domain types
├── application/                # Application layer
│   └── ports/                  # Layer interfaces
├── infrastructure/             # Infrastructure layer
│   ├── repositories/           # Data repositories
│   └── services/               # Business services
└── presentation/              # Presentation layer
    ├── components/             # Shared components
    ├── screens/                # Screens
    │   ├── components/         # Screen components
    │   ├── hooks/              # Screen hooks
    │   ├── types/              # Screen types
    │   └── utils/              # Screen utilities
    ├── hooks/                  # Presentation hooks
    │   ├── mutations/          # Mutation hooks
    │   └── queries/            # Query hooks
    └── navigation/             # Navigation
        ├── components/         # Nav components
        ├── hooks/              # Nav hooks
        └── utils/              # Nav utilities
```

## Domain Layer

### Purpose

Encapsulates business logic, rules, and entities.

### Structure

Each domain is self-contained with:

```typescript
// Example: About Domain
src/domains/about/
├── domain/
│   ├── entities/
│   │   └── AppInfo.ts          # Business entity
│   └── repositories/
│       └── IAboutRepository.ts # Repository interface
├── infrastructure/
│   └── repositories/
│       └── AboutRepository.ts  # Implementation
├── presentation/
│   ├── screens/
│   │   └── AboutScreen.tsx
│   ├── components/
│   │   └── AboutContent.tsx
│   └── hooks/
│       └── useAboutInfo.ts
└── types/
    └── index.ts
```

### Example Domain

```typescript
// Domain Entity
interface AppInfo {
  name: string;
  version: string;
  buildNumber: string;
  developer: string;
  contactEmail?: string;
  websiteUrl?: string;
}

// Repository Interface
interface IAboutRepository {
  getAppInfo(): Promise<AppInfo>;
}

// Implementation
class AboutRepository implements IAboutRepository {
  async getAppInfo(): Promise<AppInfo> {
    // Implementation
  }
}
```

## Application Layer

### Purpose

Defines interfaces and orchestrates business logic.

### Interfaces

```typescript
// ISettingsRepository.ts
export interface ISettingsRepository {
  get(userId: string): Promise<UserSettings>;
  update(userId: string, updates: Partial<UserSettings>): Promise<UserSettings>;
  reset(userId: string): Promise<UserSettings>;
}
```

### Types

```typescript
// User Settings
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notificationsEnabled: boolean;
  // ... more fields
}

// Result Types
export interface SettingsResult<T = UserSettings> {
  success: boolean;
  data?: T;
  error?: SettingsError;
}

// Error Types
export interface SettingsError {
  code: string;
  message: string;
  details?: any;
}
```

## Infrastructure Layer

### Purpose

Implements interfaces defined in application layer.

### Repository Implementation

```typescript
// SettingsRepository.ts
export class SettingsRepository implements ISettingsRepository {
  private storage: StorageRepository;

  constructor(storage?: StorageRepository) {
    this.storage = storage || new StorageRepository();
  }

  async get(userId: string): Promise<UserSettings> {
    const key = `settings:${userId}`;
    const data = await this.storage.get(key);

    if (!data) {
      return this.createDefaults(userId);
    }

    return data;
  }

  async update(
    userId: string,
    updates: Partial<UserSettings>
  ): Promise<UserSettings> {
    const current = await this.get(userId);
    const updated = { ...current, ...updates };

    await this.storage.set(`settings:${userId}`, updated);
    return updated;
  }

  async reset(userId: string): Promise<UserSettings> {
    const defaults = this.createDefaults(userId);
    await this.storage.set(`settings:${userId}`, defaults);
    return defaults;
  }

  private createDefaults(userId: string): UserSettings {
    return {
      userId,
      theme: 'auto',
      language: 'en-US',
      notificationsEnabled: true,
      // ... more defaults
    };
  }
}
```

### Service Implementation

```typescript
// SettingsService.ts
export class SettingsService {
  private repository: ISettingsRepository;

  constructor(repository?: ISettingsRepository) {
    this.repository = repository || new SettingsRepository();
  }

  async getSettings(userId: string): Promise<UserSettings> {
    return await this.repository.get(userId);
  }

  async updateSettings(
    userId: string,
    updates: Partial<UserSettings>
  ): Promise<UserSettings> {
    this.validateSettings(updates);
    return await this.repository.update(userId, updates);
  }

  async resetSettings(userId: string): Promise<UserSettings> {
    return await this.repository.reset(userId);
  }

  private validateSettings(settings: Partial<UserSettings>): void {
    // Validation logic
  }
}
```

## Presentation Layer

### Components

```typescript
// SettingsItemCard.tsx
export const SettingsItemCard = memo<Props>((props) => {
  const { icon, title, subtitle, onPress } = props;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name={icon} size={24} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </Pressable>
  );
});
```

### Hooks

```typescript
// useSettings.ts
export function useSettings(userId: string) {
  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['settings', userId],
    queryFn: () => settingsService.getSettings(userId),
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (updates: Partial<UserSettings>) =>
      settingsService.updateSettings(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings', userId]);
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings: updateSettingsMutation.mutate,
  };
}
```

## Data Flow

### Reading Settings

```
User → UI Component → Hook → Query → Service → Repository → Storage
```

**Example**:

```typescript
// 1. UI Component
function SettingsScreen() {
  const { settings, isLoading } = useSettings('user123');

  // 2. Hook
  const { data } = useQuery({
    queryKey: ['settings', 'user123'],
    queryFn: () => settingsService.getSettings('user123'),  // 3. Service
  });

  // Service calls repository
  // Repository calls storage
}
```

### Updating Settings

```
User → UI → Mutation Hook → Service → Repository → Storage
```

**Example**:

```typescript
// 1. UI
<Button onPress={() => updateSettings({ theme: 'dark' })} />

// 2. Mutation Hook
const updateSettingsMutation = useMutation({
  mutationFn: (updates) => settingsService.updateSettings('user123', updates), // 3. Service
  onSuccess: () => queryClient.invalidateQueries(['settings', 'user123']),
});
```

## Design Patterns

### Repository Pattern

Separates data access logic from business logic.

```typescript
// Interface
interface ISettingsRepository {
  get(userId: string): Promise<UserSettings>;
  update(userId: string, updates: Partial<UserSettings>): Promise<UserSettings>;
}

// Implementation
class SettingsRepository implements ISettingsRepository {
  // Implementation details
}
```

### Dependency Injection

Inject dependencies for testability.

```typescript
class SettingsService {
  constructor(private repository: ISettingsRepository) {}
}

// Usage
const repository = new SettingsRepository();
const service = new SettingsService(repository);

// Testing
const mockRepository = new MockSettingsRepository();
const service = new SettingsService(mockRepository);
```

### Factory Pattern

Create objects with factory functions.

```typescript
function createSettingsRepository(storage?: StorageRepository): ISettingsRepository {
  return new SettingsRepository(storage);
}
```

### Observer Pattern

React hooks and TanStack Query use observer pattern.

```typescript
// Query observes data changes
const { data } = useQuery(['settings'], fetchSettings);

// Automatically re-renders when data changes
```

## Best Practices

### 1. Layer Separation

- Never skip layers in communication
- Use interfaces between layers
- Keep dependencies one-way

**Good**:
```typescript
Presentation → Application → Infrastructure → Storage
```

**Bad**:
```typescript
Presentation → Storage  // ❌ Skipping layers
```

### 2. Domain Independence

- Domains should be self-contained
- Minimize inter-domain dependencies
- Use clear interfaces

### 3. Type Safety

- Use TypeScript throughout
- Define clear interfaces
- Export types for reuse

### 4. Error Handling

- Handle errors at each layer
- Use consistent error types
- Provide meaningful error messages

```typescript
try {
  const settings = await repository.get(userId);
} catch (error) {
  if (error instanceof SettingsError) {
    // Handle known error
  } else {
    // Handle unknown error
  }
}
```

### 5. Testing

- Test layers independently
- Use mocks for dependencies
- Cover business logic

```typescript
describe('SettingsService', () => {
  it('should validate settings', () => {
    const repository = new MockSettingsRepository();
    const service = new SettingsService(repository);

    expect(() =>
      service.updateSettings('user123', { theme: 'invalid' })
    ).toThrow();
  });
});
```

## Related

- **Domain Documentation**: Individual domain READMEs
- **Component Documentation**: Component-specific docs
- **Testing Guide**: Comprehensive testing guide

## License

MIT
