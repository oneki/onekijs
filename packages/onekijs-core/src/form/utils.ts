import required from './validators/required';
import regex from './validators/regex';
import { Validator } from './typings';
import { AnonymousObject } from '../core/typings';
import { isFalse } from '../utils/type';

// extract validators from props
export const extractValidators = (props: AnonymousObject): [Validator[], AnonymousObject] => {
  let validators: Validator[] = [];
  const {
    required: requiredValidator,
    requiredMessage,
    regex: regexValidator,
    regexMessage,
    validators: extraValidators,
    ...extraProps
  } = props;

  if (requiredValidator && !isFalse(requiredValidator)) {
    validators.push(required(requiredMessage));
  }
  if (regexValidator) {
    validators.push(regex(regexValidator, regexMessage));
  }
  if (extraValidators) {
    validators = validators.concat(extraValidators);
  }
  return [validators, extraProps];
};
