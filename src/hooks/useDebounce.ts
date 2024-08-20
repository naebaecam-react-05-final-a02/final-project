import { debounce, DebouncedFunc } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): DebouncedFunc<T> {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useRef<DebouncedFunc<T>>();

  useEffect(() => {
    debouncedFn.current = debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay);

    return () => {
      debouncedFn.current?.cancel();
    };
  }, [delay]);

  return useCallback(
    (...args: Parameters<T>) => {
      debouncedFn.current?.(...args);
    },
    [debouncedFn],
  ) as DebouncedFunc<T>;
}
