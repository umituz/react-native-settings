/**
 * Core Layer - Public API
 *
 * Foundational utilities and base classes for the entire application.
 *
 * @example
 * ```ts
 * import { BaseService, logger, ModalPresets } from '@/core';
 *
 * class MyService extends BaseService {
 *   protected serviceName = 'MyService';
 * }
 * ```
 */

// =============================================================================
// BASE CLASSES
// =============================================================================

export { BaseService } from './base/BaseService';
export type { Result, AsyncResult } from './base/BaseService';

// =============================================================================
// UTILITIES
// =============================================================================

export { logger, log, createLogger } from './utils/logger';
export type { Logger, LogContext } from './utils/logger';

export { validators, valid, invalid, validateAll } from './utils/validators';
export type { ValidationResult } from './utils/validators';

// =============================================================================
// PATTERNS - MODAL
// =============================================================================

export { useModalState, useModalStateWithResult } from './patterns/Modal/useModalState';
export type { ModalState, ModalConfig, ModalAction, ModalContent, ModalBehavior, ModalResult } from './patterns/Modal/ModalConfig';
export { ModalPresets, confirmed, dismissed } from './patterns/Modal/ModalConfig';

// =============================================================================
// PATTERNS - SCREEN
// =============================================================================

export { useScreenData, useSimpleScreenData } from './patterns/Screen/useScreenData';
export type {
  ScreenData,
  ScreenDataState,
  ScreenDataActions,
  ScreenFetchFunction,
  ScreenConfig,
  ScreenHeader,
  ScreenLoading,
  ScreenError,
  ScreenEmpty,
  ScreenLayout,
  UseScreenDataOptions,
} from './patterns/Screen/ScreenConfig';

export { ScreenPresets } from './patterns/Screen/ScreenConfig';
