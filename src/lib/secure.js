import React, { useCallback, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthService } from "./auth";
import { useRouter, useSetting } from "./context";
import HTTPError from "./error";
import { useReduxSelector } from "./store";


const DefaultErrorComponent = ({error}) => {
  const router = useRouter();
  const loginRoute = useSetting('routes.login', '/login');

  useEffect(() => {
    if (error.statusCode === 401) {
      router.push(loginRoute);
    }
  }, [error.statusCode, router, loginRoute])
  
  if (error.statusCode === 401) {
    return null;
  }

  return <div>ERROR COMPONENT HERE {error.statusCode}</div>
}

export const secure = (Component, validator, options={}) => {
  const SecureComponent = React.memo(props => {
    const authService = useAuthService();
    const securityContext = useReduxSelector("auth.securityContext", null);
    const token = useReduxSelector("auth.token", null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const ErrorComponent = options.ErrorComponent || DefaultErrorComponent;
   
    const onError = useCallback(
      e => {
        setError(e);
        setLoading(false);
      },
      [setLoading, setError]
    );

    useEffect(() => {
      if (!loading && !securityContext && !error) {
        setLoading(true);
        authService
          .fetchSecurityContext()
          .then(() => {
            setLoading(false)
          })
          .catch((e) => {
            onError(e)
          })        
      }
    }, [authService, onError, error, loading, securityContext])

    if (!loading && !error) {
      if (token && token.expires_at && parseInt(token.expires_at) < Date.now())  {
        onError(new HTTPError(401));
      } else if (securityContext) {
        if (validator && !validator(securityContext)) {
          // Example: user doesn't have the required role
          onError(new HTTPError(403));
        } else {
          return <Component {...props} />;
        }
      } else {
        return null;
      }
    } else if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <ErrorComponent error={error} />
    }
  });

  SecureComponent.getLayout = Component.getLayout;

  return SecureComponent;
};

export const SecureRoute = ({ component: Component, ...args }) => {
  const token = useReduxSelector("auth.token", null);
  const securityContext = useReduxSelector("auth.securityContext", null);
  const loginRoute = useSetting("routes.login", "/login");

  return (
    <Route
      {...args}
      render={props =>
        !securityContext || (token && token.expires_at <= Date.now()) ? (
          <Redirect
            to={{
              pathname: loginRoute,
              state: { from: props.location }
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
