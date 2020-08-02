import { createBrowserHistory } from 'history';
import { AppProvider, DefaultLoadingComponent, useLazyRef } from 'onekijs';
import React, { FC, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { ReactRouter } from './ReactRouter';
import { CraAppProps } from './typings';

export const App: FC<CraAppProps> = React.memo(
  ({
    settings = {},
    store,
    initialState = {},
    services = [],
    LoadingComponent = DefaultLoadingComponent,
    history,
    children,
    initialLocale,
    translations,
    i18nNs,
  }) => {
    const appHistoryRef = useLazyRef(() => {
      if (!history) {
        history = createBrowserHistory();
      }
      return history;
    });
    const routerRef = useLazyRef(() => {
      return new ReactRouter(appHistoryRef.current);
    });

    return (
      <AppProvider
        initialState={initialState}
        store={store}
        settings={settings}
        router={routerRef.current}
        initialLocale={initialLocale}
        translations={translations}
        i18nNs={i18nNs || []}
        services={services}
        LoadingComponent={LoadingComponent}
      >
        <Router history={appHistoryRef.current}>
          <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
        </Router>
      </AppProvider>
    );
  },
);

App.displayName = 'App';
