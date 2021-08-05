import { useCallback, useEffect, useState } from 'react';
import { AnonymousObject } from '../types/object';
import useTryAppContext from './useTryAppContext';

// change the state every time it changes
const useTryParams = (): AnonymousObject<string> | undefined => {
  const router = useTryAppContext()?.router;
  const [render, rerender] = useState(false);
  const listener = useCallback(() => {
    rerender(!render);
  }, [render]);

  useEffect(() => {
    if (router) {
      const unregister = router.listen(listener);
      return () => {
        unregister();
      };
    }
    return;
  }, [router, listener]);
  return router?.params;
};

export default useTryParams;
