const b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const b64pad = '=';

export function generateRandomString(
  length: number,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_',
): string {
  const result = [];
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

// Copyright (c) 2010-2018 Kenji Urushima - jsrsasign
export function hex2b64(h: string): string {
  let i;
  let c;
  let ret = '';
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

export function lcfirst(str: string): string;
export function lcfirst(str: undefined): undefined;
export function lcfirst(str: null): null;
export function lcfirst(str?: string | null): string | undefined | null {
  if (str && str.length > 0) {
    return `${str[0].toLowerCase()}${str.substring(1)}`;
  }
  return str;
}

export const regexIndexOf = (str: string, regex: RegExp, startpos = 0): number => {
  const indexOf = str.substring(startpos).search(regex);
  return indexOf >= 0 ? indexOf + startpos : indexOf;
};

// https://github.com/30-seconds/30-seconds-of-code
export function toKebabCase(str: undefined): undefined;
export function toKebabCase(str: null): null;
export function toKebabCase(str: string): string;
export function toKebabCase(str: string | null | undefined): string | null | undefined {
  if (str === undefined || str === null) return str;
  const matches = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
  if (matches !== null) {
    return matches.map((x) => x.toLowerCase()).join('-');
  }
  return str;
}

export function trimStart(string: string, charToRemove: string): string {
  while (string.charAt(0) === charToRemove) {
    string = string.substring(1);
  }

  return string;
}

export function trimEnd(string: string, charToRemove: string): string {
  while (string.charAt(string.length - 1) === charToRemove) {
    string = string.substring(0, string.length - 1);
  }

  return string;
}

export function trim(string: string, charToRemove: string): string {
  string = trimStart(string, charToRemove);
  return trimEnd(string, charToRemove);
}
