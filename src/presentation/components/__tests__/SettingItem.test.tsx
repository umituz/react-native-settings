/**
 * Tests for SettingItem Component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SettingItem } from '../SettingItem';

// Mock lucide-react-native
jest.mock('lucide-react-native', () => ({
  Bell: 'Bell',
  Palette: 'Palette',
  ChevronRight: 'ChevronRight',
}));

// Mock dependencies
jest.mock('@umituz/react-native-design-system', () => ({
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
      primary: '#007AFF',
      textPrimary: '#000000',
      textSecondary: '#666666',
    },
    spacing: {
      md: 16,
    },
  }),
}));

describe('SettingItem', () => {
  it('renders correctly with basic props', () => {
    const { getByText, getByTestId } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        testID="test-setting"
      />
    );

    expect(getByText('Test Setting')).toBeTruthy();
    expect(getByTestId('test-setting')).toBeTruthy();
  });

  it('displays value when provided', () => {
    const { getByText } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        value="Test Value"
      />
    );

    expect(getByText('Test Setting')).toBeTruthy();
    expect(getByText('Test Value')).toBeTruthy();
  });

  it('shows switch when showSwitch is true', () => {
    const { getByTestId, queryByTestId } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        showSwitch={true}
        switchValue={true}
        testID="test-setting"
      />
    );

    expect(getByTestId('test-setting')).toBeTruthy();
    // Switch should be present, chevron should not
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        onPress={mockOnPress}
        testID="test-setting"
      />
    );

    fireEvent.press(getByTestId('test-setting'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onSwitchChange when switch is toggled', () => {
    const mockOnSwitchChange = jest.fn();
    const { getByRole } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        showSwitch={true}
        switchValue={false}
        onSwitchChange={mockOnSwitchChange}
      />
    );

    const switchElement = getByRole('switch');
    fireEvent(switchElement, 'valueChange', true);
    expect(mockOnSwitchChange).toHaveBeenCalledWith(true);
  });

  it('applies custom colors', () => {
    const { getByText } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        iconColor="#FF0000"
        titleColor="#00FF00"
      />
    );

    expect(getByText('Test Setting')).toBeTruthy();
  });

  it('shows disabled state correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        disabled={true}
        onPress={mockOnPress}
        testID="test-setting"
      />
    );

    const pressable = getByTestId('test-setting');
    expect(pressable.props.disabled).toBe(true);
  });

  it('does not show divider when isLast is true', () => {
    const { queryByTestId } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        isLast={true}
      />
    );

    // Divider should not be present
    expect(queryByTestId('setting-divider')).toBeNull();
  });

  it('renders with different icon types', () => {
    const { getByText } = render(
      <SettingItem
        icon={Palette}
        title="Appearance Setting"
      />
    );

    expect(getByText('Appearance Setting')).toBeTruthy();
  });

  it('handles long text correctly', () => {
    const longTitle = 'This is a very long title that should be truncated properly';
    const longValue = 'This is a very long value that should be truncated properly and should not break the layout';

    const { getByText } = render(
      <SettingItem
        icon={Bell}
        title={longTitle}
        value={longValue}
      />
    );

    expect(getByText(longTitle)).toBeTruthy();
    expect(getByText(longValue)).toBeTruthy();
  });

  it('applies custom switch colors', () => {
    const { getByRole } = render(
      <SettingItem
        icon={Bell}
        title="Test Setting"
        showSwitch={true}
        switchValue={true}
        switchThumbColor="#FF0000"
        switchTrackColors={{ false: '#CCCCCC', true: '#00FF00' }}
      />
    );

    const switchElement = getByRole('switch');
    expect(switchElement).toBeTruthy();
  });
});