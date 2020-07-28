import { append, latest, reducer, set, useLocalService, LocalService, service, saga, SagaEffect } from 'onekijs';
import React from 'react';
import { delay } from 'redux-saga/effects';

@service
class TestService extends LocalService {
  format(value: any) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }

  @reducer
  log(key: string, value: any) {
    append(this.state, 'logs', `Set ${key} to ${value}`);
  }

  @reducer
  setState(key: string, value: any) {
    set(this.state, key, this.format(value));
    this.log(key, value);
  }

  @saga(SagaEffect.Latest)
  *saga1(payload: any) {
    yield this.setState('k1', 'v1');
    yield this.randomDelay(100);
    yield this.setState('k2', 'v2');
    yield this.saga2(payload);
  }

  @saga(SagaEffect.Latest)
  *saga2(payload: any) {
    yield this.setState('k3', 'v3');
    yield this.randomDelay(500);
    yield this.setState('k4', 'v4');
  }

  *randomDelay(max = 1000) {
    yield delay(Math.floor(Math.random() * Math.floor(max)));
  }
}

export const HomePage = () => {
  const [state, localService] = useLocalService(TestService);

  console.log('state', state);

  return (
    <div>
      <button onClick={() => localService.saga1({})}>Click Me</button>
    </div>
  );
};
