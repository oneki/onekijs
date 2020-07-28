import React, { FC, useCallback } from 'react';
import useField from '../useField';
import { InputProps } from '../typings';
import { extractValidators } from '../utils';

const Input: FC<InputProps> = React.memo((props) => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, ...inputProps } = wrappedProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });

  const onCheck = useCallback(
    (event) => {
      onChange(event.target.checked);
    },
    [onChange],
  );

  // eslint-disable-next-line react/prop-types
  if (props.type === 'checkbox') {
    return <input {...inputProps} name={name} onFocus={onFocus} onBlur={onBlur} onChange={onCheck} checked={value} />;
  }

  return <input {...inputProps} name={name} onFocus={onFocus} onBlur={onBlur} onChange={onChange} value={value} />;
});

Input.displayName = 'Input';
export default Input;
