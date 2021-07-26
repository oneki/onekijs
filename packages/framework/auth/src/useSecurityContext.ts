import { useGlobalProp } from '@oneki/app';
import { get } from '@oneki/utils';
import { useEffect, useState } from 'react';
import useAuthService from './useAuthService';

function useSecurityContext<T = any>(): [T | undefined, boolean];
function useSecurityContext<T = any>(selector: string): [T | undefined, boolean];
function useSecurityContext<T = any>(selector: string, defaultValue: undefined): [T | undefined, boolean];
function useSecurityContext<T = any>(selector: string, defaultValue: null): [T | null, boolean];
function useSecurityContext<T = any>(selector: string, defaultValue: T): [T, boolean];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useSecurityContext(selector?: string, defaultValue?: any): [any, boolean] {
  const [loading, setLoading] = useState(false);
  const securityContext = useGlobalProp('auth.securityContext');
  const authService = useAuthService();

  useEffect(() => {
    if (securityContext !== undefined) {
      setLoading(false);
    } else {
      setLoading(true);
      authService.fetchSecurityContext(() => {
        setTimeout(() => {
          authService.setSecurityContext(null);
        }, 0);
      });
    }
  }, [authService, securityContext]);

  return [get(securityContext, selector, defaultValue), loading];
}

export default useSecurityContext;
