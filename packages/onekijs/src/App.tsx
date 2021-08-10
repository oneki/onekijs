import { createBrowserHistory } from 'history';
import { AppState, DefaultLoadingComponent, useLazyRef } from 'onekijs-framework';
import React, { FC, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { ReactRouter } from './router/ReactRouter';
import { AppProps } from './typings';

export const App: FC<AppProps> = React.memo(({ history, LoadingComponent = DefaultLoadingComponent, ...appProps }) => {
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
    <AppState {...appProps} LoadingComponent={LoadingComponent} router={routerRef.current}>
      <Router history={appHistoryRef.current}>
        <Suspense fallback={<LoadingComponent />}>{appProps.children}</Suspense>
      </Router>
    </AppState>
  );
});

App.displayName = 'App';
