import { cancel, delay, fork } from 'redux-saga/effects';
import { Location } from '../app/typings';
import { reducer, saga, service } from '../core/annotations';
import BasicError from '../core/BasicError';
import { dispatch, types } from '../core/Service';
import { AnonymousObject, SagaEffect } from '../core/typings';
import { toPayload } from '../core/utils/object';
import { Fetcher, HttpMethod } from '../fetch/typings';
import { asyncHttp } from '../fetch/utils';
import CollectionService from './CollectionService';
import {
  Collection,
  CollectionFetcherResult,
  CollectionState,
  CollectionStatus,
  Item,
  ItemMeta,
  LoadingItemStatus,
  LoadingStatus,
  Query,
  QuerySerializerResult,
} from './typings';
import { defaultSerializer, isSameQuery, shouldResetData } from './utils';

@service
export default class RemoteCollectionService<
  T = any,
  M extends ItemMeta = ItemMeta,
  S extends CollectionState<T, M> = CollectionState<T, M>
> extends CollectionService<T, M, S> implements Collection<T, M> {
  protected itemMeta: AnonymousObject<M | undefined> = {};

  get status(): CollectionStatus {
    return this.state.status || LoadingStatus.NotInitialized;
  }

  get total(): number | undefined {
    return this.state.total;
  }

  get url(): string {
    if (!this.state.url) {
      throw new BasicError('URL is required for a remote collection');
    }
    return this.state.url;
  }

  serializeQuery(query: Query): QuerySerializerResult {
    const serializer = this.state.serializer || defaultSerializer;
    return serializer(query);
  }

  @reducer
  setData(_data: T[]): void {
    throw new BasicError('Call to unsupported method setData of a remote collection');
  }

  @reducer
  setItems(_items: Item<T, M>[]): void {
    throw new BasicError('Call to unsupported method setItems of a remote collection');
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setMeta(item: Item<T, M>, key: keyof M, value: any): void {
    if (item.id !== undefined) {
      const meta = Object.assign({}, this.itemMeta[String(item.id)] ?? item.meta, { [key]: value });
      this.itemMeta[String(item.id)] = meta;
      item.meta = meta;

      if (this.state.items) {
        const stateItem = this.state.items.find((stateItem) => item.id === stateItem?.id);
        if (stateItem) {
          stateItem.meta = this.itemMeta[String(item.id)];
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected *_delayLoading(delay_ms: number, limit?: number | string, offset?: number | string, resetData?: boolean) {
    if (typeof limit === 'string') {
      limit = parseInt(limit);
    }
    if (typeof offset === 'string') {
      offset = parseInt(offset);
    }
    yield delay(delay_ms);
    yield this._setLoading({
      status: LoadingStatus.Loading,
      limit,
      offset,
      resetLimit: false,
      resetData,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  protected *_fetch(query: Query, resetData: boolean) {
    let loadingTask = null;
    const options = this.state.fetchOptions || {};
    const { onSuccess, onError } = options;
    try {
      if (options.delayLoading) {
        loadingTask = yield fork(
          [this, this._delayLoading],
          options.delayLoading,
          query.limit,
          query.offset,
          resetData,
        );
      }

      const fetcher: Fetcher<CollectionFetcherResult<T>, Query | undefined> = options.fetcher || asyncHttp;

      const method = this.state.method ?? HttpMethod.Get;
      const body = this.state.method === HttpMethod.Get ? undefined : query;
      const fetchOptions =
        method === HttpMethod.Get ? Object.assign({}, options, { query: this.serializeQuery(query) }) : options;
      const result = yield fetcher(this.url, method, body, fetchOptions);
      if (loadingTask !== null) {
        yield cancel(loadingTask);
      }

      yield this._fetchSuccess(result, resetData, query); // to update the store and trigger a re-render.
      if (onSuccess) {
        yield onSuccess(result);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      if (loadingTask !== null) {
        yield cancel(loadingTask);
      }
      yield this._fetchError(e);

      if (onError) {
        yield onError(e);
      } else {
        throw e;
      }
    }
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _fetchError(e: any): void {
    this.state.error = e;
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _fetchSuccess(result: CollectionFetcherResult<T>, resetData: boolean, query: Query): void {
    const limit = query.limit;
    const offset = query.offset || 0;
    const currentQuery = this.getQuery();
    const data: T[] = Array.isArray(result) ? result : result[this.state.dataKey];
    const total = Array.isArray(result) ? undefined : result[this.state.totalKey];
    let hasMore = true;
    if (Array.isArray(result)) {
      if (!limit || result.length <= limit) {
        hasMore = false;
      }
    } else {
      if (result[this.state.hasMoreKey] === true) {
        hasMore = true;
      } else if (
        result[this.state.hasMoreKey] === false ||
        !limit ||
        data.length <= limit ||
        (total && total <= limit + offset)
      ) {
        hasMore = false;
      }
    }
    // check if current query is still equals to the query used for fetching
    let same = isSameQuery(query, currentQuery);

    this.state.error = undefined;
    this.state.total = undefined;
    if (same) {
      // update metadata
      const itemResult: Item<T, M>[] = data.map((itemData) => {
        const item = this._adapt(itemData);
        const id = item.id;
        if (id !== undefined) {
          const meta = Object.assign({}, this.itemMeta[id] ?? item.meta, { loadingStatus: LoadingStatus.Loaded });
          this.itemMeta[id] = meta;
          item.meta = meta;
        }
        return item;
      });

      if (resetData) {
        this.state.items = [];
      }

      if (limit) {
        const items = this.state.items || Array(limit + offset);
        items.splice(offset, limit, ...itemResult.slice(0, limit));

        this.state.items = items;
        if (data.length < limit) {
          this.state.total = this.state.items.length;
        }
      } else {
        this.state.items = itemResult;
        this.state.total = this.state.items.length;
      }
      this.state.hasMore = hasMore;
      if (!hasMore) {
        this.state.total = this.state.items.length;
      }
      if (total !== undefined) {
        this.state.total = total;
      }
    }

    same = same && query.limit === currentQuery.limit && query.offset === currentQuery.offset;

    if (same && resetData) {
      this.state.status = this.state.total === undefined ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
    } else {
      // need to calculate the status as we cannot be sure that there is not another running request
      if (
        Object.values(this.itemMeta).find((itemMeta) => itemMeta && itemMeta.loadingStatus === LoadingStatus.Loading)
      ) {
        this.state.status = LoadingStatus.PartialLoading;
      } else if (
        Object.values(this.itemMeta).find((itemMeta) => itemMeta && itemMeta.loadingStatus === LoadingStatus.Deprecated)
      ) {
        this.state.status = LoadingStatus.PartialDeprecated;
      } else {
        this.state.status = this.state.total === undefined ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
      }
    }
  }

  @reducer
  protected _setLoading(
    options: {
      status?: LoadingItemStatus;
      limit?: number;
      offset?: number;
      resetLimit?: boolean;
      resetData?: boolean;
    } = {},
  ): void {
    const resetData = options.resetData ?? true;
    const resetLimit = options.resetLimit ?? true;

    if (options.status === undefined) {
      options.status =
        this.state.fetchOptions?.delayLoading !== undefined && this.state.fetchOptions?.delayLoading > 0
          ? LoadingStatus.Deprecated
          : LoadingStatus.Loading;
    }

    const setItemStatus = (item: Item<T, M> | undefined): Item<T, M> => {
      let meta = undefined;
      if (item === undefined) {
        item = this._adapt(undefined);
        meta = item.meta;
      } else if (item.id) {
        meta = this.itemMeta[item.id];
      } else {
        meta = this._adapt(item.data).meta;
      }

      if (meta !== undefined) {
        meta = Object.assign({}, meta, { loadingStatus: options.status });
        if (item) {
          item.meta = meta;
          if (item.id) {
            this.itemMeta[item.id] = meta;
          }
        }
      }
      return item;
    };

    if (resetLimit) {
      this.state.limit = options.limit;
      this.state.offset = options.offset;
    }

    const offset = options.offset || 0;
    if (this.state.items) {
      if (options.limit && !resetData) {
        for (let i = offset; i < options.limit + offset; i++) {
          this.state.items[i] = setItemStatus(this.state.items[i]);
        }
        this.state.status = `${resetData ? '' : 'partial_'}${options.status}` as CollectionStatus;
      } else {
        for (const i in this.state.items) {
          this.state.items[i] = setItemStatus(this.state.items[i]);
        }
        this.state.status = options.status;
      }
    } else {
      if (options.limit) {
        this.state.items = Array(offset + options.limit);
        for (let i = offset; i < offset + options.limit; i++) {
          this.state.items[i] = setItemStatus(undefined);
        }
        this.state.status = `${resetData ? '' : 'partial_'}${options.status}` as CollectionStatus;
      } else {
        // no items yet, so we are sure that the collection is either full loading of full deprecated
        this.state.status = options.status;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  protected _onLocationChange(location: Location) {
    const nextQuery = this._parseLocation(location);
    const resetData = this.state.items ? false : shouldResetData(this.getQuery(), nextQuery);
    this._setQuery(nextQuery);
    this[dispatch]({
      type: this[types]._fetch.actionType,
      payload: toPayload([nextQuery, resetData]),
    });
  }
}
