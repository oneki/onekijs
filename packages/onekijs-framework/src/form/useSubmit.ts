import { SyntheticEvent, useCallback, useEffect, useId, useState } from 'react';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { FormSubmitListener, ValidationCode } from './typings';
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
  const id = useId();
  const [submitting, setSubmitting] = useState(form.state.submitting || false);

  useEffect((): (() => void) => {
    const listener: FormSubmitListener = (submitting) => {
      setSubmitting(submitting);
    };
    form.onSubmittingChange(id, listener);

    return (): void => {
      form.offSubmittingChange(id);
    };
  }, [form, id]);

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
