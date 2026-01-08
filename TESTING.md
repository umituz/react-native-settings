# Testing Guide

Comprehensive testing guide for the `@umituz/react-native-settings` package including unit tests, integration tests, and end-to-end testing.

## Testing Philosophy

The settings package follows a comprehensive testing approach:

- **Unit Tests**: Test individual functions, hooks, and components in isolation
- **Integration Tests**: Test how multiple components work together
- **E2E Tests**: Test complete user flows
- **Snapshot Tests**: Ensure UI consistency
- **Performance Tests**: Monitor rendering performance

## Test Setup

### Configuration

```typescript
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@umituz|@react-navigation)/)',
  ],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
};
```

### Setup File

```typescript
// jest.setup.js
import '@testing-library/jest-native/extend-expect';
import { configure } = '@testing-library/react-native';

configure({ asyncUtilTimeout: 10000 });

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    getState: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
  useRoute: () => ({
    params: {},
  }),
}));
```

## Component Testing

### SettingsItemCard Tests

```typescript
// SettingsItemCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsItemCard } from '../SettingsItemCard';

describe('SettingsItemCard', () => {
  const mockOnPress = jest.fn();

  it('renders correctly with required props', () => {
    const { getByText } = render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={mockOnPress}
      />
    );

    expect(getByText('Settings')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByText('Settings'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <SettingsItemCard
        icon="notifications-outline"
        title="Notifications"
        subtitle="Enable push notifications"
        onPress={mockOnPress}
      />
    );

    expect(getByText('Enable push notifications')).toBeTruthy();
  });

  it('renders switch when showSwitch is true', () => {
    const { getByTestId } = render(
      <SettingsItemCard
        icon="notifications-outline"
        title="Notifications"
        showSwitch={true}
        switchValue={true}
        onSwitchChange={jest.fn()}
      />
    );

    expect(getByTestId('settings-switch')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(
      <SettingsItemCard
        icon="cloud-upload-outline"
        title="Cloud Sync"
        disabled={true}
        onPress={mockOnPress}
      />
    );

    const button = getByText('Cloud Sync');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const tree = render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={mockOnPress}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
```

### SettingsSection Tests

```typescript
// SettingsSection.test.tsx
import { render } from '@testing-library/react-native';
import { SettingsSection } from '../SettingsSection';
import { SettingsItemCard } from '../SettingsItemCard';

describe('SettingsSection', () => {
  it('renders section title', () => {
    const { getByText } = render(
      <SettingsSection title="GENERAL">
        <SettingsItemCard icon="person-outline" title="Profile" onPress={() => {}} />
      </SettingsSection>
    );

    expect(getByText('GENERAL')).toBeTruthy();
  });

  it('renders children components', () => {
    const { getByText } = render(
      <SettingsSection title="SETTINGS">
        <SettingsItemCard icon="person-outline" title="Profile" onPress={() => {}} />
        <SettingsItemCard icon="notifications-outline" title="Notifications" onPress={() => {}} />
      </SettingsSection>
    );

    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Notifications')).toBeTruthy();
  });

  it('hides title when showTitle is false', () => {
    const { queryByText } = render(
      <SettingsSection title="GENERAL" showTitle={false}>
        <SettingsItemCard icon="person-outline" title="Profile" onPress={() => {}} />
      </SettingsSection>
    );

    expect(queryByText('GENERAL')).toBeNull();
  });
});
```

## Hook Testing

### useSettings Tests

```typescript
// useSettings.test.ts
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useSettings } from '../useSettings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useSettings', () => {
  it('loads settings for user', async () => {
    const { result } = renderHook(() => useSettings('user123'), { wrapper });

    await waitFor(() => {
      expect(result.current.settings).toBeDefined();
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('updates settings', async () => {
    const { result } = renderHook(() => useSettings('user123'), { wrapper });

    await act(async () => {
      await result.current.updateSettings({ theme: 'dark' });
    });

    expect(result.current.settings.theme).toBe('dark');
  });

  it('resets settings to defaults', async () => {
    const { result } = renderHook(() => useSettings('user123'), { wrapper });

    await act(async () => {
      await result.current.resetSettings();
    });

    expect(result.current.settings.theme).toBe('auto');
  });

  it('handles errors gracefully', async () => {
    const { result } = renderHook(() => useSettings('invalid-user'), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

### useFeatureDetection Tests

```typescript
// useFeatureDetection.test.ts
import { renderHook } from '@testing-library/react-native';
import { useFeatureDetection } from '../useFeatureDetection';

describe('useFeatureDetection', () => {
  const mockNavigation = {
    getState: () => ({
      routes: [
        { name: 'Appearance' },
        { name: 'LanguageSelection' },
        { name: 'Notifications' },
      ],
    }),
  };

  const normalizedConfig = {
    appearance: { enabled: true },
    language: { enabled: true },
    notifications: { enabled: true },
  };

  it('detects available screens', () => {
    const { result } = renderHook(() =>
      useFeatureDetection(normalizedConfig, mockNavigation)
    );

    expect(result.current.appearance).toBe(true);
    expect(result.current.language).toBe(true);
    expect(result.current.notifications).toBe(true);
  });

  it('respects explicit disabled', () => {
    const config = {
      appearance: { enabled: false },
    };

    const { result } = renderHook(() =>
      useFeatureDetection(config, mockNavigation)
    );

    expect(result.current.appearance).toBe(false);
  });

  it('returns false for missing screens', () => {
    const navigation = {
      getState: () => ({ routes: [] }),
    };

    const { result } = renderHook(() =>
      useFeatureDetection(normalizedConfig, navigation)
    );

    expect(result.current.appearance).toBe(false);
  });
});
```

## Service Testing

### SettingsService Tests

```typescript
// SettingsService.test.ts
import { SettingsService } from '../SettingsService';
import { ISettingsRepository } from '../../application/ports/ISettingsRepository';

