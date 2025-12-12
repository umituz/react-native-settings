/**
 * Tests for SettingsStore and useSettings Hook
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useSettings, useSettingsStore } from '../SettingsStore';
import type { UserSettings } from '../../../domain/repositories/ISettingsRepository';

// Mock storage repository
const mockStorageRepository = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

jest.mock('@umituz/react-native-storage', () => ({
  storageRepository: mockStorageRepository,
  StorageKey: {
    SETTINGS: 'settings',
  },
  createUserKey: (key: string, userId: string) => `${key}_${userId}`,
  unwrap: (result: any, defaultValue: any) => result.success ? result.data : defaultValue,
}));

describe('SettingsStore', () => {
  const mockUserId = 'test-user-123';
  const mockSettings: UserSettings = {
    userId: mockUserId,
    theme: 'dark',
    language: 'en-US',
    notificationsEnabled: true,
    emailNotifications: false,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: false,
    privacyMode: false,
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadSettings', () => {
    it('loads settings successfully from storage', async () => {
      mockStorageRepository.getItem.mockResolvedValue({
        success: true,
        data: mockSettings,
      });

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      expect(result.current.settings).toEqual(mockSettings);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockStorageRepository.getItem).toHaveBeenCalledWith(
        `settings_${mockUserId}`,
        expect.any(Object)
      );
    });

    it('uses default settings when storage fails', async () => {
      mockStorageRepository.getItem.mockResolvedValue({
        success: false,
        error: 'Storage error',
      });
      mockStorageRepository.setItem.mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      expect(result.current.settings).toBeDefined();
      expect(result.current.settings?.userId).toBe(mockUserId);
      expect(result.current.settings?.theme).toBe('auto');
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockStorageRepository.setItem).toHaveBeenCalled();
    });

    it('handles loading state correctly', async () => {
      mockStorageRepository.getItem.mockImplementation(() => new Promise(resolve => 
        setTimeout(() => resolve({ success: true, data: mockSettings }), 100)
      ));

      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.loadSettings(mockUserId);
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.settings).toEqual(mockSettings);
    });

    it('handles storage exceptions', async () => {
      mockStorageRepository.getItem.mockRejectedValue(new Error('Storage exception'));

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to load settings');
      expect(result.current.settings).toBeNull();
    });
  });

  describe('updateSettings', () => {
    it('updates settings successfully', async () => {
      // First load settings
      mockStorageRepository.getItem.mockResolvedValue({
        success: true,
        data: mockSettings,
      });
      mockStorageRepository.setItem.mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      // Then update settings
      const updates = { theme: 'light' as const, notificationsEnabled: false };

      await act(async () => {
        await result.current.updateSettings(updates);
      });

      expect(result.current.settings?.theme).toBe('light');
      expect(result.current.settings?.notificationsEnabled).toBe(false);
      expect(result.current.settings?.updatedAt).toBeInstanceOf(Date);
      expect(mockStorageRepository.setItem).toHaveBeenCalledWith(
        `settings_${mockUserId}`,
        expect.objectContaining({
          theme: 'light',
          notificationsEnabled: false,
        })
      );
    });

    it('auto-initializes settings when not loaded', async () => {
      mockStorageRepository.getItem
        .mockResolvedValueOnce({ success: false, error: 'Not found' })
        .mockResolvedValueOnce({ success: true, data: expect.any(Object) });
      mockStorageRepository.setItem.mockResolvedValue({ success: true });

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.updateSettings({ theme: 'light' as const });
      });

      expect(result.current.settings).toBeDefined();
      expect(result.current.settings?.theme).toBe('light');
    });

    it('handles update failures gracefully', async () => {
      mockStorageRepository.getItem.mockResolvedValue({
        success: true,
        data: mockSettings,
      });
      mockStorageRepository.setItem.mockResolvedValue({
        success: false,
        error: 'Update failed',
      });

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      const originalSettings = result.current.settings;

      await act(async () => {
        await result.current.updateSettings({ theme: 'light' as const });
      });

      // Settings should remain unchanged on failure
      expect(result.current.settings).toEqual(originalSettings);
      expect(result.current.loading).toBe(false);
    });

    it('handles update exceptions', async () => {
      mockStorageRepository.getItem.mockResolvedValue({
        success: true,
        data: mockSettings,
      });
      mockStorageRepository.setItem.mockRejectedValue(new Error('Update exception'));

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      await act(async () => {
        await result.current.updateSettings({ theme: 'light' as const });
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to update settings');
    });
  });

  describe('resetSettings', () => {
    it('resets settings to defaults', async () => {
      mockStorageRepository.getItem.mockResolvedValue({
        success: true,
        data: mockSettings,
      });
      mockStorageRepository.setItem.mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      await act(async () => {
        await result.current.resetSettings(mockUserId);
      });

      expect(result.current.settings?.theme).toBe('auto');
      expect(result.current.settings?.language).toBe('en-US');
      expect(result.current.settings?.notificationsEnabled).toBe(true);
      expect(mockStorageRepository.setItem).toHaveBeenCalledWith(
        `settings_${mockUserId}`,
        expect.objectContaining({
          theme: 'auto',
          language: 'en-US',
        })
      );
    });
  });

  describe('clearError', () => {
    it('clears error state', async () => {
      mockStorageRepository.getItem.mockRejectedValue(new Error('Test error'));

      const { result } = renderHook(() => useSettingsStore());

      await act(async () => {
        await result.current.loadSettings(mockUserId);
      });

      expect(result.current.error).toBe('Failed to load settings');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });
});

describe('useSettings Hook', () => {
  it('provides all store methods and state', () => {
    const { result } = renderHook(() => useSettings());

    expect(result.current).toHaveProperty('settings');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('loadSettings');
    expect(result.current).toHaveProperty('updateSettings');
    expect(result.current).toHaveProperty('resetSettings');
    expect(result.current).toHaveProperty('clearError');
  });

  it('is a thin wrapper around useSettingsStore', () => {
    const storeResult = renderHook(() => useSettingsStore()).result;
    const hookResult = renderHook(() => useSettings()).result;

    expect(Object.keys(storeResult.current)).toEqual(
      expect.arrayContaining(Object.keys(hookResult.current))
    );
  });
});