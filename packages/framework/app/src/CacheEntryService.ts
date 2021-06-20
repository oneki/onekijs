import { DefaultGlobalService } from '@oneki/app';
import { formatAsyncResponse, reducer, saga, service, xhr } from '@oneki/core';
import { BasicError, SagaEffect } from '@oneki/types';
import { get, set } from '@oneki/utils';
import { Task } from 'redux-saga';
import { call, cancel, delay, fork } from 'redux-saga/effects';
import { CacheEntry, CacheOptions } from './typings';

const now = (): number => Math.floor(Date.now() / 1000);
export const cacheKey = (key: string): string => `oneki.cache.${key.replaceAll('.', '_')}`;
export const NO_EXPIRATION = Number.MAX_VALUE;
const expirationTime = (response: Response, options: CacheOptions<any>): number => {
  let ttl: number | undefined = undefined;
  if (options.ttl) {
    return now() + options.ttl;
  }
  const cacheControl = response.headers.get('cache-control');
  if (cacheControl) {
    const directives = cacheControl.split(',');
    for (const directive in directives) {
      const d = directive.trim();
      if (d === 'no-store' || d === 'no-cache') {
        return 0;
      }
      if (d.startsWith('max-age')) {
        const tokens = d.split('=');
        if (tokens.length === 2) {
          ttl = parseInt(tokens[1]);
        }
      }
    }
  }
  if (ttl === undefined) {
    // todo, check in settings if default cache ttl
  }

  if (ttl === undefined) {
    return 0;
  }
  return now() + ttl;
};

@service
export default class CacheEntryService<T> extends DefaultGlobalService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *delayLoading(key: string, delay_ms?: number) {
    yield this.setLoading(key, delay_ms ? false : true, true);
    if (delay_ms) {
      yield delay(delay_ms);
      yield this.setLoading(key, true, true);
    }
  }

  /**
   * Save the object to cache in the redux store
   * Several metadata are atttached to the object (expireAt, loading, fetching)
   *
   * @param {object} cacheEntry : the object with metadata
   */
  @reducer
  setCache(key: string, cacheEntry?: CacheEntry<T>): void {
    set(this.state, cacheKey(key), cacheEntry);
  }

  @reducer
  setError(key: string, error?: BasicError): void {
    set(this.state, `${cacheKey(key)}.error`, error);
    this.setLoading(key, false, false);
  }

  @reducer
  setLoading(key: string, loading: boolean, fetching: boolean): void {
    set(this.state, `${cacheKey(key)}.loading`, loading);
    set(this.state, `${cacheKey(key)}.fetching`, fetching);
  }

  /**
   * Get the object from the server and save it in the cache (= redux store)
   *
   * @param {object} action :
   *    - onError: callback for any error
   *    - onSuccess: callback for any success
   * @param {object} context :
   *    - store: the redux store
   *    - router: the OnekiJS router of the application
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *fetch(url: string, options: CacheOptions<T> = {}, force = false) {
    const { store } = this.context;
    let loadingTask: Task | null = null;
    try {
      const cacheEntry = get<CacheEntry<T>>(store.getState(), cacheKey(url));
      if (cacheEntry && !force) {
        if (cacheEntry.expireAt && cacheEntry.expireAt > now()) return;
        if (cacheEntry.fetching) return;
      }

      loadingTask = yield fork([this, this.delayLoading], url, options.delayLoading);
      const fetcher = options.fetcher || xhr;
      const response: Response = yield fetcher(url, 'GET', undefined, options);
      const result: T = yield formatAsyncResponse(response);
      yield cancel(loadingTask as Task);
      yield this.setCache(url, {
        payload: result,
        expireAt: expirationTime(response, options),
        loading: false,
        fetching: false,
        error: undefined,
      });
      const onSuccess = options.onSuccess;
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
      yield this.setError(url, e);
      const onError = options.onError;
      if (onError) {
        yield call(onError, e);
      } else {
        throw e;
      }
    }
  }
}
