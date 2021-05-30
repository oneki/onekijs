/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import useLocalService from '../app/useLocalService';
import { AsyncBinder, AsyncBindState } from './typings';
import AsyncBindService from './AsyncBindService';

const useAsyncBind = <T = any>(
  binder: AsyncBinder<T>,
  dependencies: any[] = [],
): [T | undefined, boolean, Error | undefined] => {
  const [state, service] = useLocalService(AsyncBindService, {
    loading: true,
    result: undefined,
    error: undefined,
  } as AsyncBindState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const binderCallback = useCallback(binder, dependencies);

  useEffect(() => {
    service.execute(binderCallback, dependencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binderCallback, ...dependencies]);

  return [state.result, state.loading || false, state.error];
};

export default useAsyncBind;
