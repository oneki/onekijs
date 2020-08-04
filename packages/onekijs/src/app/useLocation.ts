import { useCallback, useEffect, useState } from 'react';
import { Location } from './typings';
import useAppContext from './useAppContext';

// change the state every time it changes
const useLocation = (): Location => {
  const router = useAppContext().router;
  const [location, setLocation] = useState(router.location);
  const listener = useCallback(
    (location) => {
      setLocation(location);
    },
    [setLocation],
  );

  useEffect(() => {
    router.listen(listener);
    return () => {
      router.unlisten(listener);
    };
  }, [router, listener]);

  return location;
};

export default useLocation;
