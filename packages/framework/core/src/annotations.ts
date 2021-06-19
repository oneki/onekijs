import { AnonymousObject, AnyFunction, Class, ID, SagaEffect, serviceClass, State } from '@oneki/types';
import {
  debounce as debounceSaga,
  take,
  takeEvery,
  takeLatest,
  takeLeading,
  throttle as throttleSaga,
} from 'redux-saga/effects';
import 'reflect-metadata';
import DefaultService from './Service';

const uids = new Set<string>();
let counter = 0;
const uniqueLabel = (label?: string): string => {
  if (!label) {
    label = `Label$${++counter}`;
  } else if (uids.has(label)) {
    label = `${label}$${++counter}`;
  } else {
    uids.add(label);
  }
  return label;
};

export const asReducer: (reducer: AnyFunction<void>) => AnyFunction<void> = function (func) {
  (func as any).reducer = true;
  return func;
};

export const inject = <S extends State, T extends DefaultService<S>>(ctor: Class<T>): T => {
  const result: unknown = {
    [serviceClass]: ctor,
  };
  return result as T;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function reducer(target: any, propertyKey: string): any {
  target[propertyKey].reducer = true;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const service = function (target: any): any {
  if (!target[ID]) {
    target[ID] = uniqueLabel(target.name);
  }
};

export const serial: (saga: AnyFunction) => AnyFunction = function (func) {
  (func as any).saga = {};
  return func;
};

export const latest: (saga: AnyFunction) => AnyFunction = function (func) {
  (func as any).saga = {
    effect: takeLatest,
  };
  return func;
};

export const every: (saga: AnyFunction) => AnyFunction = function (func) {
  (func as any).saga = {
    effect: takeEvery,
  };
  return func;
};

export const leading: (saga: AnyFunction) => AnyFunction = function (func) {
  (func as any).saga = {
    effect: takeLeading,
  };
  return func;
};

export const debounce: (saga: AnyFunction, delay?: number | string, defaultDelay?: number) => AnyFunction = function (
  func,
  delay,
  defaultDelay = 200,
) {
  (func as any).saga = {
    effect: debounceSaga,
    delay,
    defaultDelay,
  };
  return func;
};

export const throttle: (saga: AnyFunction, delay?: number | string, defaultDelay?: number) => AnyFunction = function (
  func,
  delay,
  defaultDelay = 200,
) {
  (func as any).saga = {
    effect: throttleSaga,
    func,
    delay,
    defaultDelay,
  };
  return func;
};

const effects: AnonymousObject = {
  [SagaEffect.Debounce]: debounceSaga,
  [SagaEffect.Throttle]: throttleSaga,
  [SagaEffect.Every]: takeEvery,
  [SagaEffect.Leading]: takeLeading,
  [SagaEffect.Latest]: takeLatest,
  [SagaEffect.Serial]: take,
};
export function saga(type?: SagaEffect, delay?: number | string, defaultDelay = 0) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (target: any, propertyKey: string) {
    target[propertyKey].saga = {
      effect: type ? effects[type] : take,
      delay,
      defaultDelay,
    };
  };
}
