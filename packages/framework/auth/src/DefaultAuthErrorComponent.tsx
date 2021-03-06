import { useRouter, useSetting } from '@oneki/app';
import React, { FC, useEffect } from 'react';
import { AuthErrorProps } from './typings';

const DefaultAuthErrorComponent: FC<AuthErrorProps> = ({ error }) => {
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

  return <div>ERROR COMPONENT HERE {error.code}</div>;
};

export default DefaultAuthErrorComponent;
