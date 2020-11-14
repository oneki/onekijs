import React, { FC, useEffect } from 'react';
import { AuthErrorProps } from './typings';
import useOnekiRouter from '../router/useOnekiRouter';
import useSetting from '../app/useSetting';

const DefaultAuthErrorComponent: FC<AuthErrorProps> = ({ error }) => {
  const router = useOnekiRouter();
  const loginRoute = useSetting('routes.login', '/login');

  useEffect(() => {
    if (error.code === 401) {
      router.push(loginRoute);
    }
  }, [error.code, router, loginRoute]);

  if (error.code === 401) {
    return null;
  }

  return <div>ERROR COMPONENT HERE {error.code}</div>;
};

export default DefaultAuthErrorComponent;
