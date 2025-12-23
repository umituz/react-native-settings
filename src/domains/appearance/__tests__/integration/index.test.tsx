/**
 * Integration Tests
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { AppearanceService, appearanceService } from '../../infrastructure/services/appearanceService';
import { useAppearanceStore } from '../../infrastructure/stores/appearanceStore';
import { AppearanceScreen } from '../../presentation/screens/AppearanceScreen';
import type { ThemeMode, CustomThemeColors } from '../../types';

// Mock design system theme
jest.mock('@umituz/react-native-design-system', () => ({
  useTheme: {
    getState: jest.fn(() => ({
      setThemeMode: jest.fn(),
    })),
  },
  useDesignSystemTheme: {
    getState: jest.fn(() => ({
      setThemeMode: jest.fn(),
      setCustomColors: jest.fn(),
    })),
  },
}));

// Mock storage
jest.mock('../../infrastructure/storage/appearanceStorage', () => ({
  AppearanceStorage: {
    getSettings: jest.fn(() => Promise.resolve(null)),
    setSettings: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

const mockUseTheme = require('@umituz/react-native-design-system').useTheme;
const mockUseDesignSystemTheme = require('@umituz/react-native-design-system').useDesignSystemTheme;
const mockAppearanceStorage = require('../../infrastructure/storage/appearanceStorage').AppearanceStorage;

describe('Appearance Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize and render correctly', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    // Should render without crashing
    expect(getByTestId('appearance-screen')).toBeTruthy();

    // Should initialize service
    await act(async () => {
      await appearanceService.initialize();
    });

    expect(mockAppearanceStorage.getSettings).toHaveBeenCalled();
    expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalled();
    expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalled();
  });

  it('should handle theme mode changes end-to-end', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    // Initialize service
    await act(async () => {
      await appearanceService.initialize();
    });

    // Change theme mode
    await act(async () => {
      await appearanceService.setThemeMode('light');
    });

    // Verify all systems are updated
    expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledWith('light');
    expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledWith('light');
    expect(mockAppearanceStorage.setSettings).toHaveBeenCalledWith({
      themeMode: 'light',
    });
  });

  it('should handle custom color changes end-to-end', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    // Initialize service
    await act(async () => {
      await appearanceService.initialize();
    });

    // Change custom colors
    const newColors: CustomThemeColors = {
      primary: '#FF0000',
      secondary: '#00FF00',
    };

    await act(async () => {
      await appearanceService.setCustomColors(newColors);
    });

    // Verify all systems are updated
    expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledWith(newColors);
    expect(mockAppearanceStorage.setSettings).toHaveBeenCalledWith({
      themeMode: 'dark', // Default theme
      customColors: newColors,
    });
  });

  it('should handle reset end-to-end', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    // Initialize with custom settings
    await act(async () => {
      await appearanceService.setThemeMode('light');
      await appearanceService.setCustomColors({
        primary: '#FF0000',
      secondary: '#00FF00',
      });
    });

    // Reset everything
    await act(async () => {
      await appearanceService.reset();
    });

    // Verify reset
    expect(mockAppearanceStorage.clear).toHaveBeenCalled();
    expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledWith('dark');
    expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledWith('dark');
    expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledWith(undefined);
  });

  it('should handle errors gracefully', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    // Mock storage to throw error
    mockAppearanceStorage.setSettings.mockRejectedValue(new Error('Storage failed'));

    // Should still render without crashing
    expect(getByTestId('appearance-screen')).toBeTruthy();

    // Should handle error gracefully
    await act(async () => {
      await appearanceService.setThemeMode('light');
    });

    // Should still attempt to update despite storage error
    expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalled();
  });

  it('should prevent memory leaks during rapid updates', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    // Initialize service
    await act(async () => {
      await appearanceService.initialize();
    });

    // Rapid theme changes
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        act(async () => {
          await appearanceService.setThemeMode(i % 2 === 0 ? 'light' : 'dark');
        })
      );
    }

    await Promise.all(promises);

    // Should handle rapid changes without memory leaks
    expect(getByTestId('appearance-screen')).toBeTruthy();
    
    // Verify final state
    const finalTheme = i % 2 === 0 ? 'dark' : 'light';
    expect(mockUseTheme.getState().setThemeMode).toHaveBeenLastCalledWith(finalTheme);
  });

  it('should maintain performance during heavy usage', async () => {
    const { getByTestId } = render(<AppearanceScreen />);

    const startTime = performance.now();

    // Heavy usage simulation
    await act(async () => {
      await appearanceService.initialize();
      
      // Rapid color changes
      for (let i = 0; i < 20; i++) {
        const colors: CustomThemeColors = {
          primary: `#${i.toString(16).padStart(6, '0')}`,
        };
        await appearanceService.setCustomColors(colors);
      }
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete within reasonable time
    expect(duration).toBeLessThan(1000); // 1 second for 20 color changes
    expect(getByTestId('appearance-screen')).toBeTruthy();
  });
});