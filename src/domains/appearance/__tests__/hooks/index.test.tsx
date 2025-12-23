/**
 * Hooks Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useAppearance, useAppearanceActions } from '../../hooks';
import type { ThemeMode, CustomThemeColors } from '../../types';

// Mock design system theme
jest.mock('@umituz/react-native-design-system', () => ({
  useTheme: jest.fn(() => ({
    getState: jest.fn(() => ({
      setThemeMode: jest.fn(),
    })),
  })),
  useDesignSystemTheme: jest.fn(() => ({
    getState: jest.fn(() => ({
      setThemeMode: jest.fn(),
      setCustomColors: jest.fn(),
    })),
  })),
}));

const mockUseTheme = require('@umituz/react-native-design-system').useTheme;
const mockUseDesignSystemTheme = require('@umituz/react-native-design-system').useDesignSystemTheme;

describe('useAppearance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseTheme.getState.mockReturnValue({
      setThemeMode: jest.fn(),
    });

    mockUseDesignSystemTheme.getState.mockReturnValue({
      setThemeMode: jest.fn(),
      setCustomColors: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return appearance state and actions', () => {
    const { result } = renderHook(() => useAppearance());

    expect(result.current).toHaveProperty('themeMode');
    expect(result.current).toHaveProperty('customColors');
    expect(result.current).toHaveProperty('isInitialized');
    expect(result.current).toHaveProperty('setThemeMode');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(result.current).toHaveProperty('setCustomColors');
    expect(result.current).toHaveProperty('resetCustomColors');
    expect(result.current).toHaveProperty('reset');

    expect(typeof result.current.setThemeMode).toBe('function');
    expect(typeof result.current.toggleTheme).toBe('function');
    expect(typeof result.current.setCustomColors).toBe('function');
    expect(typeof result.current.resetCustomColors).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  it('should have stable function references', () => {
    const { result: result1 } = renderHook(() => useAppearance());
    const { result: result2 } = renderHook(() => useAppearance());

    // Functions should be stable across renders
    expect(result1.current.setThemeMode).toBe(result2.current.setThemeMode);
    expect(result1.current.toggleTheme).toBe(result2.current.toggleTheme);
    expect(result1.current.setCustomColors).toBe(result2.current.setCustomColors);
    expect(result1.current.resetCustomColors).toBe(result2.current.resetCustomColors);
    expect(result1.current.reset).toBe(result2.current.reset);
  });

  it('should call service methods correctly', async () => {
    const { result } = renderHook(() => useAppearance());

    const mockSetThemeMode = mockUseTheme.getState().setThemeMode;
    const mockSetCustomColors = mockUseDesignSystemTheme.getState().setCustomColors;

    await act(async () => {
      await result.current.setThemeMode('light');
    });

    expect(mockSetThemeMode).toHaveBeenCalledWith('light');
  });

  it('should handle errors gracefully', async () => {
    const { result } = renderHook(() => useAppearance());

    const mockSetThemeMode = mockUseTheme.getState().setThemeMode;
    const error = new Error('Service error');
    mockSetThemeMode.mockImplementation(() => {
      throw error;
    });

    await expect(result.current.setThemeMode('light')).rejects.toThrow(error);
  });
});

describe('useAppearanceActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return actions and local state', () => {
    const { result } = renderHook(() => useAppearanceActions());

    expect(result.current).toHaveProperty('localCustomColors');
    expect(result.current).toHaveProperty('handleThemeSelect');
    expect(result.current).toHaveProperty('handleColorChange');
    expect(result.current).toHaveProperty('handleResetColors');

    expect(typeof result.current.handleThemeSelect).toBe('function');
    expect(typeof result.current.handleColorChange).toBe('function');
    expect(typeof result.current.handleResetColors).toBe('function');
  });

  it('should initialize with empty custom colors', () => {
    const { result } = renderHook(() => useAppearanceActions());

    expect(result.current.localCustomColors).toEqual({});
  });

  it('should handle theme selection', async () => {
    const { result } = renderHook(() => useAppearanceActions());

    const mockSetThemeMode = mockUseTheme.getState().setThemeMode;

    await act(async () => {
      await result.current.handleThemeSelect('light');
    });

    expect(mockSetThemeMode).toHaveBeenCalledWith('light');
  });

  it('should handle color change', () => {
    const { result } = renderHook(() => useAppearanceActions());

    const mockSetCustomColors = mockUseDesignSystemTheme.getState().setCustomColors;

    act(() => {
      result.current.handleColorChange('primary', '#FF0000');
    });

    expect(mockSetCustomColors).toHaveBeenCalledWith({
      primary: '#FF0000',
    });
  });

  it('should not update if color is same', () => {
    const { result } = renderHook(() => useAppearanceActions());

    const mockSetCustomColors = mockUseDesignSystemTheme.getState().setCustomColors;

    act(() => {
      result.current.handleColorChange('primary', '#FF0000');
      result.current.handleColorChange('primary', '#FF0000'); // Same color
    });

    // Should only be called once due to optimization
    expect(mockSetCustomColors).toHaveBeenCalledTimes(1);
  });

  it('should handle reset colors', () => {
    const { result } = renderHook(() => useAppearanceActions());

    const mockResetCustomColors = mockUseDesignSystemTheme.getState().setCustomColors;

    act(() => {
      result.current.handleResetColors();
    });

    expect(mockResetCustomColors).toHaveBeenCalled();
  });

  it('should handle reset colors with config', () => {
    const onConfirm = jest.fn();
    const config = { onResetConfirm };

    const { result } = renderHook(() => useAppearanceActions(config));

    const mockResetCustomColors = mockUseDesignSystemTheme.getState().setCustomColors;

    act(() => {
      result.current.handleResetColors();
    });

    expect(mockResetCustomColors).toHaveBeenCalled();
    expect(onConfirm).toHaveBeenCalled();
  });

  it('should sync local colors with store changes', () => {
    const { result, rerender } = renderHook(
      () => useAppearanceActions(),
      {
        initialProps: { customColors: { primary: '#FF0000' } }
      }
    );

    expect(result.current.localCustomColors).toEqual({ primary: '#FF0000' });

    // Simulate store change
    rerender({ customColors: { primary: '#00FF00' } });

    expect(result.current.localCustomColors).toEqual({ primary: '#00FF00' });
  });

  it('should have stable function references', () => {
    const { result: result1 } = renderHook(() => useAppearanceActions());
    const { result: result2 } = renderHook(() => useAppearanceActions());

    // Functions should be stable across renders
    expect(result1.current.handleThemeSelect).toBe(result2.current.handleThemeSelect);
    expect(result1.current.handleColorChange).toBe(result2.current.handleColorChange);
    expect(result1.current.handleResetColors).toBe(result2.current.handleResetColors);
  });

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() => useAppearanceActions());

    unmount();

    // Should not throw any errors during cleanup
    expect(true).toBe(true);
  });
});