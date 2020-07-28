import produce from 'immer';
import { apply, take } from 'redux-saga/effects';
import AppContext from '../app/AppContext';
import { AnyState, ID, State, AnyFunction } from './typings';
import { fromPayload, toPayload } from './utils/object';
import { isFunction } from './utils/type';
import ServiceType from './ServiceType';

export const reducers = Symbol('service.reducers');
export const types = Symbol('service.types');
export const sagas = Symbol('service.sagas');
export const dispatch = Symbol('service.dispatch');
const serviceType = Symbol('service.type');
export const combinedReducers = Symbol('service.combinedReducers');
export const inReducer = Symbol('service.reducer');
const createReducer = Symbol('service.createReducer');
const createSaga = Symbol('service.createSaga');
export const run = Symbol('service.run');
const stop = Symbol('service.stop');
export const serviceClass = Symbol('onekijs.serviceClass');

export default class Service<S extends State = AnyState> {
  protected [reducers]: any;
  public [types]: any;
  protected [sagas]: any;
  public [dispatch]: any;
  protected [serviceType]: ServiceType;
  public [combinedReducers]: (state: any, action: any) => any;
  public [inReducer]: boolean;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public state: S = null!;
  [k: string]: any;

  constructor(type: ServiceType) {
    this[serviceType] = type;
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

    const prototypeProperties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const properties = Object.getOwnPropertyNames(this);
    prototypeProperties.forEach((property) => {
      if (!properties.includes(property)) {
        create(property);
      }
    });
    properties.forEach((property) => create(property));
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
        return self[dispatch]({
          type: actionType,
          payload: toPayload(args),
        });
      }
      return reducer.apply(self, args);
    };
  }

  private [createSaga](type: string, saga: any): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const actionType = (this.constructor as any)[ID] ? `${(this.constructor as any)[ID]}.${type}` : type;
    const effect = saga.effect;
    const delay = saga.delay;

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
    if (this[serviceType].isGlobal()) {
      this[dispatch] = this.context.store.dispatch;
      this.context.store.injectReducers(this, (this.constructor as any)[ID], this[reducers]);
      Object.keys(this[sagas]).forEach((type) => {
        this.context.store.runSaga((this.constructor as any)[ID], this[sagas][type], type);
      });
    } else {
      this[combinedReducers] = (state: S, action: any) => {
        this[inReducer] = true;
        try {
          const nextState = produce(state, (draftState: S) => {
            this.state = draftState;
            if (this[reducers][action.type]) {
              //debugger;
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
  }

  [stop](): void {
    if (this[serviceType].isGlobal()) {
      this[dispatch] = null;
      this.context.store.removeReducers((this.constructor as any)[ID], this[reducers]);
      Object.keys(this[sagas]).forEach((type) => {
        this.context.store.cancelSaga((this.constructor as any)[ID], type);
      });
    } else {
      this[combinedReducers] = (state: any) => state;
    }
  }
}
