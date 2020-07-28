import { trimEnd, trimStart } from './string';
import qs from 'query-string';
import { isNull } from './object';
import { AnonymousObject } from '../typings';
import { Location } from '../../app/typings';

export function urlBuilder(path: string, params: AnonymousObject = {}, query = {}): string {
  const esc = encodeURIComponent;
  Object.keys(params)
    .sort((a, b) => b.length - a.length)
    .forEach((k) => {
      path = path.replace(`:${k}`, params[k]);
    });
  const queryKeys = Object.keys(query);
  const separator = queryKeys.length > 0 ? '?' : '';
  query = queryKeys.map((k) => esc(k) + '=' + esc(params[k])).join('&');
  return `${path}${separator}${query}`;
}

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

export const URL_STATE = '__STATE__';

export function toLocation(url: string): Location {
  const base = typeof window !== 'undefined' ? window.origin : 'http://localhost';
  const parser = new URL(url, base);
  const location: Location = {
    protocol: parser.protocol ? parser.protocol.slice(0, -1) : null,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    query: qs.parse(parser.search),
    hash: qs.parse(parser.hash),
    host: parser.host,
    href: parser.href,
    relativeurl: `${parser.pathname}${parser.search}${parser.hash}`,
    baseurl: `${parser.protocol}//${parser.host}`,
  };

  if (location.query && location.query[URL_STATE]) {
    location.state = JSON.parse(atob(location.query[URL_STATE] as string));
    delete location.query[URL_STATE];
  }
  return location;
}

export function toUrl(location: Location, options = {}): string {
  let url = '';
  if (location.baseurl) {
    url += location.baseurl;
  } else if (location.protocol) {
    if (location.hostname) {
      url += `${location.protocol}://${location.hostname}`;
      if (location.port) url += `:${location.port}`;
    } else if (location.host) {
      url += `${location.protocol}://${location.host}`;
    } else {
      throw new Error('URL protocol is defined but no host/hostname');
    }
  }
  url += toRelativeUrl(location, options);
  return url;
}

export function toRelativeUrl(location: Location, options: AnonymousObject = {}): string {
  let url = '';
  if (location.pathname) {
    url += location.pathname;
  }
  const query = location.query || {};
  if (location.state) {
    query[URL_STATE] = atob(JSON.stringify(location.state));
  }
  if (query && Object.keys(query).length > 0 && options.query !== false) {
    url += `?${qs.stringify(location.query as AnonymousObject)}`;
  }
  if (!isNull(location.hash) && Object.keys(location.hash as AnonymousObject).length > 0 && options.hash !== false) {
    url += `#${qs.stringify(location.hash as AnonymousObject)}`;
  }
  return url;
}

export function extractState(query: AnonymousObject): string | null {
  if (!query || !query[URL_STATE]) return null;
  return atob(JSON.stringify(query[URL_STATE]));
}
