/**
 * useModalState Hook
 *
 * Generic modal state management hook.
 * Replaces modal-specific state logic across domains.
 *
 * @example
 * ```ts
 * const modal = useModalState();
 *
 * // Show modal
 * modal.show({
 *   title: 'Confirm',
 *   message: 'Are you sure?',
 *   actions: [...]
 * });
 *
 * // Hide modal
 * modal.hide();
 * ```
 */

import { useCallback, useState } from 'react';
import type { ModalConfig, ModalState } from './ModalConfig';

/**
 * Generic modal state management hook
 */
export function useModalState(initialConfig: ModalConfig | null = null): ModalState {
  const [config, setConfig] = useState<ModalConfig | null>(initialConfig);
  const [visible, setVisible] = useState(false);

  const show = useCallback((newConfig: ModalConfig) => {
    setConfig(newConfig);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    // Note: We keep config for animation purposes
    // It will be reset when modal closes completely
  }, []);

  const update = useCallback((updates: Partial<ModalConfig>) => {
    setConfig((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  return {
    visible,
    config,
    show,
    hide,
    update,
  };
}

/**
 * Extended modal state with result handling
 *
 * @example
 * ```ts
 * const modal = useModalStateWithResult<string>();
 *
 * const result = await modal.showAsync({
 *   title: 'Input',
 *   actions: [
 *     { label: 'OK', onPress: (resolve) => resolve('data') }
 *   ]
 * });
 *
 * if (result.confirmed) {
 *   console.log(result.data);
 * }
 * ```
 */
export function useModalStateWithResult<T = void>() {
  const [config, setConfig] = useState<ModalConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const [resolver, setResolver] = useState<{
    resolve: (result: import('./ModalConfig').ModalResult<T>) => void;
    reject: (error: Error) => void;
  } | null>(null);

  const showAsync = useCallback(
    (newConfig: ModalConfig): Promise<import('./ModalConfig').ModalResult<T>> => {
      return new Promise((resolve, reject) => {
        setResolver({ resolve, reject });
        setConfig(newConfig);
        setVisible(true);
      });
    },
    []
  );

  const hide = useCallback(() => {
    setVisible(false);
    resolver?.resolve({ confirmed: false });
    setResolver(null);
  }, [resolver]);

  const confirm = useCallback(
    (data?: T) => {
      setVisible(false);
      resolver?.resolve({ confirmed: true, data: data as T });
      setResolver(null);
    },
    [resolver]
  );

  const update = useCallback((updates: Partial<ModalConfig>) => {
    setConfig((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  return {
    visible,
    config,
    showAsync,
    hide,
    confirm,
    update,
  };
}
