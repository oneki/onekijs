export function isTrue(value) {
  return value === "true" || value === true;
}

export function isFalse(value) {
  return value === "false" || value === false;
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isPromise(value) {
  if (!value) return false;
  return typeof value.then == 'function'
}

export function isAsyncFunction(value) {
  if (!value || !value.constructor) return false;
  return value.constructor.name === "AsyncFunction";
}

export function isFunctionOrPromise(value) {
  return isFunction(value) ||isPromise(value);
}

export function isAsyncOrPromise(value) {
  return isAsyncFunction(value) ||isPromise(value);
}