import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '../field';
import { extractValidators } from '../../utils/form';

export const Input = React.memo(props => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, ...inputProps } = wrappedProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });

  const onCheck = useCallback(
    event => {
      onChange(event.target.checked);
    },
    [onChange]
  );

  // eslint-disable-next-line react/prop-types
  if (props.type === 'checkbox') {
    return (
      <input
        {...inputProps}
        name={name}
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
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  props: PropTypes.object,
};
