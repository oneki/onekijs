import { asyncHttp, HttpMethod, Primitive, reducer, saga, SagaEffect, service } from 'onekijs';
import { FetchMethod, FetchOptions } from 'onekijs/dist/fetch/typings';
import { cancel, delay, fork } from 'redux-saga/effects';
import { defaultComparator, defaultSerializer, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  Item,
  loadingSymbol,
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
  deprecatedSymbol,
} from './typings';

@service
export default class RemoteQueryService<T = any, S extends RemoteQueryState<T> = RemoteQueryState<T>>
  extends QueryService<S>
  implements RemoteCollection<T> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId) {
    yield this._addFilter(filterOrCriteria, parentFilterId);
    yield this.refresh();
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
    yield this.refresh();
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
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFields() {
    yield this._clearFields();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFilter() {
    yield this._clearFilter();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSearch() {
    yield this._clearFilter();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSort() {
    yield this._clearSort();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSortBy() {
    yield this._clearSortBy();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *delayLoading(delay_ms: number, size?: number | string, offset?: number | string) {
    if (typeof size === 'string') {
      size = parseInt(size);
    }
    if (typeof offset === 'string') {
      offset = parseInt(offset);
    }
    yield delay(delay_ms);
    yield this.setLoading(true, true);
  }

  get data(): Item<T>[] | undefined {
    return this.state.data;
  }

  get loading(): boolean {
    return this.state.loading || false;
  }

  get deprecated(): boolean {
    return this.state.deprecated || false;
  }

  get paginatedData(): Item<T>[] | undefined {
    return this.state.result;
  }

  get total(): number | undefined {
    return this.state.total;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]) {
    yield this._setFilter(filter);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *load(size?: number, offset?: number) {
    yield this._setLimit(size, offset);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *query(query: Query) {
    yield this._setQuery(query);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *refresh() {
    const size = this.getSize();
    const query = {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      offset: this.getOffset(),
      size: size === undefined ? size : size + 1,
      fields: this.getFields(),
      search: this.getSearch(),
      sort: this.getSort(),
    };

    const method = this.state.method ?? HttpMethod.Get;
    if (method === HttpMethod.Get) {
      yield this.get(this.state.url, Object.assign({}, this.state.fetchOptions, { query: this.serializeQuery(query) }));
    } else {
      yield this._fetch(this.state.url, method, query, this.state.fetchOptions);
    }
    yield this._setResult(size, query.offset);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeFilter(filterId: QueryFilterId) {
    yield this._removeFilter(filterId);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeSortBy(field: string) {
    yield this._removeSortBy(field);
    yield this.refresh();
  }

  serializeQuery(query: Query): QuerySerializerResult {
    const serializer = this.state.serializer || defaultSerializer;
    return serializer(query);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setFields(fields: string[]) {
    yield this._setFields(fields);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *search(search: Primitive) {
    yield this._setSearch(search);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *sort(dir: QuerySortDir) {
    yield this._setSort(dir);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *sortBy(sortBy: string | QuerySortBy | QuerySortBy[]) {
    yield this._setSortBy(sortBy);
    yield this.refresh();
  }

  @reducer
  protected _setLoading(
    loading: boolean,
    deprecated: boolean,
    size?: number,
    offset?: number,
    resetLimit = true,
  ): void {
    const setItemLoading = (item: Item<T>) => {
      if (item !== undefined) {
        item[loadingSymbol] = loading;
        item[deprecatedSymbol] = deprecated;
      } else {
        item = Object.assign({
          [loadingSymbol]: loading,
          [deprecatedSymbol]: deprecated,
        });
      }
      return item;
    };

    if (resetLimit) {
      this._setLimit(size, offset);
    }

    if (resetLimit || (size === this.state.size && offset === this.state.offset)) {
      offset = offset || 0;
      if (this.state.data) {
        if (size) {
          for (let i = offset; i < size + offset; i++) {
            this.state.data[i] = setItemLoading(this.state.data[i]);
          }
        } else {
          this.state.data = this.state.data.map((item) => {
            return setItemLoading(item);
          });
        }
      } else {
        if (size) {
          this.state.data = Array(offset + size).fill(
            {
              [loadingSymbol]: loading,
              [deprecatedSymbol]: deprecated,
            },
            offset,
            offset + size,
          );
        }
      }
      this.state.loading = loading;
      this.state.deprecated = deprecated;
    }
  }

  @reducer
  protected _setResult(size?: number, offset = 0): void {
    this.state.loading = false;
    if (this.state.result) {
      if (size) {
        const data = this.state.data || Array(size + offset);
        data.splice(offset, size, ...this.state.result.slice(0, size));

        this.state.data = data;
        if (this.state.result.length <= size) {
          this.state.total = this.state.data.length;
        } else {
          this.state.result = this.state.result.slice(0, size);
        }
      } else {
        this.state.data = this.state.result;
        this.state.total = this.state.data.length;
      }
    }
  }

  @reducer
  protected _addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._setLoading(true, this.state.size, 0);
    super._addFilter(filterOrCriteria, parentFilterId);
  }

  @reducer
  protected _addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._setLoading(true, this.state.size, 0);
    super._addSortBy(field, dir, comparator, prepend);
  }

  @reducer
  protected _clearFields(): void {
    this._setLoading(true, this.state.size, 0);
    super._clearFields();
  }

  @reducer
  protected _clearFilter(): void {
    this._setLoading(true, this.state.size, 0);
    super._clearFields();
  }

  @reducer
  protected _clearOffset(): void {
    this._setLoading(false, this.state.size, undefined);
    super._clearOffset();
  }

  @reducer
  protected _clearSearch(): void {
    this._setLoading(true, this.state.size, 0);
    super._clearSearch();
  }

  @reducer
  protected _clearSize(): void {
    this._setLoading(false, undefined, this.state.offset);
    super._clearSize();
  }

  @reducer
  protected _clearSortBy(): void {
    this._setLoading(true, this.state.size, 0);
    super._clearSortBy();
  }

  @reducer
  protected _clearSort(): void {
    this._setLoading(true, this.state.size, 0);
    super._clearSort();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *_fetch<R = any, T = any>(url: string, method: FetchMethod, body?: T, options: FetchOptions<R, T> = {}) {
    let loadingTask = null;
    try {
      if (options.delayLoading) {
        loadingTask = yield fork(
          [this, this.delayLoading],
          options.delayLoading,
          (body as any)?.size ?? options.query?.size,
          (body as any)?.offset ?? options.query?.offset,
        );
      }
      const fetcher = options.fetcher || asyncHttp;
      const result = yield fetcher(url, method, body, options);
      yield cancel(loadingTask);
      yield this._fetchSuccess(result); // to update the store and trigger a re-render.
      const onSuccess = options.onSuccess;
      if (onSuccess) {
        yield onSuccess(result);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      if (loadingTask) {
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
  _fetchError(e: any): void {
    this.state.error = e;
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _fetchSuccess(result: any): void {
    this.state.error = undefined;
    this.state.result = result;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *_refresh() {
    const size = this.getSize();
    const query = {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      offset: this.getOffset(),
      size: size === undefined ? size : size + 1,
      fields: this.getFields(),
      search: this.getSearch(),
      sort: this.getSort(),
    };

    const method = this.state.method ?? HttpMethod.Get;
    if (method === HttpMethod.Get) {
      yield this.get(this.state.url, Object.assign({}, this.state.fetchOptions, { query: this.serializeQuery(query) }));
    } else {
      yield this._fetch(this.state.url, method, query, this.state.fetchOptions);
    }
    yield this._setResult(size, query.offset);
  }

  @reducer
  protected _removeFilter(filterId: QueryFilterId): void {
    this._setLoading(true, this.state.size, 0);
    super._removeFilter(filterId);
  }

  @reducer
  protected _removeSortBy(field: string): void {
    this._setLoading(true, this.state.size, 0);
    super._removeSortBy(field);
  }

  @reducer
  protected _setFields(fields: string[]): void {
    this._setLoading(true, this.state.size, 0);
    super._setFields(fields);
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this._setLoading(true, this.state.size, 0);
    super._setFilter(filter);
  }

  @reducer
  protected _setLimit(size?: number, offset?: number): void {
    this._setLoading(false, size, offset);
    super._setLimit(size, offset);
  }

  @reducer
  protected _setQuery(query: Query): void {
    let resetData = false;
    if (query.filter || query.search || query.sort || query.sortBy || query.fields) {
      resetData = true;
    }
    this._setLoading(resetData, query.size, query.offset);
    super._setQuery(query);
  }

  @reducer
  protected _setOffset(offset: number): void {
    this._setLoading(false, this.state.size, offset);
    super._setOffset(offset);
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this._setLoading(true, this.state.size, 0);
    super._setSearch(search);
  }

  @reducer
  protected _setSize(size: number): void {
    this._setLoading(false, size, this.state.offset);
    super._setSize(size);
  }

  @reducer
  protected _setSort(dir: QuerySortDir): void {
    this._setLoading(true, this.state.size, 0);
    super._setSort(dir);
  }

  @reducer
  protected _setSortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setLoading(true, this.state.size, 0);
    super._setSortBy(sortBy);
  }
}
