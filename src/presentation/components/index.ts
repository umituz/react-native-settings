/**
 * Presentation Components - Public API
 *
 * Shared UI components for the entire application.
 *
 * @example
 * ```ts
 * import { GenericModal, GenericScreen } from '@/presentation/components';
 *
 * const modal = useModalState();
 * return <GenericModal state={modal} />;
 * ```
 */

// =============================================================================
// MODAL COMPONENTS
// =============================================================================

export { GenericModal } from './GenericModal';
export type { GenericModalProps } from './GenericModal';

// =============================================================================
// SCREEN COMPONENTS
// =============================================================================

export { GenericScreen } from './GenericScreen';
export type { GenericScreenProps } from './GenericScreen';
