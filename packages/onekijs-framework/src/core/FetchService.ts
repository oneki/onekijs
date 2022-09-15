import { Task } from '@redux-saga/types';
import { call, cancel, delay, fork, spawn } from 'redux-saga/effects';
import DefaultBasicError from '../core/BasicError';
import { FetchMethod, FetchOptions, FetchState, HttpMethod } from '../types/fetch';
import { SagaEffect } from '../types/saga';
import { reducer, saga } from './annotations';
import DefaultService from './Service';
import { asyncHttp } from './xhr';

export default class FetchService<S extends FetchState = FetchState> extends DefaultService<S> {
  pullTask?: Task;

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
    this.setLoading(false, false);
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
    let loadingTask: Task | null = null;
    try {
      loadingTask = yield fork([this, this.delayLoading], options.delayLoading);
      const fetcher = options.fetcher || asyncHttp;
      const result: Response = yield fetcher(url, method, body, options);
      yield cancel(loadingTask as Task);
      yield this.fetchSuccess(result); // to update the store and trigger a re-render.
      const onSuccess = options.onFetchSuccess;
      if (onSuccess) {
        yield call(onSuccess as any, result);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      if (loadingTask) {
        yield cancel(loadingTask);
      }
      yield this.fetchError(e);
      const onError = options.onFetchError;
      if (onError) {
        yield call(onError, DefaultBasicError.of(e));
      } else {
        throw e;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *get<R = any>(url: string, options?: FetchOptions<R, never>): any {
    yield this.fetch(url, HttpMethod.Get, undefined, options);
  }

  @saga(SagaEffect.Every)
  *pollFetch(url: string, fixedRateInMs: number, options?: FetchOptions<any, never>): any {
    yield this.fetch(url, HttpMethod.Get, undefined, options);
    if (fixedRateInMs > 0) {
      yield delay(fixedRateInMs);
      yield this.pollFetch(url, fixedRateInMs, options);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *poll(url: string, fixedRateInMs: number, options?: FetchOptions<any, never>): any {
    const task: Task = yield spawn([this, this.pollFetch], url, fixedRateInMs, options);
    return task;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *cancelPull() {
    yield this.pullTask?.cancel();
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
  setLoading(loading: boolean, fetching: boolean): void {
    this.state.loading = loading;
    this.state.fetching = fetching;
  }
}
