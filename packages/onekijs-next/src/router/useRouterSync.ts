import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import OnekiRouter from './NextRouter';

export const useRouterSync = (onekiRouter: OnekiRouter): void => {
  const nextRouter = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  onekiRouter.sync(pathname, search, nextRouter);

  useEffect(() => {
    onekiRouter.onLocationChange();
  }, [pathname, search, onekiRouter]);
};
