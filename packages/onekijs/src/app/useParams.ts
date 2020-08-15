import { useCallback, useEffect, useState } from 'react';
import { get } from '../core/utils/object';
import useAppContext from './useAppContext';
import { AnonymousObject } from '../core/typings';

// change the state every time it changes
const useParams = (): AnonymousObject<string> => {
  const router = useAppContext().router;
  const [params, setParams] = useState<AnonymousObject<string>>(get(router, 'location.params', {}));
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
