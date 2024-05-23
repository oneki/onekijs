import { AnonymousObject } from '../types/object';
import { isFalse } from '../utils/type';
import { Validator } from './typings';
import email from './validators/email';
import integer from './validators/integer';
import max from './validators/max';
import maxLength from './validators/maxLength';
import min from './validators/min';
import minLength from './validators/minLength';
import regex from './validators/regex';
import required from './validators/required';

// extract validators from props
export const extractValidators = (props: AnonymousObject): [AnonymousObject<Validator>, AnonymousObject] => {
  let validators: AnonymousObject<Validator> = {};
  const {
    required: requiredValidator,
    requiredMessage,
    regex: regexValidator,
    regexMessage,
    email: emailValidator,
    emailMessage,
    min: minValidator,
    minMessage,
    max: maxValidator,
    maxMessage,
    minLength: minLengthValidator,
    minLengthMessage,
    maxLength: maxLengthValidator,
    maxLengthMessage,
    integer: integerValidator,
    integerMessage,
    validators: extraValidators,
    ...extraProps
  } = props;

  if (requiredValidator && !isFalse(requiredValidator)) {
    validators.required = required(requiredMessage);
  }
  if (regexValidator) {
    validators.regex = regex(regexValidator, regexMessage);
  }
  if (emailValidator && !isFalse(emailValidator)) {
    validators.email = email(emailMessage);
  }
  if (minValidator !== undefined) {
    validators.min = min(minValidator, minMessage);
  }
  if (maxValidator !== undefined) {
    validators.max = max(maxValidator, maxMessage);
  }
  if (minLengthValidator !== undefined) {
    validators.minLength = minLength(minLengthValidator, minLengthMessage);
  }
  if (maxLengthValidator !== undefined) {
    validators.maxLength = maxLength(maxLengthValidator, maxLengthMessage);
  }
  if (integerValidator && !isFalse(integerValidator)) {
    validators.integer = integer(integerMessage);
  }
  if (extraValidators) {
    validators = Object.assign(validators, extraValidators);
  }
  return [validators, extraProps];
};

export const getNonIndexedProp = (prop: string): string | undefined => {
  let result: string | undefined = undefined;
  const tokens = prop.split('.');
  if (tokens.length <= 1) return undefined;
  if (!isNaN(Number(tokens.slice(-1)[0]))) return undefined;
  result = tokens.filter((token) => isNaN(Number(token))).join('.');
  if (result === prop) return undefined;
  return result;
};

export const extractWatchProps = (watch: string): [number, string, string] => {
  const line = watch.split('.').slice(0, -1).join('.');
  const index = parseInt(watch.split('.')[1]);
  const prop = watch.split('.').slice(-1)[0];
  return [index, prop, line];
};
