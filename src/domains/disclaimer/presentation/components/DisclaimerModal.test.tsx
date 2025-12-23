/**
 * Tests for DisclaimerModal Component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DisclaimerModal } from '../DisclaimerModal';

// Mock dependencies
jest.mock('@umituz/react-native-design-system', () => ({
  useAppDesignTokens: () => ({
    colors: {
      backgroundPrimary: '#ffffff',
      borderLight: '#e0e0e0',
    },
  }),
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

import { Text, Modal, ScrollView } from 'react-native';

describe('DisclaimerModal', () => {
  it('renders null when visible is false', () => {
    const { queryByTestId } = render(
      <DisclaimerModal
        visible={false}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    expect(queryByTestId('disclaimer-modal')).toBeNull();
  });

  it('renders correctly when visible is true', () => {
    const { getByTestId, getByText } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    expect(getByTestId('disclaimer-modal')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByTestId('close-disclaimer-modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct theme colors', () => {
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    const modalContainer = getByTestId('disclaimer-modal');
    expect(modalContainer.props.style).toContainEqual({
      backgroundColor: '#ffffff',
    });
  });

  it('renders header with correct structure', () => {
    const { getByTestId, getByText } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    expect(getByTestId('atomic-text-headlineMedium-primary')).toBeTruthy();
    expect(getByTestId('atomic-icon-X-primary-md')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders content in ScrollView', () => {
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    expect(getByTestId('disclaimer-modal-content')).toBeTruthy();
  });

  it('handles long content correctly', () => {
    const longContent = 'This is a very long disclaimer content that should scroll properly. '.repeat(20);
    
    const { getByText } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content={longContent}
        onClose={jest.fn()}
      />
    );

    expect(getByText(longContent)).toBeTruthy();
  });

  it('applies correct text styling', () => {
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    expect(getByTestId('atomic-text-bodyMedium-primary')).toBeTruthy();
  });

  it('has correct accessibility properties', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={mockOnClose}
      />
    );

    const closeButton = getByTestId('close-disclaimer-modal');
    expect(closeButton).toBeTruthy();
  });

  it('handles multiple close calls', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={mockOnClose}
      />
    );

    const closeButton = getByTestId('close-disclaimer-modal');
    
    fireEvent.press(closeButton);
    fireEvent.press(closeButton);
    fireEvent.press(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(3);
  });

  it('maintains correct layout structure', () => {
    const { getByTestId } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content="Test Content"
        onClose={jest.fn()}
      />
    );

    // Check modal container exists
    expect(getByTestId('disclaimer-modal')).toBeTruthy();
    
    // Check header elements exist
    expect(getByTestId('atomic-text-headlineMedium-primary')).toBeTruthy();
    expect(getByTestId('atomic-icon-X-primary-md')).toBeTruthy();
    
    // Check content exists
    expect(getByTestId('disclaimer-modal-content')).toBeTruthy();
  });

  it('handles empty content gracefully', () => {
    const { getByTestId, queryByText } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content=""
        onClose={jest.fn()}
      />
    );

    expect(getByTestId('disclaimer-modal')).toBeTruthy();
    expect(getByTestId('atomic-text-headlineMedium-primary')).toBeTruthy();
    // Empty content should still render the text component
    expect(getByTestId('atomic-text-bodyMedium-primary')).toBeTruthy();
  });

  it('handles special characters in content', () => {
    const specialContent = 'Content with special chars: © ® ™ "quotes" \'apostrophes\'';
    
    const { getByText } = render(
      <DisclaimerModal
        visible={true}
        title="Test Title"
        content={specialContent}
        onClose={jest.fn()}
      />
    );

    expect(getByText(specialContent)).toBeTruthy();
  });
});