import { useCallback, useEffect, useRef, useState } from 'react';
import { isNullOrEmpty } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation, { defaultValidation } from './FieldValidation';
import useForm from './useForm';

const useValidation = (name = '', touchedOnly = true): FieldValidation | ContainerValidation => {
  const form = useForm();

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
    const listener = (nextValidation: FieldValidation) => {
      if (isNullOrEmpty(name)) {
        setValidation(form.getContainerFieldValidation(form.state.validations, form.fields, '', touchedOnly));
      } else {
        if (!touchedOnly || form.fields[name].touched) {
          setValidation(nextValidation);
        }
      }
    };
    form.onValidationChange(listener, [name]);
    return () => {
      form.offValidationChange(listener, [name]);
    };
  }, [form]);

  return validation;
};

export default useValidation;
