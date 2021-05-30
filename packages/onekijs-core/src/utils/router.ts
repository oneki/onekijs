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
