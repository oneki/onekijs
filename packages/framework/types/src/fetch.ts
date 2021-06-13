import { SuccessCallback } from './callback';
import { BasicError, ErrorCallback } from './error';
import { AnonymousObject } from './object';
import { State } from './state';

export interface FetchState extends State {
  loading?: boolean;
  fetching?: boolean;
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

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Fetcher<R = any, T = any> = (
  url: string,
  method: FetchMethod,
  body?: T,
  options?: FetchOptions<R, T>,
) => Promise<R>;

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
