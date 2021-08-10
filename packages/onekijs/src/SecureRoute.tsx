import { AnonymousObject, SecureRouteProps, useGlobalProp, useSetting } from 'onekijs-framework';
import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

const SecureRoute: FC<SecureRouteProps> = ({ component: Component, ...args }) => {
  const token = useGlobalProp('auth.token', null);
  const securityContext = useGlobalProp('auth.securityContext', null);
  const loginRoute = useSetting('routes.login', '/login');

  return (
    <Route
      {...args}
      render={(props) =>
        !securityContext ||
        (token &&
          (token as AnonymousObject).expires_at &&
          parseInt((token as AnonymousObject).expires_at) < Date.now()) ? (
          <Redirect
            to={{
              pathname: loginRoute,
              // eslint-disable-next-line
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default SecureRoute;
