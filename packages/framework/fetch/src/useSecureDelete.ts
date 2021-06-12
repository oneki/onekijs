import { useGlobalProp } from '@oneki/app';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import useDelete from './useDelete';

const useSecureDelete = (
  url: string,
  options: AppFetchOptions = {},
): [(extraOptions?: AppExtraFetchOptions) => void, boolean] => {
  const authKey = useGlobalProp('settings.auth.key') || 'auth';
  const auth = useGlobalProp(authKey);
  options.auth = auth;
  return useDelete(url, options);
};

export default useSecureDelete;
