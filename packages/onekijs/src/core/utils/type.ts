import BasicError from '../BasicError';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isTrue(value: any): boolean {
  return value === 'true' || value === true;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isFalse(value: any): boolean {
  return value === 'false' || value === false;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isPromise(value: any): boolean {
  if (!value) return false;
  return typeof value.then == 'function';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isAsyncFunction(value: any): boolean {
  if (!value || !value.constructor) return false;
  return value.constructor.name === 'AsyncFunction';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isFunctionOrPromise(value: any): boolean {
  return isFunction(value) || isPromise(value);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isAsyncOrPromise(value: any): boolean {
  return isAsyncFunction(value) || isPromise(value);
}

export function isInteger(str: string): boolean {
  return /^(0|[1-9]\d*)$/.test(str);
}

export function ensureType(value: any, type: string | string[]) {
  if (!Array.isArray(type)) {
    type = [type];
  }
  if (!type.includes(typeof value)) {
    throw new BasicError(`Invalid type for value "${value}. Only supported types are ${type.join(',')}`);
  }
}
