import AppContext from '../app/AppContext';
import BasicError from './BasicError';
import AppService from './AppService';

export const ID = Symbol();
export const SERVICE_TYPE_ID = Symbol();

export interface AnonymousObject<T = any> {
  [propName: string]: T;
}

export type AnyFunction<T = any> = (...args: any[]) => T;

export interface AnyState extends State {
  [k: string]: any;
}

export type Class<T> = { new (...args: any[]): T };

export type ErrorCallback<T extends BasicError = BasicError> = ResultCallback<T>;

export type Primitive = string | number | boolean;

export type ResultCallback<T = any> = (result: T) => void;

export enum SagaEffect {
  Latest = 'latest',
  Every = 'every',
  Leading = 'leading',
  Throttle = 'throttle',
  Debounce = 'debounce',
  Serial = 'serial',
}

export interface ServiceFactory {
  createService: <S extends State, T extends AppService<S>>(ctor: Class<T>, context: AppContext, initialState: S) => T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}

export type SuccessCallback<T = any> = ResultCallback<T>;