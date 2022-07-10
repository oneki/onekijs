import { AnonymousObject, useAppContext } from 'onekijs-framework';
import { useCallback, useEffect, useState } from 'react';

// change the state every time it changes
const useParams = (): AnonymousObject<string> => {
  const router = useAppContext()?.router;
  const [render, rerender] = useState(false);
  const listener = useCallback(() => {
    rerender(!render);
  }, [render]);

  useEffect(() => {
    if (router) {
      const unregister = router.listen(listener);
      return () => {
        unregister();
      };
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, listener]);
  return router?.params;
};

export default useParams;
