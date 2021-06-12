import { AppContext } from './app';
import { Class } from './object';
import { AnyState, State } from './state';

export const reducers = Symbol('service.reducers');
export const types = Symbol('service.types');
export const sagas = Symbol('service.sagas');
export const dispatch = Symbol('service.dispatch');
export const combinedReducers = Symbol('service.combinedReducers');
export const inReducer = Symbol('service.reducer');
export const run = Symbol('service.run');
export const stop = Symbol('service.stop');
export const serviceClass = Symbol('onekijs.serviceClass');
export const create = Symbol('service.create');

/*  public [reducers]: any;
  public [types]: any;
  public [sagas]: any;
  public [dispatch]: any;
  public [combinedReducers]: (state: any, action: any) => any;
  public [inReducer]: boolean;*/

export interface Service<S extends State = AnyState> {
  [reducers]: any;
  [types]: any;
  [sagas]: any;
  [dispatch]: any;
  [combinedReducers]: (state: any, action: any) => any;
  [inReducer]: boolean;
  state: S;
  [k: string]: any;
  [create](initialState: S): void;
  [run](): void;
  [stop](): void;
}

export interface AppService<S> extends Service<S> {
  context: AppContext;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalService<S extends State = AnyState> extends AppService<S> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LocalService<S extends State = AnyState> extends AppService<S> {}

export interface ServiceFactory {
  createService: <S extends State, T extends AppService<S>>(ctor: Class<T>, context: AppContext, initialState: S) => T;
}
