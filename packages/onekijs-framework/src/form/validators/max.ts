import { LengthValidator } from '../typings';

const max = (max: number, message?: string): LengthValidator => {
  const validator = (value: any) => {
    if (!isNaN(value)) {
      if (!message) {
        message = `Invalid value. Must be lesser than or equal to ${max}`;
      }

      return {
        valid: Number(value) <= max,
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
        message = `Invalid value. Must contain at most ${max} element${max > 1 ? 's' : ''}`;
      }

      return {
        valid: value.length <= max,
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
    length: max,
  };
};

export default max;
