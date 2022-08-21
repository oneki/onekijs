import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { isNullOrEmpty } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation, { defaultValidation } from './FieldValidation';
import { FormValidationListener } from './typings';
import useForm from './useForm';

const useValidation = (name = '', touchedOnly = true): FieldValidation | ContainerValidation => {
  const form = useForm();
  const id = useId();

  const argsRef = useRef({ name, touchedOnly });

  const getFieldValidation = useCallback(
    (name: string, touchedOnly: boolean) => {
      if (form.fields[name]) {
        if (touchedOnly) {
          return form.fields[name].touched ? form.state.validations[name] || defaultValidation : defaultValidation;
        } else {
          return form.state.validations[name] || defaultValidation;
        }
      } else {
        return form.getContainerFieldValidation(form.state.validations, form.fields, name, touchedOnly);
      }
    },
    [form],
  );

  const [validation, setValidation] = useState(() => {
    if (isNullOrEmpty(argsRef.current.name)) {
      return form.getContainerFieldValidation(form.state.validations, form.fields, '', argsRef.current.touchedOnly);
    } else {
      return getFieldValidation(argsRef.current.name, argsRef.current.touchedOnly);
    }
  });

  useEffect(() => {
    const { name, touchedOnly } = argsRef.current;
    const listener: FormValidationListener = (validation) => {
      if (isNullOrEmpty(name)) {
        setValidation(form.getContainerFieldValidation(form.state.validations, form.fields, '', touchedOnly));
      } else {
        if (!touchedOnly || form.fields[name].touched) {
          setValidation(validation);
        }
      }
    };
    form.onValidationChange(id, listener, [name]);
    return () => {
      form.offValidationChange(id);
    };
  }, [form, id]);

  return validation;
};

export default useValidation;
