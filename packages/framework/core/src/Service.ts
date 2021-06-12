import {
  AnyFunction,
  AnyState,
  combinedReducers,
  create,
  dispatch,
  ID,
  inReducer,
  reducers,
  run,
  sagas,
  Service,
  State,
  stop,
  types,
} from '@oneki/types';
import { fromPayload, get, isFunction, isGetterOrSetter, toPayload } from '@oneki/utils';
import produce from 'immer';
import { apply, take } from 'redux-saga/effects';
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
  public [combinedReducers]: (state: any, action: any) => any;
  public [inReducer]: boolean;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public state: S = null!;
  [k: string]: any;

  [create](initialState: S): void {
    this[reducers] = {};
    this[types] = {};
    this[sagas] = {};
    this[inReducer] = false;
    this.state = initialState;

    const createProperty = (property: string) => {
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
          createProperty(property);
        }
        properties.push(property);
      });
      obj = Object.getPrototypeOf(obj);
    }

    this[run]();
    if (isFunction(this.init)) {
      this[inReducer] = true;
      this.init();
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
        delay = get(this.state, delay.substring(sep + 1), defaultDelay);
      } else {
        delay = get(this.context.settings, delay.substring(sep + 1), defaultDelay);
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
          const action: unknown = yield take(actionType);
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
