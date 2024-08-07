import { useRef } from 'react';
import { AnonymousObject, NestedKeyOf, PathType } from '../types/object';
import { isSameArray } from './array';

export const LOADING = Symbol();

export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== 'constructor') {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
        );
      }
    });
  });
}

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
  if (target === undefined) {
    return source;
  }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      target[key] = simpleMergeDeep(target[key], source[key]);
    });
  }
  return target;
}

export function mergeDefault(obj: any, defaults: any): any {
  if (isObject(obj) && isObject(defaults)) {
    Object.keys(defaults).forEach((key) => {
      obj[key] = obj[key] === undefined ? defaults[key] : obj[key];
    });
  }
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
      if (!(index in content) || content[index] === undefined) {
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
        return [undefined, undefined, parentContent, parentIndex];
      }
    }
    parentContent = content;
    parentIndex = index;
    content = content[index];
    if (isNull(content)) {
      return [undefined, undefined, parentContent, parentIndex];
    }
  }
  const index = !isNaN(Number(parts[parts.length - 1])) ? parseInt(parts[parts.length - 1]) : parts[parts.length - 1];
  return [content, index, parentContent, parentIndex];
}

export function get<T>(content: T, property?: undefined, defaultValue?: T): T;
export function get<T, K extends NestedKeyOf<T> = NestedKeyOf<T>>(
  content: T | null | undefined,
  property: K,
  defaultValue: Exclude<PathType<T, K>, undefined | null>,
): Exclude<PathType<T, K>, undefined | null>;
export function get<T, K extends NestedKeyOf<T> = NestedKeyOf<T>>(
  content: T | null | undefined,
  property: K,
  defaultValue?: PathType<T, K>,
): PathType<T, K>;
export function get<T, K extends NestedKeyOf<T> = NestedKeyOf<T>>(
  content?: T | null,
  property?: K,
  defaultValue?: PathType<T, K>,
): PathType<T, K> | undefined;
export function get<T, K extends NestedKeyOf<T> = NestedKeyOf<T>>(
  content?: T | null,
  property?: K,
  defaultValue?: PathType<T, K> | null,
): PathType<T, K> | null;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get(content: any, property: any, defaultValue: any): any {
  if (property === undefined || property === null || property === '') {
    return content;
  }

  if (typeof property !== 'string') {
    property = `${property}`;
  }

  if (content === null || content === undefined) {
    return defaultValue;
  }

  const parts = property.split('.');
  for (let i = 0; i <= parts.length - 1; i++) {
    const part = parts[i];
    const isNumber = !isNaN(Number(part));
    const index = isNumber ? parseInt(part) : part;
    try {
      if (Array.isArray(content) && !isNumber) {
        content = content.map((c) => c[index]).flat();
      } else if (!(index in content) || content[index] === undefined) {
        return defaultValue;
      } else {
        content = content[index];
        if (isNull(content) && i !== parts.length - 1) {
          return defaultValue;
        }
      }
    } catch (e) {
      return defaultValue;
    }
  }

  return content;
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
export function set<T, K extends NestedKeyOf<T> = NestedKeyOf<T>>(
  content: T | undefined,
  property: K,
  value: PathType<T, K>,
  force = true,
): T {
  if (property === '') {
    // TODO change that
    return content!;
  }

  const parts = `${property}`.split('.');
  if (content === undefined && force) {
    if (!isNaN(Number(parts[0]))) {
      content = [] as unknown as T;
    } else {
      content = {} as T;
    }
  }

  if (force) {
    if (!isNaN(Number(parts[0]))) {
      if (!Array.isArray(content)) {
        content = [] as unknown as T;
      }
    } else {
      if (typeof content !== 'object' || content === null) {
        content = {} as T;
      }
    }
  }

  // eslint-disable-next-line prefer-const
  let [subContent, index, parentContent, parentIndex] = find(content, property, true);
  if (!isNull(subContent)) {
    if (force) {
      if (!isNaN(index)) {
        if (!Array.isArray(subContent) && parentContent) {
          parentContent[parentIndex] = [];
          subContent = parentContent[parentIndex];
        }
      } else {
        if ((typeof subContent !== 'object' || subContent === null) && parentContent) {
          parentContent[parentIndex] = {};
          subContent = parentContent[parentIndex];
        }
      }
    }

    if (force || subContent[index] === undefined) {
      try {
        subContent[index] = value;
      } catch (e) {
        if (force) {
          if (!isNaN(index)) {
            if (!Array.isArray(subContent) && parentContent) {
              parentContent[parentIndex] = [];
              subContent = parentContent[parentIndex];
            }
          } else {
            if ((typeof subContent !== 'object' || subContent === null) && parentContent) {
              parentContent[parentIndex] = {};
              subContent = parentContent[parentIndex];
            }
          }
          subContent[index] = value;
        } else {
          throw e;
        }
      }
    }
  }
  return content!;
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
export function shallowEqual(objA: any, objB: any): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== typeof objB) {
    return false;
  }

  if (Array.isArray(objA)) {
    if (!Array.isArray(objB) || objA.length !== objB.length) {
      return false;
    }
    for (const i in objA) {
      if (!shallowEqual(objA[i], objB[i])) {
        return false;
      }
    }
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
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (Array.isArray(objA[key]) && Array.isArray(objB[key])) {
      if (!isSameArray(objA[key], objB[key])) {
        return false;
      } else {
        continue;
      }
    }

    if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
      if (!shallowEqual(objA[key], objB[key])) {
        return false;
      } else {
        continue;
      }
    }

    if (!is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

export function useShallowEqual<T = any>(obj: AnonymousObject<T>): AnonymousObject<T> {
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
export const omit = <T, S = any>(source: S, keys: (keyof S)[]): T => {
  const clone = Object.assign({}, source);
  keys.forEach((key) => delete clone[key]);
  return clone as unknown as T;
};

export const pick = <T>(source: T & { [k: string]: any }, keys: (keyof T)[]): T => {
  const result: any = {};
  keys.forEach((key) => (result[key] = source[key]));
  return result as T;
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

export const toArray = <T>(a: T | T[] | undefined): T[] => {
  if (Array.isArray(a)) return a;
  if (a === undefined) return [];
  return [a];
};

export const ensureFieldValue = <T, K extends keyof T>(object: T, field: K, value?: T[K]): T => {
  if (object[field] === undefined) {
    if (value === undefined) {
      delete object[field];
    } else {
      object[field] = value;
    }
  }
  return object;
};

export const isDictionary = (object: unknown): object is Record<keyof never, unknown> => {
  return object instanceof Object && object.constructor === Object;
};
