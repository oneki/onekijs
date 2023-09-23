import { Task } from '@redux-saga/types';
import { call, cancel, delay, fork, spawn } from 'redux-saga/effects';
import DefaultBasicError from '../core/BasicError';
import { FetchMethod, FetchOptions, FetchState, HttpMethod } from '../types/fetch';
import { SagaEffect } from '../types/saga';
import { reducer, saga } from './annotations';
import DefaultService from './Service';
import { asyncHttp } from './xhr';

export default class FetchService<S extends FetchState = FetchState> extends DefaultService<S> {
  pollTask?: Task;

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
  *delete<R = any>(url: string, options?: FetchOptions<R>) {
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
  *fetch<R = any>(url: string, method: FetchMethod, body?: unknown, options: FetchOptions<R> = {}) {
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
  *get<R = any>(url: string, options?: FetchOptions<R>): any {
    yield this.fetch(url, HttpMethod.Get, undefined, options);
  }

  @saga(SagaEffect.Every)
  *pollFetch<R = any>(url: string, fixedRateInMs: number | ((result: R | undefined) => number), options?: FetchOptions<any>): any {
    yield this.fetch(url, HttpMethod.Get, undefined, options);
    const interval = typeof fixedRateInMs === 'function' ? fixedRateInMs(this.state.result) : fixedRateInMs;
    if (interval > 0) {
      yield delay(interval);
      yield this.pollFetch(url, fixedRateInMs, options);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *poll<R = any>(url: string, fixedRateInMs: number | ((result: R | undefined) => number), options?: FetchOptions<any>): any {
    this.pollTask = yield spawn([this, this.pollFetch<R>], url, fixedRateInMs, options);
    return this.pollTask;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *cancelPoll() {
    yield this.pollTask?.cancel();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *patch<R = any>(url: string, body: unknown, options?: FetchOptions<R>) {
    yield this.fetch(url, HttpMethod.Patch, body, options);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *post<R = any>(url: string, body: unknown, options?: FetchOptions<R>) {
    yield this.fetch(url, HttpMethod.Post, body, options);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *put<R = any>(url: string, body: unknown, options?: FetchOptions<R>) {
    yield this.fetch(url, HttpMethod.Put, body, options);
  }

  @reducer
  setLoading(loading: boolean, fetching: boolean): void {
    this.state.loading = loading;
    this.state.fetching = fetching;
  }
}
