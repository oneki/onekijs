import { useCallback } from 'react';
import useLocalService from '../core/useLocalService';
import LocalStateService from './LocalStateService';
import { State, AnyState } from '../core/typings';

export const useLocalState = <T extends State = AnyState>(
  initialState: T,
): [T, (key: string, value: unknown) => void] => {
  const [state, service] = useLocalService(LocalStateService, initialState);
  const setState = useCallback(
    (key, value) => {
      service.setState(key, value);
    },
    [service],
  );
  return [state, setState];
};
