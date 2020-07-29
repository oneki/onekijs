import { useCallback } from 'react';
import useGlobalService from '../core/useGlobalService';
import GlobalStateService from './GlobalStateService';

const useGlobalStateModifier = (): ((key: string, value: unknown) => void) => {
  const service = useGlobalService(GlobalStateService);
  const setState = useCallback(
    (key: string, value: unknown) => {
      service.setState(key, value);
    },
    [service],
  );
  return setState;
};

export default useGlobalStateModifier;
