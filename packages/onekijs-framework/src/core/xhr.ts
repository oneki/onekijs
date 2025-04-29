import { FetchMethod, FetchOptions } from '../types/fetch';
import { AnonymousObject } from '../types/object';
import { get, isDictionary, set } from '../utils/object';
import { urlBuilder } from '../utils/router';
import HTTPError from './HTTPError';

export const encodeFormData = (data: unknown): string => {
  if (isDictionary(data)) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(`${data[key]}`))
      .join('&');
  }
  return '';
};

export async function xhr(url: string, method: string, body?: unknown, options: FetchOptions = {}): Promise<Response> {
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
  console.log('xhr', url, method, body, options);
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
      set(fetchOptions, k as any, get<any>(options, k as any));
    }
  });
  const result = await fetch(url, fetchOptions);
  return result;
}

export async function formatAsyncResponse(response: Response): Promise<any> {
  const clone = response.clone();
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return await clone.text();
    }
  }
  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new HTTPError(response.status, await clone.text());
  }
  throw new HTTPError(response.status, result.message, result);
}

export async function asyncHttp(
  url: string,
  method: FetchMethod,
  body?: unknown,
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

export async function asyncPost(url: string, body?: unknown, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'POST', body, options);
}

export async function asyncPut(url: string, body?: unknown, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'PUT', body, options);
}

export async function asyncPatch(url: string, body?: unknown, options: AnonymousObject = {}): Promise<any> {
  return await asyncHttp(url, 'PATCH', body, options);
}
