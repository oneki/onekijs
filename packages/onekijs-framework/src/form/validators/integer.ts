import { isNullOrEmpty } from '../../utils/object';
import { Validator } from '../typings';

const integer = (message?: string): Validator => {
  return (value: any) => {
    if (isNullOrEmpty(value) || (typeof value === 'string' && /^\d+$/.test(value)) || Number.isInteger(value)) {
      return {
        valid: true,
        message: undefined,
      };
    }

    if (!message) {
      message = `Invalid value. Must be an integer`;
    }

    return {
      valid: false,
      message,
    };
  };
};

export default integer;
