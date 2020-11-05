import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import AuthPage from '.';
import AuthLogoutPage from './logout';
const AuthRouter = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/logout`}>
        <AuthLogoutPage />
      </Route>
      <Route path={match.path}>
        <AuthPage />
      </Route>
    </Switch>
  );
};

export default AuthRouter;
