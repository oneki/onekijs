import { State, ErrorCallback, SuccessCallback, Collection } from '../core/typings';

export interface CrudState extends State {
  loading?: boolean;
  result?: any;
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

export interface GetOptions<T = any> extends FetchOptions<T> {
  defaultValue?: T;
}
