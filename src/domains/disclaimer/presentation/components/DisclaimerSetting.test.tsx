/**
 * Tests for DisclaimerSetting Component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DisclaimerSetting } from '../DisclaimerSetting';

// Mock dependencies
jest.mock('../../../localization', () => ({
  useLocalization: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@umituz/react-native-design-system', () => ({
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
      warning: '#ff9800',
    },
    spacing: {
      md: 16,
    },
  }),
  withAlpha: (color: string, alpha: number) => `${color}${alpha}`,
}));

describe('DisclaimerSetting', () => {
  it('renders disclaimer card correctly', () => {
    const { getByTestId } = render(<DisclaimerSetting />);

    expect(getByTestId('disclaimer-setting')).toBeTruthy();
  });

  it('opens modal when card is pressed', () => {
    const { getByTestId } = render(<DisclaimerSetting />);

    const card = getByTestId('disclaimer-setting');
    fireEvent.press(card);

    // Modal should be visible now
    expect(getByTestId('close-disclaimer-modal')).toBeTruthy();
  });

  it('closes modal when close button is pressed', () => {
    const { getByTestId } = render(<DisclaimerSetting />);

    // Open modal first
    const card = getByTestId('disclaimer-setting');
    fireEvent.press(card);

    // Close modal
    const closeButton = getByTestId('close-disclaimer-modal');
    fireEvent.press(closeButton);

    // Modal should be closed
    expect(() => getByTestId('close-disclaimer-modal')).toThrow();
  });

  it('uses custom props when provided', () => {
    const customProps = {
      titleKey: 'custom.title',
      messageKey: 'custom.message',
      shortMessageKey: 'custom.shortMessage',
      iconName: 'info',
    };

    const { getByText } = render(<DisclaimerSetting {...customProps} />);

    expect(getByText('custom.title')).toBeTruthy();
    expect(getByText('custom.shortMessage')).toBeTruthy();
  });
});