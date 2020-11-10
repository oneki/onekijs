import { useCallback } from 'react';
import useGlobalService from '../core/useGlobalService';
import GlobalStateService from './GlobalStateService';
import { GlobalModifierFunction } from './typings';

const useGlobalModifier = (): GlobalModifierFunction => {
  const service = useGlobalService(GlobalStateService);
  const setState = useCallback(
    (key: string, value: unknown) => {
      service.setState(key, value);
    },
    [service],
  );
  return setState;
};

export default useGlobalModifier;
