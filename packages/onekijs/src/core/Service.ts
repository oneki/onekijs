import produce from 'immer';
import { apply, take } from 'redux-saga/effects';
import { AnyFunction, AnyState, ID, State } from './typings';
import { fromPayload, toPayload, isGetterOrSetter } from './utils/object';
import { isFunction } from './utils/type';

export const reducers = Symbol('service.reducers');
export const types = Symbol('service.types');
export const sagas = Symbol('service.sagas');
export const dispatch = Symbol('service.dispatch');
export const combinedReducers = Symbol('service.combinedReducers');
export const inReducer = Symbol('service.reducer');
const createReducer = Symbol('service.createReducer');
const createSaga = Symbol('service.createSaga');
export const run = Symbol('service.run');
export const stop = Symbol('service.stop');
export const serviceClass = Symbol('onekijs.serviceClass');

export const handler = {
  get: function <S extends State, T extends Service<S>>(target: T, prop: string | number | symbol, receiver?: T): any {
    const alias = target[types][prop];
    if (alias) {
      if (alias.type === 'reducer') {
        return function (...args: any[]) {
          target[dispatch]({
            type: alias.actionType,
            payload: toPayload(args),
          });
        };
      } else if (alias.type === 'saga') {
        return function (...args: any[]) {
          return new Promise((resolve, reject) => {
            target[dispatch]({
              type: alias.actionType,
              payload: toPayload(args),
              resolve,
              reject,
            });
          });
        };
      }
    } else {
      return Reflect.get(target, prop, receiver);
    }
  },
};

export default class Service<S extends State = AnyState> {
  protected [reducers]: any;
  public [types]: any;
  protected [sagas]: any;
  public [dispatch]: any;
  public [combinedReducers]: (state: any, action: any) => any;
  public [inReducer]: boolean;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public state: S = null!;
  [k: string]: any;

  constructor() {
    this[reducers] = {};
    this[types] = {};
    this[sagas] = {};
    this[inReducer] = false;

    const create = (property: string) => {
      if (isFunction(this[property]) && this[property].reducer) {
        this[createReducer](property, this[property]);
      } else if (isFunction(this[property]) && this[property].saga) {
        this[createSaga](property, this[property]);
      }
    };

    const properties: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let obj = this;
    while (obj) {
      const p = Object.getOwnPropertyNames(obj);
      // eslint-disable-next-line no-loop-func
      p.forEach((property) => {
        if (!isGetterOrSetter(obj, property) && !properties.includes(property)) {
          create(property);
        }
        properties.push(property);
      });
      obj = Object.getPrototypeOf(obj);
    }
  }

  private [createReducer](type: string, reducer: AnyFunction<void>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const actionType = (this.constructor as any)[ID] ? `${(this.constructor as any)[ID]}.${type}` : type;
    if (reducer) {
      this[reducers][actionType] = reducer;
      this[types][type] = {
        type: 'reducer',
        actionType,
      };
    }
    this[type] = function (...args: any[]) {
      if (!self[inReducer]) {
        // call from a saga -> dispatch
        // return self[dispatch]({
        //   type: actionType,
        //   payload: toPayload(args),
        // });
        return new Promise((resolve, reject) => {
          self[dispatch]({
            type: actionType,
            payload: toPayload(args),
            resolve,
            reject,
          });
        });
      }
      return reducer.apply(self, args);
    };
  }

  private [createSaga](type: string, saga: any): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const actionType = (this.constructor as any)[ID] ? `${(this.constructor as any)[ID]}.${type}` : type;
    const effect = saga.saga.effect;
    const delay = saga.saga.delay;

    const wrapper: any = function* wrapper(action: any) {
      try {
        const result = yield apply(self, saga, fromPayload(action.payload));
        if (action.resolve) {
          action.resolve(result);
        }
        return result;
      } catch (error) {
        if (action.reject) {
          action.reject(error);
        } else {
          throw error;
        }
      }
    };

    if (effect) {
      if (delay) {
        this[sagas][actionType] = function* () {
          yield effect(delay, actionType, wrapper);
        };
      } else {
        this[sagas][actionType] = function* () {
          yield effect(actionType, wrapper);
        };
      }
    } else {
      this[sagas][actionType] = function* () {
        while (true) {
          const action = yield take(actionType);
          yield wrapper(action);
        }
      };
    }
    this[types][type] = {
      type: 'saga',
      actionType,
    };
    this[type] = saga;
    this[type] = function* (...args: any[]) {
      yield saga.apply(self, args);
    };
  }

  [run](): void {
    this[combinedReducers] = (state: S, action: any) => {
      this[inReducer] = true;
      try {
        const nextState = produce(state, (draftState: S) => {
          this.state = draftState;
          if (this[reducers][action.type]) {
            this[reducers][action.type].apply(this, fromPayload(action.payload));
          }
        });
        this.state = nextState;
        if (action.resolve) {
          setTimeout(() => {
            action.resolve(nextState);
          }, 0);
        }

        return nextState;
      } catch (e) {
        if (action.reject) {
          action.reject(e);
        }
        throw e;
      } finally {
        this[inReducer] = false;
      }
    };
  }

  [stop](): void {
    this[combinedReducers] = (state: any) => state;
  }
}
