import React, { FC } from 'react';
import useSubmit from '../useSubmit';
import { SubmitButtonProps, ValidationCode } from '../typings';

const SubmitButton: FC<SubmitButtonProps> = React.memo((props) => {
  const { submitting, code, fields } = useSubmit();

  let disabled = false;
  const alt = [];
  if (code <= ValidationCode.Error) {
    alt.push([`Some fields are ${code === ValidationCode.Error ? 'in error' : 'loading'}`]);
    // disabled = true;
    Object.keys(fields).forEach((fieldName) => {
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
    <button title={alt.join('\n')} disabled={disabled} {...props} type="submit">
      {children}
    </button>
  );
});

SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;
