import { Primitive, reducer, saga, SagaEffect, service } from 'onekijs';
import { defaultComparator, defaultSerializer, loading, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  Item,
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

const defaultOffset = 0;
const defaultSize = 25; // arbitrary value since we don't know how many items will be provided by the server.

@service
export default class RemoteQueryService<T = any, S extends RemoteQueryState<T> = RemoteQueryState<T>>
  extends QueryService<S>
  implements RemoteCollection<T> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *sort(dir: QuerySortDir) {
    yield this._setLoading();
    yield this._setSort(dir);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId) {
    yield this._setLoading(true, 0);
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
    yield this._setLoading(true, 0);
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
    yield this._setLoading();
    yield this._addSortBy(field, dir, comparator, prepend);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFields() {
    yield this._setLoading(true, 0);
    yield this._clearFields();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearFilter() {
    yield this._setLoading(true, 0);
    yield this._clearFilter();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSearch() {
    yield this._setLoading(true, 0);
    yield this._clearFilter();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSort() {
    yield this._setLoading();
    yield this._clearSort();
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clearSortBy() {
    yield this._setLoading();
    yield this._clearSortBy();
    yield this.refresh();
  }

  get data(): Item<T>[] | undefined {
    return this.state.result;
  }

  get paginatedData(): Item<T>[] | undefined {
    return this.state.paginatedResult || this.data;
  }

  get loading(): boolean {
    return this.state.loading || false;
  }

  get total(): number | undefined {
    return this.state.total;
  }

  getFields(): string[] | undefined {
    return this.state.fields;
  }

  getSearch(): Primitive | undefined {
    return this.state.search;
  }

  getSort(): QuerySortDir | undefined {
    return this.state.sort;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]) {
    yield this._setLoading(true, 0);
    yield this._setFilter(filter);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *load(size?: number, offset?: number) {
    yield this._setLoading(false, size, offset);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *refresh() {
    const query = this.serializeQuery();
    yield this.get(this.state.url, Object.assign({}, this.state.fetchOptions, { query }));
    yield this._setPaginatedResult();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeFilter(filterId: QueryFilterId) {
    yield this._setLoading(true, 0);
    yield this._removeFilter(filterId);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeSortBy(field: string) {
    yield this._setLoading();
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
    yield this._setLoading(true, 0);
    yield this._setFields(fields);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *search(search: Primitive) {
    yield this._setLoading(true, 0);
    yield this._setSearch(search);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *sortBy(sortBy: string | QuerySortBy | QuerySortBy[]) {
    yield this._setLoading();
    yield this._setSortBy(sortBy);
    yield this.refresh();
  }

  @reducer
  protected _setLoading(resetData = false, newSize?: number, newOffset?: number): void {
    if (newSize !== undefined) {
      this.state.size = newSize;
    }
    if (newOffset !== undefined) {
      this.state.offset = newOffset;
    }
    const offset = this.state.offset || defaultOffset;
    const size = this.state.size || this.state.total || defaultSize;
    if (resetData || !this.state.result) {
      this.state.result = [];
      this.state.result = Array(offset + size).fill(loading, offset, offset + size);
    } else {
      this.state.result.splice(offset, size, ...Array(size).fill(loading));
    }
  }

  @reducer
  protected _setPaginatedResult(): void {
    if (this.state.result && this.state.size) {
      this.state.paginatedResult = this.state.result.slice(this.state.offset || 0, this.state.size);
    } else {
      this.state.paginatedResult = this.state.result;
    }
  }
}
