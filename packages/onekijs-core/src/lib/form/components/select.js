import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../field';
import { extractValidators } from '../../utils/form';

export const Select = React.memo(props => {
  const [validators, extraProps] = extractValidators(props);
  const { name, defaultValue, ...selectProps } = extraProps;
  const { validation, ...field } = useField(name, validators, {
    defaultValue: defaultValue === undefined ? '' : defaultValue,
  });
  return <select {...selectProps} {...field} />;
});

Select.propTypes = {
  props: PropTypes.object,
};
