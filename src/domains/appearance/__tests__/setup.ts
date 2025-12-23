/**
 * Jest Setup File
 * 
 * Global test setup for React Native Appearance package
 */

import 'react-native-gesture-handler/jestSetup';

// Mock console methods for testing
if (__DEV__) {
  global.console = {
    ...console,
    // Suppress specific console warnings in tests
    warn: jest.fn(),
    error: jest.fn(),
  };
}

// Mock performance API for testing
if (typeof performance === 'undefined') {
  global.performance = {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
    clearResourceTimings: jest.fn(),
  } as any;
}

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios),
    },
  };
});

// Mock design system theme
jest.mock('@umituz/react-native-design-system', () => ({
  useTheme: jest.fn(() => ({
    setThemeMode: jest.fn(),
  })),
  useDesignSystemTheme: jest.fn(() => ({
    setThemeMode: jest.fn(),
    setCustomColors: jest.fn(),
  })),
}));

// Mock storage
jest.mock('@umituz/react-native-storage', () => ({
  storageRepository: {
    getItem: jest.fn(() => ({
      success: true,
      data: null,
    })),
    setItem: jest.fn(() => ({
      success: true,
    })),
    removeItem: jest.fn(() => ({
      success: true,
    })),
  },
  unwrap: jest.fn((result, defaultValue) => 
    result.success ? result.data : defaultValue
  ),
}));

// Mock alert
jest.mock('@umituz/react-native-alert', () => ({
  useAlert: jest.fn(() => ({
    show: jest.fn(),
    showSuccess: jest.fn(),
    showError: jest.fn(),
    showWarning: jest.fn(),
  })),
}));

// Mock localization
jest.mock('@umituz/react-native-localization', () => ({
  useLocalization: jest.fn(() => ({
    t: jest.fn((key) => key),
  })),
}));

// Global test utilities
(globalThis as any).__TEST__ = true;

// Mock timers
jest.useFakeTimers();