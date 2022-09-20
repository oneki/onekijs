import { useEffect, useId, useRef, useState } from 'react';
import { get, isNullOrEmpty } from '../utils/object';
import { FormValueListener } from './typings';
import useForm from './useForm';

const useValue = (fieldName?: string): any => {
  const form = useForm();
  const id = useId();
  const nameRef = useRef(fieldName || '');
  const [value, setValue] = useState((): any => {
    if (isNullOrEmpty(nameRef.current)) {
      return form.state.values;
    }
    return get(form.state.values, nameRef.current);
  });

  useEffect((): (() => void) => {
    const watch = [nameRef.current || ''];
    const listener: FormValueListener = (value) => setValue(value);
    form.onValueChange(id, listener, watch);

    return (): void => {
      form.offValueChange(id);
    };
  }, [form, id]);

  return value;
};

export default useValue;
