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

export function isFunctionOrPromise(value) {
  return isFunction(value) ||isPromise(value);
}