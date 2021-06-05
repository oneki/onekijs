import { useCallback, useEffect, useState } from 'react';
import useAppContext from '../app/useAppContext';
import { Location } from '../typings/router';

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
