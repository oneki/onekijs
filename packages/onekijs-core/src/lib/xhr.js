import HTTPError from './error';
import { urlBuilder } from './utils/url';
import produce from 'immer';
import { get } from './utils/object';

const encodeFormData = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export async function xhr(url, method, body = null, options = {}) {
  url = urlBuilder(url, options.params || {}, options.query || {});
  options = produce(options, o => {
    o.headers = o.headers || {};
    o.headers['Accept'] = o.headers['Accept'] || 'application/json';
    o.method = method;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      o.headers['Content-Type'] =
        o.headers['Content-Type'] || 'application/json';
      if (body) {
        if (o.headers['Content-Type'] === 'application/json') {
          o.body = JSON.stringify(body);
        } else if (
          o.headers['Content-Type'] === 'application/x-www-form-urlencoded'
        ) {
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
        o.headers.Authorization = `Basic ${btoa(
          o.auth.basic.user + ':' + o.auth.basic.password
        )}`;
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
    Object.keys(o).forEach(k => {
      if (!validOptions.includes(k)) {
        delete o[k];
      }
    });
  });
  return await fetch(url, options);
}

export async function formatAsyncResponse(response) {
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
    throw new HTTPError(response.status, null, e);
  }
  throw new HTTPError(response.status, result.message, result);
}

export async function asyncHttp(url, method, body = null, options = {}) {
  return formatAsyncResponse(await xhr(url, method, body, options));
}

export async function asyncGet(url, options = {}) {
  return await asyncHttp(url, 'GET', null, options);
}

export async function asyncDelete(url, options = {}) {
  return await asyncHttp(url, 'DELETE', null, options);
}

export async function asyncPost(url, body, options = {}) {
  return await asyncHttp(url, 'POST', body, options);
}

export async function asyncPut(url, body, options = {}) {
  return await asyncHttp(url, 'PUT', body, options);
}

export async function asyncPatch(url, body, options = {}) {
  return await asyncHttp(url, 'PATCH', body, options);
}
