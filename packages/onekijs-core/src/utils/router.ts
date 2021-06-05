import { AnonymousObject } from '../typings/object';
import { trimEnd, trimStart } from './string';

export function isAbsoluteUrl(url: string): boolean {
  const pattern = new RegExp('^(?:[a-z]+:)?//', 'i');
  return pattern.test(url);
}

export function absoluteUrl(url: string, baseUrl?: string): string {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  if (!baseUrl) {
    baseUrl = `${window.location.protocol}//${window.location.host}`;
  }
  return [trimEnd(baseUrl, '/'), trimStart(url, '/')].join('/');
}

export function urlBuilder(path: string, params: AnonymousObject = {}, query: AnonymousObject = {}): string {
  const esc = encodeURIComponent;
  Object.keys(params)
    .sort((a, b) => b.length - a.length)
    .forEach((k) => {
      path = path.replace(`:${k}`, params[k]);
    });
  const queryKeys = Object.keys(query);
  const separator = queryKeys.length > 0 ? '?' : '';
  const queryString = queryKeys.map((k) => esc(k) + '=' + esc(query[k])).join('&');
  return `${path}${separator}${queryString}`;
}
