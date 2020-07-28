import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { get } from '../core/utils/object';
import useGlobalService from '../core/useGlobalService';
import GlobalStateService from './GlobalStateService';

function useGlobalProp<T = any>(key: string): [T | undefined, (value?: T | null | undefined) => void];
function useGlobalProp<T = any>(
  key: string,
  defaultValue: undefined,
): [T | undefined, (value?: T | null | undefined) => void];
function useGlobalProp<T = any>(key: string, defaultValue: null): [T | null, (value?: T | null | undefined) => void];
function useGlobalProp<T = any>(key: string, defaultValue: T): [T, (value?: T | null | undefined) => void];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useGlobalProp(key: string, defaultValue?: any): [any, (value?: any) => void] {
  let value = useSelector((state) => get(state, key));
  value = value === undefined ? defaultValue : value;
  const service = useGlobalService(GlobalStateService);
  const setValue = useCallback(
    (value) => {
      service.setState(key, value);
    },
    [service, key],
  );
  return [value, setValue];
}

export default useGlobalProp;
