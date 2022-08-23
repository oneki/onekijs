import { AnonymousObject } from '../types/object';
import { isFalse } from '../utils/type';
import { Validator } from './typings';
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
    validators: extraValidators,
    ...extraProps
  } = props;

  if (requiredValidator && !isFalse(requiredValidator)) {
    validators.required = required(requiredMessage);
  }
  if (regexValidator) {
    validators.regex = regex(regexValidator, regexMessage);
  }
  if (extraValidators) {
    validators = Object.assign(validators, extraValidators);
  }
  return [validators, extraProps];
};
