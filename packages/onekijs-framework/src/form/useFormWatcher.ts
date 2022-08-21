import { useEffect, useId, useRef, useState } from 'react';
import FormService from './FormService';
import { FormValueListener } from './typings';

const useFormWatcher = <R = any, T = any>(
  form: FormService,
  watchs: string | string[],
  listener: FormValueListener<T>,
): R | undefined => {
  const id = useId();
  const [result, setResult] = useState<R | undefined>();
  const watchRef = useRef(watchs);

  useEffect(() => {
    const valueListener: FormValueListener<T> = (value, previousValue, watch) => {
      const listenerResult = listener(value, previousValue, watch);
      if (result !== listenerResult) {
        setResult(listenerResult);
      }
    };
    form.onValueChange(id, valueListener, watchRef.current);
  }, [form, id, listener, result]);

  useEffect((): (() => void) => {
    return (): void => {
      form.offValueChange(id);
    };
  }, [form, id]);

  return result;
};

export default useFormWatcher;
