import { Route, Switch } from 'onekijs';
import React from 'react';
import AppLayout from '../modules/core/layouts/AppLayout';
import { AdminPage } from './admin';
import { IndexPage } from './index';
import LoginPage from './login';
import LogoutPage from './logout';
import { RestrictedPage } from './restricted';

const RootRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/logout">
        <LogoutPage />
      </Route>
      <Route>
        <AppLayout>
          <Switch>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/restricted">
              <RestrictedPage />
            </Route>
            <Route>
              <IndexPage />
            </Route>
          </Switch>
        </AppLayout>
      </Route>
    </Switch>
  );
};

export default RootRouter;
