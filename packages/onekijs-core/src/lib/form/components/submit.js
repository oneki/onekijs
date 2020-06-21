import PropTypes from 'prop-types';
import React from 'react';
import { useFormStatus } from '..';
import { ERROR } from '../validations';

export const Submit = React.memo(props => {
  const { statusCode, fields } = useFormStatus();
  let disabled = false;
  const alt = [];
  if (statusCode <= ERROR) {
    alt.push([
      `Some fields are ${statusCode === ERROR ? 'in error' : 'loading'}`,
    ]);
    disabled = true;
    Object.keys(fields).forEach(fieldName => {
      alt.push(`<${fieldName}>: ${fields[fieldName]}`);
    });
  }

  return (
    <button
      title={alt.join('\n')}
      {...props}
      disabled={disabled}
      type="submit"
    />
  );
});

Submit.displayName = 'Submit';
Submit.propTypes = {
  props: PropTypes.object,
};
