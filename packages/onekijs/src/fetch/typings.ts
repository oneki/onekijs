import { AppErrorCallback, AppSuccessCallback } from '../app/typings';
import { FetchMethod, FetchOptions } from '../types/fetch';

export interface AppFetchOptions<T = any> extends Omit<FetchOptions<T>, 'onError' | 'onSuccess'> {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback<T>;
}

export interface AppExtraFetchOptions<T = any> extends AppFetchOptions<T> {
  url?: string;
  method?: FetchMethod;
}

export interface UseGetOptions<T = any> extends Omit<AppFetchOptions<T>, 'onSuccess'> {
  defaultValue?: T;
  pollingMs?: number;
}
