import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSecurityContext } from "./auth";
import { useSetting } from "./context";
import { useNotificationService } from "./notification";
import { useReduxSelector } from "./store";

// this only works in a Redux environment and React Router environment
// assumes that the securityContext is saved in redux store under the key "auth.securityContext" and if there is an oauth2 token, it's saved under auth.token
// assumes that settings are saved in redux store under the key "settings" and that the loginRoute is saved in settings.routes.login => defaults to '/login'
export const secure = (Component, validator, options={}) => {
  return React.memo(props => {
    const location = useLocation();
    const token = useReduxSelector("auth.token", null);
    const [securityContext, loading, error] = useSecurityContext();
    const loginRoute = useSetting("routes.login", "/login");
    const notificationService = useNotificationService();

    if (loading) {
      return <div>Loading...</div>
    } else if (error || !securityContext || (token && token.expires_at && parseInt(token.expires_at) < Date.now())) {
      const to = {
        pathname: loginRoute,
        state: location
      };
      return <Redirect to={to} />;
    } else if (validator && !validator(securityContext)) {
      if (options.onError) {
        options.onError();
      } else {
        notificationService.send({
          id: "AccessDenied",
          topic: "error",
          persist: false,
          payload: {
            message: "Access Denied"
          }
        })
      }
      return null;
    } else {
      return <Component {...props} />;
    }
  });
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
