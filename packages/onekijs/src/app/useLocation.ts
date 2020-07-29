import { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultAppContext } from './AppContext';
import { Location } from './typings';

// change the state every time it changes
const useLocation = (): Location => {
  const router = useContext(DefaultAppContext).router;
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
