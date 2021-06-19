import { AnonymousObject } from '@oneki/types';
import { isFalse } from '@oneki/utils';
import { Validator } from './typings';
import regex from './validators/regex';
import required from './validators/required';

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
