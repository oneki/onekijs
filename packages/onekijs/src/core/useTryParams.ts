import { useCallback, useContext, useEffect, useState } from 'react';
import { RouterContext } from '../router/Router';
import { AnonymousObject } from '../types/object';
import useTryAppContext from './useTryAppContext';

// change the state every time it changes
const useTryParams = (): AnonymousObject<string> | undefined => {
  const router = useTryAppContext()?.router;
  let RouterClass = RouterContext;
  if (router) {
    RouterClass = router.getReactContext();
  }
  const context = useContext(RouterClass);
  const [render, rerender] = useState(false);
  const listener = useCallback(() => {
    rerender(!render);
  }, [render]);

  useEffect(() => {
    if (router && context === undefined) {
      const unregister = router.listen(listener);
      return () => {
        unregister();
      };
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, listener]);
  if (context) {
    // TODO instanceof ReactRouter
    return context.match ? context.match.params : {};
  } else {
    return router?.params;
  }
};

export default useTryParams;
