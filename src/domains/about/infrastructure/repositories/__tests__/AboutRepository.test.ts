/**
 * Tests for AboutRepository
 */
import { AboutRepository } from '../AboutRepository';
import { AppInfo } from '../../../domain/entities/AppInfo';

describe('AboutRepository', () => {
  let repository: AboutRepository;
  const mockAppInfo: AppInfo = {
    name: 'Test App',
    version: '1.0.0',
    description: 'Test Description',
    developer: 'Test Developer',
  };

  beforeEach(() => {
    repository = new AboutRepository();
  });

  afterEach(() => {
    repository.destroy();
  });

  describe('saveAppInfo', () => {
    it('should save app info successfully', async () => {
      await expect(repository.saveAppInfo(mockAppInfo)).resolves.not.toThrow();
      
      const savedInfo = await repository.getAppInfo();
      expect(savedInfo).toEqual(mockAppInfo);
    });

    it('should throw error for invalid input', async () => {
      await expect(repository.saveAppInfo(null as unknown)).rejects.toThrow('Invalid app info provided');
      await expect(repository.saveAppInfo(undefined as unknown)).rejects.toThrow('Invalid app info provided');
      await expect(repository.saveAppInfo('invalid' as unknown)).rejects.toThrow('Invalid app info provided');
    });

    it('should store a copy of the data', async () => {
      const appInfoCopy = { ...mockAppInfo };
      await repository.saveAppInfo(mockAppInfo);
      
      // Modify original object
      appInfoCopy.name = 'Modified';
      
      const savedInfo = await repository.getAppInfo();
      expect(savedInfo.name).toBe('Test App'); // Should not be affected
    });
  });

  describe('getAppInfo', () => {
    it('should return saved app info', async () => {
      await repository.saveAppInfo(mockAppInfo);
      
      const retrievedInfo = await repository.getAppInfo();
      expect(retrievedInfo).toEqual(mockAppInfo);
    });

    it('should throw error when not initialized', async () => {
      await expect(repository.getAppInfo()).rejects.toThrow('App info not initialized');
    });

    it('should return a copy of the data', async () => {
      await repository.saveAppInfo(mockAppInfo);
      
      const retrievedInfo = await repository.getAppInfo();
      
      // Modify returned object
      const modifiedInfo = { ...retrievedInfo };
      modifiedInfo.name = 'Modified';
      
      // Get it again to verify original is unchanged
      const retrievedInfo2 = await repository.getAppInfo();
      expect(retrievedInfo2.name).toBe('Test App');
    });

    it('should throw error when destroyed', async () => {
      await repository.saveAppInfo(mockAppInfo);
      repository.destroy();
      
      await expect(repository.getAppInfo()).rejects.toThrow('Repository has been destroyed');
    });
  });

  describe('updateAppInfo', () => {
    beforeEach(async () => {
      await repository.saveAppInfo(mockAppInfo);
    });

    it('should update app info successfully', async () => {
      const updates = { name: 'Updated App', version: '2.0.0' };
      
      const updatedInfo = await repository.updateAppInfo(updates);
      
      expect(updatedInfo.name).toBe('Updated App');
      expect(updatedInfo.version).toBe('2.0.0');
      expect(updatedInfo.description).toBe('Test Description'); // Unchanged
      expect(updatedInfo.developer).toBe('Test Developer'); // Unchanged
    });

    it('should throw error when not initialized', async () => {
      const newRepository = new AboutRepository();
      
      await expect(newRepository.updateAppInfo({ name: 'Test' })).rejects.toThrow('App info not initialized');
    });

    it('should throw error for invalid updates', async () => {
      await expect(repository.updateAppInfo(null as unknown)).rejects.toThrow('Invalid updates provided');
      await expect(repository.updateAppInfo(undefined as unknown)).rejects.toThrow('Invalid updates provided');
      await expect(repository.updateAppInfo('invalid' as unknown)).rejects.toThrow('Invalid updates provided');
    });

    it('should return a copy of the updated data', async () => {
      const updates = { name: 'Updated App' };
      
      const updatedInfo = await repository.updateAppInfo(updates);
      
      // Modify returned object
      const modifiedInfo = { ...updatedInfo };
      modifiedInfo.name = 'Modified';
      
      // Get it again to verify original is unchanged
      const updatedInfo2 = await repository.getAppInfo();
      expect(updatedInfo2.name).toBe('Updated App');
    });

    it('should throw error when destroyed', async () => {
      repository.destroy();
      
      await expect(repository.updateAppInfo({ name: 'Test' })).rejects.toThrow('Repository has been destroyed');
    });
  });

  describe('destroy', () => {
    it('should cleanup resources', async () => {
      await repository.saveAppInfo(mockAppInfo);
      
      repository.destroy();
      
      await expect(repository.getAppInfo()).rejects.toThrow('Repository has been destroyed');
      await expect(repository.updateAppInfo({ name: 'Test' })).rejects.toThrow('Repository has been destroyed');
      await expect(repository.saveAppInfo(mockAppInfo)).rejects.toThrow('Repository has been destroyed');
    });

    it('should be safe to call multiple times', async () => {
      await repository.saveAppInfo(mockAppInfo);
      
      repository.destroy();
      repository.destroy(); // Should not throw
      
      await expect(repository.getAppInfo()).rejects.toThrow('Repository has been destroyed');
    });
  });
});