import { isNull, isObject } from '../../utils/object';
import { isFalse, isTrue } from '../../utils/type';
import { Validator } from '../typings';

const required = (message?: string | boolean): Validator => {
  return (value: any) => {
    let valid;
    if (message === false) {
      valid = true;
    } else if (isNull(value) || value === false) {
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
    } else {
      message = message as string;
    }

    return {
      valid,
      message,
    };
  };
};

export default required;
