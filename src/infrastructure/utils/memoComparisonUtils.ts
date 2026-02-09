/**
 * Memo Comparison Utilities
 *
 * Provides reusable comparison functions for React.memo to reduce code duplication.
 * These functions follow best practices for shallow comparison in React components.
 */

/**
 * Standard comparison for components with config and translation props
 * @param prevProps Previous props
 * @param nextProps Next props
 * @returns true if props are equal (should not re-render)
 */
export function compareConfigAndTranslate(
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>
): boolean {
  return (
    prevProps.config === nextProps.config &&
    prevProps.t === nextProps.t
  );
}

/**
 * Standard comparison for components with normalized config and features
 * @param prevProps Previous props
 * @param nextProps Next props
 * @returns true if props are equal (should not re-render)
 */
export function compareConfigAndFeatures(
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>
): boolean {
  return (
    prevProps.normalizedConfig === nextProps.normalizedConfig &&
    prevProps.features === nextProps.features
  );
}

/**
 * Standard comparison for components with single prop
 * @param propKey Property key to compare
 * @returns Comparison function
 */
export function createSinglePropComparator<K extends string>(
  propKey: K
): (prevProps: Record<string, unknown>, nextProps: Record<string, unknown>) => boolean {
  return (prevProps, nextProps) => prevProps[propKey] === nextProps[propKey];
}

/**
 * Standard comparison for components with gamification config
 * @param prevProps Previous props
 * @param nextProps Next props
 * @returns true if props are equal (should not re-render)
 */
export function compareGamificationProps(
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>
): boolean {
  return (
    prevProps.config === nextProps.config &&
    prevProps.gamificationConfig === nextProps.gamificationConfig &&
    prevProps.t === nextProps.t
  );
}
