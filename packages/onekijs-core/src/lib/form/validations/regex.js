import { isNullOrEmpty } from '../../utils/object';

export const regex = (regex, message) => {
  return value => {
    if (isNullOrEmpty(value)) {
      return {
        valid: true,
        message: null,
      };
    }
    if (typeof regex === 'string') {
      regex = new RegExp(regex);
    }

    if (!message) {
      message = `Invalid value. Should match the regular expression ${regex}`;
    }

    return {
      valid: regex.test(value),
      message,
    };
  };
};
