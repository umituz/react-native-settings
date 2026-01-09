/**
 * ID Generator Utility
 * Generates unique IDs for entities
 */

export const generateId = (prefix: string = 'id'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${prefix}_${timestamp}_${random}`;
};

export const generateReminderId = (): string => {
  return generateId('reminder');
};
