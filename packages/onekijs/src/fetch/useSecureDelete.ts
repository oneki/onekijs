import useGlobalSelector from '../app/useGlobalSelector';
import { AppFetchOptions } from './typings';
import useDelete from './useDelete';

const useSecureDelete = (
  url: string,
  options: AppFetchOptions = {},
): [(extraOptions?: AppFetchOptions) => void, boolean] => {
  const authKey = useGlobalSelector('settings.auth.key') || 'auth';
  const auth = useGlobalSelector(authKey);
  options.auth = auth;
  return useDelete(url, options);
};

export default useSecureDelete;
