import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import AuthPage from '.';
import AuthCallbackPage from './callback';
const AuthRouter = (): JSX.Element => {
  const match = useRouteMatch();
  console.log('match', match);
  return (
    <Switch>
      <Route path={`${match.path}/callback`}>
        <AuthCallbackPage />
      </Route>
      <Route path={match.path}>
        <AuthPage />
      </Route>
    </Switch>
  );
};

export default AuthRouter;
