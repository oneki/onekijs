import { useCallback, useEffect, useRef, useState } from 'react';
import { isNullOrEmpty } from '../../utils/object';
import { useFormContext } from '../context';

export const LOADING = 0;
export const ERROR = 1;
export const WARNING = 2;
export const OK = 3;
export const NONE = 4;

export const defaultValidation = {
  message: null,
  status: null,
  statusCode: NONE,
};

export const useValidation = (name = '', touchedOnly = true) => {
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
          return fields[name].touched
            ? validationsRef.current[name] || defaultValidation
            : defaultValidation;
        } else {
          return validationsRef.current[name] || defaultValidation;
        }
      } else {
        return getContainerFieldValidation(
          validationsRef.current,
          fields,
          name,
          touchedOnly
        );
      }
    },
    [fields, validationsRef, getContainerFieldValidation]
  );

  const [validation, setValidation] = useState(() => {
    if (isNullOrEmpty(argsRef.current.name)) {
      return getContainerFieldValidation(
        validationsRef.current,
        fields,
        '',
        argsRef.current.touchedOnly
      );
    } else {
      return getFieldValidation(
        argsRef.current.name,
        argsRef.current.touchedOnly
      );
    }
  });

  useEffect(() => {
    const { name, touchedOnly } = argsRef.current;
    const listener = nextValidation => {
      if (isNullOrEmpty(name)) {
        setValidation(
          getContainerFieldValidation(
            validationsRef.current,
            fields,
            '',
            touchedOnly
          )
        );
      } else {
        if (!touchedOnly || fields[name].touched) {
          setValidation(nextValidation);
        }
      }
    };
    onValidationChange(listener, [name]);
    return () => {
      offValidationChange(listener, [name]);
    };
  }, [
    onValidationChange,
    offValidationChange,
    fields,
    validationsRef,
    getContainerFieldValidation,
  ]);

  return validation;
};
