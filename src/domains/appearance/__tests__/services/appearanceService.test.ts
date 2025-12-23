/**
 * Appearance Service Tests
 */

import { AppearanceService, appearanceService } from '../../infrastructure/services/appearanceService';
import type { ThemeMode, CustomThemeColors } from '../../types';

// Mock dependencies
jest.mock('../../infrastructure/stores/appearanceStore');
jest.mock('../../infrastructure/storage/appearanceStorage');
jest.mock('@umituz/react-native-design-system', () => ({
  useTheme: {
    getState: jest.fn(() => ({
      setThemeMode: jest.fn(),
    })),
  },
  useDesignSystemTheme: {
    getState: jest.fn(() => ({
      setThemeMode: jest.fn(),
      setCustomColors: jest.fn(),
    })),
  },
}));

const mockAppearanceStore = require('../../infrastructure/stores/appearanceStore').useAppearanceStore;
const mockAppearanceStorage = require('../../infrastructure/storage/appearanceStorage').AppearanceStorage;
const mockUseTheme = require('@umituz/react-native-design-system').useTheme;
const mockUseDesignSystemTheme = require('@umituz/react-native-design-system').useDesignSystemTheme;

describe('AppearanceService', () => {
  let service: AppearanceService;
  let mockGetState: jest.MockedFunction<typeof mockAppearanceStore.getState>;
  let mockSetSettings: jest.MockedFunction<typeof mockAppearanceStore.getState>;
  let mockSetInitialized: jest.MockedFunction<typeof mockAppearanceStore.getState>;
  let mockUpdateThemeMode: jest.MockedFunction<typeof mockAppearanceStore.getState>;
  let mockUpdateCustomColors: jest.MockedFunction<typeof mockAppearanceStore.getState>;
  let mockResetState: jest.MockedFunction<typeof mockAppearanceStore.getState>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    service = appearanceService;
    
    mockGetState = mockAppearanceStore.getState as jest.MockedFunction<typeof mockAppearanceStore.getState>;
    mockSetSettings = mockAppearanceStore.getState as jest.MockedFunction<typeof mockAppearanceStore.getState>;
    mockSetInitialized = mockAppearanceStore.getState as jest.MockedFunction<typeof mockAppearanceStore.getState>;
    mockUpdateThemeMode = mockAppearanceStore.getState as jest.MockedFunction<typeof mockAppearanceStore.getState>;
    mockUpdateCustomColors = mockAppearanceStore.getState as jest.MockedFunction<typeof mockAppearanceStore.getState>;
    mockResetState = mockAppearanceStore.getState as jest.MockedFunction<typeof mockAppearanceStore.getState>;

    // Setup mock implementations
    mockGetState.mockReturnValue({
      settings: { themeMode: 'dark' as ThemeMode },
      isInitialized: false,
    });

    mockSetSettings.mockReturnValue({} as any);
    mockSetInitialized.mockReturnValue({} as any);
    mockUpdateThemeMode.mockReturnValue({} as any);
    mockUpdateCustomColors.mockReturnValue({} as any);
    mockResetState.mockReturnValue({} as any);

    mockAppearanceStorage.getSettings.mockResolvedValue(null);
    mockAppearanceStorage.setSettings.mockResolvedValue();
    mockAppearanceStorage.clear.mockResolvedValue();

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

  describe('initialize', () => {
    it('should initialize with saved settings', async () => {
      const savedSettings = { themeMode: 'light' as ThemeMode };
      mockAppearanceStorage.getSettings.mockResolvedValue(savedSettings);

      await service.initialize();

      expect(mockAppearanceStorage.getSettings).toHaveBeenCalled();
      expect(mockSetSettings).toHaveBeenCalledWith(savedSettings);
      expect(mockSetInitialized).toHaveBeenCalledWith(true);
      expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledWith('light');
      expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledWith('light');
      expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledWith(undefined);
    });

    it('should initialize with default settings when no saved settings', async () => {
      mockAppearanceStorage.getSettings.mockResolvedValue(null);

      await service.initialize();

      expect(mockSetSettings).toHaveBeenCalledWith({ themeMode: 'dark' });
      expect(mockSetInitialized).toHaveBeenCalledWith(true);
      expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledWith('dark');
      expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledWith('dark');
    });

    it('should handle initialization errors gracefully', async () => {
      const error = new Error('Init failed');
      mockAppearanceStorage.getSettings.mockRejectedValue(error);

      await service.initialize();

      expect(mockSetSettings).toHaveBeenCalledWith({ themeMode: 'dark' });
      expect(mockSetInitialized).toHaveBeenCalledWith(true);
    });

    it('should prevent multiple initializations', async () => {
      const savedSettings = { themeMode: 'light' as ThemeMode };
      mockAppearanceStorage.getSettings.mockResolvedValue(savedSettings);

      const promise1 = service.initialize();
      const promise2 = service.initialize();

      await Promise.all([promise1, promise2]);

      expect(mockAppearanceStorage.getSettings).toHaveBeenCalledTimes(1);
    });
  });

  describe('getThemeMode', () => {
    it('should return current theme mode', () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'light' as ThemeMode },
        isInitialized: true,
      });

      const result = service.getThemeMode();

      expect(result).toBe('light');
      expect(mockGetState).toHaveBeenCalled();
    });
  });

  describe('setThemeMode', () => {
    it('should set theme mode and sync with design system', async () => {
      const newMode: ThemeMode = 'light';
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark' as ThemeMode },
        isInitialized: true,
      });

      await service.setThemeMode(newMode);

      expect(mockUpdateThemeMode).toHaveBeenCalledWith(newMode);
      expect(mockAppearanceStorage.setSettings).toHaveBeenCalledWith({
        themeMode: newMode,
      });
      expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledWith(newMode);
      expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledWith(newMode);
    });

    it('should handle setThemeMode errors', async () => {
      const error = new Error('Set theme failed');
      mockAppearanceStorage.setSettings.mockRejectedValue(error);

      await expect(service.setThemeMode('light')).rejects.toThrow(error);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle between light and dark', async () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'light' as ThemeMode },
        isInitialized: true,
      });

      await service.toggleTheme();

      expect(mockUpdateThemeMode).toHaveBeenCalledWith('dark');
    });

    it('should toggle from dark to light', async () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark' as ThemeMode },
        isInitialized: true,
      });

      await service.toggleTheme();

      expect(mockUpdateThemeMode).toHaveBeenCalledWith('light');
    });
  });

  describe('getCustomColors', () => {
    it('should return current custom colors', () => {
      const customColors: CustomThemeColors = { primary: '#FF0000' };
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark', customColors },
        isInitialized: true,
      });

      const result = service.getCustomColors();

      expect(result).toEqual(customColors);
    });

    it('should return undefined when no custom colors', () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark' },
        isInitialized: true,
      });

      const result = service.getCustomColors();

      expect(result).toBeUndefined();
    });
  });

  describe('setCustomColors', () => {
    it('should set custom colors and sync with design system', async () => {
      const newColors: CustomThemeColors = { primary: '#FF0000' };
      const currentColors = { secondary: '#00FF00' };
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark', customColors: currentColors },
        isInitialized: true,
      });

      await service.setCustomColors(newColors);

      expect(mockUpdateCustomColors).toHaveBeenCalledWith({
        ...currentColors,
        ...newColors,
      });
      expect(mockAppearanceStorage.setSettings).toHaveBeenCalledWith({
        themeMode: 'dark',
        customColors: { ...currentColors, ...newColors },
      });
      expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledWith({
        ...currentColors,
        ...newColors,
      });
    });

    it('should handle setCustomColors errors', async () => {
      const error = new Error('Set colors failed');
      mockAppearanceStorage.setSettings.mockRejectedValue(error);

      await expect(service.setCustomColors({ primary: '#FF0000' })).rejects.toThrow(error);
    });
  });

  describe('resetCustomColors', () => {
    it('should reset custom colors', async () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark', customColors: { primary: '#FF0000' } },
        isInitialized: true,
      });

      await service.resetCustomColors();

      expect(mockUpdateCustomColors).toHaveBeenCalledWith(undefined);
      expect(mockAppearanceStorage.setSettings).toHaveBeenCalledWith({
        themeMode: 'dark',
        customColors: undefined,
      });
      expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledWith(undefined);
    });
  });

  describe('reset', () => {
    it('should reset all settings', async () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'light', customColors: { primary: '#FF0000' } },
        isInitialized: true,
      });

      await service.reset();

      expect(mockAppearanceStorage.clear).toHaveBeenCalled();
      expect(mockResetState).toHaveBeenCalled();
      expect(mockUseTheme.getState().setThemeMode).toHaveBeenCalledWith('dark');
      expect(mockUseDesignSystemTheme.getState().setThemeMode).toHaveBeenCalledWith('dark');
      expect(mockUseDesignSystemTheme.getState().setCustomColors).toHaveBeenCalledWith(undefined);
    });
  });

  describe('isInitialized', () => {
    it('should return initialization status', () => {
      mockGetState.mockReturnValue({
        settings: { themeMode: 'dark' },
        isInitialized: true,
      });

      const result = service.isInitialized();

      expect(result).toBe(true);
    });
  });
});