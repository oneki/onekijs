import { Primitive, reducer, saga, SagaEffect, service } from 'onekijs';
import { defaultComparator, defaultSerializer, loading, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QueryLimit,
  QuerySerializerResult,
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
  RemoteCollection,
  RemoteItem,
  RemoteQueryState,
} from './typings';

const defaultOffset = 0;
const defaultSize = 25; // arbitrary value since we don't know how many items will be provided by the server.

@service
export default class RemoteQueryService<T = any, S extends RemoteQueryState<T> = RemoteQueryState<T>>
  extends QueryService<S>
  implements RemoteCollection<T> {
  initialOffset?: number;
  initialSize?: number;

  init(): void {
    this.initialOffset = this.state.offset;
    this.initialSize = this.state.size;
    this._setLoading(this.initialOffset, this.initialSize, true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *sort(dir: QuerySortDir) {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._setSort(dir);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId) {
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
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
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
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
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._addSortBy(field, dir, comparator, prepend);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFilter() {
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
    yield this._clearFilter();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSearch() {
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
    yield this._clearFilter();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSort() {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._clearSort();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSortBy() {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._clearSortBy();
    yield this.refresh();
  }

  getSearch(): Primitive | undefined {
    return this.state.search;
  }

  getSort(): QuerySortDir | undefined {
    return this.state.sort;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *search(search: Primitive) {
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
    yield this._setSearch(search);
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
  *clearLimit() {
    yield this._setLoading(0, this.state.size, false, true);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearOffset() {
    yield this._setLoading(0, this.state.size, false, false);
    yield this._clearOffset();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSize() {
    yield this._setLoading(this.state.offset, this.initialSize, false, false);
    yield this._clearOffset();
    yield this.refresh();
  }

  get data(): RemoteItem<T>[] {
    return this.state.result || [];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]) {
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
    yield this._setFilter(filter);
    yield this.refresh();
  }

  getFields(): string[] | undefined {
    return this.state.fields;
  }

  getLimit(): QueryLimit {
    return {
      offset: this.state.offset,
      size: this.state.size,
    };
  }

  getOffset(): number | undefined {
    return this.state.offset;
  }

  getSize(): number | undefined {
    return this.state.size;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *refresh() {
    const query = this.serializeQuery();
    console.log("QUERY", query);
    yield this.get(this.state.url, Object.assign({}, this.state.fetchOptions, { query }));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeFilter(filterId: QueryFilterId) {
    yield this._setLoading(0, this.state.size || this.initialSize, true, true);
    yield this._removeFilter(filterId);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeSortBy(field: string) {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._removeSortBy(field);
    yield this.refresh();
  }

  serializeQuery(): QuerySerializerResult {
    const serializer = this.state.serializer || defaultSerializer;
    return serializer({
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      offset: this.getOffset(),
      size: this.getSize(),
      fields: this.getFields(),
      search: this.getSearch(),
      sort: this.getSort(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setFields(fields: string[]) {
    yield this._setFields(fields);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setLimit(offset: number, size: number) {
    yield this._setLoading(offset, size, false, false);
    yield this._setOffset(offset);
    yield this._setSize(size);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setOffset(offset: number) {
    yield this._setLoading(offset, this.state.size, false, false);
    yield this._setOffset(offset);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setSize(size: number) {
    yield this._setLoading(this.state.offset, size, false, false);
    yield this._setSize(size);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *sortBy(sortBy: string | QuerySortBy | QuerySortBy[]) {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._setSortBy(sortBy);
    yield this.refresh();
  }

  @reducer
  protected _clearFields(): void {
    this.state.fields = undefined;
  }

  @reducer
  protected _clearOffset(): void {
    this.state.offset = undefined;
  }

  @reducer
  protected _clearSize(): void {
    this.state.size = undefined;
  }

  @reducer
  protected _setFields(fields: string[]): void {
    this.state.fields = fields;
  }

  @reducer
  protected _setLoading(
    offset: number = defaultOffset,
    size: number = defaultSize,
    resetData = false,
    resetLimit = false,
  ): void {
    if (resetData || !this.state.result) {
      this.state.result = [];
      this.state.result = Array(offset + size).fill(loading, offset, offset + size);
    } else {
      this.state.result.splice(offset, size, ...Array(size).fill(loading));
    }
    if (resetLimit) {
      this.state.offset = this.initialOffset;
      this.state.size = this.initialSize;
    }
  }

  @reducer
  protected _setOffset(offset: number): void {
    this.state.offset = offset;
  }

  @reducer
  protected _setResult(result: RemoteItem<T>[]): void {
    this.state.result = result;
  }

  @reducer
  protected _setSize(size: number): void {
    this.state.size = size;
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this.state.search = search;
  }

  @reducer
  protected _setSort(dir: QuerySortDir): void {
    this.state.sort = dir;
  }
}
