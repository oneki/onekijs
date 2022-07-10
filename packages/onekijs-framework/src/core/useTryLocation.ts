import { useCallback, useEffect, useState } from 'react';
import { Location } from '../types/router';
import useTryAppContext from './useTryAppContext';

// change the state every time it changes
const useTryLocation = (): Location | undefined => {
  const router = useTryAppContext()?.router;
  const [, setLocation] = useState(router?.location);
  const listener = useCallback(
    (location: Location) => {
      setLocation(location);
    },
    [setLocation],
  );

  useEffect(() => {
    if (router) {
      const unregister = router.listen(listener);
      return () => {
        unregister();
      };
    }
    return;
  }, [router, listener]);

  return router?.location;
};

export default useTryLocation;
