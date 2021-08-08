import { delay } from 'redux-saga/effects';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* delayLoading(delay_ms: number, reducer: (loading: boolean) => void) {
  yield delay(delay_ms);
  yield reducer(true);
}
