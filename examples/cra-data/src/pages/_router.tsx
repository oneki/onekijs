import { Route, Switch } from 'onekijs';
import React from 'react';
import IndexPage from '.';
import AppLayout from '../modules/core/layouts/AppLayout';
import CreateUserPage from './create-user';
import CreateUserFormPage from './create-user-form';
import CreateUserSuccessRedirectPage from './create-user-success-redirect';
import EditUserSuccessRedirectPage from './edit-user-success-redirect';
import ListUsersPage from './list-users';
import ListUsersCachePage from './list-users-cache';
import ListUsersDelayPage from './list-users-delay';
import ListUsersErrorNotificationPage from './list-users-error-notification';
import ListUsersOnErrorPage from './list-users-on-error';
import ListUsersPollingPage from './list-users-pooling';

const RootRouter = (): JSX.Element => {
  return (
    <AppLayout>
      <Switch>
        <Route path="/users">
          <ListUsersPage />
        </Route>
        <Route path="/users-delay">
          <ListUsersDelayPage />
        </Route>
        <Route path="/users-cache">
          <ListUsersCachePage />
        </Route>
        <Route path="/users-polling">
          <ListUsersPollingPage />
        </Route>
        <Route path="/users-on-error">
          <ListUsersOnErrorPage />
        </Route>
        <Route path="/users-error-notification">
          <ListUsersErrorNotificationPage />
        </Route>
        <Route path="/create-user">
          <CreateUserPage />
        </Route>
        <Route path="/create-user-form">
          <CreateUserFormPage />
        </Route>
        <Route path="/create-user-success-redirect">
          <CreateUserSuccessRedirectPage />
        </Route>
        <Route path="/edit-user/:userId">
          <EditUserSuccessRedirectPage />
        </Route>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </AppLayout>
  );
};

export default RootRouter;
