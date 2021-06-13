import { DefaultService, reducer } from '@oneki/core';
import { LocalRouter } from '@oneki/router';
import { AnonymousObject, Location, Primitive, Router } from '@oneki/types';
import { get, urlBuilder } from '@oneki/utils';
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
> extends DefaultService<S> implements Collection<T, M> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  initialState: S = null!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  router: Router = null!;
  cache: AnonymousObject<any> = {};
  abstract getItem(id: string | number): Item<T, M> | undefined;
  abstract getMeta(id: string | number): M | undefined;
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
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._addFilter(query, filterOrCriteria, parentFilterId);
    this.refresh(query);
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
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._addSortBy(query, field, dir, comparator, prepend);
    this.refresh(query);
  }

  @reducer
  clearFields(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearFields(query);
    this.refresh(query);
  }

  @reducer
  clearFilter(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearFilter(query);
    this.refresh(query);
  }

  @reducer
  clearLimit(): void {
    const query = this.getQuery();
    this._setLoading({ offset: this.state.offset, resetData: false });
    this._clearLimit(query);
    this.refresh(query);
  }

  @reducer
  clearOffset(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, resetData: false });
    this._clearOffset(query);
    this.refresh(query);
  }

  @reducer
  clearParam(key: string): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearParam(query, key);
    this.refresh(query);
  }

  @reducer
  clearParams(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearParams(query);
    this.refresh(query);
  }

  @reducer
  clearSearch(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearSearch(query);
    this.refresh(query);
  }

  @reducer
  clearSort(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearSort(query);
    this.refresh(query);
  }

  @reducer
  clearSortBy(): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._clearSortBy(query);
    this.refresh(query);
  }

  @reducer
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setFilter(query, filter);
    this.refresh(query);
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
      params: this.getParams(),
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
    if (
      ['filter', 'search', 'sort', 'sortBy', 'fields'].filter((value) => Object.keys(query).includes(value)).length > 0
    ) {
      resetData = true;
    }
    this._setLoading({ limit: query.limit, offset: query.offset, resetData });
    this._setQuery(query, resetData);
    this.refresh();
  }

  @reducer
  refresh(query?: Query): void {
    const path = this.state.router.location.pathname;
    this.state.router.push(urlBuilder(path, {}, urlSerializer(query || this.getQuery())));
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._removeFilter(query, filterId);
    this.refresh(query);
  }

  @reducer
  removeSortBy(field: string): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._removeSortBy(query, field);
    this.refresh(query);
  }

  @reducer
  reset(): void {
    this.state = this.initialState;
    this._setLoading({ limit: this.state.limit, offset: this.state.offset });
    this.refresh();
  }

  @reducer
  search(search: Primitive): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSearch(query, search);
    this.refresh(query);
  }

  @reducer
  setFields(fields: string[]): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setFields(query, fields);
    this.refresh(query);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setParam(query, key, value);
    this.refresh(query);
  }

  @reducer
  setParams(params: AnonymousObject): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setParams(query, params);
    this.refresh(query);
  }

  @reducer
  sort(dir: QuerySortDir): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSort(query, dir);
    this.refresh(query);
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSortBy(query, sortBy);
    this.refresh(query);
  }

  init(): void {
    this.initialState = this.state;
    if (this.state.filter) {
      this.state.filter = this._formatFilter(this.state.filter);
    }
    if (!this.state.router) {
      this.state.router = new LocalRouter();
    }
    // listen on location change and adapt filters, sort, ... with these values
    this.state.router.listen((location: Location) => this._onLocationChange(location));
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

  getFilterById(id: QueryFilterId): QueryFilterOrCriteria | undefined {
    let result: QueryFilter | QueryFilterCriteria | undefined = undefined;
    const filter = this._formatFilter(this.state.filter);
    if (filter !== undefined) {
      visitFilter(filter, (filter) => {
        if (filter.id === id) {
          result = filter;
          return true;
        }
        for (const filterOrCriteria of filter.criterias) {
          if (isQueryFilterCriteria(filterOrCriteria) && filter.id === id) {
            result = filterOrCriteria;
            return true;
          }
        }
        return false;
      });
    }
    return result;
  }

  getOffset(): number | undefined {
    return this.state.offset;
  }

  getParam(key: string): any | undefined {
    return get(this.state.params, key);
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

  getSortByField(field: string): QuerySortBy | undefined {
    const sorts = this.getSortBy();
    if (sorts) {
      return sorts.find((sort) => sort.field === field);
    }
    return undefined;
  }

  protected _adapt(data: T | undefined): Item<T, M> {
    return toCollectionItem(data, this.state.adapter);
  }

  protected _addFilter(
    query: Query,
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId: QueryFilterId = rootFilterId,
  ): void {
    const filter = this._formatFilter(query.filter) || { id: rootFilterId, operator: 'and', criterias: [] };
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
    query.filter = filter;
  }

  protected _addSortBy(
    query: Query,
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._removeSortBy(query, field);
    const sortBy = this._formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(query, 'sortBy')) || [];
    if (prepend) {
      sortBy.unshift({ field, dir, comparator });
    } else {
      sortBy.push({ field, dir, comparator });
    }
    query.sortBy = sortBy;
  }

  protected _clearFields(query: Query): void {
    query.fields = undefined;
  }

  protected _clearFilter(query: Query): void {
    query.filter = undefined;
  }

  protected _clearOffset(query: Query): void {
    query.offset = undefined;
  }

  protected _clearParam(query: Query, key: string): void {
    if (query.params) {
      delete query.params[key];
    }
  }

  protected _clearParams(query: Query): void {
    query.params = undefined;
  }

  protected _clearSearch(query: Query): void {
    query.search = undefined;
  }

  @reducer
  protected _clearLimit(query: Query): void {
    query.limit = undefined;
  }

  @reducer
  protected _clearSortBy(query: Query): void {
    query.sortBy = undefined;
  }

  @reducer
  protected _clearSort(query: Query): void {
    query.sort = undefined;
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

  protected _removeFilter(query: Query, filterId: QueryFilterId): void {
    const filter = this._formatFilter(query.filter);
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
      query.filter = filter;
    }
  }

  protected _removeSortBy(query: Query, field: string): void {
    const sortBy = this._formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(query, 'sortBy'));
    if (sortBy) {
      query.sortBy = sortBy.filter((sort) => sort.field !== field);
    }
  }

  protected _setFields(query: Query, fields: string[]): void {
    query.fields = fields;
  }

  protected _setFilter(query: Query, filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    query.filter = this._formatFilter(filter);
  }

  protected _setLimit(query: Query, limit: number): void {
    query.limit = limit;
  }

  protected _setLimitOffset(query: Query, limit?: number, offset?: number): void {
    query.limit = limit;
    query.offset = offset;
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
    if (force || query.params) this.state.params = query.params;
  }

  protected _setOffset(query: Query, offset: number): void {
    query.offset = offset;
  }

  protected _setParams(query: Query, params: AnonymousObject): void {
    query.params = params;
  }

  protected _setSearch(query: Query, search: Primitive): void {
    query.search = search;
  }

  protected _setSort(query: Query, dir: QuerySortDir): void {
    query.sort = dir;
  }

  protected _setSortBy(query: Query, sortBy: string | QuerySortBy | QuerySortBy[]): void {
    query.sortBy = this._formatSortBy(sortBy);
  }
}
