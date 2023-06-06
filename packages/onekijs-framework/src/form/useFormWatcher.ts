import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { NestedKeyOf, PathType } from '../types/object';
import FormService from './FormService';
import { FormValueListener } from './typings';

export function useFormWatcher<T extends object = any, R = any, K extends NestedKeyOf<T> = NestedKeyOf<T>>(
  form: FormService<T>,
  watch: K,
  listener: FormValueListener<PathType<T, K>>,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(form: FormService<T>, watch: [K1, K2], listener: FormValueListener<[PathType<T, K1>, PathType<T, K2>]>): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3],
  listener: FormValueListener<[PathType<T, K1>, PathType<T, K2>, PathType<T, K3>]>,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4],
  listener: FormValueListener<[PathType<T, K1>, PathType<T, K2>, PathType<T, K3>, PathType<T, K4>]>,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K5 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4, K5],
  listener: FormValueListener<[PathType<T, K1>, PathType<T, K2>, PathType<T, K3>, PathType<T, K4>, PathType<T, K5>]>,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K5 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K6 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4, K5, K6],
  listener: FormValueListener<
    [PathType<T, K1>, PathType<T, K2>, PathType<T, K3>, PathType<T, K4>, PathType<T, K5>, PathType<T, K6>]
  >,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K5 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K6 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K7 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4, K5, K6, K7],
  listener: FormValueListener<
    [
      PathType<T, K1>,
      PathType<T, K2>,
      PathType<T, K3>,
      PathType<T, K4>,
      PathType<T, K5>,
      PathType<T, K6>,
      PathType<T, K7>,
    ]
  >,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K5 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K6 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K7 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K8 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4, K5, K6, K7, K8],
  listener: FormValueListener<
    [
      PathType<T, K1>,
      PathType<T, K2>,
      PathType<T, K3>,
      PathType<T, K4>,
      PathType<T, K5>,
      PathType<T, K6>,
      PathType<T, K7>,
      PathType<T, K8>,
    ]
  >,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K5 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K6 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K7 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K8 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K9 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4, K5, K6, K7, K8, K9],
  listener: FormValueListener<
    [
      PathType<T, K1>,
      PathType<T, K2>,
      PathType<T, K3>,
      PathType<T, K4>,
      PathType<T, K5>,
      PathType<T, K6>,
      PathType<T, K7>,
      PathType<T, K8>,
      PathType<T, K9>,
    ]
  >,
): R;
export function useFormWatcher<
  T extends object = any,
  R = any,
  K1 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K2 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K3 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K4 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K5 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K6 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K7 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K8 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K9 extends NestedKeyOf<T> = NestedKeyOf<T>,
  K10 extends NestedKeyOf<T> = NestedKeyOf<T>,
>(
  form: FormService<T>,
  watch: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10],
  listener: FormValueListener<
    [
      PathType<T, K1>,
      PathType<T, K2>,
      PathType<T, K3>,
      PathType<T, K4>,
      PathType<T, K5>,
      PathType<T, K6>,
      PathType<T, K7>,
      PathType<T, K8>,
      PathType<T, K9>,
      PathType<T, K10>,
    ]
  >,
): R;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useFormWatcher(form: FormService, watchs: any, listener: FormValueListener): any {
  const id = useId();
  const [result, setResult] = useState();
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
}

export default useFormWatcher;
