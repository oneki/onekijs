import React, { FC } from 'react';
import { extractValidators } from '../utils';
import useField from '../useField';
import { SelectProps } from '../typings';

const Select: FC<SelectProps> = React.memo((props) => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, ...selectProps } = wrappedProps;
  const field = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });
  return <select {...selectProps} {...field} />;
});

Select.displayName = 'Select';
export default Select;
