import React, { FC, useCallback } from 'react';
import useField from '../useField';
import { InputProps } from '../typings';
import { extractValidators } from '../utils';
import useValidation from '../useValidation';
import { mergeString } from '../../utils/string';

const Input: FC<InputProps> = React.memo((props) => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, className, ...inputProps } = wrappedProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, {
    defaultValue: defaultValue === undefined ? (props.type === 'checkbox' ? false : '') : defaultValue,
  });
  const validation = useValidation(props.name);
  const onCheck = useCallback(
    (event) => {
      onChange(event.target.checked);
    },
    [onChange],
  );
  let inputClassName = className;
  if (validation.isError()) {
    inputClassName = mergeString(' ', className, 'o-input-error');
  }

  // eslint-disable-next-line react/prop-types
  if (props.type === 'checkbox') {
    return (
      <input
        {...inputProps}
        name={name}
        className={inputClassName}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onCheck}
        checked={value}
      />
    );
  }

  return (
    <input
      {...inputProps}
      name={name}
      className={inputClassName}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  );
});

Input.displayName = 'Input';
export default Input;
