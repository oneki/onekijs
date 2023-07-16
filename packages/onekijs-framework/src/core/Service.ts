import produce from 'immer';
import { apply, take } from 'redux-saga/effects';
import { AnyFunction } from '../types/core';
import {
  combinedReducers,
  create,
  dispatch,
  inReducer,
  reducers,
  run,
  sagas,
  sagasFromReducers,
  Service,
  stop,
  types,
} from '../types/service';
import { AnyState, State } from '../types/state';
import { ID } from '../types/symbol';
import { fromPayload, get, isGetterOrSetter, toPayload } from '../utils/object';
import { isFunction } from '../utils/type';
import DefaultBasicError from './BasicError';

const createReducer = Symbol('service.createReducer');
const createSaga = Symbol('service.createSaga');

export const handler = {
  get: function <S extends State, T extends DefaultService<S>>(
    target: T,
    prop: string | number | symbol,
    receiver?: T,
  ): any {
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

export default class DefaultService<S extends State = AnyState> implements Service {
  public [reducers]: any;
  public [types]: any;
  public [sagas]: any;
  public [dispatch]: any;
  public [combinedReducers]: (state: any, action: any) => any = (state: any) => state;
  public [inReducer] = false;
  public [sagasFromReducers]: any;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public state: S = null!;

  [create](initialState: S): void {
    this[reducers] = {};
    this[types] = {};
    this[sagas] = {};
    this[inReducer] = false;
    this[sagasFromReducers] = {};
    this.state = initialState;

    const createProperty = (property: string) => {
      if (isFunction((this as any)[property]) && (this as any)[property].reducer) {
        this[createReducer](property, (this as any)[property]);
      } else if (isFunction((this as any)[property]) && (this as any)[property].saga) {
        this[createSaga](property, (this as any)[property]);
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
          createProperty(property);
        }
        properties.push(property);
      });
      obj = Object.getPrototypeOf(obj);
    }

    this[run]();
    if (isFunction((this as any).init)) {
      this[inReducer] = true;
      (this as any).init();
      this[inReducer] = false;
    }
    // freeze state
    this.state = produce(this.state, (draftState) => draftState) as S;
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
    (this as any)[type] = function (...args: any[]) {
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

  /**
   * @param type name of the property
   * @param saga function with an additional value in the prototype : {
   *   saga: {
   *     effect: latest
   *     delay: 10
   *     defaultDelay: 20
   *   }
   * }
   */
  private [createSaga](type: string, saga: any): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const actionType = (this.constructor as any)[ID] ? `${(this.constructor as any)[ID]}.${type}` : type;
    const effect = saga.saga.effect;
    let delay = saga.saga.delay;
    const defaultDelay = saga.saga.defaultDelay;

    if (typeof delay === 'string') {
      const sep = delay.indexOf('.');
      const obj = delay.substring(0, sep);
      if (sep === -1 || !['state', 'settings'].includes(obj)) {
        throw new DefaultBasicError(
          'A string delay for a saga of type throttle or debounce must starts with state.xxx or settings.xxx',
        );
      }

      if (obj === 'state') {
        delay = get<any>(this.state, delay.substring(sep + 1), defaultDelay);
      } else if ((this as any).context) {
        delay = get((this as any).context.settings, delay.substring(sep + 1), defaultDelay);
      }
    }

    const wrapper: any = function* wrapper(action: any) {
      try {
        const result: unknown = yield apply(self, saga, fromPayload(action.payload));
        if (action.resolve) {
          action.resolve(result);
        }
        return result;
      } catch (error) {
        if (action.reject) {
          action.reject(error);
          return;
        } else {
          throw error;
        }
      }
    };

    if (effect && effect !== take) {
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
          const action: unknown = yield take(actionType);
          yield wrapper(action);
        }
      };
    }
    this[types][type] = {
      type: 'saga',
      actionType,
    };
    (this as any)[type] = function* (...args: any[]) {
      yield saga.apply(self, args);
    };
    this[sagasFromReducers][type] = function (...args: any[]) {
      return new Promise((resolve, reject) => {
        if (self[dispatch]) {
          self[dispatch]({
            type: actionType,
            payload: toPayload(args),
            resolve,
            reject,
          });
        }
      });
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
        return nextState;
      } finally {
        this[inReducer] = false;
      }
    };
  }

  [stop](): void {
    this[combinedReducers] = (state: any) => state;
  }

  callSaga(sagaName: string, ...args: any[]): void {
    return this[sagasFromReducers][sagaName](args);
  }
}
