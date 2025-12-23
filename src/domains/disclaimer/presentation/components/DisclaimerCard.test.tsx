/**
 * Tests for DisclaimerCard Component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DisclaimerCard } from '../DisclaimerCard';

// Mock dependencies
jest.mock('@umituz/react-native-design-system', () => ({
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
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
  AtomicText: ({ children, type, color, style }: any) => (
    <Text style={style} testID={`atomic-text-${type}-${color}`}>
      {children}
    </Text>
  ),
  AtomicIcon: ({ name, color, size, style }: any) => (
    <Text style={style} testID={`atomic-icon-${name}-${color}-${size}`}>
      Icon: {name}
    </Text>
  ),
}));

import { Text } from 'react-native';

describe('DisclaimerCard', () => {
  it('renders correctly with basic props', () => {
    const { getByTestId, getByText } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={jest.fn()}
      />
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Message')).toBeTruthy();
    expect(getByTestId('disclaimer-setting')).toBeTruthy();
    expect(getByTestId('atomic-icon-AlertTriangle-warning')).toBeTruthy();
    expect(getByTestId('atomic-icon-ArrowRight-secondary-sm')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByTestId('disclaimer-setting'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling with theme tokens', () => {
    const { getByTestId } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={jest.fn()}
      />
    );

    const card = getByTestId('disclaimer-setting');
    expect(card.props.style).toContainEqual({
      backgroundColor: '#FFF3E0',
    });
  });

  it('renders with different icon names', () => {
    const { getByTestId } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="info"
        iconColor="#2196F3"
        backgroundColor="#E3F2FD"
        onPress={jest.fn()}
      />
    );

    expect(getByTestId('atomic-icon-info-warning')).toBeTruthy();
  });

  it('handles long text content', () => {
    const longTitle = 'This is a very long disclaimer title that should be handled properly';
    const longMessage = 'This is a very long disclaimer message that should wrap properly and not break the layout';

    const { getByText } = render(
      <DisclaimerCard
        title={longTitle}
        shortMessage={longMessage}
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={jest.fn()}
      />
    );

    expect(getByText(longTitle)).toBeTruthy();
    expect(getByText(longMessage)).toBeTruthy();
  });

  it('has correct accessibility properties', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={mockOnPress}
      />
    );

    const touchable = getByTestId('disclaimer-setting');
    expect(touchable.props.activeOpacity).toBe(0.7);
  });

  it('uses withAlpha utility correctly', () => {
    const { withAlpha } = require('@umituz/react-native-design-system');

    render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={jest.fn()}
      />
    );

    expect(withAlpha).toHaveBeenCalledWith('#FF9800', 0.2);
    expect(withAlpha).toHaveBeenCalledWith('#FF9800', 0.4);
  });

  it('maintains correct layout structure', () => {
    const { getByTestId } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={jest.fn()}
      />
    );

    // Check that icon container has correct styles
    expect(getByTestId('atomic-icon-AlertTriangle-warning')).toBeTruthy();

    // Check that title and arrow are present
    expect(getByTestId('atomic-icon-ArrowRight-secondary-sm')).toBeTruthy();
  });

  it('handles press events correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <DisclaimerCard
        title="Test Title"
        shortMessage="Test Message"
        iconName="AlertTriangle"
        iconColor="#FF9800"
        backgroundColor="#FFF3E0"
        onPress={mockOnPress}
      />
    );

    // Test single press
    fireEvent.press(getByTestId('disclaimer-setting'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);

    // Test multiple presses
    fireEvent.press(getByTestId('disclaimer-setting'));
    fireEvent.press(getByTestId('disclaimer-setting'));
    expect(mockOnPress).toHaveBeenCalledTimes(3);
  });
});