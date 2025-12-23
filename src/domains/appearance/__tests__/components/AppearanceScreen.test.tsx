/**
 * Component Tests
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { AppearanceScreen } from '../../presentation/screens/AppearanceScreen';
import { ThemeOption } from '../../presentation/components/ThemeOption';
import { ColorPicker } from '../../presentation/components/ColorPicker';
import type { ThemeMode, CustomThemeColors } from '../../types';

// Mock hooks
jest.mock('../../hooks', () => ({
  useAppearance: jest.fn(() => ({
    themeMode: 'dark',
    customColors: {},
    isInitialized: true,
    setThemeMode: jest.fn(),
    toggleTheme: jest.fn(),
    setCustomColors: jest.fn(),
    resetCustomColors: jest.fn(),
    reset: jest.fn(),
  })),
  useAppearanceActions: jest.fn(() => ({
    localCustomColors: {},
    handleThemeSelect: jest.fn(),
    handleColorChange: jest.fn(),
    handleResetColors: jest.fn(),
  })),
}));

const mockUseAppearance = require('../../hooks').useAppearance;
const mockUseAppearanceActions = require('../../hooks').useAppearanceActions;

describe('AppearanceScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly with default props', () => {
    const { getByTestId } = render(<AppearanceScreen />);

    expect(getByTestId('appearance-screen')).toBeTruthy();
  });

  it('should render custom header when provided', () => {
    const CustomHeader = () => <div>Custom Header</div>;
    const { getByText } = render(
      <AppearanceScreen headerComponent={<CustomHeader />} />
    );

    expect(getByText('Custom Header')).toBeTruthy();
  });

  it('should hide theme section when showThemeSection is false', () => {
    const { queryByTestId } = render(
      <AppearanceScreen showThemeSection={false} />
    );

    expect(queryByTestId('theme-mode-section')).toBeFalsy();
  });

  it('should hide colors section when showColorsSection is false', () => {
    const { queryByTestId } = render(
      <AppearanceScreen showColorsSection={false} />
    );

    expect(queryByTestId('custom-colors-section')).toBeFalsy();
  });

  it('should hide preview section when showPreviewSection is false', () => {
    const { queryByTestId } = render(
      <AppearanceScreen showPreviewSection={false} />
    );

    expect(queryByTestId('appearance-preview')).toBeFalsy();
  });

  it('should apply custom container styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <AppearanceScreen containerStyle={customStyle} />
    );

    const container = getByTestId('appearance-screen');
    expect(container.props.style).toEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('should apply custom content container styles', () => {
    const customStyle = { padding: 20 };
    const { getByTestId } = render(
      <AppearanceScreen contentContainerStyle={customStyle} />
    );

    const container = getByTestId('appearance-screen');
    const scrollView = container.findByType('ScrollView');
    expect(scrollView.props.contentContainerStyle).toEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('should handle theme selection', async () => {
    const mockHandleThemeSelect = jest.fn();
    mockUseAppearanceActions.mockReturnValue({
      localCustomColors: {},
      handleThemeSelect: mockHandleThemeSelect,
      handleColorChange: jest.fn(),
      handleResetColors: jest.fn(),
    });

    const { getByTestId } = render(<AppearanceScreen />);

    // Find and click theme option
    const themeOption = getByTestId('theme-option-light');
    await act(async () => {
      fireEvent.press(themeOption);
    });

    expect(mockHandleThemeSelect).toHaveBeenCalledWith('light');
  });

  it('should handle color change', async () => {
    const mockHandleColorChange = jest.fn();
    mockUseAppearanceActions.mockReturnValue({
      localCustomColors: {},
      handleThemeSelect: jest.fn(),
      handleColorChange: mockHandleColorChange,
      handleResetColors: jest.fn(),
    });

    const { getByTestId } = render(<AppearanceScreen />);

    // Find and click color option
    const colorOption = getByTestId('color-option-primary');
    await act(async () => {
      fireEvent.press(colorOption);
    });

    expect(mockHandleColorChange).toHaveBeenCalledWith('primary', expect.any(String));
  });

  it('should handle reset colors', async () => {
    const mockHandleResetColors = jest.fn();
    mockUseAppearanceActions.mockReturnValue({
      localCustomColors: { primary: '#FF0000' },
      handleThemeSelect: jest.fn(),
      handleColorChange: jest.fn(),
      handleResetColors: mockHandleResetColors,
    });

    const { getByTestId } = render(<AppearanceScreen />);

    // Find and click reset button
    const resetButton = getByTestId('reset-colors-button');
    await act(async () => {
      fireEvent.press(resetButton);
    });

    expect(mockHandleResetColors).toHaveBeenCalled();
  });

  it('should not re-render unnecessarily', () => {
    const { rerender } = render(<AppearanceScreen />);

    // Rerender with same props
    rerender(<AppearanceScreen />);

    // Hooks should not be called again for same props
    expect(mockUseAppearance).toHaveBeenCalledTimes(1);
    expect(mockUseAppearanceActions).toHaveBeenCalledTimes(1);
  });

  it('should handle performance optimizations', () => {
    const startTime = performance.now();
    
    const { rerender } = render(<AppearanceScreen />);
    
    // Multiple rerenders
    for (let i = 0; i < 10; i++) {
      rerender(<AppearanceScreen />);
    }
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render quickly even with multiple updates
    expect(renderTime).toBeLessThan(100); // 100ms for 10 renders
  });
});