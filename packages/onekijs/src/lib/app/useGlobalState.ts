import { useCallback } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import useGlobalService from '../core/useGlobalService';
import GlobalStateService from './GlobalStateService';

const defaultSelector = (state: unknown) => state;

const useGlobalState = (
  selector: (state: DefaultRootState) => unknown,
  defaultValue: unknown,
): [unknown, (k: string, value: unknown) => void] => {
  let state = useSelector(selector || defaultSelector);
  state = state === undefined ? defaultValue : state;
  const service = useGlobalService(GlobalStateService);
  const setState = useCallback(
    (key: string, value: unknown) => {
      service.setState(key, value);
    },
    [service],
  );
  return [state, setState];
};

export default useGlobalState;
