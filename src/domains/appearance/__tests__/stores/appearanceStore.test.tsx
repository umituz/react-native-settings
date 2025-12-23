/**
 * Appearance Store Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useAppearanceStore } from '../../infrastructure/stores/appearanceStore';
import type { AppearanceSettings, ThemeMode, CustomThemeColors } from '../../types';

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

const mockUseTheme = require('@umituz/react-native-design-system').useTheme;
const mockUseDesignSystemTheme = require('@umituz/react-native-design-system').useDesignSystemTheme;

describe('useAppearanceStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with default settings', () => {
    const { result } = renderHook(() => useAppearanceStore());

    expect(result.current).toEqual({
      settings: {
        themeMode: 'dark',
      },
      isInitialized: false,
    });

    expect(typeof result.current.setSettings).toBe('function');
    expect(typeof result.current.setInitialized).toBe('function');
    expect(typeof result.current.updateThemeMode).toBe('function');
    expect(typeof result.current.updateCustomColors).toBe('function');
    expect(typeof result.current.resetState).toBe('function');
  });

  it('should update settings correctly', () => {
    const { result } = renderHook(() => useAppearanceStore());

    const newSettings: AppearanceSettings = {
      themeMode: 'light',
      customColors: { primary: '#FF0000' },
    };

    act(() => {
      result.current.setSettings(newSettings);
    });

    expect(result.current.settings).toEqual(newSettings);
    expect(mockUseTheme.getState().setThemeMode).not.toHaveBeenCalled();
    expect(mockUseDesignSystemTheme.getState().setThemeMode).not.toHaveBeenCalled();
  });

  it('should update theme mode correctly', () => {
    const { result } = renderHook(() => useAppearanceStore());

    act(() => {
      result.current.updateThemeMode('light');
    });

    expect(result.current.settings.themeMode).toBe('light');
    expect(mockUseTheme.getState().setThemeMode).not.toHaveBeenCalled();
    expect(mockUseDesignSystemTheme.getState().setThemeMode).not.toHaveBeenCalled();
  });

  it('should not update theme mode if same value', () => {
    const { result } = renderHook(() => useAppearanceStore());

    act(() => {
      result.current.updateThemeMode('dark'); // Default is dark
    });

    expect(result.current.settings.themeMode).toBe('dark');
  });

  it('should update custom colors correctly', () => {
    const { result } = renderHook(() => useAppearanceStore());

    const newColors: CustomThemeColors = { primary: '#FF0000' };

    act(() => {
      result.current.updateCustomColors(newColors);
    });

    expect(result.current.settings.customColors).toEqual(newColors);
  });

  it('should not update custom colors if same value', () => {
    const { result } = renderHook(() => useAppearanceStore());

    const newColors: CustomThemeColors = { primary: '#FF0000' };

    act(() => {
      result.current.updateCustomColors(newColors);
      result.current.updateCustomColors(newColors); // Second call with same value
    });

    // Should only be called once due to optimization
    expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledTimes(1);
  });

  it('should reset state correctly', () => {
    const { result } = renderHook(() => useAppearanceStore());

    const customColors: CustomThemeColors = { primary: '#FF0000' };

    act(() => {
      result.current.updateCustomColors(customColors);
      result.current.setInitialized(true);
      result.current.resetState();
    });

    expect(result.current.settings).toEqual({
      themeMode: 'dark',
    });
    expect(result.current.isInitialized).toBe(false);
  });

  it('should not reset if already at default', () => {
    const { result } = renderHook(() => useAppearanceStore());

    act(() => {
      result.current.resetState();
      result.current.resetState(); // Second call
    });

    // Should only be called once due to optimization
    expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledTimes(1);
    expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledTimes(1);
  });

  it('should handle setInitialized correctly', () => {
    const { result } = renderHook(() => useAppearanceStore());

    act(() => {
      result.current.setInitialized(true);
    });

    expect(result.current.isInitialized).toBe(true);

    act(() => {
      result.current.setInitialized(true); // Second call with same value
    });

    // Should not be called again due to optimization
    expect(result.current.isInitialized).toBe(true);
  });

  it('should handle setInitialized changes correctly', () => {
    const { result } = renderHook(() => useAppearanceStore());

    act(() => {
      result.current.setInitialized(false);
      result.current.setInitialized(true);
    });

    expect(result.current.isInitialized).toBe(true);
  });
});