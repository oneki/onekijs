import {
  debounce as debounceSaga,
  delay,
  takeEvery,
  takeLatest,
  takeLeading,
  throttle as throttleSaga,
} from 'redux-saga/effects';

export const every = saga => ({
  effect: takeEvery,
  saga,
});

export const latest = saga => ({
  effect: takeLatest,
  saga,
});

export const leading = saga => ({
  effect: takeLeading,
  saga,
});

export const debounce = (delay, saga) => ({
  effect: debounceSaga,
  saga,
  delay,
});

export const throttle = (delay, saga) => ({
  effect: throttleSaga,
  saga,
  delay,
});

export function* delayLoading(delay_ms, reducer) {
  yield delay(delay_ms);
  yield reducer(true);
}
