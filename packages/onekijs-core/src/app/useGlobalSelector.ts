import { useCallback } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import { get } from '../core/utils/object';

function useGlobalSelector<T = any>(selector: string | ((state: DefaultRootState) => unknown)): T | undefined;
function useGlobalSelector<T = any>(
  selector: string | ((state: DefaultRootState) => unknown),
  defaultValue: undefined,
): T | undefined;
function useGlobalSelector<T = any>(
  selector: string | ((state: DefaultRootState) => unknown),
  defaultValue: null,
): T | null;
function useGlobalSelector<T = any>(selector: string | ((state: DefaultRootState) => unknown), defaultValue: T): T;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useGlobalSelector(selector: string | ((state: DefaultRootState) => unknown), defaultValue?: any): any {
  const selectorFunction = useCallback(() => {
    return typeof selector === 'string' ? (state: DefaultRootState) => get(state, selector) : selector;
  }, [selector]);

  const value = useSelector(selectorFunction());
  return value === undefined ? defaultValue : value;
}

export default useGlobalSelector;
export const useReduxSelector = useGlobalSelector; // alias
