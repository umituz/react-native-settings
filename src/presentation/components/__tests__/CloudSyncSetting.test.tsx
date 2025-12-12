/**
 * Tests for CloudSyncSetting Component
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { CloudSyncSetting } from '../CloudSyncSetting';

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
    const { getByText } = render(
      <CloudSyncSetting onPress={mockOnPress} />
    );
    
    const pressable = getByText('cloud_sync').parent;
    if (pressable) {
      pressable.props.onPress();
      expect(mockOnPress).toHaveBeenCalled();
    }
  });
});