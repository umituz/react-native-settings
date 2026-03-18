# React Native Settings - Core Architecture

## 📋 Overview

This document describes the new core architecture implemented to eliminate code duplication and establish maintainable, testable patterns following DDD (Domain Driven Design) and Clean Architecture principles.

## 🎯 Objectives

- ✅ Eliminate code duplication across domains
- ✅ Establish consistent error handling and logging
- ✅ Create reusable patterns for modals and screens
- ✅ Reduce maintenance burden
- ✅ Keep all files under 150 lines (core layer)
- ✅ Follow DDD + Clean Architecture

## 📁 Architecture

```
src/
├── core/                           # SHARED CORE LAYER
│   ├── base/                       # BASE CLASSES
│   │   └── BaseService.ts          # Abstract service with error handling
│   ├── patterns/                   # DESIGN PATTERNS
│   │   ├── Modal/                  # Modal pattern
│   │   │   ├── ModalConfig.ts      # Configuration types + presets
│   │   │   └── useModalState.ts    # Generic state hook
│   │   └── Screen/                 # Screen pattern
│   │       ├── ScreenConfig.ts     # Configuration types + presets
│   │       └── useScreenData.ts    # Generic data hook
│   └── utils/                      # SHARED UTILS
│       ├── logger.ts               # Centralized logging
│       └── validators.ts           # Common validators
│
├── presentation/                   # SHARED PRESENTATION
│   └── components/
│       ├── GenericModal.tsx        # Universal modal wrapper
│       └── GenericScreen.tsx       # Universal screen wrapper
│
└── domains/                        # DOMAIN LAYER (EXISTING)
    └── [domain]/
        ├── application/            # Extend BaseService
        ├── domain/                 # Domain entities
        ├── infrastructure/         # Infrastructure
        └── presentation/           # Use patterns
```

## 🔧 Core Layer Components

### 1. BaseService

Abstract base class for all domain services with built-in error handling and logging.

**Features:**
- Automatic try-catch wrapping
- Consistent error handling with `Result<T>` type
- Development-only logging
- Optional unsafe execution for critical operations

**Usage:**
```typescript
import { BaseService } from '@/core';

class MyService extends BaseService {
  protected serviceName = 'MyService';

  async doSomething(input: Input): Promise<Data> {
    return this.execute('doSomething', async () => {
      // Your logic here - errors are automatically caught
      return result;
    });
  }
}
```

### 2. Logger

Centralized logging with context support.

**Features:**
- Development-only logging
- Hierarchical context (domain → service → component → operation)
- Child logger creation
- Convenience functions

**Usage:**
```typescript
import { createLogger } from '@/core';

const logger = createLogger({
  domain: 'Settings',
  service: 'AppearanceService'
});

logger.info('Theme changed to dark mode');
logger.error('Failed to save settings', error);
```

### 3. Validators

Common validation functions as pure utilities.

**Features:**
- Type-safe validators
- Composable validation
- `ValidationResult<T>` type
- Preset validators for common cases

**Usage:**
```typescript
import { validators, validateAll, valid, invalid } from '@/core';

// Single validation
if (!validators.isValidEmail(email)) {
  return invalid('Invalid email');
}

// Multiple validations
const result = validateAll(
  validators.isValidEmail(email) || 'Invalid email',
  validators.hasMinLength(password, 8) || 'Password too short'
);
```

### 4. Modal Pattern

**ModalConfig:**
- Type-safe configuration
- Built-in presets (alert, confirm, info, error, loading)
- Custom actions support
- Flexible content (header, body, footer)

**useModalState:**
- Generic modal state management
- Optional result handling with promises
- Auto-dismiss logic

**GenericModal:**
- Universal modal component
- Works with any ModalConfig
- Responsive design
- Accessible

**Usage:**
```typescript
import { useModalState, GenericModal, ModalPresets } from '@/core';

function MyComponent() {
  const modal = useModalState();

  const showConfirm = () => {
    modal.show(ModalPresets.confirm(
      'Delete Item',
      'Are you sure?',
      'Delete',
      'Cancel'
    ));
  };

  return (
    <>
      <Button onPress={showConfirm} />
      <GenericModal state={modal} />
    </>
  );
}
```

### 5. Screen Pattern

**ScreenConfig:**
- Type-safe configuration
- Header, loading, error, empty states
- Layout options
- Built-in presets

**useScreenData:**
- Generic data management
- Loading, error, data states
- Auto-fetch on mount
- Refresh functionality
- Mount-safe updates

**GenericScreen:**
- Universal screen wrapper
- Handles all states automatically
- Custom content rendering
- Responsive

**Usage:**
```typescript
import { useScreenData, GenericScreen, ScreenPresets } from '@/core';

function MyScreen() {
  const screenData = useScreenData({
    fetch: async () => await api.getData(),
    autoFetch: true
  });

  return (
    <GenericScreen
      data={screenData}
      config={ScreenPresets.default}
    >
      <MyContent data={screenData.data} />
    </GenericScreen>
  );
}
```

## 📊 Results

### Service Refactoring

