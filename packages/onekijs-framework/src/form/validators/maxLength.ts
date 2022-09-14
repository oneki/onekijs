import { isNullOrEmpty } from '../../utils/object';
import { Validator } from '../typings';

const maxLength = (maxLength: number, message?: string): Validator => {
  return (value: any) => {
    if (typeof value === 'string') {
      if (isNullOrEmpty(value)) {
        // this is managed by the required validator
        return {
          valid: true,
          message: undefined,
        };
      }

      if (!message) {
        message = `Invalid value. Must contain at most ${maxLength} character${maxLength > 1 ? 's' : ''}`;
      }

      return {
        valid: value.length <= maxLength,
        message,
      };
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        // this is managed by the required validator
        return {
          valid: true,
          message: undefined,
        };
      }

      if (!message) {
        message = `Invalid value. Must contain at most ${maxLength} element${maxLength > 1 ? 's' : ''}`;
      }

      return {
        valid: value.length <= maxLength,
        message,
      };
    }

    // do not apply to other types
    return {
      valid: true,
      message: undefined,
    };
  };
};

export default maxLength;
