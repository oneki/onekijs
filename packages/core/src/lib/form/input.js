import React from 'react'
import { useField } from '../form';
import { useGlobalProp } from '../state';
import { extractValidators } from '../utils/form';

export const Input = React.memo(props => {
  const [validators, extraProps] = extractValidators(props);
  const field = useField(props.name, validators);
  console.log('render', props.name, 'with value = ', field.value)
  return <input {...extraProps} {...field} />
});