| Service | Before | After | Reduction |
|---------|--------|-------|-----------|
| RatingService | 147 lines | 136 lines | 7.5% |
| NotificationService | 68 lines | 62 lines | 8.8% |
| SettingsService | 38 lines | 34 lines | 10.5% |

### Modal Refactoring

| Modal | Before | After | Reduction |
|-------|--------|-------|-----------|
| RatingPromptModal | 153 lines | 107 lines | 30% |
| DisclaimerModal | 103 lines | 56 lines | 46% |
| FeedbackModal | 100 lines | 136 lines | Complex logic preserved |

**Benefits:**
- Consistent error handling across all services
- Unified modal pattern
- Type-safe configurations
- Reduced code duplication
- Easier testing
- Better maintainability

## 🚀 Migration Guide

### For Service Authors

**Before:**
```typescript
export async function trackEvent(eventType: string): Promise<void> {
  try {
    await incrementEventCount(eventType);
  } catch (error) {
    if (isDev()) {
      console.error('[RatingService] trackEvent:', error);
    }
  }
}
```

**After:**
```typescript
class RatingService extends BaseService {
  protected serviceName = 'RatingService';

  async trackEvent(eventType: string): Promise<void> {
    await this.execute('trackEvent', async () => {
      await incrementEventCount(eventType);
    });
  }
}
```

### For Modal Authors

**Before:**
```typescript
// Custom modal component with manual state management
export const RatingPromptModal: React.FC<RatingPromptModalProps> = ({
  visible, onPositive, onNegative, onLater, ...
}) => {
  // 153 lines of custom modal logic
};
```

**After:**
```typescript
// Hook-based approach with GenericModal
export function useRatingPromptModal() {
  const modal = useModalState();

  const showRatingPrompt = useCallback((options) => {
    modal.show({
      title: 'Rate this app?',
      icon: 'star',
      actions: [
        { label: 'Yes', onPress: onPositive },
        { label: 'No', onPress: onNegative }
      ]
    });
  }, [modal]);

  return { modal, showRatingPrompt, RatingPrompt: () => <GenericModal state={modal} /> };
}
```

### For Screen Authors

**Before:**
```typescript
// Manual state management
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<Data | null>(null);

useEffect(() => {
  let mounted = true;
  setLoading(true);
  fetchData().then(result => {
    if (mounted) {
      setData(result);
      setLoading(false);
    }
  });
  return () => { mounted = false; };
}, []);
```

**After:**
```typescript
// Generic hook with mount safety built-in
const screenData = useScreenData({
  fetch: async () => await fetchData(),
  autoFetch: true
});

// Automatic loading, error, data states
```

## 📝 Best Practices

### 1. Always Extend BaseService for Domain Services

```typescript
// ✅ Good
class MyService extends BaseService {
  protected serviceName = 'MyService';
}

// ❌ Bad - manual error handling
export async function doSomething() {
  try {
    // ...
  } catch (error) {
    console.error(error);
  }
}
```

### 2. Use Modal Presets When Possible

```typescript
// ✅ Good - use preset
modal.show(ModalPresets.confirm('Delete?', 'Are you sure?'));

// ❌ Bad - manual config
modal.show({
  title: 'Delete?',
  message: 'Are you sure?',
  actions: [
    { label: 'Cancel', variant: 'outline', onPress: () => {} },
    { label: 'Delete', variant: 'danger', onPress: () => {} }
  ]
});
```

### 3. Leverage useScreenData for All Screens

```typescript
// ✅ Good - generic hook
const screenData = useScreenData({ fetch, autoFetch });

// ❌ Bad - manual state
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
```

### 4. Use Context-Aware Logging

```typescript
// ✅ Good - with context
const logger = createLogger({ domain: 'Settings', service: 'Appearance' });
logger.info('Theme changed');

// ❌ Bad - no context
console.log('[Settings][Appearance] Theme changed');
```

## 🧪 Testing

### Testing Services

```typescript
import { RatingService } from './RatingService';

describe('RatingService', () => {
  it('should handle errors gracefully', async () => {
    const service = new RatingService();
    jest.spyOn(storage, 'incrementEventCount').mockRejectedValue(new Error('Test error'));

    await service.trackEvent('test'); // Should not throw

    expect(service.logError).toHaveBeenCalled();
  });
});
```

### Testing Modals

```typescript
import { useModalState, GenericModal } from '@/core';

const { getByTestId } = render(<GenericModal state={modal} />);

fireEvent.press(getByTestId('generic-modal-action-0'));

await waitFor(() => {
  expect(modal.visible).toBe(false);
});
```

## 🔮 Future Enhancements

1. **BaseRepository**: Similar to BaseService for data access
2. **BaseHook**: Generic hook factory for common patterns
3. **ErrorBoundary**: React error boundary component
4. **Performance Monitoring**: Built-in performance metrics
5. **Retry Logic**: Automatic retry with exponential backoff

## 📚 Additional Resources

- [Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Hooks Best Practices](https://react.dev/reference/react)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

**Last Updated:** 2025-03-18
**Author:** Claude Code
**Version:** 1.0.0
