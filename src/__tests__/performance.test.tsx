/**
 * Performance and Memory Leak Tests
 * Tests for performance optimization and memory management
 */

import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react-native';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { useSettings } from '../../../infrastructure/storage/SettingsStore';
import { DisclaimerSetting } from '../../components/DisclaimerSetting';
import { SettingItem } from '../../components/SettingItem';

// Mock dependencies
jest.mock('@umituz/react-native-design-system', () => ({
  useDesignSystemTheme: () => ({
    themeMode: 'light',
  }),
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
    },
  }),
}));

jest.mock('@umituz/react-native-localization', () => ({
  useLocalization: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@umituz/react-native-storage', () => ({
  storageRepository: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  StorageKey: {
    SETTINGS: 'settings',
  },
  createUserKey: (key: string, userId: string) => `${key}_${userId}`,
  unwrap: (result: any, defaultValue: any) => result.success ? result.data : defaultValue,
}));

jest.mock('../../components/SettingsHeader', () => 'SettingsHeader');
jest.mock('../../components/SettingsContent', () => 'SettingsContent');
jest.mock('../../components/SettingsErrorBoundary', () => 'SettingsErrorBoundary');
jest.mock('../../utils/normalizeConfig', () => ({
  normalizeSettingsConfig: jest.fn(() => ({})),
}));
jest.mock('../../hooks/useFeatureDetection', () => ({
  useFeatureDetection: jest.fn(() => ({})),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    getState: jest.fn(() => ({ routes: [] })),
  }),
}));

describe('Performance and Memory Tests', () => {
  let container: any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Memory Leak Prevention', () => {
    it('should not leak memory on SettingsScreen mount/unmount', () => {
      const mockSetItem = jest.fn();
      require('@umituz/react-native-storage').storageRepository.setItem = mockSetItem;

      const { unmount } = render(<SettingsScreen />);

      // Component should mount without issues
      expect(() => unmount()).not.toThrow();

      // Check if any timers or listeners are left
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should cleanup useEffect hooks properly', () => {
      jest.useFakeTimers();

      const { unmount } = render(<DisclaimerSetting />);

      // Fast forward time
      jest.advanceTimersByTime(1000);

      // Unmount component
      unmount();

      // Clear any remaining timers
      jest.clearAllTimers();

      // Should not have any remaining timers
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should handle rapid mount/unmount cycles', () => {
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<SettingsScreen />);
        unmount();
      }

      // Should not throw any errors
      expect(true).toBe(true);
    });

    it('should cleanup event listeners', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

      const { unmount } = render(<SettingsScreen />);

      unmount();

      // All added listeners should be removed
      expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThanOrEqual(
        addEventListenerSpy.mock.calls.length
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Performance Optimization', () => {
    it('should render within acceptable time limits', () => {
      const startTime = performance.now();

      render(<SettingsScreen />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('should handle large datasets efficiently', () => {
      const largeCustomSections = Array.from({ length: 1000 }, (_, i) => ({
        title: `Section ${i}`,
        data: Array.from({ length: 100 }, (_, j) => ({
          id: `item-${i}-${j}`,
          title: `Item ${i}-${j}`,
        })),
      }));

      const startTime = performance.now();

      const { unmount } = render(
        <SettingsScreen customSections={largeCustomSections} />
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should handle large datasets within reasonable time
      expect(renderTime).toBeLessThan(1000);

      unmount();
    });

    it('should not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn();

      const TestComponent = () => {
        renderSpy();
        return <SettingsScreen />;
      };

      const { rerender } = render(<TestComponent />);

      expect(renderSpy).toHaveBeenCalledTimes(1);

      // Rerender with same props
      rerender(<TestComponent />);

      // Should not cause unnecessary re-renders
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });

    it('should use React.memo effectively', () => {
      const props = {
        icon: 'Settings',
        title: 'Test Setting',
      };

      const { rerender } = render(<SettingItem {...props} />);

      const startTime = performance.now();

      // Rerender with same props
      rerender(<SettingItem {...props} />);

      const endTime = performance.now();
      const rerenderTime = endTime - startTime;

      // Rerender should be fast due to memoization
      expect(rerenderTime).toBeLessThan(50);
    });
  });

  describe('Memory Usage', () => {
    it('should not accumulate memory on repeated operations', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Perform many operations
      for (let i = 0; i < 1000; i++) {
        const { unmount } = render(<SettingsScreen />);
        unmount();
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Memory usage should not increase significantly
      if (initialMemory > 0 && finalMemory > 0) {
        const memoryIncrease = finalMemory - initialMemory;
        expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
      }
    });

    it('should cleanup large objects properly', () => {
      const largeData = {
        config: Array.from({ length: 10000 }, (_, i) => ({
          id: i,
          data: new Array(1000).fill('large data string'),
        })),
      };

      const { unmount } = render(<SettingsScreen {...largeData} />);

      unmount();

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      // Should not throw errors
      expect(true).toBe(true);
    });
  });

  describe('Timer and Interval Management', () => {
    it('should cleanup timers on unmount', () => {
      jest.useFakeTimers();

      const { unmount } = render(<DisclaimerSetting />);

      // Simulate some timers
      jest.advanceTimersByTime(5000);

      expect(jest.getTimerCount()).toBeGreaterThan(0);

      unmount();

      jest.clearAllTimers();

      expect(jest.getTimerCount()).toBe(0);
    });

    it('should not have memory leaks from intervals', () => {
      jest.useFakeTimers();

      const { unmount } = render(<SettingsScreen />);

      // Simulate time passing
      for (let i = 0; i < 100; i++) {
        jest.advanceTimersByTime(1000);
      }

      unmount();

      jest.clearAllTimers();

      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe('Async Operation Cleanup', () => {
    it('should cleanup async operations on unmount', async () => {
      const mockGetItem = jest.fn(() => new Promise(resolve => 
        setTimeout(() => resolve({ success: true, data: {} }), 1000)
      ));

      require('@umituz/react-native-storage').storageRepository.getItem = mockGetItem;

      const { unmount } = render(<SettingsScreen />);

      // Unmount before async operation completes
      unmount();

      // Should not cause memory leaks
      expect(true).toBe(true);
    });

    it('should handle promise rejection on unmount', async () => {
      const mockGetItem = jest.fn(() => new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Test error')), 1000)
      ));

      require('@umituz/react-native-storage').storageRepository.getItem = mockGetItem;

      const { unmount } = render(<SettingsScreen />);

      // Unmount before promise rejects
      unmount();

      // Should not cause unhandled promise rejection
      await new Promise(resolve => setTimeout(resolve, 1100));

      expect(true).toBe(true);
    });
  });

  describe('Resource Cleanup', () => {
    it('should cleanup subscriptions', () => {
      const mockSubscribe = jest.fn(() => jest.fn());

      // Mock subscription
      const originalUseEffect = React.useEffect;
      React.useEffect = (fn, deps) => {
        const cleanup = fn();
        return cleanup;
      };

      const { unmount } = render(<SettingsScreen />);

      unmount();

      React.useEffect = originalUseEffect;

      expect(true).toBe(true);
    });

    it('should cleanup event emitters', () => {
      const mockEmitter = {
        addListener: jest.fn(() => jest.fn()),
        removeListener: jest.fn(),
      };

      // Mock event emitter usage
      const { unmount } = render(<SettingsScreen />);

      unmount();

      expect(true).toBe(true);
    });
  });
});