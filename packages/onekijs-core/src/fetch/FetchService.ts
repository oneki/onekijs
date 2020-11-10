import { call, cancel, delay, fork } from 'redux-saga/effects';
import { reducer, saga } from '../core/annotations';
import Service from '../core/Service';
import { SagaEffect } from '../core/typings';
import { FetchMethod, FetchOptions, FetchState, HttpMethod } from './typings';
import { asyncHttp } from './utils';

export default class FetchService<S extends FetchState = FetchState> extends Service<S> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *delayLoading(delay_ms?: number) {
    yield this.setLoading(delay_ms ? false : true, true);
    if (delay_ms) {
      yield delay(delay_ms);
      yield this.setLoading(true, true);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *delete<R = any>(url: string, options?: FetchOptions<R, never>) {
    yield this.fetch(url, HttpMethod.Delete, undefined, options);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fetchError(e: any): void {
    this.state.error = e;
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fetchSuccess(result: any): void {
    this.state.error = undefined;
    this.state.result = result;
    this.setLoading(false, false);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *fetch<R = any, T = any>(url: string, method: FetchMethod, body?: T, options: FetchOptions<R, T> = {}) {
    let loadingTask = null;
    try {
      loadingTask = yield fork([this, this.delayLoading], options.delayLoading);
      const fetcher = options.fetcher || asyncHttp;
      const result = yield fetcher(url, method, body, options);
      yield cancel(loadingTask);
      yield this.fetchSuccess(result); // to update the store and trigger a re-render.
      const onSuccess = options.onSuccess;
      if (onSuccess) {
        yield call(onSuccess, result);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      if (loadingTask) {
        yield cancel(loadingTask);
      }
      yield this.fetchError(e);
      const onError = options.onError;
      if (onError) {
        yield call(onError, e);
      } else {
        throw e;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *get<R = any>(url: string, options?: FetchOptions<R, never>) {
    yield this.fetch(url, HttpMethod.Get, undefined, options);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *patch<R = any, T = any>(url: string, body: T, options?: FetchOptions<R, T>) {
    yield this.fetch(url, HttpMethod.Patch, body, options);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *post<R = any, T = any>(url: string, body: T, options?: FetchOptions<R, T>) {
    yield this.fetch(url, HttpMethod.Post, body, options);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *put<R = any, T = any>(url: string, body: T, options?: FetchOptions<R, T>) {
    yield this.fetch(url, HttpMethod.Put, body, options);
  }

  @reducer
  setLoading(loading: boolean, deprecated: boolean): void {
    this.state.loading = loading;
    this.state.deprecated = deprecated;
  }
}
