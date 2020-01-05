import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import produce from "immer";
import { get } from "./utils/object";
import { useSelector } from "react-redux";
import { useCallback } from "react";

export const createReduxStore = (initialState={}, middlewares=[]) => {
  let sagaMiddleware = middlewares.find(middleware => middleware.name === 'sagaMiddleware');
  if (!sagaMiddleware) {
    sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);
  }

  const store = createStore(() => {
    return initialState;
  }, applyMiddleware(...middlewares));

  const buildReducer = store => {
    return (state = store.getState(), action) => {
      const reducers = store._reducers[action.type];
      if (reducers) {
        const nextState = produce(state, draftState => {
          Object.keys(reducers).forEach(k => {
            const payload = action.payload === undefined ? {} : action.payload;
            reducers[k].func.call(reducers[k].bind, draftState, payload, reducers[k].context);
          });
        });
        return nextState;
      }
      return state;
    };
  };

  store._reducers = {};
  store._sagas = {};

  store.runSaga = (namespace, saga, name = "root") => {
    store._sagas[`${namespace}.${name}`] = sagaMiddleware.run(saga);
  };
  store.cancelSaga = (namespace, name = "root") => {
    const task = store._sagas[`${namespace}.${name}`];
    if (task) {
      task.cancel();
    }
  };

  store.injectReducers = (bind, namespace, reducers, context) => {
    Object.keys(reducers).forEach(actionType => {
      store._reducers[actionType] = store._reducers[actionType] || {};
      store._reducers[actionType][`${namespace}.${actionType}`] = {
        func: reducers[actionType],
        bind,
        context
      };
    });

    store.replaceReducer(buildReducer(store));
  };

  store.removeReducers = (namespace, reducers = {}) => {
    Object.keys(reducers).forEach(actionType => {
      store._reducers[actionType] = store._reducers[actionType] || {};
      delete store._reducers[actionType][`${namespace}.${actionType}`];
    });
    store.replaceReducer(buildReducer(store));
  };

  return store;
};

export const useReduxSelector = (selector, defaultValue) => {
  const selectorFunction = useCallback(() => {
    return typeof selector === "string"
      ? state => get(state, selector)
      : selector;
  }, [selector]);

  const value = useSelector(selectorFunction());
  return value === undefined ? defaultValue : value;
};