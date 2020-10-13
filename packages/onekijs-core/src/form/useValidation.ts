import { useCallback, useEffect, useRef, useState } from 'react';
import useFormContext from './useFormContext';
import FieldValidation, { defaultValidation } from './FieldValidation';
import ContainerValidation from './ContainerValidation';
import { isNullOrEmpty } from '../core/utils/object';

const useValidation = (name = '', touchedOnly = true): FieldValidation | ContainerValidation => {
  const {
    onValidationChange,
    offValidationChange,
    validationsRef,
    fields,
    getContainerFieldValidation,
  } = useFormContext();

  const argsRef = useRef({ name, touchedOnly });

  const getFieldValidation = useCallback(
    (name, touchedOnly) => {
      if (fields[name]) {
        if (touchedOnly) {
          return fields[name].touched ? validationsRef.current[name] || defaultValidation : defaultValidation;
        } else {
          return validationsRef.current[name] || defaultValidation;
        }
      } else {
        return getContainerFieldValidation(validationsRef.current, fields, name, touchedOnly);
      }
    },
    [fields, validationsRef, getContainerFieldValidation],
  );

  const [validation, setValidation] = useState(() => {
    if (isNullOrEmpty(argsRef.current.name)) {
      return getContainerFieldValidation(validationsRef.current, fields, '', argsRef.current.touchedOnly);
    } else {
      return getFieldValidation(argsRef.current.name, argsRef.current.touchedOnly);
    }
  });

  useEffect(() => {
    const { name, touchedOnly } = argsRef.current;
    const listener = (nextValidation: FieldValidation) => {
      if (isNullOrEmpty(name)) {
        setValidation(getContainerFieldValidation(validationsRef.current, fields, '', touchedOnly));
      } else {
        console.log('useValidation', name, fields[name]);
        if (!touchedOnly || fields[name].touched) {
          setValidation(nextValidation);
        }
      }
    };
    onValidationChange(listener, [name]);
    return () => {
      offValidationChange(listener, [name]);
    };
  }, [onValidationChange, offValidationChange, fields, validationsRef, getContainerFieldValidation]);

  return validation;
};

export default useValidation;
