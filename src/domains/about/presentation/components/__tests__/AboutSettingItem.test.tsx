/**
 * Tests for AboutSettingItem component
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { AboutSettingItem } from '../AboutSettingItem';

describe('AboutSettingItem', () => {
  const defaultProps = {
    title: 'Test Title',
    testID: 'test-item',
  };

  it('should render correctly with minimal props', () => {
    const component = renderer.create(<AboutSettingItem {...defaultProps} />);
    const root = component.root;

    // Check if title is rendered
    // Note: implementation details might vary, finding by text content is safer
    const textNodes = root.findAllByType('span'); // Text mocks to span in setup
    const titleNode = textNodes.find(n => n.props.children === 'Test Title');
    expect(titleNode).toBeDefined();
  });

  it('should render with description', () => {
    const component = renderer.create(
      <AboutSettingItem {...defaultProps} description="Test Description" />
    );
    const root = component.root;
    const textNodes = root.findAllByType('span');
    const descNode = textNodes.find(n => n.props.children === 'Test Description');
    expect(descNode).toBeDefined();
  });

  it('should render with value', () => {
    const component = renderer.create(
      <AboutSettingItem {...defaultProps} value="Test Value" />
    );
    const root = component.root;
    const textNodes = root.findAllByType('span');
    const valueNode = textNodes.find(n => n.props.children === 'Test Value');
    expect(valueNode).toBeDefined();
  });

  it('should render chevron when onPress is provided', () => {
    const component = renderer.create(
      <AboutSettingItem {...defaultProps} onPress={jest.fn()} />
    );
    const root = component.root;
    const textNodes = root.findAllByType('span');
    // Chevron is rendered as text '›'
    const chevronNode = textNodes.find(n => n.props.children === '›');
    expect(chevronNode).toBeDefined();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const component = renderer.create(
      <AboutSettingItem {...defaultProps} onPress={mockOnPress} />
    );
    const root = component.root;

    // Find the touchable element (div in mock)
    const touchable = root.findByProps({ 'data-testid': 'test-item' });

    // Trigger onPress
    touchable.props.onClick();

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});