import { AppState, DefaultLoadingComponent, FCC, useLazyRef } from 'onekijs-framework';
import React, { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter } from './router/ReactRouter';
import { useRouterSync } from './router/useRouterSync';
import { AppProps } from './typings';

const AppRouterSync: FC = () => {
  useRouterSync();
  return null;
};

const AppRouter: FCC = ({ children }) => {
  return (
    <BrowserRouter>
      <AppRouterSync />
      {children}
    </BrowserRouter>
  );
};

export const App: FCC<AppProps> = React.memo(({ LoadingComponent = DefaultLoadingComponent, children, ...props }) => {
  const router = useLazyRef<ReactRouter>(() => {
    return new ReactRouter();
  });
  return (
    <AppState {...props} router={router.current}>
      <AppRouter>
        <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
      </AppRouter>
    </AppState>
  );
});

App.displayName = 'App';
