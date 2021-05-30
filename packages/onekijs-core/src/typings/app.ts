import { Router } from './router';
import { Service } from './service';
import { AnyState, State } from './state';
import { Action, AnyAction, Store } from 'redux';
import { AnonymousObject } from './object';
import { Saga } from './saga';
import { I18n } from './i18n';

export interface AppSettings {
  [propName: string]: any;
}
export const reducersSymbol = Symbol('onekijs.store.reducers');
export const sagasSymbol = Symbol('onekijs.store.sagas');

export interface AppStore<S = any, A extends Action = AnyAction> extends Store<S, A> {
  [reducersSymbol]: AnonymousObject;
  [sagasSymbol]: AnonymousObject;
  runSaga: (namespace: string, saga: Saga<any[]>, name: string) => void;
  cancelSaga: (namespace: string, name: string) => void;
  injectReducers: (bind: Service, namespace: string, reducers: AnonymousObject) => void;
  removeReducers: (namespace: string, reducers: AnonymousObject) => void;
}

export interface AppContext {
  router: Router;
  settings: AppSettings;
  store: AppStore;
  i18n: I18n;
}

export interface AppService<S extends State = AnyState> extends Service<S> {
  context: AppContext;
}
