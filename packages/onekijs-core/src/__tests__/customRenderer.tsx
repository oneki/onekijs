import { render, RenderResult } from '@testing-library/react';
import { createBrowserHistory, History, LocationState } from 'history';
import React, { FC } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AppState from '../app/AppState';
import { AppProps } from '../app/typings';
import useLazyRef from '../core/useLazyRef';
import { ReactRouter } from './ReactRouter';

export interface TestAppProps extends AppProps {
  history?: History<LocationState>;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: React.ReactElement, props?: TestAppProps, options?: any): RenderResult => {
  if (!props) {
    props = {};
  }

  const TestApp: FC<AppProps> = ({ children }) => {
    const appHistoryRef = useLazyRef(() => {
      let appHistory = props?.history;
      if (!appHistory) {
        appHistory = createBrowserHistory();
      }
      return appHistory;
    });
    const routerRef = useLazyRef(() => {
      return new ReactRouter(appHistoryRef.current);
    });

    return (
      <AppState {...props} router={routerRef.current}>
        <Router history={appHistoryRef.current}>
          <Switch>
            <Route>{children}</Route>
          </Switch>
        </Router>
      </AppState>
    );
  };
  return render(ui, { wrapper: TestApp, ...options });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };