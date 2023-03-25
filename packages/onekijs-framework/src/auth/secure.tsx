import React, { ComponentPropsWithoutRef, ElementType, memo } from 'react';
import useGlobalProp from '../app/useGlobalProp';
import { FCC } from '../types/core';
import DefaultAuthErrorComponent from './DefaultAuthErrorComponent';
import useSecurityContext from './useSecurityContext';

export const secure = (
  Component: ElementType,
  validator?: (securityContext: any) => boolean,
  options: { ErrorComponent?: ElementType; identity?: 'string' } = {},
): FCC<ComponentPropsWithoutRef<typeof Component>> => {
  const identity = options.identity ?? 'default';
  const SecureComponent: FCC<ComponentPropsWithoutRef<typeof Component>> = memo((props) => {
    const [securityContext, loading] = useSecurityContext(undefined, undefined, identity);
    const auth = useGlobalProp(`auth.${identity}`);
    // const [error, setError] = useState(null);
    const ErrorComponent = options.ErrorComponent || DefaultAuthErrorComponent;
    const error = {
      code: 401,
    };
    // const onError = useCallback(
    //   (e) => {
    //     setError(e);
    //     setLoading(false);
    //   },
    //   [setLoading, setError],
    // );

    // useEffect(() => {
    //   if (!loading && !securityContext && !error) {
    //     setLoading(true);
    //     authService.fetchSecurityContext(onError, () => {
    //       setLoading(false);
    //     });
    //   }
    // }, [authService, onError, error, loading, securityContext]);
    if (!loading && securityContext !== undefined) {
      if (securityContext) {
        if (validator && !validator(securityContext)) {
          // Example: user doesn't have the required role
          error.code = 403;
          return <ErrorComponent error={error} />;
        } else {
          return <Component {...props} securityContext={securityContext} auth={auth} />;
        }
      } else {
        return <ErrorComponent error={error} />;
      }
    } else if (loading) {
      return <div>Loading...</div>;
    }
    return null;
  });
  SecureComponent.displayName = 'SecureComponent';

  (SecureComponent as any).getLayout = (Component as any).getLayout;

  return SecureComponent;
};
