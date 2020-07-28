import { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultAppContext } from './AppContext';
import { get } from '../core/utils/object';
import { Collection } from '../core/typings';

// change the state every time it changes
const useParams = (): Collection<string> => {
  const router = useContext(DefaultAppContext).router;
  const [params, setParams] = useState<Collection<string>>(get(router, 'location.params', {}));
  const listener = useCallback(
    (location) => {
      setParams(location.params);
    },
    [setParams],
  );

  useEffect(() => {
    router.listen(listener);
    return () => {
      router.unlisten(listener);
    };
  }, [router, listener]);
  return params;
};

export default useParams;
