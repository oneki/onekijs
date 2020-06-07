import { regex, required } from "../validation";
import { isFalse } from "./type";

// extract validators from props
export const extractValidators = (props) => {
  let validators = [];
  const {
    required: requiredValidator,
    requiredMessage,
    regex: regexValidator,
    regexMessage,
    validators: extraValidators,
    ...extraProps
  } = props;
  
  if (requiredValidator && !isFalse(requiredValidator)) {
    validators.push(required(requiredMessage))
  }
  if (regexValidator) {
    validators.push(regex(regexValidator, regexMessage))
  }
  if (extraValidators) {
    validators = validators.concat(extraValidators)
  }
  return [validators, extraProps];
}