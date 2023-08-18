import React, { useCallback, useEffect, useRef } from 'react';
import useField from '../useField';
import { InputProps } from '../typings';
import { extractValidators } from '../utils';
import useValidation from '../useValidation';
import { mergeString } from '../../utils/string';
import { FCC } from '../../types/core';

const Input: FCC<InputProps> = React.memo((props) => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, className, touchOn, ...inputProps } = wrappedProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, {
    defaultValue: defaultValue === undefined ? (props.type === 'checkbox' ? false : '') : defaultValue,
    touchOn,
  });
  const validation = useValidation(props.name);
  const onCheck = useCallback(
    (event: any) => {
      onChange(event.target.checked);
    },
    [onChange],
  );
  let inputClassName = className;
  if (validation.isError()) {
    inputClassName = mergeString(' ', className, 'o-input-error');
  }

  const ref = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<number | null | undefined>()
  const onValueChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
    selectorRef.current = e.target.selectionStart;
    onChange && onChange(e);
  }

  useEffect(() => {
    if (selectorRef.current !== undefined && selectorRef.current !== null && ref.current) {
      ref.current.setSelectionRange(selectorRef.current, selectorRef.current);
      selectorRef.current = undefined;
    }
  }, [value]);

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
      ref={ref}
      name={name}
      className={inputClassName}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onValueChange}
      value={value}
    />
  );
});

Input.displayName = 'Input';
export default Input;
