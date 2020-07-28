import useGlobalSelector from '../app/useGlobalSelector';
import { GetOptions } from './typings';
import useGet from './useGet';

const useSecureGet = <T = any>(url: string, options: GetOptions<T> = {}): [T, boolean, () => void] => {
  const authKey = useGlobalSelector('settings.auth.key') || 'auth';
  const auth = useGlobalSelector(authKey);
  options.auth = auth;
  return useGet<T>(url, options);
};

export default useSecureGet;
