import { AppErrorCallback, AppSuccessCallback } from '../app/typings';
import { Collection, ErrorCallback, State, SuccessCallback } from '../core/typings';

export interface AppFetchOptions<T = any> extends Omit<FetchOptions<T>, 'onError' | 'onSuccess'> {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback<T>;
}

export interface AppExtraFetchOptions<T = any> extends AppFetchOptions<T> {
  url?: string;
  method?: FetchMethod;
}

export type Fetcher<R = any, T = any> = (
  url: string,
  method: FetchMethod,
  body?: T,
  options?: FetchOptions<R, T>,
) => Promise<R>;

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions<R = any, T = any> extends RequestInit {
  onError?: ErrorCallback;
  onSuccess?: SuccessCallback<R>;
  delayLoading?: number;
  auth?: Collection<any>;
  headers?: Collection<string>;
  params?: Collection<string>;
  query?: Collection<string>;
  fetcher?: Fetcher<R, T>;
}

export interface FetchState extends State {
  loading?: boolean;
  result?: any;
}

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export interface UseGetOptions<T = any> extends Omit<AppFetchOptions<T>, 'onSuccess'> {
  defaultValue?: T;
}
