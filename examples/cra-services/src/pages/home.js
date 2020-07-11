import { append, latest, reducer, set, useLocalService } from 'onekijs-cra';
import React from 'react';
import { delay } from 'redux-saga/effects';

const service = {
  name: 'testRedux',

  format: function (value) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  },

  log: reducer(function (payload, state) {
    append(state, 'logs', `Set ${payload.key} to ${payload.value}`);
  }),

  setState: reducer(function (payload, state) {
    const value = this.format(payload.value);
    set(state, payload.key, value);
    this.log(payload, state);
  }),

  saga1: latest(function* (payload, context) {
    yield this.setState({ key: 'k1', value: 'v1' });
    yield this.randomDelay(100);
    yield this.setState({ key: 'k2', value: 'v2' });
    yield this.saga2(payload);
  }),

  saga2: latest(function* (payload, context) {
    yield this.setState({ key: 'k3', value: 'v3' });
    yield this.randomDelay(500);
    yield this.setState({ key: 'k4', value: 'v4' });
  }),

  randomDelay: function* (max = 1000) {
    yield delay(Math.floor(Math.random() * Math.floor(max)));
  },
};

export const HomePage = () => {
  const [state, localService] = useLocalService(service);

  console.log('state', state);

  return (
    <div>
      <button onClick={() => localService.saga1({})}>Click Me</button>
    </div>
  );
};
