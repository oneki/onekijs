import { useCallback } from 'react';
import { AnyState, State } from '../types/state';
import LocalStateService from './LocalStateService';
import useLocalService from './useLocalService';

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