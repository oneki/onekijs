import { createBrowserHistory } from 'history';
import { useLazyRef, AppState, DefaultLoadingComponent } from 'onekijs';
import React, { FC, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { ReactRouter } from './ReactRouter';
import { CraAppProps } from './typings';

export const App: FC<CraAppProps> = React.memo(({ history, ...appProps }) => {
  const appHistoryRef = useLazyRef(() => {
    if (!history) {
      history = createBrowserHistory();
    }
    return history;
  });
  const routerRef = useLazyRef(() => {
    return new ReactRouter(appHistoryRef.current);
  });

  const LoadingComponent = appProps.LoadingComponent || DefaultLoadingComponent;

  return (
    <AppState {...appProps} router={routerRef.current}>
      <Router history={appHistoryRef.current}>
        <Suspense fallback={<LoadingComponent />}>{appProps.children}</Suspense>
      </Router>
    </AppState>
  );
});

App.displayName = 'App';
