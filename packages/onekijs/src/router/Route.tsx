import { useRouter } from 'onekijs-framework';
import React, { FC } from 'react';
import { matchPath, Route as ReactRouterRoute, RouteProps, useLocation } from 'react-router-dom';

const Route: FC<RouteProps> = (props) => {
  const { pathname } = useLocation();
  const match = props.path ? matchPath(props.path, pathname) : false;
  const router = useRouter();
  if (match) {
    router.params = match.params;
    router.route = props.path;
  }
  return <ReactRouterRoute {...props} />;
};

export default Route;
