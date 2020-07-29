import AppContext from '../app/AppContext';
import BasicError from './BasicError';
import Service from './Service';
import ServiceType from './ServiceType';

export const ID = Symbol();
export const SERVICE_TYPE_ID = Symbol();

export interface AnonymousObject {
  [propName: string]: any;
}

export type AnyFunction<T = any> = (...args: any[]) => T;

export interface AnyState extends State {
  [k: string]: any;
}

export type Class<T> = { new (...args: any[]): T };

export interface Collection<T> {
  [k: string]: T;
}

export type ErrorCallback<T extends BasicError = BasicError> = (error: T, context: AppContext) => void;

export enum SagaEffect {
  Latest = 'latest',
  Every = 'every',
  Leading = 'leading',
  Throttle = 'throttle',
  Debounce = 'debounce',
  Serial = 'serial',
}

export interface ServiceFactory {
  createService: <S extends State, T extends Service<S>>(
    serviceType: ServiceType,
    ctor: Class<T>,
    context: AppContext,
    initialState?: S,
  ) => T;
}

export enum ServiceTypeEnum {
  Global,
  Local,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}

export type SuccessCallback<T = any> = (result: T, context: AppContext) => void;
