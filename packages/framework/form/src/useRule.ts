import { useCallback, useMemo } from 'react';
import { Ruler } from './typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useRule = (ruler: Ruler, dependencies: any[] = []): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rulerCallback = useCallback(ruler, dependencies);

  useMemo(() => {
    rulerCallback(...dependencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rulerCallback, ...dependencies]);
};

export default useRule;
