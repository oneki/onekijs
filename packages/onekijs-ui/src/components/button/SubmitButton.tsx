import { AnonymousObject, FCC, FORM_GLOBAL_VALIDATION_KEY, useSubmit, ValidationCode } from 'onekijs-framework';
import React from 'react';
import Button from '.';
import Tooltip from '../tooltip';
import { SubmitButtonProps } from './typings';

const TooltipContent: React.FC<{ code: ValidationCode; fields: AnonymousObject<string> }> = ({ code, fields }) => {
  if (code <= ValidationCode.Error) {
    return (
      <>
        <div>Some fields are {code === ValidationCode.Error ? 'in error' : 'loading'}</div>
        {Object.keys(fields).map((fieldName, index) => (
          <div key={`error-${index}`}>
            {fieldName !== FORM_GLOBAL_VALIDATION_KEY ? <><b>fieldName</b>:</>  : ''}{fields[fieldName]}
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
  let loading = false;
  let kind = props.kind || 'primary';

  let errors = [];
  if (code <= ValidationCode.Error) {
    disabled = true;
    if (showErrors) {
      errors = Object.keys(fields);
    }
    kind = 'danger';
  }
  if (code === ValidationCode.Loading) {
    loading = true;
    kind = 'dark';
  }

  // eslint-disable-next-line react/prop-types

  if (submitting || loading) {
    disabled = true;
  }

  return (
    <Tooltip
      content={errors.length > 0 && !loading ? <TooltipContent code={code} fields={fields} /> : undefined}
      placement="top"
      kind={kind}
      delayHide={0}
    >
      <Button {...props} kind={kind} disabled={disabled} type={type} loading={submitting || loading}>
        {props.children ? props.children : 'Submit'}
      </Button>
    </Tooltip>
  );
});

SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;
