import { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultAppContext } from './AppContext';
import { Location } from './typings';

// change the state every time it changes
const useHistory = (): Location[] => {
  const router = useContext(DefaultAppContext).router;
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
