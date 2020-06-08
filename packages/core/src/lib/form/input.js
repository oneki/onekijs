import React from 'react'
import { useField, useFormContext } from '../form';
import { extractValidators } from '../utils/form';

export const Input = React.memo(props => {
  console.log('render', props.name);
  const [validators, extraProps] = extractValidators(props);
  //const field = useField(props.name, validators);
  const context = useFormContext()
  const firstname = context.useBind((firstname) => firstname, ['firstName'])
  console.log(firstname);
  return <input {...extraProps} {...context.field(props.name, validators)} />
});