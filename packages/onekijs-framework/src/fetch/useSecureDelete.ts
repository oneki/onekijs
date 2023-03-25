import useGlobalProp from '../app/useGlobalProp';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import useDelete from './useDelete';

const useSecureDelete = (
  url: string,
  options: AppFetchOptions = {},
): [(extraOptions?: AppExtraFetchOptions) => void, boolean] => {
  const identity = options.identity ?? 'string';
  const authKey = useGlobalProp('settings.auth.key') || `auth.${identity}`;
  const auth = useGlobalProp(authKey);
  options.auth = auth;
  return useDelete(url, options);
};

export default useSecureDelete;
