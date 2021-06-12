import { AnonymousObject } from '@oneki/types';
import { useCallback, useEffect, useState } from 'react';
import useAppContext from './useAppContext';

// change the state every time it changes
const useParams = (): AnonymousObject<string> => {
  const router = useAppContext().router;
  const [render, rerender] = useState(false);
  const listener = useCallback(() => {
    rerender(!render);
  }, [render]);

  useEffect(() => {
    const unregister = router.listen(listener);
    return () => {
      unregister();
    };
  }, [router, listener]);
  return router.params;
};

export default useParams;
