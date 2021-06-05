import { useCallback, useEffect, useState } from 'react';
import useAppContext from '../app/useAppContext';
import { Location } from '../typings/router';

// change the state every time it changes
const useHistory = (): Location[] => {
  const router = useAppContext().router;
  const [, setHistory] = useState(router.history);
  const listener = useCallback(() => {
    setHistory(router.history);
  }, [setHistory, router.history]);

  useEffect(() => {
    const unregister = router.listen(listener);
    return () => {
      unregister();
    };
  }, [router, listener]);

  return router.history;
};

export default useHistory;
