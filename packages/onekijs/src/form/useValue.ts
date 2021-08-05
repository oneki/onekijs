import { useEffect, useRef, useState } from 'react';
import { get, isNullOrEmpty } from '../utils/object';
import useFormContext from './useFormContext';

const useValue = (fieldName: string): any => {
  const { onValueChange, offValueChange, valuesRef } = useFormContext();
  const nameRef = useRef(fieldName);
  const [value, setValue] = useState((): any => {
    if (isNullOrEmpty(nameRef.current)) {
      return valuesRef.current;
    }
    return get(valuesRef.current, nameRef.current);
  });

  useEffect((): (() => void) => {
    const watch = [nameRef.current || ''];
    const listener = (nextValue: any) => setValue(nextValue);
    onValueChange(listener, watch);

    return (): void => {
      offValueChange(listener, watch);
    };
  }, [onValueChange, offValueChange]);

  return value;
};

export default useValue;
