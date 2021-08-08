import React, { FC, useEffect, useMemo } from 'react';
import { AppState, DefaultLoadingComponent } from '@oneki/app';
import { AppProps } from './typings';
import NextRouter from './router/NextRouter';
import { useRouterSync } from './router/useRouterSync';
import { useLazyRef } from '@oneki/core';
import { simpleMergeDeep } from '@oneki/utils';
import { SS_KEY_404 } from './404';

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
  }, [nextRouter.locale, initialLocale]);

  useEffect(() => {
    if (nextRouter.pathname === nextRouter.asPath) {
      sessionStorage.removeItem(SS_KEY_404);
    }
  }, [nextRouter]);

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
};

// App.displayName = 'App';
