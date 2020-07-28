import React, { FC } from 'react';
import { extractValidators } from '../utils';
import useField from '../useField';
import { TextareaProps } from '../typings';

const Textarea: FC<TextareaProps> = React.memo((props) => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, ...textareaProps } = wrappedProps;
  const field = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });
  return <textarea {...textareaProps} {...field} />;
});

Textarea.displayName = 'Textarea';
export default Textarea;
