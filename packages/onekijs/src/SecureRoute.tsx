import { AnonymousObject, FCC, SecureRouteProps, useGlobalProp, useSetting } from 'onekijs-framework';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const SecureRoute: FCC<SecureRouteProps> = ({ component: Component, ...props }) => {
  const token = useGlobalProp('auth.token', null);
  const securityContext = useGlobalProp('auth.securityContext', null);
  const loginRoute = useSetting('routes.login', '/login');

  if (
    !securityContext ||
    (token && (token as AnonymousObject).expires_at && parseInt((token as AnonymousObject).expires_at) < Date.now())
  ) {
    return (
      <Route>
        <Navigate to={loginRoute} state={{ from: props.location }} replace />
      </Route>
    );
  } else {
    return (
      <Route>
        <Component {...props} />
      </Route>
    );
  }
};

export default SecureRoute;
