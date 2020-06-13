import { isNull, isNullOrEmpty, isObject } from "./utils/object";
import { isFalse, isTrue } from './utils/type';

export const LOADING = 0;
export const ERROR = 1;
export const WARNING = 2;
export const OK = 3;
export const LOADING_VALIDATOR_NAME = '__loading';

export const required = (message) => {
  return (value) => {
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
      valid = (value !== '')
    }
    
    if (!message || isTrue(message) || isFalse(message)) {
      message = 'This field is required'
    }
    
    return {
      valid,
      message
    }
  }
}

export const regex = (regex, message) => {
  return (value) => {
    if (isNullOrEmpty(value)) {
      return {
        valid: true,
        message: null
      }
    }
    if (typeof regex === 'string') {
      regex = new RegExp(regex);
    }

    if (!message) {
      message = `Invalid value. Should match the regular expression ${regex}`
    }

    return {
      valid: regex.test(value),
      message
    }
  }
}

export const email = (message) => {
  // eslint-disable-next-line
  return regex(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i'), message);
}

export const defaultValidation = {
  message: null,
  status: null,
};


