import { AppSettings, I18n, useI18n, useRouter, useSettings } from 'onekijs-framework';
import { FC, useEffect } from 'react';
import { DataRouter, Location as ReactRouterLocation, RouterProvider, RouterProviderProps } from 'react-router';
import { ReactRouter } from './ReactRouter';

export interface DataRouterProviderProps extends Omit<RouterProviderProps, 'router'> {
  /** The React Router data router created with `createBrowserRouter`, `createHashRouter`, or `createMemoryRouter`. */
  router: DataRouter;
}

const syncRouter = (
  router: ReactRouter,
  dataRouter: DataRouter,
  location: ReactRouterLocation,
  i18n: I18n,
  settings: AppSettings,
): void => {
  if (router.syncDataRouter(dataRouter, location, i18n, settings)) {
    router.onLocationChange();
  }
};

/**
 * Renders a React Router data router and keeps Oneki's `useRouter()` state in sync.
 *
 * Render this as a direct child of `<App>` instead of JSX `<Routes>`.
 */
export const DataRouterProvider: FC<DataRouterProviderProps> = ({ router: dataRouter, ...props }) => {
  const router = useRouter() as ReactRouter;
  const i18n = useI18n();
  const settings = useSettings();

  useEffect(() => {
    syncRouter(router, dataRouter, dataRouter.state.location, i18n, settings);
    return dataRouter.subscribe((state) => {
      syncRouter(router, dataRouter, state.location, i18n, settings);
    });
  }, [dataRouter, i18n, router, settings]);

  return <RouterProvider router={dataRouter} {...props} />;
};
