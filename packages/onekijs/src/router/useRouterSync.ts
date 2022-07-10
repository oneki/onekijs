import { useAppContext, useRouter, useSettings } from 'onekijs-framework';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ReactRouter } from './ReactRouter';

export const useRouterSync = (): void => {
  const router = useRouter() as ReactRouter;
  const { i18n } = useAppContext();
  const settings = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  router.sync(location, navigate, i18n, settings);

  useEffect(() => {
    router.onLocationChange();
  }, [location, router]);
};
