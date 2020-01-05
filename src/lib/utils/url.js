import { trimEnd, trimStart } from "./string";

export function urlBuilder(path, params = {}, query = {}) {
  var esc = encodeURIComponent;
  Object.keys(params)
    .sort((a, b) => b.length - a.length)
    .forEach(k => {
      path = path.replace(`:${k}`, params[k]);
    });
  const queryKeys = Object.keys(query);
  const separator = queryKeys.length > 0 ? "?" : "";
  query = queryKeys.map(k => esc(k) + "=" + esc(params[k])).join("&");
  return `${path}${separator}${query}`;
}

export function isAbsoluteUrl(url) {
  var pattern = new RegExp("^(?:[a-z]+:)?//", "i");
  return pattern.test(url);
}

export function absoluteUrl(url, baseUrl) {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  if (!baseUrl) {
    baseUrl = `${window.location.protocol}//${window.location.host}`;
  }
  return [trimEnd(baseUrl, "/"), trimStart(url, "/")].join("/");
}
