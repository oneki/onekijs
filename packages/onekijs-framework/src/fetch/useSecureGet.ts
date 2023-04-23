import useGlobalProp from '../app/useGlobalProp';
import { UseGetOptions } from './typings';
import useGet from './useGet';

const useSecureGet = <T = any>(url: string, options: UseGetOptions<T> = {}): [T, boolean, () => void] => {
  const identity = options.identity ?? 'default';
  const authKey = useGlobalProp('settings.auth.key') || `auth.${identity}`;
  const auth = useGlobalProp(authKey);
  options.auth = auth;
  return useGet<T>(url, options);
};

export default useSecureGet;
