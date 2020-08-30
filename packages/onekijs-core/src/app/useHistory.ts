import { useCallback, useEffect, useState } from 'react';
import { Location } from './typings';
import useAppContext from './useAppContext';

// change the state every time it changes
const useHistory = (): Location[] => {
  const router = useAppContext().router;
  const [history, setHistory] = useState(router.history);
  const listener = useCallback(() => {
    setHistory(router.history);
  }, [setHistory, router.history]);

  useEffect(() => {
    router.listen(listener);
    return () => {
      router.unlisten(listener);
    };
  }, [router, listener]);

  return history;
};

export default useHistory;
