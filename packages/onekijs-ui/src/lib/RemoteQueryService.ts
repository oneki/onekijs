import { reducer, saga, SagaEffect, service } from 'onekijs';
import { loading, defaultSerializer, rootFilterId, defaultComparator } from '../utils/query';
import QueryService from './QueryService';
import {
  RemoteItem,
  RemoteQueryState,
  QueryFilterOrCriteria,
  QueryFilterId,
  QuerySortDir,
  QuerySortComparator,
  QueryFilter,
  QueryFilterCriteria,
} from './typings';

const defaultOffset = 0;
const defaultSize = 25; // arbitrary value since we don't know how many items will be provided by the server.

@service
export default class RemoteQueryService<
  T = any,
  S extends RemoteQueryState<T> = RemoteQueryState<T>
> extends QueryService<T, S> {
  initialOffset?: number;
  initialSize?: number;

  init(): void {
    this.initialOffset = this.state.offset;
    this.initialSize = this.state.size;
    this._setLoading(this.initialOffset, this.initialSize, true);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId) {
    yield this._setLoading(0, this.initialSize, true, true);
    yield this._addFilter(filterOrCriteria, parentFilterId);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *addSort(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ) {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._addSort(field, dir, comparator, prepend);
    yield this.refresh();
  }

  get data(): RemoteItem<T>[] {
    return this.state.result || [];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *refresh() {
    const query = this.serializeQuery();
    const url = query ? `${this.state.url}?${query}` : this.state.url;
    const result = yield this.get(url);
    yield this._setResult(result);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeFilter(filterId: QueryFilterId) {
    yield this._setLoading(0, this.initialSize, true, true);
    yield this._removeFilter(filterId);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *removeSort(field: string) {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._removeSort(field);
    yield this.refresh();
  }

  serializeQuery(): string {
    const serializer = this.state.serializer || defaultSerializer;
    return serializer(this.filter, this.sort, this.state.offset, this.state.size, this.state.fields);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null) {
    yield this._setLoading(0, this.initialSize, true, true);
    yield this._setFilter(filter);
    yield this.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *setSort(field: string, dir: QuerySortDir = 'asc', comparator: QuerySortComparator = defaultComparator) {
    yield this._setLoading(this.state.offset, this.state.size, true, false);
    yield this._setSort(field, dir, comparator);
    yield this.refresh();
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
  protected _setResult(result: RemoteItem<T>[]): void {
    this.state.result = result;
  }
}
