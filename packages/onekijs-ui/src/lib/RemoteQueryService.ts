import { asyncHttp, HttpMethod, Primitive, reducer, saga, SagaEffect, service, set } from 'onekijs';
import { cancel, delay, fork } from 'redux-saga/effects';
import { defaultComparator, defaultSerializer, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  CollectionStatus,
  Item,
  ItemMeta,
  ItemStatus,
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
  RemoteCollection,
  RemoteQueryState,
} from './typings';

@service
export default class RemoteQueryService<T = any, S extends RemoteQueryState<T> = RemoteQueryState<T>>
  extends QueryService<S>
  implements RemoteCollection<T> {
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

  get data(): Item<T>[] | undefined {
    return this.state.data;
  }

  get meta(): ItemMeta[] | undefined {
    return this.state.meta;
  }

  get status(): CollectionStatus {
    return this.state.status || LoadingStatus.NotInitialized;
  }

  get total(): number | undefined {
    return this.state.total;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]) {
    yield this._setFilter(filter);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *load(size?: number, offset?: number) {
    yield this._setLimit(size, offset);
    yield this._refresh(false);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *query(query: Query) {
    let resetData = false;
    if (query.filter || query.search || query.sort || query.sortBy || query.fields) {
      resetData = true;
    }
    yield this._setQuery(query, resetData);
    yield this._refresh(resetData);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *refresh() {
    yield this._refresh(true);
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *sort(dir: QuerySortDir) {
    yield this._setSort(dir);
    yield this._refresh(true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *sortBy(sortBy: string | QuerySortBy | QuerySortBy[]) {
    yield this._setSortBy(sortBy);
    yield this._refresh(true);
  }

  @reducer
  protected _addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._addFilter(filterOrCriteria, parentFilterId);
  }

  @reducer
  protected _addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._addSortBy(field, dir, comparator, prepend);
  }

  @reducer
  protected _clearFields(): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._clearFields();
  }

  @reducer
  protected _clearFilter(): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._clearFields();
  }

  @reducer
  protected _clearOffset(): void {
    this._setLoading({ size: this.state.size, resetData: false });
    super._clearOffset();
  }

  @reducer
  protected _clearSearch(): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._clearSearch();
  }

  @reducer
  protected _clearSize(): void {
    this._setLoading({ offset: this.state.offset, resetData: false });
    super._clearSize();
  }

  @reducer
  protected _clearSortBy(): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._clearSortBy();
  }

  @reducer
  protected _clearSort(): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._clearSort();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected *_delayLoading(delay_ms: number, size?: number | string, offset?: number | string, resetData?: boolean) {
    if (typeof size === 'string') {
      size = parseInt(size);
    }
    if (typeof offset === 'string') {
      offset = parseInt(offset);
    }
    yield delay(delay_ms);
    yield this._setLoading({
      status: LoadingStatus.Loading,
      size,
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
        loadingTask = yield fork([this, this._delayLoading], options.delayLoading, query.size, query.offset, resetData);
      }

      const fetcher = options.fetcher || asyncHttp;

      const method = this.state.method ?? HttpMethod.Get;
      const body = this.state.method === HttpMethod.Get ? undefined : query;
      const fetchOptions =
        this.state.method === HttpMethod.Get
          ? Object.assign({}, options, { query: this.serializeQuery(query) })
          : options;
      const result = yield fetcher(this.state.url, method, body, fetchOptions);
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
  protected _fetchSuccess(result: any[], resetData: boolean, query: Query): void {
    const size = query.size;
    const offset = query.offset || 0;
    const currentQuery = this._getQuery();

    // check if current query is still equals to the query used for fetching
    let same =
      query.filter === currentQuery.filter &&
      query.sortBy === currentQuery.sortBy &&
      query.fields === currentQuery.fields &&
      query.search === currentQuery.search &&
      query.sort === currentQuery.sort;

    this.state.error = undefined;
    this.state.total = undefined;
    if (same) {
      if (resetData) {
        this.state.data = undefined;
        this.state.meta = undefined;
      }

      if (size) {
        for (let i = offset; i < offset + (size - 1); i++) {
          set(this.state.meta, `${i}.status`, LoadingStatus.Loaded);
        }
        const data = this.state.data || Array(size + offset);
        data.splice(offset, size, ...result.slice(0, size - 1));
        this.state.data = data;
        if (result.length < size) {
          this.state.total = this.state.data.length;
          if (this.state.meta && this.state.meta.length > this.state.data.length) {
            this.state.meta = this.state.meta.slice(0, this.state.data.length);
          }
        }
      } else {
        for (let i = offset; i < offset + result.length; i++) {
          set(this.state.meta, `${i}.status`, LoadingStatus.Loaded);
        }
        this.state.data = result;
        this.state.total = this.state.data.length;
        if (this.state.meta && this.state.meta.length > this.state.data.length) {
          this.state.meta = this.state.meta.slice(0, this.state.data.length);
        }
      }
    }

    same = same && query.size === currentQuery.size && query.offset === currentQuery.offset;

    if (same && resetData) {
      this.state.status = this.state.total === undefined ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
    } else {
      // need to calculate the status as we cannot be sure that there is not another running request
      if (this.state.meta && this.state.meta.find((item) => item && item.status === LoadingStatus.Loading)) {
        this.state.status = LoadingStatus.PartialLoading;
      } else if (this.state.meta && this.state.meta.find((item) => item && item.status === LoadingStatus.Deprecated)) {
        this.state.status = LoadingStatus.PartialDeprecated;
      } else {
        this.state.status = this.state.total === undefined ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
      }
    }
  }

  protected _getQuery(): Query {
    const size = this.getSize();
    return {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      offset: this.getOffset(),
      size: size === undefined ? size : size + 1,
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
    this._setLoading({ size: this.state.size, offset: 0 });
    super._removeFilter(filterId);
  }

  @reducer
  protected _removeSortBy(field: string): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._removeSortBy(field);
  }

  @reducer
  protected _setFields(fields: string[]): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._setFields(fields);
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._setFilter(filter);
  }

  @reducer
  protected _setLoading(
    options: {
      status?: ItemStatus;
      size?: number;
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

    const setItemStatus = (index: number) => {
      this.state.meta = set(this.state.meta, `${index}.status`, options.status);
    };

    if (resetLimit) {
      this.state.size = options.size;
      this.state.offset = options.offset;
    }

    const offset = options.offset || 0;
    if (this.state.data) {
      if (options.size) {
        for (let i = offset; i < options.size + offset; i++) {
          setItemStatus(i);
        }
        this.state.status = `${resetData ? '' : 'partial_'}${options.status}` as CollectionStatus;
      } else {
        for (const i in this.state.data) {
          setItemStatus(parseInt(i));
        }
        this.state.status = options.status;
      }
    } else {
      if (options.size) {
        for (let i = offset; i < offset + options.size; i++) {
          setItemStatus(i);
        }
        this.state.status = `${resetData ? '' : 'partial_'}${options.status}` as CollectionStatus;
      } else {
        // no items yet, so we are sure that the collection is either full loading of full deprecated
        this.state.status = options.status;
      }
    }
  }

  @reducer
  protected _setLimit(size?: number, offset?: number): void {
    this._setLoading({ size, offset, resetData: false });
    super._setLimit(size, offset);
  }

  @reducer
  protected _setQuery(query: Query, resetData?: boolean): void {
    this._setLoading({ size: query.size, offset: query.offset, resetData });
    super._setQuery(query);
  }

  @reducer
  protected _setOffset(offset: number): void {
    this._setLoading({ size: this.state.size, offset, resetData: false });
    super._setOffset(offset);
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._setSearch(search);
  }

  @reducer
  protected _setSize(size: number): void {
    this._setLoading({ size, offset: this.state.offset, resetData: false });
    super._setSize(size);
  }

  @reducer
  protected _setSort(dir: QuerySortDir): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._setSort(dir);
  }

  @reducer
  protected _setSortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setLoading({ size: this.state.size, offset: 0 });
    super._setSortBy(sortBy);
  }
}
