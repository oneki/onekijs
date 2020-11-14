import { useOnekiRouter } from 'onekijs-core';
import React, { FC } from 'react';
import { matchPath, Route as ReactRouterRoute, RouteProps, useHistory } from 'react-router-dom';

const Route: FC<RouteProps> = (props) => {
  const history = useHistory();
  const match = matchPath(history.location.pathname, props);
  const router = useOnekiRouter();
  if (match) {
    router.params = match.params;
    router.route = match.path;
  }
  return <ReactRouterRoute {...props} />;
};

export default Route;
