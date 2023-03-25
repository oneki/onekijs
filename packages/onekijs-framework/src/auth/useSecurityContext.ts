import { useEffect, useState } from 'react';
import useGlobalProp from '../app/useGlobalProp';
import { get } from '../utils/object';
import useAuthService from './useAuthService';

function useSecurityContext<T = any>(): [T | undefined, boolean];
function useSecurityContext<T = any>(selector: string): [T | undefined, boolean];
function useSecurityContext<T = any>(
  selector: string | undefined,
  defaultValue: undefined,
  identity?: string,
): [T | undefined, boolean];
function useSecurityContext<T = any>(
  selector: string | undefined,
  defaultValue: null,
  identity?: string,
): [T | null, boolean];
function useSecurityContext<T = any>(selector: string | undefined, defaultValue: T, identity?: string): [T, boolean];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useSecurityContext(selector?: string, defaultValue?: any, identity = 'default'): [any, boolean] {
  const [loading, setLoading] = useState(false);
  const securityContext = useGlobalProp(`auth.${identity}.securityContext`);
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
