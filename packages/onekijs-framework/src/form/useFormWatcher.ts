import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import FormService from './FormService';
import { FormValueListener } from './typings';

const useFormWatcher = <R = any>(
  form: FormService,
  watchs: string | string[],
  listener: FormValueListener,
): R | undefined => {
  const id = useId();
  const [result, setResult] = useState<R | undefined>();
  const watchRef = useRef(watchs);

  const valueListener: FormValueListener = useCallback(
    (value, previousValue, watch) => {
      const listenerResult = listener(value, previousValue, watch);
      if (result !== listenerResult) {
        setResult(listenerResult);
      }
    },
    [listener, result],
  );

  useMemo(() => {
    form.onValueChange(id, valueListener, watchRef.current);
  }, [form, id, valueListener]);

  useEffect((): (() => void) => {
    return (): void => {
      form.offValueChange(id);
    };
  }, [form, id]);

  return result;
};

export default useFormWatcher;
