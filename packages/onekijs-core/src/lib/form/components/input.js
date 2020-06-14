import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../field';
import { extractValidators } from '../../utils/form';

export const Input = React.memo(props => {
  const [validators, extraProps] = extractValidators(props);
  const { name, defaultValue } = extraProps;
  const { validation, ...field } = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });
  return (
    <>
      <input {...extraProps} {...field} />
    </>
  );
});

Input.propTypes = {
  props: PropTypes.object,
};
