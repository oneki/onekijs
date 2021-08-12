import { useRef } from 'react';
import { AnonymousObject } from '../types/object';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isNull(value: any): boolean {
  return value === undefined || value === null;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isNullOrEmpty(value: any): boolean {
  return value === undefined || value === null || value === '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function or(value: any, defaultValue: any): any {
  return isNull(value) ? defaultValue : value;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
export function deepFreeze(object: AnonymousObject): Readonly<AnonymousObject> {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    object[name] = value && typeof value === 'object' ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

// https://gist.github.com/Salakar/1d7137de9cb8b704e48a
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
}

// https://gist.github.com/Salakar/1d7137de9cb8b704e48a
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function simpleMergeDeep(target: any, source: any): any {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key] || !isObject(target[key])) {
          target[key] = source[key];
        }
        simpleMergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }
  return target;
}

// https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function clone(item: any): any {
  if (!item) {
    return item;
  } // null, undefined values check

  const types = [Number, String, Boolean];
  let result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result == 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = [];
      item.forEach(function (child: any, index: any) {
        result[index] = clone(child);
      });
    } else if (typeof item == 'object') {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == 'function') {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};
          for (const i in item) {
            (result as any)[i] = clone(item[i]);
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function del(content: any, property: string | number) {
  const [subContent, index] = find(content, property);
  if (!isNull(subContent)) {
    if (Array.isArray(subContent)) {
      subContent.splice(index, 1);
    } else {
      delete subContent[index];
    }
  }
  return content;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function find(content: any, property: string | number, populate = false): any[] {
  let parentContent: any = undefined;
  let parentIndex: any = undefined;

  if (typeof property !== 'string') {
    property = `${property}`;
  }
  if (isNull(content)) {
    return [undefined, undefined];
  }
  if (property === '') {
    return [content, undefined];
  }
  const parts = property.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const index = !isNaN(Number(part)) ? parseInt(part) : part;
    try {
      if (!(index in content)) {
        if (populate) {
          if (!isNaN(Number(parts[i + 1]))) {
            content[index] = [];
          } else {
            content[index] = {};
          }
        } else {
          return [undefined, undefined];
        }
      }
    } catch (e) {
      if (populate) {
        if (!isNaN(Number(index)) && !Array.isArray(content)) {
          content = [];
          if (parentContent !== undefined) {
            parentContent[parentIndex] = content;
          }
        }
        if (isNaN(Number(index)) && (typeof content !== 'object' || content === null)) {
          content = {};
          if (parentContent !== undefined) {
            parentContent[parentIndex] = content;
          }
        }
        if (!isNaN(Number(parts[i + 1]))) {
          content[index] = [];
        } else {
          content[index] = {};
        }
      } else {
        return [undefined, undefined];
      }
    }
    parentContent = content;
    parentIndex = index;
    content = content[index];
    if (isNull(content)) {
      return [undefined, undefined];
    }
  }
  const index = !isNaN(Number(parts[parts.length - 1])) ? parseInt(parts[parts.length - 1]) : parts[parts.length - 1];
  return [content, index];
}

export function get<T = any>(content: any, property: string): T | undefined;
export function get<T = any>(content: any, property: string, defaultValue: undefined): T | undefined;
export function get<T = any>(content: any, property: string, defaultValue: null): T | null;
export function get<T = any>(content: any, property: string, defaultValue: T): T;
export function get<T = any>(content: any, property?: string, defaultValue?: T): T | undefined;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get(content: any, property?: any, defaultValue?: any): any {
  if (property === undefined || property === null || property === '') {
    return content;
  }
  const [subContent, index] = find(content, property);
  try {
    if (isNull(subContent) || !(index in subContent)) {
      return defaultValue;
    }
    return subContent[index] === undefined ? defaultValue : subContent[index];
  } catch (e) {
    return defaultValue;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function append<T>(content: T, property: string | number, value: any): T {
  return update(content, property, (arr: any[]) => {
    if (isNull(arr)) {
      return [value];
    }
    if (!arr.includes(value)) {
      arr.push(value);
    }
    return arr;
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function set<T>(content: any, property: string | number, value: any, force = true): T {
  if (property === '') {
    return value;
  }

  const parts = `${property}`.split('.');
  if (content === undefined && force) {
    if (!isNaN(Number(parts[0]))) {
      content = [];
    } else {
      content = {};
    }
  }

  if (force) {
    if (!isNaN(Number(parts[0]))) {
      if (!Array.isArray(content)) {
        content = [];
      }
    } else {
      if (typeof content !== 'object' || content === null) {
        content = {};
      }
    }
  }

  const [subContent, index] = find(content, property, true);
  if (!isNull(subContent)) {
    if (force || subContent[index] === undefined) {
      subContent[index] = value;
    }
  }
  return content;
}

export function update<T>(content: T, property: string | number, fn: { (arr: any[]): any[]; (arg0: any): any }): T {
  const [subContent, index] = find(content, property, true);
  const value = fn(subContent[index]);
  subContent[index] = value;
  return content;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: any, y: any) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    // eslint-disable-next-line no-self-compare
    return x !== x && y !== y;
  }
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export function shallowEqual(objA: AnonymousObject | null, objB: AnonymousObject | null): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

export function useShallowEqual<T>(obj: T): T {
  const ref = useRef(obj);
  if (shallowEqual(ref.current, obj)) {
    obj = ref.current;
  } else {
    ref.current = obj;
  }

  return obj;
}

export const diffArrays = (
  arr1: any[],
  arr2: any[],
): {
  added: any[];
  removed: any[];
  same: any[];
} => {
  const removed = arr1.filter((x) => !arr2.includes(x));
  const added = arr2.filter((x) => !arr1.includes(x));
  const same = arr1.filter((x) => arr2.includes(x));
  return { added, removed, same };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toPayload = (args: any) => {
  const payload: AnonymousObject = {};
  Array.prototype.slice.call(args).forEach((arg, i) => (payload[`arg${i.toString().padStart(5, '0')}`] = arg));
  return payload;
};

export const fromPayload = (payload: AnonymousObject): any[] => {
  const args: any[] = [];
  Object.keys(payload)
    .sort()
    .forEach((k) => {
      args.push(payload[k]);
    });
  return args;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const omit = <T>(source: any, keys: string[]): T => {
  const clone = Object.assign({}, source);
  keys.forEach((key) => delete clone[key]);
  return clone as T;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isGetter = (obj: any, property: string): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(obj, property);
  return descriptor !== undefined && descriptor.get !== undefined;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isSetter = (obj: any, property: string): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(obj, property);
  return descriptor !== undefined && descriptor.set !== undefined;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isGetterOrSetter = (obj: any, property: string): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(obj, property);
  return descriptor !== undefined && (descriptor.get !== undefined || descriptor.set !== undefined);
};

export const toArray = <T>(a: T | T[]): T[] => {
  if (Array.isArray(a)) return a;
  return [a];
};
