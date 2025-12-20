/**
 * Jest Test Setup
 * Mock all external dependencies
 */

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock design system packages
jest.mock('@umituz/react-native-design-system', () => ({
  useDesignSystemTheme: () => ({
    themeMode: 'light',
  }),
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
      primary: '#007AFF',
      textPrimary: '#000000',
      textSecondary: '#666666',
      surface: '#f5f5f5',
      borderLight: '#e0e0e0',
      warning: '#FF9800',
    },
    spacing: {
      md: 16,
    },
    typography: {
      labelLarge: {
        fontWeight: '500',
        fontSize: 14,
      },
    },
  }),
  withAlpha: jest.fn((color: string, alpha: number) => `${color}${alpha}`),
}));

jest.mock('@umituz/react-native-design-system', () => ({
  AtomicText: ({ children, type, color, style, testID }: any) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { 
      style, 
      testID: testID || `atomic-text-${type}-${color}` 
    }, children);
  },
  AtomicIcon: ({ name, color, size, style, testID }: any) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { 
      style, 
      testID: testID || `atomic-icon-${name}-${color}-${size}` 
    }, `Icon: ${name}`);
  },
}));

// Mock localization
jest.mock('@umituz/react-native-localization', () => ({
  useLocalization: () => ({
    t: (key: string) => key,
    changeLanguage: jest.fn(),
    currentLanguage: 'en-US',
  }),
}));

// Mock storage
jest.mock('@umituz/react-native-storage', () => ({
  storageRepository: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  StorageKey: {
    SETTINGS: 'settings',
  },
  createUserKey: (key: string, userId: string) => `${key}_${userId}`,
  unwrap: (result: any, defaultValue: any) => result.success ? result.data : defaultValue,
}));

// Mock lucide-react-native
jest.mock('lucide-react-native', () => ({
  Cloud: 'Cloud',
  Bell: 'Bell',
  Palette: 'Palette',
  ChevronRight: 'ChevronRight',
  AlertTriangle: 'AlertTriangle',
  Info: 'Info',
  X: 'X',
  ArrowRight: 'ArrowRight',
  Settings: 'Settings',
}));



// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    getState: jest.fn(() => ({
      routes: [{ name: 'Settings' }],
    })),
    setOptions: jest.fn(),
    isFocused: jest.fn(() => true),
    addListener: jest.fn(() => jest.fn()),
    removeListener: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(() => true),
  NavigationContainer: ({ children }: any) => children,
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

// Mock linear gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: any) => children,
}));

// Mock notification service
jest.mock('@umituz/react-native-notifications', () => ({
  notificationService: {
    hasPermissions: jest.fn(() => Promise.resolve(true)),
    requestPermissions: jest.fn(() => Promise.resolve()),
  },
}));

// Mock appearance
jest.mock('@umituz/react-native-appearance', () => ({
  useAppearance: () => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
  }),
}));

// Mock console methods in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Set up __DEV__ mock
Object.defineProperty(global, '__DEV__', {
  value: true,
  writable: true,
});