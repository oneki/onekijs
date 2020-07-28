import { SyntheticEvent, useEffect, useState } from 'react';
import { Collection } from '../core/typings';
import useFormContext from './useFormContext';
import { ValidationCode, ValidationStatus } from './typings';
import useFormStatus from './useFormStatus';

const useSubmit = (): {
  submit: (e?: SyntheticEvent<Element, Event>) => void;
  submitting: boolean;
  status: ValidationStatus;
  code: ValidationCode;
  fields: Collection<string>;
} => {
  const { status, code, fields } = useFormStatus();
  const { submittingRef, onSubmittingChange, offSubmittingChange, submit } = useFormContext();
  const [submitting, setSubmitting] = useState(submittingRef.current);

  useEffect((): (() => void) => {
    const listener = (submitting: boolean) => setSubmitting(submitting);
    onSubmittingChange(listener);

    return (): void => {
      offSubmittingChange(listener);
    };
  }, [onSubmittingChange, offSubmittingChange]);
  return {
    submit,
    submitting,
    status,
    code,
    fields,
  };
};

export default useSubmit;
