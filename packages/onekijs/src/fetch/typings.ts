import { AppErrorCallback, AppSuccessCallback } from '../app/typings';
import { AnonymousObject, ErrorCallback, State, SuccessCallback } from '../core/typings';
import BasicError from '../core/BasicError';

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

export interface FetchOptions<R = any, T = any> extends Omit<RequestInit, 'method' | 'url'> {
  onError?: ErrorCallback;
  onSuccess?: SuccessCallback<R>;
  delayLoading?: number;
  auth?: AnonymousObject<any>;
  headers?: AnonymousObject<string>;
  params?: AnonymousObject<string>;
  query?: AnonymousObject<string>;
  fetcher?: Fetcher<R, T>;
}

export interface FetchState extends State {
  loading?: boolean;
  deprecated?: boolean;
  result?: any;
  error?: BasicError;
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
