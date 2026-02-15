/**
 * Mount Safety Hook
 * Provides safe mounted state tracking to prevent state updates after unmount
 *
 * @example
 * ```typescript
 * const isMountedRef = useMountSafety();
 *
 * const fetchData = async () => {
 *   const data = await api.fetch();
 *   if (isMountedRef.current) {
 *     setData(data);
 *   }
 * };
 * ```
 */
import { useRef, useEffect } from 'react';

export const useMountSafety = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
};
