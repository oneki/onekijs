import React from 'react'
import { isNull, isObject } from "./utils/object"
import { isTrue, isFalse } from './utils/type';

export const LOADING = 0;
export const ERROR = 1;
export const WARNING = 2;
export const OK = 3;

export const required = (value, message) => {
  let valid;
  if (message === false) {
    valid = true;
  } else if (isNull(value)) {
    valid = false;
  } else if (Array.isArray(value)) {
    valid = value.length > 0;
  } else if (isObject(value)) {
    valid = Object.keys(value).length > 0;
  } else {
    valid = (value !== '')
  }
  
  if (isTrue(message) || isFalse(message)) {
    message = <>This field is required.</>
  }
  
  return {
    valid,
    message
  }
}


export const validators = {
  required
}