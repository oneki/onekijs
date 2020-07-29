import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import AppProvider from '../lib/app/AppProvider';
import DefaultLoadingComponent from '../lib/app/DefaultLoadingComponent';
import { createReduxStore, formatSettings } from '../lib/app/utils';
import { isPromise } from '../lib/core/utils/type';
import NextRouter from './NextRouter';
import { NextAppProps } from './typings';

const useNextRouter = useRouter || (() => null);

const useRouterSync = (onekiRouter: any) => {
  const nextRouter = useNextRouter();
  if (typeof window !== 'undefined') {
    onekiRouter.sync(nextRouter);
  }

  useEffect(() => {
    onekiRouter.onLocationChange();
  }, [nextRouter, onekiRouter]);
};

let init = false;
export const App: FC<NextAppProps> = React.memo(
  ({
    settings = {},
    store,
    initialState = {},
    services = [],
    LoadingComponent = DefaultLoadingComponent,
    Component,
    pageProps,
    initialLocale,
    translations,
    i18nNs,
  }) => {
    const router = useMemo(() => new NextRouter(), []);
    useRouterSync(router);

    const [loading, setLoading] = useState(isPromise(initialState) || isPromise(settings));
    const [appSettings, setAppSettings] = useState(isPromise(settings) ? null : settings);
    const [appInitialState, setAppInitialState] = useState(isPromise(initialState) ? null : initialState);

    const appStore = useMemo(() => {
      if (!loading) {
        return store ? store : createReduxStore(appInitialState || {});
      }
      return;
    }, [loading, store, appInitialState]);

    const formattedSettings = useMemo(() => {
      if (appSettings) {
        return formatSettings(appSettings);
      }
      return null;
    }, [appSettings]);

    // const route = useMemo(() => {
    //   if (pageProps.routes && nextRouter.route === '/404') {
    //     return pageProps.routes.find((route) => {
    //       const routeRegex = getRouteRegex(route);
    //       return getRouteMatcher(routeRegex)(nextRouter.asPath);
    //     });
    //   }
    // }, [pageProps.routes, nextRouter.route, nextRouter.asPath]);

    useEffect(() => {
      if (!init) {
        init = true;
        // TODO call initialState and/or settings
        const promises = [
          {
            set: setAppSettings,
            promise: settings,
          },
          {
            set: setAppInitialState,
            promise: initialState,
          },
        ].filter((entry) => isPromise(entry.promise));
        if (promises.length > 0) {
          Promise.all(promises.map((entry) => entry.promise)).then(function (values) {
            values.forEach((v, i) => promises[i].set(v));
            setLoading(false);
          });
        }
      }
    }, [settings, initialState]);

    // useEffect(() => {
    //   if (route) {
    //     Router.replace(route, toRelativeUrl(router.location, { hash: false }), {
    //       shallow: true,
    //     });
    //   }
    // }, [router, route]);

    translations = useMemo(() => {
      const result = pageProps.translations || {};
      if (translations) Object.assign(result, translations);
      return result;
    }, [pageProps.translations, translations]);

    i18nNs = useMemo(() => {
      const ns = Object.keys(pageProps.translations || {});
      if (i18nNs) ns.push(...i18nNs);
      return ns;
    }, [pageProps.translations, i18nNs]);

    initialLocale = useMemo(() => {
      if (pageProps.locale) return pageProps.locale;
      return initialLocale;
    }, [pageProps.locale, initialLocale]);

    if (loading || !appStore) {
      return <LoadingComponent />;
    }

    // if (nextRouter.route === '/404') {
    //   if (route || !router.location) return null;
    //   return <Error code={404} />;
    // }

    init = true;

    const getLayout = (Component && (Component as any).getLayout) || ((page: any) => page);

    return (
      <Provider store={appStore}>
        <AppProvider
          router={router}
          settings={formattedSettings || {}}
          initialLocale={initialLocale}
          translations={translations}
          i18nNs={i18nNs}
          services={services}
        >
          {getLayout(<Component {...pageProps}></Component>)}
        </AppProvider>
      </Provider>
    );
  },
);

App.displayName = 'App';
