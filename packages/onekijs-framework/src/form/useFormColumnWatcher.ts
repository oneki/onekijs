import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { NestedKeyOf, PathType } from '../types/object';
import FormService from './FormService';
import { FormValueListener } from './typings';

type KeyOfArray<A> = A extends Array<infer E> ? keyof E : void;
type ColumnType<A, C> = A extends Array<infer E> ? (C extends keyof E ? E[C] : never) : never;

export function useFormColumnWatcher<
  T extends object = any,
  R = any,
  K extends NestedKeyOf<T> = NestedKeyOf<T>,
  C extends KeyOfArray<PathType<T, K>> = any,
>(
  form: FormService<T>,
  table: K,
  column: C,
  listener: FormValueListener<ColumnType<PathType<T, K>, C>, `${K}.${number}.${Exclude<C, void>}`>,
): R;
export function useFormColumnWatcher<
  T extends object = any,
  R = any,
  K extends NestedKeyOf<T> = NestedKeyOf<T>,
  C1 extends string = any,
  C2 extends string = any,
>(
  form: FormService<T>,
  table: K,
  column: [C1, C2],
  listener: FormValueListener<
    [ColumnType<PathType<T, K>, C1>, ColumnType<PathType<T, K>, C2>],
    `${K}.${number}.${Exclude<C1, void>}` | `${K}.${number}.${Exclude<C2, void>}`
  >,
): R;
export function useFormColumnWatcher<
  T extends object = any,
  R = any,
  K extends NestedKeyOf<T> = NestedKeyOf<T>,
  C1 extends string = any,
  C2 extends string = any,
  C3 extends string = any,
>(
  form: FormService<T>,
  table: K,
  column: [C1, C2, C3],
  listener: FormValueListener<
    [ColumnType<PathType<T, K>, C1>, ColumnType<PathType<T, K>, C2>, ColumnType<PathType<T, K>, C3>],
    | `${K}.${number}.${Exclude<C1, void>}`
    | `${K}.${number}.${Exclude<C2, void>}`
    | `${K}.${number}.${Exclude<C3, void>}`
  >,
): R;
export function useFormColumnWatcher<
  T extends object = any,
  R = any,
  K extends NestedKeyOf<T> = NestedKeyOf<T>,
  C1 extends string = any,
  C2 extends string = any,
  C3 extends string = any,
  C4 extends string = any,
>(
  form: FormService<T>,
  table: K,
  column: [C1, C2, C3, C4],
  listener: FormValueListener<
    [
      ColumnType<PathType<T, K>, C1>,
      ColumnType<PathType<T, K>, C2>,
      ColumnType<PathType<T, K>, C3>,
      ColumnType<PathType<T, K>, C4>,
    ],
    | `${K}.${number}.${Exclude<C1, void>}`
    | `${K}.${number}.${Exclude<C2, void>}`
    | `${K}.${number}.${Exclude<C3, void>}`
    | `${K}.${number}.${Exclude<C4, void>}`
  >,
): R;
export function useFormColumnWatcher<
  T extends object = any,
  R = any,
  K extends NestedKeyOf<T> = NestedKeyOf<T>,
  C1 extends string = any,
  C2 extends string = any,
  C3 extends string = any,
  C4 extends string = any,
  C5 extends string = any,
>(
  form: FormService<T>,
  table: K,
  column: [C1, C2, C3, C4, C5],
  listener: FormValueListener<
    [
      ColumnType<PathType<T, K>, C1>,
      ColumnType<PathType<T, K>, C2>,
      ColumnType<PathType<T, K>, C3>,
      ColumnType<PathType<T, K>, C4>,
      ColumnType<PathType<T, K>, C5>,
    ],
    | `${K}.${number}.${Exclude<C1, void>}`
    | `${K}.${number}.${Exclude<C2, void>}`
    | `${K}.${number}.${Exclude<C3, void>}`
    | `${K}.${number}.${Exclude<C4, void>}`
    | `${K}.${number}.${Exclude<C5, void>}`
  >,
): R;
export function useFormColumnWatcher(form: any, table: any, column: any, listener: any): any {
  const id = useId();
  const [result, setResult] = useState();

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
    form.onValueChange(id, valueListener, `${table}.${String(column)}`);
  }, [form, id, table, column, valueListener]);

  useEffect((): (() => void) => {
    return (): void => {
      form.offValueChange(id);
    };
  }, [form, id]);

  return result;
}

export default useFormColumnWatcher;
