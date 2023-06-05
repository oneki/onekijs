import { Task } from '@redux-saga/types';
import { BasicError, ErrorCallback } from './error';
import { AnonymousObject } from './object';
import { State } from './state';

export interface FetchState extends State {
  loading?: boolean;
  fetching?: boolean;
  result?: any;
  error?: BasicError;
  task?: Task;
}

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Fetcher<R = any> = (
  url: string,
  method: FetchMethod,
  body?: unknown,
  options?: FetchOptions<R>,
) => Promise<R>;

export interface FetchOptions<R = any> extends Omit<RequestInit, 'method' | 'url'> {
  onFetchError?: ErrorCallback;
  onFetchSuccess?: (result: R) => void | R | Promise<undefined | R>;
  delayLoading?: number;
  auth?: AnonymousObject<any>;
  //headers?: AnonymousObject<string>;
  params?: AnonymousObject<string>;
  query?: AnonymousObject<string>;
  fetcher?: Fetcher<R>;
}
