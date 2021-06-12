/* eslint-disable @typescript-eslint/no-explicit-any */
import { useService } from '@oneki/core';
import { useCallback, useEffect } from 'react';
import AsyncBindService from './AsyncBindService';
import { AsyncBinder, AsyncBindState } from './typings';

const useAsyncBind = <T = any>(
  binder: AsyncBinder<T>,
  dependencies: any[] = [],
): [T | undefined, boolean, Error | undefined] => {
  const [state, service] = useService(AsyncBindService, {
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
