/**
 * Tests for CloudSyncSetting Component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CloudSyncSetting } from '../CloudSyncSetting';

// Mock lucide-react-native
jest.mock('lucide-react-native', () => ({
  Cloud: 'Cloud',
}));

// Mock SettingsItemCard component
jest.mock('../../../../../presentation/components/SettingsItemCard', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  return {
    SettingsItemCard: ({ icon, title, description, onPress, testID, showSwitch, switchValue, onSwitchChange, disabled }: any) => (
      React.createElement(View, { 
        testID: testID || 'setting-item',
        onTouchEnd: onPress,
        style: { padding: 16 }
      }, [
        React.createElement(Text, { key: 'title' }, title || ''),
        description && React.createElement(Text, { key: 'description' }, description),
        showSwitch && React.createElement(Text, { key: 'switch' }, switchValue ? 'ON' : 'OFF'),
      ])
    ),
  };
});

describe('CloudSyncSetting', () => {
  it('renders with default props', () => {
    const { getByText } = render(<CloudSyncSetting />);
    
    expect(getByText('cloud_sync')).toBeTruthy();
  });

  it('renders with custom title', () => {
    const { getByText } = render(<CloudSyncSetting title="Custom Sync" />);
    
    expect(getByText('Custom Sync')).toBeTruthy();
  });

  it('shows syncing state when isSyncing is true', () => {
    const { getByText } = render(<CloudSyncSetting isSyncing={true} />);
    
    expect(getByText('syncing')).toBeTruthy();
  });

  it('displays custom description when provided', () => {
    const { getByText } = render(
      <CloudSyncSetting description="Custom description" />
    );
    
    expect(getByText('Custom description')).toBeTruthy();
  });

  it('shows last synced time when provided', () => {
    const lastSynced = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const { getByText } = render(<CloudSyncSetting lastSynced={lastSynced} />);
    
    expect(getByText('last_synced_5m_ago')).toBeTruthy();
  });

  it('handles onPress callback', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CloudSyncSetting onPress={mockOnPress} />
    );
    
    const pressable = getByTestId('setting-item');
    fireEvent.press(pressable);
    expect(mockOnPress).toHaveBeenCalled();
  });
});