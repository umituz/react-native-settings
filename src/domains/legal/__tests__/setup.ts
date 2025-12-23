/**
 * Jest setup file
 */

// Mock React Native modules
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  ScrollView: 'ScrollView',
  TouchableOpacity: 'TouchableOpacity',
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  Linking: {
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    openURL: jest.fn(() => Promise.resolve()),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
}));

// Mock design system modules (only if they exist)
try {
  jest.mock('@umituz/react-native-design-system', () => ({
    useAppDesignTokens: jest.fn(() => ({
      colors: {
        backgroundPrimary: '#ffffff',
        primary: '#007AFF',
        textPrimary: '#000000',
        textSecondary: '#666666',
        textTertiary: '#999999',
        onSurface: '#000000',
        secondary: '#5856D6',
        info: '#007AFF',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
      },
    })),
  }));
} catch (e) {
  // Module not found, skip mocking
}

try {
  jest.mock('@umituz/react-native-design-system', () => ({
    AtomicText: 'AtomicText',
    AtomicIcon: 'AtomicIcon',
    AtomicButton: 'AtomicButton',
  }));
} catch (e) {
  // Module not found, skip mocking
}

try {
  jest.mock('@umituz/react-native-design-system', () => ({
    ScreenLayout: 'ScreenLayout',
  }));
} catch (e) {
  // Module not found, skip mocking
}

try {
  jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: jest.fn(() => ({
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    })),
  }));
} catch (e) {
  // Module not found, skip mocking
}

// Global test setup
(global as any).__DEV__ = true;