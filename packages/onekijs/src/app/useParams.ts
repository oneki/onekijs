import { useCallback, useEffect, useState } from 'react';
import { Collection } from '../core/typings';
import { get } from '../core/utils/object';
import useAppContext from './useAppContext';

// change the state every time it changes
const useParams = (): Collection<string> => {
  const router = useAppContext().router;
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
