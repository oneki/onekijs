import React, { useEffect } from 'react';
import useRouter from '../app/useRouter';
import useSetting from '../app/useSetting';
import { FCC } from '../types/core';
import { AuthErrorProps } from './typings';

const DefaultAuthErrorComponent: FCC<AuthErrorProps> = ({ error }) => {
  const router = useRouter();
  const loginRoute = useSetting('routes.login', '/login');

  useEffect(() => {
    if (error.code === 401) {
      router.push(loginRoute);
    }
  }, [error.code, router, loginRoute]);

  if (error.code === 401) {
    return null;
  }

  return <div>ERROR {error.code}</div>;
};

export default DefaultAuthErrorComponent;
