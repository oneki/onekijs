import React from 'react'
import { useField } from '../form';
import { extractValidators } from '../utils/form';

export const Input = React.memo(props => {
  const [validators, extraProps] = extractValidators(props);
  const field = useField(props.name, validators);
  return <input {...extraProps} {...field} />
});