import { AppState, DefaultLoadingComponent, FCC, useLazyRef } from 'onekijs-framework';
import React from 'react';
import NextRouter from './router/NextRouter';
import { useRouterSync } from './router/useRouterSync';
import { AppProps } from './typings';

const Router: FCC<{ router: NextRouter }> = ({ router, children }) => {
  useRouterSync(router);
  return <>{children}</>;
};

/**
 * App Router client provider. Render this component from a module that starts
 * with the `use client` directive, for example an `app/providers.tsx` file.
 */
export const App: FCC<AppProps> = ({
  LoadingComponent = DefaultLoadingComponent,
  initialLocale,
  translations,
  i18nNs,
  Theme,
  children,
  ...appProps
}) => {
  const routerRef = useLazyRef(() => new NextRouter([]));

  return (
    <AppState
      {...appProps}
      initialLocale={initialLocale}
      translations={translations}
      i18nNs={i18nNs}
      LoadingComponent={LoadingComponent}
      router={routerRef.current}
    >
      <Router router={routerRef.current}>{Theme ? <Theme>{children}</Theme> : children}</Router>
    </AppState>
  );
};

// App.displayName = 'App';
