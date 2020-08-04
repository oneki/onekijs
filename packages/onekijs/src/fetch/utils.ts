import produce from 'immer';
import AppContext from '../app/AppContext';
import AppRouter from '../app/AppRouter';
import { asResultCallback } from '../app/utils';
import HTTPError from '../core/HTTPError';
import { AnonymousObject } from '../core/typings';
import { get } from '../core/utils/object';
import { urlBuilder } from '../core/utils/url';
import NotificationService from '../notification/NotificationService';
import { AppFetchOptions, FetchOptions } from './typings';

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
  options = produce(options, (o) => {
    o.headers = o.headers || {};
    o.headers['Accept'] = o.headers['Accept'] || 'application/json';
    o.method = method;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      o.headers['Content-Type'] = o.headers['Content-Type'] || 'application/json';
      if (body) {
        if (o.headers['Content-Type'] === 'application/json') {
          o.body = JSON.stringify(body);
        } else if (o.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          o.body = encodeFormData(body);
        } else {
          throw Error(`Unsupported content-type ${o.headers['Content-Type']}`);
        }
      }
    }
    if (o.auth) {
      if (get(o, 'auth.token.access_token')) {
        o.headers.Authorization = `Bearer ${o.auth.token.access_token}`;
      } else if (get(o, 'auth.token')) {
        o.headers.Authorization = `Bearer ${o.auth.token}`;
      } else if (o.auth.basic) {
        o.headers.Authorization = `Basic ${btoa(o.auth.basic.user + ':' + o.auth.basic.password)}`;
      }
    }
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
    Object.keys(o).forEach((k) => {
      if (!validOptions.includes(k)) {
        delete (o as any)[k];
      }
    });
  });
  return await fetch(url, options);
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
  method: string,
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
  router: AppRouter,
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
