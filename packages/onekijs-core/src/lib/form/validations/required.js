import { isNull, isObject } from '../../utils/object';
import { isTrue, isFalse } from '../../utils/type';

export const required = message => {
  return value => {
    let valid;
    if (message === false) {
      valid = true;
    } else if (isNull(value)) {
      valid = false;
    } else if (Array.isArray(value)) {
      valid = value.length > 0;
    } else if (isObject(value)) {
      valid = Object.keys(value).length > 0;
    } else if (typeof value === 'string') {
      valid = value.trim().length > 0;
    } else {
      valid = value !== '';
    }

    if (!message || isTrue(message) || isFalse(message)) {
      message = 'This field is required';
    }

    return {
      valid,
      message,
    };
  };
};
