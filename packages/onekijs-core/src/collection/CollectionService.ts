import Router from '../app/Router';
import { Location } from '../app/typings';
import { reducer } from '../core/annotations';
import Service from '../core/Service';
import { AnonymousObject, Primitive } from '../core/typings';
import { get } from '../core/utils/object';
import { urlBuilder } from '../core/utils/url';
import {
  Collection,
  CollectionItemAdapter,
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
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
} from './typings';
import {
  defaultComparator,
  isQueryFilterCriteria,
  parseQuery,
  rootFilterId,
  toCollectionItem,
  urlSerializer,
  visitFilter,
} from './utils';

export default abstract class CollectionService<
  T = any,
  M extends ItemMeta = ItemMeta,
  S extends CollectionState<T, M> = CollectionState<T, M>
> extends Service<S> implements Collection<T, M> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  initialState: S = null!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  router: Router = null!;

  abstract setData(data: T[]): void;
  abstract setItems(items: Item<T, M>[]): void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  abstract setMeta(item: Item<T, M>, key: keyof M, value: any): void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected abstract _onLocationChange(location: Location): void;
  protected abstract _setLoading(options: {
    status?: LoadingItemStatus;
    limit?: number;
    offset?: number;
    resetLimit?: boolean;
    resetData?: boolean;
  }): void;

  @reducer
  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._addFilter(filterOrCriteria, parentFilterId);
    this.refresh();
  }

  @reducer
  addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: string | number | boolean | QueryFilterCriteriaValue[] | null,
    not?: boolean | undefined,
    id?: string | number | symbol | undefined,
    parentFilterId?: string | number | symbol | undefined,
  ): void {
    this.addFilter(
      {
        field,
        operator,
        value,
        not,
        id,
      },
      parentFilterId,
    );
  }

  @reducer
  addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._addSortBy(field, dir, comparator, prepend);
  }

  @reducer
  clearFields(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearFields();
    this.refresh();
  }

  @reducer
  clearFilter(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearFilter();
    this.refresh();
  }

  @reducer
  clearLimit(): void {
    this._setLoading({ offset: this.state.offset, resetData: false });
    this._clearLimit();
    this.refresh();
  }

  @reducer
  clearOffset(): void {
    this._setLoading({ limit: this.state.limit, resetData: false });
    this._clearOffset();
    this.refresh();
  }

  @reducer
  clearParam(key: string): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearParam(key);
    this.refresh();
  }

  @reducer
  clearParams(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearParams();
    this.refresh();
  }

  @reducer
  clearSearch(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearSearch();
    this.refresh();
  }

  @reducer
  clearSort(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearSort();
    this.refresh();
  }

  @reducer
  clearSortBy(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearSortBy();
    this.refresh();
  }

  @reducer
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setFilter(filter);
    this.refresh();
  }

  getQuery(): Query {
    return {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      offset: this.getOffset(),
      limit: this.getLimit(),
      fields: this.getFields(),
      search: this.getSearch(),
      sort: this.getSort(),
    };
  }

  @reducer
  load(limit?: number, offset?: number): void {
    const resetData = this.state.items ? false : true;
    this._setLoading({ limit, offset, resetData });
    this.refresh();
  }

  @reducer
  query(query: Query): void {
    let resetData = false;
    if (query.filter || query.search || query.sort || query.sortBy || query.fields) {
      resetData = true;
    }
    this._setLoading({ limit: query.limit, offset: query.offset, resetData });
    this._setQuery(query, resetData);
    this.refresh();
  }

  @reducer
  refresh(): void {
    const path = this.state.router.location.pathname;
    const query = urlSerializer(this.getQuery());
    this.state.router.push(urlBuilder(path, {}, query));
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._removeFilter(filterId);
    this.refresh();
  }

  @reducer
  removeSortBy(field: string): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._removeSortBy(field);
    this.refresh();
  }

  @reducer
  reset(): void {
    this.state = this.initialState;
    this._setLoading({ limit: this.state.limit, offset: this.state.offset });
    this.refresh();
  }

  @reducer
  search(search: Primitive): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSearch(search);
    this.refresh();
  }

  @reducer
  setFields(fields: string[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setFields(fields);
    this.refresh();
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setParam(key, value);
    this.refresh();
  }

  @reducer
  setParams(params: AnonymousObject): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setParams(params);
    this.refresh();
  }

  @reducer
  sort(dir: QuerySortDir): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSort(dir);
    this.refresh();
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSortBy(sortBy);
    this.refresh();
  }

  init(): void {
    this.initialState = this.state;
    if (this.state.filter) {
      this.state.filter = this._formatFilter(this.state.filter);
    }
    // listen on location change and adapt filters, sort, ... with these values
    this.state.router.listen((location) => this._onLocationChange(location));
    // retrieve params from URL and initiate filter, sort ... with these values
    this._setQuery(this._parseLocation(this.state.router.location), false);
  }

  get data(): (T | undefined)[] | undefined {
    const items = this.state.items;
    if (items !== undefined) {
      return items.map((item) => item?.data);
    }
    return undefined;
  }

  get hasMore(): boolean {
    return this.state.hasMore || false;
  }

  get items(): (Item<T, M> | undefined)[] | undefined {
    return this.state.items;
  }

  get status(): CollectionStatus {
    return this.state.status || LoadingStatus.Loaded;
  }

  get total(): number | undefined {
    return this.state.items?.length;
  }

  getAdapter(): CollectionItemAdapter<T, M> | undefined {
    return this.state.adapter;
  }

  getFields(): string[] | undefined {
    return this.state.fields;
  }

  getFilter(): QueryFilter | undefined {
    return this._formatFilter(this.state.filter);
  }

  getOffset(): number | undefined {
    return this.state.offset;
  }

  getParams(): AnonymousObject | undefined {
    return this.state.params;
  }

  getSearch(): Primitive | undefined {
    return this.state.search;
  }

  getLimit(): number | undefined {
    return this.state.limit;
  }

  getSort(): QuerySortDir | undefined {
    return this.state.sort;
  }

  getSortBy(): QuerySortBy[] | undefined {
    return this._formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(this.state, 'sortBy'));
  }

  protected _adapt(data: T | undefined): Item<T, M> {
    return toCollectionItem(data, this.state.adapter);
  }

  @reducer
  protected _addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    const filter = this.getFilter() || { id: rootFilterId, operator: 'and', criterias: [] };
    visitFilter(filter, (filter) => {
      if (filter.id === parentFilterId) {
        let index = -1;
        if (filterOrCriteria.id !== undefined) {
          index = filter.criterias.findIndex((entry) => filterOrCriteria.id === entry.id);
        }
        if (index === -1) {
          filter.criterias.push(filterOrCriteria);
        } else {
          filter.criterias[index] = filterOrCriteria;
        }
        return true;
      }
      return false;
    });
    this.state.filter = filter;
  }

  @reducer
  protected _addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._removeSortBy(field);
    const sortBy = this.getSortBy() || [];
    if (prepend) {
      sortBy.unshift({ field, dir, comparator });
    } else {
      sortBy.push({ field, dir, comparator });
    }
    this.state.sortBy = sortBy;
  }

  @reducer
  protected _clearFields(): void {
    this.state.fields = undefined;
  }

  @reducer
  protected _clearFilter(): void {
    this.state.filter = undefined;
  }

  @reducer
  protected _clearOffset(): void {
    this.state.offset = undefined;
  }

  @reducer
  protected _clearParam(key: string): void {
    if (this.state.params) {
      delete this.state.params[key];
    }
  }

  @reducer
  protected _clearParams(): void {
    this.state.params = undefined;
  }

  @reducer
  protected _clearSearch(): void {
    this.state.search = undefined;
  }

  @reducer
  protected _clearLimit(): void {
    this.state.limit = undefined;
  }

  @reducer
  protected _clearSortBy(): void {
    this.state.sortBy = undefined;
  }

  @reducer
  protected _clearSort(): void {
    this.state.sort = undefined;
  }

  protected _formatFilter(
    filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[],
  ): QueryFilter | undefined {
    if (!filter) {
      return;
    } else if (Array.isArray(filter)) {
      // current filter is a QueryFilterOrCriteria[]
      return {
        id: rootFilterId,
        operator: 'and',
        criterias: filter,
      };
    } else if (isQueryFilterCriteria(filter)) {
      // current filter is a QueryFilterCriteria
      return {
        id: rootFilterId,
        operator: 'and',
        criterias: [filter],
      };
    } else if (filter.id === undefined || filter.operator === undefined) {
      return Object.assign({ id: rootFilterId, operator: 'and', criterias: [] }, filter);
    } else {
      return filter;
    }
  }

  protected _formatSortBy(sortBy?: string | QuerySortBy | QuerySortBy[]): QuerySortBy[] | undefined {
    if (Array.isArray(sortBy)) {
      return sortBy;
    }
    if (!sortBy) {
      return;
    }
    if (typeof sortBy === 'string') {
      return [
        {
          field: sortBy,
        },
      ];
    }
    return [sortBy];
  }

  protected _getId(data: T): string | undefined {
    return this._adapt(data).id;
  }

  protected _parseLocation(location: Location): Query {
    return parseQuery(location.query || {});
  }

  @reducer
  protected _removeFilter(filterId: QueryFilterId): void {
    const filter = this.getFilter();
    if (filter) {
      visitFilter(filter, (filter) => {
        for (const i in filter.criterias) {
          if (filter.criterias[i].id === filterId) {
            filter.criterias.splice(parseInt(i), 1);
            return true;
          }
        }
        return false;
      });
      this.state.filter = filter;
    }
  }

  @reducer
  protected _removeSortBy(field: string): void {
    const sortBy = this.getSortBy();
    if (sortBy) {
      this.state.sortBy = sortBy.filter((sort) => sort.field !== field);
    }
  }

  @reducer
  protected _setFields(fields: string[]): void {
    this.state.fields = fields;
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this.state.filter = this._formatFilter(filter);
  }

  @reducer
  protected _setLimit(limit: number): void {
    this.state.limit = limit;
  }

  @reducer
  protected _setLimitOffset(limit?: number, offset?: number): void {
    this.state.limit = limit;
    this.state.offset = offset;
  }

  @reducer
  protected _setQuery(query: Query, force = true): void {
    const nextFilter = this._formatFilter(query.filter);
    if (force || nextFilter) this.state.filter = nextFilter;
    const nextSortBy = this._formatSortBy(query.sortBy);
    if (force || nextSortBy) this.state.sortBy = nextSortBy;
    if (force || query.sort) this.state.sort = query.sort;
    if (force || query.search) this.state.search = query.search;
    if (force || query.fields) this.state.fields = query.fields;
    if (force || query.offset) this.state.offset = query.offset;
    if (force || query.limit) this.state.limit = query.limit;
  }

  @reducer
  protected _setOffset(offset: number): void {
    this.state.offset = offset;
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this.state.search = search;
  }

  @reducer
  protected _setSort(dir: QuerySortDir): void {
    this.state.sort = dir;
  }

  @reducer
  protected _setSortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this.state.sortBy = this._formatSortBy(sortBy);
  }
}
