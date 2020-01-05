export function isNull(value) {
  return value === undefined || value === null;
}

export function isNullOrEmpty(value) {
  return value === undefined || value === null || value === "";
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
export function deepFreeze(object) {
  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (let name of propNames) {
    let value = object[name];

    object[name] =
      value && typeof value === "object" ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

export function del(content, property) {
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

export function find(content, property, populate = false) {
  if (typeof property !== "string") {
    property = `${property}`;
  }
  if (isNull(content)) {
    return [undefined, undefined];
  }
  if (property === "") {
    return [content, undefined];
  }
  const parts = property.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const index = !isNaN(part) ? parseInt(part) : part;
    try {
      if (!(index in content)) {
        if (populate) {
          if (!isNaN(parts[i + 1])) {
            content[index] = [];
          } else {
            content[index] = {};
          }
        } else {
          return [undefined, undefined];
        }
      }
    } catch (e) {
      return [undefined, undefined];
    }
    content = content[index];
    if (isNull(content)) {
      return [undefined, undefined];
    }
  }
  const index = !isNaN(parts[parts.length - 1])
    ? parseInt(parts[parts.length - 1])
    : parts[parts.length - 1];
  return [content, index];
}

export function get(content, property, defaultValue) {
  if (isNull(property) || property === "") {
    return content;
  }
  const [subContent, index] = find(content, property);
  try {
    if (isNull(subContent) || !(index in subContent)) {
      return defaultValue;
    }
    return subContent[index];
  } catch (e) {
    return defaultValue;
  }
}

export function append(content, property, value) {
  return update(content, property, arr => {
    if (isNull(arr)) {
      return [value];
    }
    if (!arr.includes(value)) {
      arr.push(value);
    }
    return arr;
  });
}

export function set(content, property, value) {
  if (property === "") {
    return value;
  }
  const [subContent, index] = find(content, property, true);
  subContent[index] = value;
  return content;
}

export function update(content, property, fn) {
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
function is(x, y) {
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
export function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
