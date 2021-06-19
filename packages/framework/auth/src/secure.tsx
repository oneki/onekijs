import { useGlobalProp } from '@oneki/app';
import React, { ComponentPropsWithoutRef, ElementType, FC, memo } from 'react';
import DefaultAuthErrorComponent from './DefaultAuthErrorComponent';
import useSecurityContext from './useSecurityContext';

export const secure = (
  Component: ElementType,
  validator?: (securityContext: any) => boolean,
  options: { ErrorComponent?: ElementType } = {},
): FC<ComponentPropsWithoutRef<typeof Component>> => {
  const SecureComponent: FC<ComponentPropsWithoutRef<typeof Component>> = memo((props) => {
    const [securityContext, loading] = useSecurityContext();
    const auth = useGlobalProp('auth');
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
