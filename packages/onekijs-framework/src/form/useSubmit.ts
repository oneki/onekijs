import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { ValidationCode } from './typings';
import useForm from './useForm';
import useFormStatus from './useFormStatus';

const useSubmit = (): {
  submit: (e?: SyntheticEvent<Element, Event>) => void;
  submitting: boolean;
  status: ValidationStatus;
  code: ValidationCode;
  fields: AnonymousObject<string>;
} => {
  const { status, code, fields } = useFormStatus();
  const form = useForm();
  const [submitting, setSubmitting] = useState(form.state.submitting || false);

  useEffect((): (() => void) => {
    const listener = (submitting: boolean) => {
      setSubmitting(submitting);
    };
    form.onSubmittingChange(listener);

    return (): void => {
      form.offSubmittingChange(listener);
    };
  }, [form]);

  const submit = useCallback(
    (e?: SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }
      form.submit();
    },
    [form],
  );

  return {
    submit,
    submitting,
    status,
    code,
    fields,
  };
};

export default useSubmit;
