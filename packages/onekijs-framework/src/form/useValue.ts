import { useEffect, useRef, useState } from 'react';
import { get, isNullOrEmpty } from '../utils/object';
import useForm from './useForm';

const useValue = (fieldName: string): any => {
  const form = useForm();
  const nameRef = useRef(fieldName);
  const [value, setValue] = useState((): any => {
    if (isNullOrEmpty(nameRef.current)) {
      return form.state.values;
    }
    return get(form.state.values, nameRef.current);
  });

  useEffect((): (() => void) => {
    const watch = [nameRef.current || ''];
    const listener = (nextValue: any) => setValue(nextValue);
    form.onValueChange(listener, watch);

    return (): void => {
      form.offValueChange(listener, watch);
    };
  }, [form]);

  return value;
};

export default useValue;
