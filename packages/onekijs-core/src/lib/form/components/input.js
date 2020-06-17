import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../field';
import { extractValidators } from '../../utils/form';

export const Input = React.memo(props => {
  const [validators, wrappedProps] = extractValidators(props);
  const { name, defaultValue, ...inputProps } = wrappedProps;
  const field = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });
  return (
    <>
      <input {...inputProps} {...field} />
    </>
  );
});

Input.propTypes = {
  props: PropTypes.object,
};
