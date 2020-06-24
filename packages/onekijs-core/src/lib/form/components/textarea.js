import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../field';
import { extractValidators } from '../../utils/form';

export const Textarea = React.memo(props => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, ...textareaProps } = wrappedProps;
  const field = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });
  return <textarea {...textareaProps} {...field} />;
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  props: PropTypes.object,
};
