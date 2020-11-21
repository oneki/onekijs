// import { getRouteMatcher } from 'next/dist/next-server/lib/router/utils/route-matcher';
// import { getRouteRegex } from 'next/dist/next-server/lib/router/utils/route-regex';
import { AppState, DefaultLoadingComponent, simpleMergeDeep, useLazyRef } from 'onekijs-core';
import React, { FC, useMemo } from 'react';
import { AppProps } from '../typings';
import NextRouter from './router/NextRouter';
import { useRouterSync } from './router/useRouterSync';

const Router: FC<{ router: NextRouter }> = ({ router, children }) => {
  useRouterSync(router);
  return <>{children}</>;
};

export const App: FC<AppProps> = ({
  LoadingComponent = DefaultLoadingComponent,
  Component,
  pageProps,
  initialLocale,
  translations,
  i18nNs,
  router: nextRouter,
  ...appProps
}) => {
  const routerRef = useLazyRef(() => new NextRouter([]));

  // useEffect(() => {
  //   if (pageProps.is404) {
  //     routerRef.current.replace(toLocation(window.location.href), {
  //       shallow: true,
  //     });
  //   }
  // }, [routerRef, pageProps.is404]);

  i18nNs = useMemo(() => {
    return Object.keys(pageProps.translations || {})
      .concat(Object.keys(translations || {}))
      .concat(i18nNs || []);
  }, [pageProps.translations, translations, i18nNs]);

  translations = useMemo(() => {
    return simpleMergeDeep(Object.assign({}, pageProps.translations), translations);
  }, [pageProps.translations, translations]);

  initialLocale = useMemo(() => {
    if (nextRouter.locale) return nextRouter.locale;
    return initialLocale;
  }, [nextRouter, initialLocale]);

  // if (nextRouter.route === '/404') {
  //   if (route || !routerRef.location) return null;
  //   return <Error code={404} />;
  // }

  const getLayout = (Component && (Component as any).getLayout) || ((page: any) => page);
  return (
    <AppState
      {...appProps}
      initialLocale={initialLocale}
      translations={translations}
      i18nNs={i18nNs}
      LoadingComponent={LoadingComponent}
      router={routerRef.current}
    >
      <Router router={routerRef.current}>{getLayout(<Component {...pageProps}></Component>)}</Router>
    </AppState>
  );

  /*return (
      <Provider store={appStore}>
        <AppProvider
          router={routerRef}
          settings={formattedSettings}
          initialLocale={initialLocale}
          translations={translations}
          i18nNs={i18nNs}
          services={services}
        >
          {getLayout(<Component {...pageProps}></Component>)}
        </AppProvider>
      </Provider>
    );*/
};

// App.displayName = 'App';
