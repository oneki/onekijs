import { AppErrorCallback, AppSuccessCallback } from '../app/typings';
import { Collection, ErrorCallback, State, SuccessCallback } from '../core/typings';

export interface FetchState extends State {
  loading?: boolean;
  result?: any;
}

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export interface FetchOptions<T = any> extends RequestInit {
  onError?: ErrorCallback;
  onSuccess?: SuccessCallback<T>;
  delayLoading?: number;
  auth?: Collection<any>;
  url?: string;
  method?: string;
  headers?: Collection<string>;
  params?: Collection<string>;
  query?: Collection<string>;
}

export interface AppFetchOptions<T = any> extends Omit<FetchOptions<T>, 'onError' | 'onSuccess'> {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback<T>;
}

export interface UseGetOptions<T = any> extends Omit<AppFetchOptions<T>, 'onSuccess'> {
  defaultValue?: T;
}
