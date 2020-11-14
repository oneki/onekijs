import { useRouter } from 'next/router';
import { useEffect } from 'react';
import OnekiRouter from './NextRouter';

const useNextRouter = useRouter || (() => null);

export const useRouterSync = (onekiRouter: OnekiRouter): void => {
  const nextRouter = useNextRouter();
  if (typeof window !== 'undefined') {
    onekiRouter.sync(nextRouter);
  }

  useEffect(() => {
    onekiRouter.onLocationChange();
  }, [nextRouter, onekiRouter]);
};
