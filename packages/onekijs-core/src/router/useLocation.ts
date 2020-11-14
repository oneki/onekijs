import { useCallback, useEffect, useState } from 'react';
import { Location } from './typings';
import useAppContext from '../app/useAppContext';

// change the state every time it changes
const useLocation = (): Location => {
  const router = useAppContext().router;
  const [, setLocation] = useState(router.location);
  const listener = useCallback(
    (location) => {
      setLocation(location);
    },
    [setLocation],
  );

  useEffect(() => {
    const unregister = router.listen(listener);
    return () => {
      unregister();
    };
  }, [router, listener]);

  return router.location;
};

export default useLocation;
