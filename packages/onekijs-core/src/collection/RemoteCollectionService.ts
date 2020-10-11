import { cancel, delay, fork } from 'redux-saga/effects';
import { reducer, saga, service } from '../core/annotations';
import BasicError from '../core/BasicError';
import { AnonymousObject, Primitive, SagaEffect } from '../core/typings';
import { set } from '../core/utils/object';
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
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySerializerResult,
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
} from './typings';
import { defaultComparator, defaultSerializer, rootFilterId, isSameQuery } from './utils';

@service
export default class RemoteCollectionService<
  T = any,
  M extends ItemMeta = ItemMeta,
  S extends CollectionState<T, M> = CollectionState<T, M>
> extends CollectionService<T, M, S> implements Collection<T, M> {
  protected itemMeta: AnonymousObject<M | undefined> = {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId) {
    yield this._addFilter(filterOrCriteria, parentFilterId);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: string | number | boolean | QueryFilterCriteriaValue[] | null,
    not?: boolean | undefined,
    id?: string | number | symbol | undefined,
    parentFilterId?: string | number | symbol | undefined,
  ) {
    yield this._addFilter(
      {
        field,
        operator,
        value,
        not,
        id,
      },
      parentFilterId,
    );
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ) {
    yield this._addSortBy(field, dir, comparator, prepend);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFields() {
    yield this._clearFields();
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFilter() {
    yield this._clearFilter();
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *clearParam(key: string) {
    yield this._clearParam(key);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearParams() {
    yield this._clearParams();
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSearch() {
    yield this._clearFilter();
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSort() {
    yield this._clearSort();
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSortBy() {
    yield this._clearSortBy();
    yield this._refresh(true);
  }

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]) {
    yield this._setFilter(filter);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *load(limit?: number, offset?: number) {
    const resetData = this.state.items ? false : true;
    yield this._setLimitOffset(limit, offset);
    yield this._refresh(resetData);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Throttle, 'state.throttle', 200)
  *query(query: Query) {
    let resetData = false;
    if (query.filter || query.search || query.sort || query.sortBy || query.fields) {
      resetData = true;
    }
    yield this._setQuery(query, resetData);
    yield this._refresh(resetData);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Throttle, 'state.throttle', 200)
  *refresh() {
    yield this._refresh(true);
  }

  @reducer
  reset(): void {
    this.state = this.initialState;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeFilter(filterId: QueryFilterId) {
    yield this._removeFilter(filterId);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeSortBy(field: string) {
    yield this._removeSortBy(field);
    yield this._refresh(true);
  }

  serializeQuery(query: Query): QuerySerializerResult {
    const serializer = this.state.serializer || defaultSerializer;
    return serializer(query);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setFields(fields: string[]) {
    yield this._setFields(fields);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Throttle, 'state.throttle', 200)
  *search(search: Primitive) {
    yield this._setSearch(search);
    yield this._refresh(true);
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
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *setParam(key: string, value: any) {
    yield this._setParam(key, value);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setParams(params: AnonymousObject) {
    yield this._setParams(params);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Throttle, 'state.throttle', 200)
  *sort(dir: QuerySortDir) {
    yield this._setSort(dir);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *sortBy(sortBy: string | QuerySortBy | QuerySortBy[]) {
    yield this._setSortBy(sortBy);
    yield this._refresh(true);
  }

  @reducer
  protected _addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._addFilter(filterOrCriteria, parentFilterId);
  }

  @reducer
  protected _addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._addSortBy(field, dir, comparator, prepend);
  }

  @reducer
  protected _clearFields(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._clearFields();
  }

  @reducer
  protected _clearFilter(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._clearFields();
  }

  @reducer
  protected _clearOffset(): void {
    this._setLoading({ limit: this.state.limit, resetData: false });
    super._clearOffset();
  }

  @reducer
  protected _clearSearch(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._clearSearch();
  }

  @reducer
  protected _clearLimit(): void {
    this._setLoading({ offset: this.state.offset, resetData: false });
    super._clearLimit();
  }

  @reducer
  protected _clearSortBy(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._clearSortBy();
  }

  @reducer
  protected _clearSort(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._clearSort();
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
      const onSuccess = options.onSuccess;
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
      const onError = options.onError;
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
    const currentQuery = this._getQuery();
    const data = Array.isArray(result) ? result : result.result;
    const total = Array.isArray(result) ? undefined : result.total;

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
        items.splice(offset, limit, ...itemResult.slice(0, limit - 1));
        this.state.items = items;
        if (data.length < limit) {
          this.state.total = this.state.items.length;
        }
      } else {
        this.state.items = itemResult;
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

  protected _getQuery(): Query {
    const limit = this.getLimit();
    return {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      offset: this.getOffset(),
      limit: limit === undefined ? limit : limit + 1,
      fields: this.getFields(),
      search: this.getSearch(),
      sort: this.getSort(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *_refresh(resetData = true) {
    const query = this._getQuery();
    yield this._fetch(query, resetData);
  }

  @reducer
  protected _removeFilter(filterId: QueryFilterId): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._removeFilter(filterId);
  }

  @reducer
  protected _removeSortBy(field: string): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._removeSortBy(field);
  }

  @reducer
  protected _setFields(fields: string[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._setFields(fields);
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._setFilter(filter);
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

  @reducer
  protected _setLimitOffset(limit?: number, offset?: number): void {
    const resetData = this.state.items ? false : true;
    this._setLoading({ limit, offset, resetData });
    super._setLimitOffset(limit, offset);
  }

  @reducer
  protected _setQuery(query: Query, resetData?: boolean): void {
    this._setLoading({ limit: query.limit, offset: query.offset, resetData });
    super._setQuery(query);
  }

  @reducer
  protected _setOffset(offset: number): void {
    this._setLoading({ limit: this.state.limit, offset, resetData: false });
    super._setOffset(offset);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _setParam(key: string, value: any): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    set(this.state.params, key, value);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _setParams(params: AnonymousObject): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this.state.params = params;
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._setSearch(search);
  }

  @reducer
  protected _setLimit(limit: number): void {
    this._setLoading({ limit, offset: this.state.offset, resetData: false });
    super._setLimit(limit);
  }

  @reducer
  protected _setSort(dir: QuerySortDir): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._setSort(dir);
  }

  @reducer
  protected _setSortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    super._setSortBy(sortBy);
  }
}
