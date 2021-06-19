import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import UserList from './list';
import UserCreate from './create';
import UserEdit from './edit';
import UserDisplay from './display';

const Users = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}/create`}>
        <UserCreate />
      </Route>
      <Route exact path={`${match.path}/:userId/edit`}>
        <UserEdit />
      </Route>
      <Route path={`${match.path}/:userId`}>
        <UserDisplay />
      </Route>
      <Route>
        <UserList />
      </Route>
    </Switch>
  );
};

export default Users;
