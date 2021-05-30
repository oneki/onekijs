import { Validator } from '../typings';
import { isNull, isObject } from 'util';
import { isTrue, isFalse } from '../../utils/type';

const required = (message?: string | boolean): Validator => {
  return (value: any) => {
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