class MockRepository implements ISettingsRepository {
  private storage = new Map();

  async get(userId: string) {
    if (!this.storage.has(userId)) {
      return this.createDefaults(userId);
    }
    return this.storage.get(userId);
  }

  async update(userId: string, updates: any) {
    const current = await this.get(userId);
    const updated = { ...current, ...updates };
    this.storage.set(userId, updated);
    return updated;
  }

  async reset(userId: string) {
    const defaults = this.createDefaults(userId);
    this.storage.set(userId, defaults);
    return defaults;
  }

  private createDefaults(userId: string) {
    return {
      userId,
      theme: 'auto',
      language: 'en-US',
      notificationsEnabled: true,
    };
  }
}

describe('SettingsService', () => {
  let service: SettingsService;
  let repository: MockRepository;

  beforeEach(() => {
    repository = new MockRepository();
    service = new SettingsService(repository);
  });

  describe('getSettings', () => {
    it('returns settings with defaults', async () => {
      const settings = await service.getSettings('new-user');

      expect(settings.theme).toBe('auto');
      expect(settings.language).toBe('en-US');
    });

    it('returns existing settings', async () => {
      await repository.update('user123', { theme: 'dark' });

      const settings = await service.getSettings('user123');

      expect(settings.theme).toBe('dark');
    });
  });

  describe('updateSettings', () => {
    it('updates settings', async () => {
      const updated = await service.updateSettings('user123', {
        theme: 'dark',
      });

      expect(updated.theme).toBe('dark');
    });

    it('validates theme', async () => {
      await expect(
        service.updateSettings('user123', { theme: 'invalid' })
      ).rejects.toThrow('Invalid theme');
    });

    it('validates language', async () => {
      await expect(
        service.updateSettings('user123', { language: 'xx' })
      ).rejects.toThrow('Invalid language');
    });
  });

  describe('resetSettings', () => {
    it('resets to defaults', async () => {
      await repository.update('user123', { theme: 'dark' });

      const defaults = await service.resetSettings('user123');

      expect(defaults.theme).toBe('auto');
    });
  });
});
```

## Integration Testing

### Settings Screen Integration Tests

```typescript
// SettingsScreen.integration.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SettingsScreen } from '../SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function TestWrapper({ children }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Settings">{() => children}</Stack.Screen>
        <Stack.Screen name="Appearance" component={() => <div>Appearance</div>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

describe('SettingsScreen Integration', () => {
  it('navigates to Appearance on press', async () => {
    const { getByText } = render(
      <TestWrapper>
        <SettingsScreen config={{ appearance: true }} />
      </TestWrapper>
    );

    await waitFor(() => {
      const appearanceButton = getByText(/appearance/i);
      fireEvent.press(appearanceButton);
    });

    // Verify navigation occurred
    expect(getByText(/appearance/i)).toBeTruthy();
  });

  it('switches theme correctly', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SettingsScreen
          config={{
            appearance: {
              enabled: true,
              showThemeSection: true,
            },
          }}
        />
      </TestWrapper>
    );

    const darkModeSwitch = getByTestId('dark-mode-switch');
    fireEvent.press(darkModeSwitch);

    await waitFor(() => {
      // Verify theme changed
      expect(darkModeSwitch.props.value).toBe(true);
    });
  });
});
```

## Performance Testing

### Rendering Performance

```typescript
// SettingsItemCard.performance.test.tsx
import { render } from '@testing-library/react-native';
import { SettingsItemCard } from '../SettingsItemCard';

describe('SettingsItemCard Performance', () => {
  it('renders quickly', () => {
    const startTime = performance.now();

    render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={() => {}}
      />
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100); // Should render in under 100ms
  });

  it('does not re-render unnecessarily', () => {
    const renderSpy = jest.fn();

    const Component = () => {
      renderSpy();
      return (
        <SettingsItemCard
          icon="settings-outline"
          title="Settings"
          onPress={() => {}}
        />
      );
    };

    const { rerender } = render(<Component />);

    // Re-render with same props
    rerender(<Component />);

    // Component should not re-render due to memoization
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });
});
```

## Snapshot Testing

### Component Snapshots

```typescript
// SettingsItemCard.snapshot.test.tsx
import { render } from '@testing-library/react-native';
import { SettingsItemCard } from '../SettingsItemCard';

describe('SettingsItemCard Snapshots', () => {
  it('matches snapshot with basic props', () => {
    const tree = render(
      <SettingsItemCard
        icon="settings-outline"
        title="Settings"
        onPress={() => {}}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with all props', () => {
    const tree = render(
      <SettingsItemCard
        icon="notifications-outline"
        title="Notifications"
        subtitle="Enable push notifications"
        showSwitch={true}
        switchValue={true}
        onSwitchChange={() => {}}
        rightIcon="chevron-forward"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
```

## Best Practices

1. **Isolation**: Test components in isolation
2. **Mocking**: Mock external dependencies
3. **Coverage**: Aim for >80% code coverage
4. **Speed**: Keep tests fast
5. **Reliable**: Tests should be flake-free
6. **Readable**: Use descriptive test names
7. **Maintenance**: Keep tests updated

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Specific Test File

```bash
npm test SettingsItemCard.test.tsx
```

### Run Tests for Pattern

```bash
npm test -- --testPathPattern="domains/appearance"
```

## Related

- **Jest**: Testing framework
- **React Native Testing Library**: Component testing utilities
- **TanStack Query**: Data fetching and testing

## License

MIT
