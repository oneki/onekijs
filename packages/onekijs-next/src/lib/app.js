import { getRouteMatcher } from 'next/dist/next-server/lib/router/utils/route-matcher';
import { getRouteRegex } from 'next/dist/next-server/lib/router/utils/route-regex';
import Error from 'next/error';
import Router, { useRouter } from 'next/router';
import {
  AppProvider,
  createReduxStore,
  DefaultLoadingComponent,
  flattenTranslations,
  formatSettings,
  isPromise,
  toRelativeUrl,
} from 'onekijs-core';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import NextRouter from './router';

const useNextRouter = useRouter || (() => null);

const useRouterSync = (onekiRouter) => {
  const nextRouter = useNextRouter();
  if (typeof window !== 'undefined') {
    onekiRouter.sync(nextRouter);
  }

  useEffect(() => {
    onekiRouter.onLocationChange();
  }, [nextRouter, onekiRouter]);
};

let init = false;
export const App = React.memo(
  ({
    settings = {},
    store,
    initialState = {},
    services = [],
    LoadingComponent = DefaultLoadingComponent,
    Component,
    pageProps,
    router: nextRouter,
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
        return store ? store : createReduxStore(appInitialState);
      }
    }, [loading, store, appInitialState]);

    const formattedSettings = useMemo(() => {
      return formatSettings(appSettings);
    }, [appSettings]);
    router.settings = formattedSettings;

    const route = useMemo(() => {
      if (pageProps.routes && nextRouter.route === '/404') {
        return pageProps.routes.find((route) => {
          const routeRegex = getRouteRegex(route);
          return getRouteMatcher(routeRegex)(nextRouter.asPath);
        });
      }
    }, [pageProps.routes, nextRouter.route, nextRouter.asPath]);

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

    useEffect(() => {
      if (route) {
        Router.replace(route, toRelativeUrl(router.location, { hash: false }), {
          shallow: true,
        });
      }
    }, [router, route]);

    translations = useMemo(() => {
      const result = flattenTranslations(pageProps.translations || {});
      if (translations) Object.assign(result, flattenTranslations(translations));
      return result;
    }, [pageProps.translations, translations]);

    i18nNs = useMemo(() => {
      const ns = Object.keys(pageProps.translations || {});
      if (i18nNs) ns.push(i18nNs);
      return ns;
    }, [pageProps.translations, i18nNs]);

    initialLocale = useMemo(() => {
      if (pageProps.locale) return pageProps.locale;
      return initialLocale;
    }, [pageProps.locale, initialLocale]);

    if (loading) {
      return <LoadingComponent />;
    }

    if (nextRouter.route === '/404') {
      if (route || !router.location) return null;
      return <Error code={404} />;
    }

    init = true;

    const getLayout = (Component && Component.getLayout) || ((page) => page);

    return (
      <Provider store={appStore}>
        <AppProvider
          router={router}
          settings={formattedSettings}
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
App.propTypes = {
  settings: PropTypes.object,
  store: PropTypes.object,
  initialState: PropTypes.object,
  services: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.object,
  LoadingComponent: PropTypes.elementType,
  history: PropTypes.object,
  children: PropTypes.element,
  initialLocale: PropTypes.string,
  translations: PropTypes.object,
  i18nNs: PropTypes.arrayOf(PropTypes.string),
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
  router: PropTypes.object,
};
