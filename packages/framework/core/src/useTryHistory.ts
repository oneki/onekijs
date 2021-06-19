import { Location } from '@oneki/types';
import { useCallback, useEffect, useState } from 'react';
import useTryAppContext from './useTryAppContext';

// change the state every time it changes
const useTryHistory = (): Location[] | undefined => {
  const router = useTryAppContext()?.router;
  const [, setHistory] = useState(router?.history);
  const listener = useCallback(() => {
    if (router?.history) {
      setHistory(router.history);
    }
  }, [setHistory, router?.history]);

  useEffect(() => {
    if (router) {
      const unregister = router.listen(listener);
      return () => {
        unregister();
      };
    }
    return;
  }, [router, listener]);

  return router?.history;
};

export default useTryHistory;
