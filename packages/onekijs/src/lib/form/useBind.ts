import { useCallback, useMemo } from 'react';
import { Binder } from './typings';

const useBind = <T = any>(binder: Binder<T>, dependencies: any[] = []): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const binderCallback = useCallback(binder, dependencies);

  return useMemo(() => {
    return binderCallback(...dependencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binderCallback, ...dependencies]);
};

export default useBind;
