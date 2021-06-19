import { Validator } from '../typings';
import { isNullOrEmpty } from '../../utils/object';

const regex = (regex: string | RegExp, message: string): Validator => {
  return (value: string) => {
    if (isNullOrEmpty(value)) {
      return {
        valid: true,
        message: undefined,
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

export default regex;
