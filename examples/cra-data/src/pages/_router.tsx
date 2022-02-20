import { Route, Switch } from 'onekijs';
import React from 'react';
import AppLayout from '../modules/core/layouts/AppLayout';
import ListUsersErrorNotificationPage from './list-users-error-notification';
import ListUsersOnErrorPage from './list-users-on-error';
import ListUsersPage from './list-users';

const RootRouter = (): JSX.Element => {
  return (
    <AppLayout>
      <Switch>
        <Route path="/users">
          <ListUsersPage />
        </Route>
        <Route path="/users-on-error">
          <ListUsersOnErrorPage />
        </Route>
        <Route path="/users-error-notification">
          <ListUsersErrorNotificationPage />
        </Route>
      </Switch>
    </AppLayout>
  );
};

export default RootRouter;
