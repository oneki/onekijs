import React, { FC } from 'react';
import { SubmitButtonProps, ValidationCode } from '../typings';
import useSubmit from '../useSubmit';

const SubmitButton: FC<SubmitButtonProps> = React.memo((opts) => {
  const { submitting, code, fields } = useSubmit();
  const { showErrors, ...props } = opts;
  let disabled = false;
  const alt = [];
  if (code <= ValidationCode.Error && showErrors) {
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
