import regex from './regex';
import { Validator } from '../typings';

const email = (message?: string): Validator => {
  return regex(
    new RegExp(
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'i',
    ),
    message,
  );
};

export default email;
