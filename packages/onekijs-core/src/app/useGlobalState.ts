import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { get } from '../utils/object';
import useGlobalService from './useGlobalService';
import GlobalStateService from './GlobalStateService';
import { SetGlobalStateFunction } from './typings';

function useGlobalState<T = any>(key: string): [T | undefined, SetGlobalStateFunction<T>];
function useGlobalState<T = any>(key: string, defaultValue: undefined): [T | undefined, SetGlobalStateFunction<T>];
function useGlobalState<T = any>(key: string, defaultValue: null): [T | null, SetGlobalStateFunction<T>];
function useGlobalState<T = any>(key: string, defaultValue: T): [T, SetGlobalStateFunction<T>];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useGlobalState(key: string, defaultValue?: any): [any, (value?: any) => void] {
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

export default useGlobalState;
