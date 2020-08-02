import { call, cancel, delay, fork } from 'redux-saga/effects';
import { reducer, saga } from '../core/annotations';
import { SagaEffect } from '../core/typings';
import { FetchOptions, FetchState, HttpMethod } from './typings';
import { asyncHttp } from './utils';
import Service from '../core/Service';

export default class FetchService<T = any, S extends FetchState = FetchState> extends Service<S> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *delayLoading(delay_ms: number) {
    yield delay(delay_ms);
    yield this.setLoading(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *delete(url: string, options?: FetchOptions<T>) {
    yield this.fetch(url, HttpMethod.Delete, undefined, options);
  }   

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fetchSuccess(result: any): void {
    this.state.result = result;
    this.state.loading = false;
  }  

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *fetch(url: string, method: string, body?: Partial<T>, options: FetchOptions<T> = {}) {
    const { router } = this.context;
    let loadingTask = null;
    try {
      loadingTask = yield fork([this, this.delayLoading], options.delayLoading || 200);
      const result = yield asyncHttp(url, method, body, options);
      yield cancel(loadingTask);
      yield this.fetchSuccess(result); // to update the store and trigger a re-render.
      const onSuccess = options.onSuccess;
      if (onSuccess) {
        if (typeof onSuccess === 'string') {
          // onSuccess is a URL -> redirect to this one
          yield call([router, router.push], onSuccess);
        } else {
          yield onSuccess(result, this.context);
        }
      }
    } catch (e) {
      if (loadingTask) {
        yield cancel(loadingTask);
      }
      yield this.setLoading(false);
      const onError = options.onError;
      if (onError) {
        if (typeof onError === 'string') {
          // onError is a URL -> redirect to this one
          yield call([router, router.push], onError);
        } else {
          yield onError(e, this.context);
        }
      } else {
        throw e;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *get(url: string, options?: FetchOptions<T>) {
    yield this.fetch(url, HttpMethod.Get, undefined, options);
  } 
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *patch(url: string, body: Partial<T>, options?: FetchOptions<T>) {
    yield this.fetch(url, HttpMethod.Patch, body, options);
  } 
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *post(url: string, body: T, options?: FetchOptions<T>) {
    yield this.fetch(url, HttpMethod.Post, body, options);
  } 
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *put(url: string, body: T, options?: FetchOptions<T>) {
    yield this.fetch(url, HttpMethod.Put, body, options);
  }  

  @reducer
  setLoading(isLoading: boolean): void {
    this.state.loading = isLoading;
  }
}
