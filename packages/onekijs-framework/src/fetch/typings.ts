import { AppErrorCallback, AppSuccessCallback } from '../app/typings';
import { FetchMethod, FetchOptions } from '../types/fetch';

export interface AppFetchOptions<T = any> extends Omit<FetchOptions<T>, 'onFetchError' | 'onFetchSuccess'> {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback<T>;
  identity?: string;
}

export interface AppExtraFetchOptions<T = any> extends AppFetchOptions<T> {
  url?: string;
  method?: FetchMethod;
}

export interface UseGetOptions<T = any> extends Omit<AppFetchOptions<T>, 'onSuccess'> {
  defaultValue?: T;
  pollingMs?: number;
  identity?: string;
}
