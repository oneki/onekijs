import AppContext from '../app/AppContext';
import Router from '../router/Router';
import { asResultCallback } from '../app/utils';
import HTTPError from '../core/HTTPError';
import { AnonymousObject } from '../core/typings';
import { get, set } from '../core/utils/object';
import { urlBuilder } from '../router/utils';
import NotificationService from '../notification/NotificationService';
import { AppFetchOptions, FetchMethod, FetchOptions } from './typings';

export const encodeFormData = (data: AnonymousObject): string => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export async function xhr(
  url: string,
  method: string,
  body?: AnonymousObject,
  options: FetchOptions = {},
): Promise<Response> {
  url = urlBuilder(url, options.params || {}, options.query || {});
  const fetchOptions: RequestInit = {
    method,
  };
  const headers = Object.assign(
    {
      Accept: 'application/json',
    },
    options.headers,
  ) as AnonymousObject;
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    if (body) {
      if (headers['Content-Type'] === 'application/json') {
        fetchOptions.body = JSON.stringify(body);
      } else if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        fetchOptions.body = encodeFormData(body);
      } else {
        throw Error(`Unsupported content-type ${headers['Content-Type']}`);
      }
    }
  }
  if (options.auth) {
    if (get(options, 'auth.token.access_token')) {
      headers.Authorization = `Bearer ${options.auth.token.access_token}`;
    } else if (get(options, 'auth.token')) {
      headers.Authorization = `Bearer ${options.auth.token}`;
    } else if (options.auth.basic) {
      headers.Authorization = `Basic ${btoa(options.auth.basic.user + ':' + options.auth.basic.password)}`;
    }
  }
  fetchOptions.headers = headers;
  // sanitize options
  const validOptions = [
    'method',
    'headers',
    'body',
    'mode',
    'credentials',
    'cache',
    'redirect',
    'referrer',
    'referrerPolicy',
    'integrity',
    'keepalive',
    'signal',
  ];
  Object.keys(options).forEach((k) => {
    if (validOptions.includes(k)) {
      set(fetchOptions, k, get(options, k));
    }
  });
  return await fetch(url, fetchOptions);
}

export async function formatAsyncResponse(response: Response): Promise<any> {
  const clone = response.clone();
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return clone.text();
    }
  }
  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new HTTPError(response.status, undefined, e);
  }
  throw new HTTPError(response.status, result.message, result);
}

export async function asyncHttp(
  url: string,
  method: FetchMethod,
  body?: AnonymousObject,
  options: AnonymousObject = {},
): Promise<any> {
  return formatAsyncResponse(await xhr(url, method, body, options));
}

export async function asyncGet(url: string, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'GET', undefined, options);
}

export async function asyncDelete(url: string, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'DELETE', undefined, options);
}

export async function asyncPost(url: string, body?: AnonymousObject, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'POST', body, options);
}

export async function asyncPut(url: string, body?: AnonymousObject, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'PUT', body, options);
}

export async function asyncPatch(url: string, body?: AnonymousObject, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'PATCH', body, options);
}

export function asFetchOptions<T = any>(
  options: AppFetchOptions<T>,
  notificationService: NotificationService,
  appContext: AppContext,
  router: Router,
): FetchOptions<T> {
  if (!options.onError) {
    options.onError = (e) => {
      notificationService.error(e);
    };
  } else {
    options.onError = asResultCallback(options.onError, router, appContext);
  }
  if (options.onSuccess) {
    options.onSuccess = asResultCallback(options.onSuccess, router, appContext);
  }
  return options as FetchOptions;
}
