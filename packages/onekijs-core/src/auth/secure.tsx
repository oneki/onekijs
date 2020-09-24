import React, { ComponentPropsWithoutRef, ElementType, FC, memo, useCallback, useEffect, useState } from 'react';
import { useReduxSelector } from '../app/useGlobalSelector';
import HTTPError from '../core/HTTPError';
import { AnonymousObject } from '../core/typings';
import DefaultAuthErrorComponent from './DefaultAuthErrorComponent';
import useAuthService from './useAuthService';

export const secure = (
  Component: ElementType,
  validator?: (securityContext: any) => boolean,
  options: { ErrorComponent?: ElementType } = {},
): FC<ComponentPropsWithoutRef<typeof Component>> => {
  const SecureComponent: FC<ComponentPropsWithoutRef<typeof Component>> = memo((props) => {
    const authService = useAuthService();
    const securityContext = useReduxSelector('auth.securityContext', null);
    const token = useReduxSelector('auth.token', null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const ErrorComponent = options.ErrorComponent || DefaultAuthErrorComponent;

    const onError = useCallback(
      (e) => {
        setError(e);
        setLoading(false);
      },
      [setLoading, setError],
    );

    useEffect(() => {
      if (!loading && !securityContext && !error) {
        setLoading(true);
        authService.fetchSecurityContext(onError, () => setLoading(false));
      }
    }, [authService, onError, error, loading, securityContext]);

    if (!loading && !error) {
      if (
        token &&
        (token as AnonymousObject).expires_at &&
        parseInt((token as AnonymousObject).expires_at) < Date.now()
      ) {
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
      return <div>Loading...</div>;
    } else if (error) {
      return <ErrorComponent error={error} />;
    }
    return null;
  });
  SecureComponent.displayName = 'SecureComponent';

  (SecureComponent as any).getLayout = (Component as any).getLayout;

  return SecureComponent;
};
