import produce from 'immer';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromPayload, get } from './utils/object';

export const createReduxStore = (initialState = {}, middlewares = []) => {
  let sagaMiddleware = middlewares.find(
    middleware => middleware.name === 'sagaMiddleware'
  );
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
            try {
              reducers[k].bind.__inReducer__ = true;
              reducers[k].bind.state = draftState;
              reducers[k].func.apply(
                reducers[k].bind,
                fromPayload(action.payload)
              );
            } finally {
              reducers[k].bind.__inReducer__ = false;
            }
          });
        });
        Object.keys(reducers).forEach(k => {
          reducers[k].bind.state = nextState;
        });
        return nextState;
      }
      return state;
    };
  };

  store._reducers = {};
  store._sagas = {};

  store.runSaga = (namespace, saga, name = 'root') => {
    store._sagas[`${namespace}.${name}`] = sagaMiddleware.run(saga);
  };
  store.cancelSaga = (namespace, name = 'root') => {
    const task = store._sagas[`${namespace}.${name}`];
    if (task) {
      task.cancel();
    }
  };

  store.injectReducers = (bind, namespace, reducers) => {
    Object.keys(reducers).forEach(actionType => {
      store._reducers[actionType] = store._reducers[actionType] || {};
      store._reducers[actionType][`${namespace}.${actionType}`] = {
        func: reducers[actionType],
        bind,
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
    return typeof selector === 'string'
      ? state => get(state, selector)
      : selector;
  }, [selector]);

  const value = useSelector(selectorFunction());
  return value === undefined ? defaultValue : value;
};
