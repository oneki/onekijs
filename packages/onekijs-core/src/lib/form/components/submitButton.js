import PropTypes from 'prop-types';
import React from 'react';
import { useSubmit } from '..';
import { ERROR } from '../validations';

export const SubmitButton = React.memo(props => {
  const { submitting, statusCode, fields } = useSubmit();

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
  // eslint-disable-next-line react/prop-types
  let children = props.children;
  if (submitting) {
    children = <>Loading...</>;
    disabled = true;
  }

  return (
    <button title={alt.join('\n')} {...props} disabled={disabled} type="submit">
      {children}
    </button>
  );
});

SubmitButton.displayName = 'SubmitButton';
SubmitButton.propTypes = {
  props: PropTypes.object,
};
