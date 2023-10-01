import { LengthValidator } from '../typings';

const min = (min: number, message?: string): LengthValidator => {
  const validator = (value: any) => {
    if (!isNaN(value)) {
      if (!message) {
        message = `Invalid value. Must be greater than or equal to ${min}`;
      }

      return {
        valid: Number(value) >= min,
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
        message = `Invalid value. Must contain at last ${min} element${min > 1 ? 's' : ''}`;
      }

      return {
        valid: value.length >= min,
        message,
      };
    }

    // do not apply to other types
    return {
      valid: true,
      message: undefined,
    };
  };
  return {
    validator,
    length: min,
  };
};

export default min;
