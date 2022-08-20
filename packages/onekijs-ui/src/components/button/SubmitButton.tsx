import { AnonymousObject, FCC, useSubmit, ValidationCode } from 'onekijs-framework';
import React from 'react';
import Button from '.';
import Tooltip from '../tooltip';
import { SubmitButtonProps } from './typings';

const TooltipContent: React.FC<{ code: ValidationCode; fields: AnonymousObject<string> }> = ({ code, fields }) => {
  if (code <= ValidationCode.Error) {
    return (
      <>
        <div>Some fields are in {code === ValidationCode.Error ? 'in error' : 'loading'}</div>
        {Object.keys(fields).map((fieldName, index) => (
          <div key={`error-${index}`}>
            <b>{fieldName}</b>: {fields[fieldName]}
          </div>
        ))}
      </>
    );
  }
  return null;
};

const SubmitButton: FCC<SubmitButtonProps> = React.memo((opts) => {
  const { submitting, code, fields } = useSubmit();
  const { showErrors, type = 'submit', ...props } = opts;
  let disabled = props.disabled || false;

  let errors = [];
  if (code <= ValidationCode.Error) {
    disabled = true;
    if (showErrors) {
      errors = Object.keys(fields);
    }
  }

  // eslint-disable-next-line react/prop-types
  let children = props.children;
  if (submitting) {
    children = <>Loading...</>;
    disabled = true;
  }

  return (
    <Tooltip
      content={errors.length > 0 ? <TooltipContent code={code} fields={fields} /> : undefined}
      placement="top"
      kind="danger"
      delayHide={0}
    >
      <Button {...props} disabled={disabled} type={type}>
        {children ? children : 'Submit'}
      </Button>
    </Tooltip>
  );
});

SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;
