import { FetchOptions } from './typings';
import useDelete from './useDelete';
import useGlobalSelector from '../app/useGlobalSelector';

const useSecureDelete = (url: string, options: FetchOptions = {}): [(extraOptions?: FetchOptions) => void, boolean] => {
  const authKey = useGlobalSelector('settings.auth.key') || 'auth';
  const auth = useGlobalSelector(authKey);
  options.auth = auth;
  return useDelete(url, options);
};

export default useSecureDelete;
