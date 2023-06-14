import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import FormService from './FormService';
import { FormValueListener } from './typings';

export function useFormInit<T extends object = any, R = any>(form: FormService<T>, listener: FormValueListener<T>): R {
  const id = useId();
  const [result, setResult] = useState<R>();

  const valueListener: FormValueListener = useCallback(
    (value, previousValue) => {
      const listenerResult = listener(value, previousValue, '');
      setResult(listenerResult);
    },
    [listener],
  );

  useMemo(() => {
    form.onValueChange(id, valueListener, '', true);
  }, [form, id, valueListener]);

  useEffect((): (() => void) => {
    return (): void => {
      form.offValueChange(id);
    };
  }, [form, id]);

  return result as R;
}

export default useFormInit;
