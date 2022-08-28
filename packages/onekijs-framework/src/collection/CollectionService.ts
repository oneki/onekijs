import { Task } from '@redux-saga/types';
import { cancel, delay, fork } from 'redux-saga/effects';
import { reducer, saga } from '../core/annotations';
import DefaultBasicError from '../core/BasicError';
import DefaultService from '../core/Service';
import { asyncHttp } from '../core/xhr';
import LocalRouter from '../router/LocalRouter';
import { Primitive } from '../types/core';
import { Fetcher, HttpMethod } from '../types/fetch';
import { AnonymousObject } from '../types/object';
import { Location, UnregisterCallback } from '../types/router';
import { SagaEffect } from '../types/saga';
import { dispatch, types } from '../types/service';
import { clone, ensureFieldValue, get, isNull, set, toArray, toPayload } from '../utils/object';
import { urlBuilder } from '../utils/router';
import { generateUniqueId } from '../utils/string';
import {
  Collection,
  CollectionBy,
  CollectionFetcherResult,
  CollectionState,
  CollectionStatus,
  Item,
  LoadingItemStatus,
  LoadingStatus,
  LocalQuery,
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySerializerResult,
  QuerySortBy,
  QuerySortByField,
  QuerySortByMultiFields,
  QuerySortComparator,
  QuerySortDir,
} from './typings';
import {
  addFilter as aFilter,
  defaultComparator,
  defaultSerializer,
  formatFilter,
  formatSortBy,
  isQueryFilterCriteria,
  isQuerySortByField,
  isQuerySortByMultiFields,
  isSameQuery,
  isSameSortBy,
  parseQuery,
  rootFilterId,
  shouldResetData,
  urlSerializer,
  visitFilter,
} from './utils';

const defaultSearcher = 'i_like';

export default class CollectionService<
    T = any,
    I extends Item<T> = Item<T>,
    S extends CollectionState<T, I> = CollectionState<T, I>,
  >
  extends DefaultService<S>
  implements Collection<T, I, S>
{
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  protected initialState: S = null!;
  protected cache: AnonymousObject<any> = {};
  protected idIndex: AnonymousObject<I> = {};
  protected uidIndex: AnonymousObject<I> = {};
  protected positionIndex: AnonymousObject<string> = {};
  protected db?: I[];
  protected unregisterRouterListener?: UnregisterCallback;
  protected refreshing = false;

  init(): void {
    this.initialState = this.state;
    if (this.state.filter) {
      this.state.filter = formatFilter(this.state.filter);
    }
    if (!this.state.router) {
      this.state.router = new LocalRouter();
    }
    // listen on location change and adapt filters, sort, ... with these values
    this.unregisterRouterListener = this.state.router.listen((location: Location) => this._onLocationChange(location));
    // retrieve params from URL and initiate filter, sort ... with these values
    this._setQuery(this._parseLocation(this.state.router.location), false);

    this.initDb(this.state.dataSource);

    if (this.state.local === undefined) {
      this.state.local =
        this.state.dataSource === undefined || Array.isArray(this.state.dataSource) || this.state.fetchOnce === true;
    }

    if (this.state.local && this.state.dataSource !== undefined) {
      this.refresh();
    }
  }

  destroy(): void {
    if (this.unregisterRouterListener) {
      this.unregisterRouterListener();
    }
  }

  initDb(dataSource: T[] | string | undefined): void {
    if (Array.isArray(dataSource)) {
      this.state.status = LoadingStatus.Loaded;
      this.db = [];
      dataSource.map((entry, index) => this._adapt(entry, { position: index }));
    }
  }

  adapt(data: T | undefined): I {
    return this._adapt(data);
  }

  @reducer
  addActive<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    return this._addByMeta('active', by, target);
  }

  @reducer
  addDisabled<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    return this._addByMeta('disabled', by, target);
  }

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
  addHighlighted<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    return this._addByMeta('highlighted', by, target);
  }

  @reducer
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    return this._addByMeta('selected', by, target);
  }

  @reducer
  addSortBy(sortBy: QuerySortBy, prepend?: boolean): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._addSortBy(query, sortBy, prepend);
    this.refresh(query);
  }

  asService(): this {
    return this;
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

  get data(): T[] | undefined {
    const items = this.state.items;
    if (items !== undefined) {
      const result: T[] = items.reduce((accumulator, item) => {
        if (item?.data !== undefined) {
          accumulator.push(item.data);
        }
        return accumulator;
      }, [] as T[]);
      return result;
    }
    return undefined;
  }

  get dataSource(): T[] | string | undefined {
    return this.state.dataSource;
  }

  get hasMore(): boolean {
    return this.state.hasMore || false;
  }

  get items(): (I | undefined)[] {
    return this.state.items || [];
  }

  get index(): AnonymousObject<I> {
    return this.idIndex;
  }

  get status(): CollectionStatus {
    const defaultStatus = this.state.local ? LoadingStatus.Loaded : LoadingStatus.NotInitialized;
    return this.state.status || defaultStatus;
  }

  get total(): number | undefined {
    return this.state.local ? this.state.items?.length : this.state.total;
  }

  get url(): string {
    if (!this.state.local && !this.state.url) {
      throw new DefaultBasicError('URL is required for a remote collection');
    }
    return this.state.url || '';
  }

  getDb(): I[] {
    return this.db || [];
  }

  getFields(): string[] | undefined {
    return this.state.fields;
  }

  getFilter(): QueryFilter | undefined {
    return formatFilter(this.state.filter);
  }

  getFilterById(id: QueryFilterId): QueryFilterOrCriteria | undefined {
    let result: QueryFilter | QueryFilterCriteria | undefined = undefined;
    const filter = formatFilter(this.state.filter);
    if (filter !== undefined) {
      visitFilter(filter, (filter) => {
        if (filter.id === id) {
          result = filter;
          return true;
        }
        for (const filterOrCriteria of filter.criterias) {
          if (isQueryFilterCriteria(filterOrCriteria) && filterOrCriteria.id === id) {
            result = filterOrCriteria;
            return true;
          }
        }
        return false;
      });
    }
    return result;
  }

  getItem(uid: string): I | undefined {
    return this.uidIndex[uid];
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
    return formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(this.state, 'sortBy'));
  }

  getSortByField(field: string): QuerySortByField | undefined {
    const sorts = this.getSortBy();
    if (sorts) {
      for (const sort of sorts) {
        if (isQuerySortByField(sort)) {
          if (sort.field === field) {
            return sort;
          }
        } else if (isQuerySortByMultiFields(sort)) {
          const field: any = sort.fields.find((f) => (typeof f === 'string' ? f === field : f.name === field));
          return {
            id: sort.id,
            dir: sort.dir,
            comparator: typeof field === 'string' ? undefined : field.comparator,
            field: typeof field === 'string' ? field : field.name,
          } as QuerySortByField;
        }
      }
    }
    return undefined;
  }

  getSortById(id: string): QuerySortBy | undefined {
    const sorts = this.getSortBy();
    if (sorts) {
      return sorts.find((sort) => sort.id === id);
    }
    return undefined;
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
    this.refreshing = true;
    this.state.router.push(urlBuilder(path, {}, urlSerializer(query || this.getQuery())));
  }

  @reducer
  removeActive<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    return this._removeByMeta('active', by, target);
  }

  @reducer
  removeDisabled<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    return this._removeByMeta('disabled', by, target);
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._removeFilter(query, filterId);
    this.refresh(query);
  }

  @reducer
  removeHighlighted<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    return this._removeByMeta('highlighted', by, target);
  }

  @reducer
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    return this._removeByMeta('selected', by, target);
  }

  @reducer
  removeSortBy(id: string): void {
    const query = this.getQuery();
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._removeSortById(query, id);
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
    const query = Object.assign({}, this.getQuery());
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSearch(query, search);
    this.refresh(query);
  }

  serializeQuery(query: Query): QuerySerializerResult {
    const serializer = this.state.serializer || defaultSerializer;
    return serializer(query);
  }

  @reducer
  setActive<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    return this._setByMeta('active', by, target);
  }

  @reducer
  setData(data: T[]): void {
    if (!this.state.local) {
      throw new DefaultBasicError('Call to unsupported method setData of a remote collection');
    }
    this.cache = {};
    // this.idIndex = {};
    // this.uidIndex = {};
    this.positionIndex = {};
    this.state.items = undefined;
    const query = this.getQuery();
    this._clearOffset(query);
    this.initDb(data);
    this.refresh(query);
  }

  @reducer
  setDisabled<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    return this._setByMeta('disabled', by, target);
  }

  @reducer
  setFields(fields: string[]): void {
    const query = Object.assign({}, this.getQuery());
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setFields(query, fields);
    this.refresh(query);
  }

  @reducer
  setHighlighted<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    return this._setByMeta('highlighted', by, target);
  }

  @reducer
  setMeta<B extends keyof CollectionBy<T, I>, K extends keyof I>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
    key: K,
    value: I[K],
  ): I[] {
    let items: I[] = [];
    target = toArray(target);
    switch (by) {
      case 'id':
        items = target.map((t) => this.idIndex[String(t)]).filter((t) => t !== undefined);
        break;
      case 'uid':
        items = target.map((t) => this.uidIndex[String(t)]).filter((t) => t !== undefined);
        break;
      case 'item':
        items = target.map((t) => this.uidIndex[(t as I).uid]).filter((t) => t !== undefined);
        break;
      case 'value':
        items = target.map((t) => this.adapt(t as T));
        break;
    }
    const result: I[] = [];
    items.forEach((item) => {
      item = Object.assign({}, item, { [key]: value });
      this._indexItem(item);
      if (this.state.items) {
        const stateItem = this.state.items.find((stateItem) => stateItem && item.uid === stateItem.uid);
        if (stateItem) {
          stateItem[key] = value;
        }
      }
      result.push(item);
    });
    return result;
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any): void {
    const query = Object.assign({}, this.getQuery());
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setParam(query, key, value);
    this.refresh(query);
  }

  @reducer
  setParams(params: AnonymousObject): void {
    const query = Object.assign({}, this.getQuery());
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setParams(query, params);
    this.refresh(query);
  }

  @reducer
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    return this._setByMeta('selected', by, target);
  }

  @reducer
  setStatus(status: LoadingStatus): void {
    this.state.status = status;
  }

  @reducer
  sort(dir: QuerySortDir): void {
    const query = Object.assign({}, this.getQuery());
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSort(query, dir);
    this.refresh(query);
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    const query = Object.assign({}, this.getQuery());
    this._setLoading({ limit: this.state.limit, offset: 0 });
    this._setSortBy(query, sortBy);
    this.refresh(query);
  }

  protected _adapt(data: T | undefined, context?: AnonymousObject): I {
    const adaptee = this.state.adapter === undefined || data === undefined ? {} : this.state.adapter(data);

    const item: I = this._buildItem(data, adaptee, context);
    this._indexItem(item, context);
    return item;
  }

  protected _addByMeta<B extends keyof CollectionBy<T, I>>(
    field: 'active' | 'disabled' | 'highlighted' | 'selected',
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    const items = this.setMeta(by, target, field, true);
    const arr = this.state[field] || [];
    items.forEach((item) => {
      if (!arr.includes(item.uid)) {
        arr.push(item.uid);
      }
    });
    // this.state[field] = [...new Set((this.state[field] || []).concat(items.map((item) => item.uid)))];
    this.state[field] = arr;
    return items;
  }

  protected _addFilter(
    query: Query,
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId: QueryFilterId = rootFilterId,
  ): void {
    return aFilter(query, filterOrCriteria, parentFilterId);
  }

  protected _addSortBy(query: Query, sortBy: QuerySortBy, prepend = true): void {
    this._removeSortBy(query, sortBy);
    const currentSortBy = (formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(query, 'sortBy')) || []).slice(0);
    if (prepend) {
      currentSortBy.unshift(sortBy);
    } else {
      currentSortBy.push(sortBy);
    }
    query.sortBy = currentSortBy;
  }

  protected _applyCriteria(item: I, criteria: QueryFilterCriteria): boolean {
    const operator = criteria.operator || 'eq';
    const value = criteria.value;
    const source = get(item.data, criteria.field);
    const not = criteria.not;
    const result = this._applyOperator(operator, source, value);
    return not ? !result : result;
  }

  protected _applyFields(items: I[], fields?: string[]): I[] {
    if (fields && fields.length > 0) {
      return items.map((item) => {
        const { data, ...nextItem } = item;
        if (data) {
          return fields.reduce((accumulator, field) => {
            accumulator.data = accumulator.data || {};
            accumulator.data[field] = (item as any).data[field];
            return accumulator;
          }, nextItem as any) as I;
        }
        return item;
      });
    }
    return items;
  }

  protected _applyFilter(item: I, filter?: QueryFilter): boolean {
    let result = true;

    if (filter) {
      const operator = filter.operator || 'and';
      for (const filterOrCriteria of filter.criterias) {
        if (isQueryFilterCriteria(filterOrCriteria)) {
          result = this._applyCriteria(item, filterOrCriteria);
        } else {
          result = this._applyFilter(item, filterOrCriteria);
        }

        if (!result && operator === 'and') return false;
        if (result && operator === 'or') return true;
      }
    }
    return result;
  }

  protected _applyOperator(
    operator: QueryFilterCriteriaOperator,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    left: any,
    right?: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
  ): boolean {
    switch (operator) {
      case 'ends_with':
        return String(left).endsWith(String(right));
      case 'i_ends_with':
        return String(left).toUpperCase().endsWith(String(right).toUpperCase());
      case 'like':
        return String(left).includes(String(right));
      case 'i_like':
        return String(left).toUpperCase().includes(String(right).toUpperCase());
      case 'starts_with':
        return String(left).startsWith(String(right));
      case 'i_starts_with':
        return String(left).toUpperCase().startsWith(String(right).toUpperCase());
      case 'eq':
        return String(left).startsWith(String(right));
      case 'i_eq':
        return String(left).toUpperCase().startsWith(String(right).toUpperCase());
      case 'regex':
        return new RegExp(String(right)).test(String(left));
      case 'i_regex':
        return new RegExp(String(right), 'i').test(String(left));
      default:
        return true;
    }
  }

  protected _applySearch(item: I, search?: QueryFilterCriteriaValue): boolean {
    const searcher = this.state.searcher || defaultSearcher;
    if (item.data === undefined) {
      return false;
    }
    if (typeof searcher === 'function') {
      return searcher(item.data, search);
    }
    return this._applyOperator(searcher, item.text, search);
  }

  protected _applySort(items: I[], dir: QuerySortDir, comparator: QuerySortComparator): I[] {
    if (dir) {
      const itemComparator = function (a: I, b: I): number {
        const reverse = dir === 'desc' ? -1 : 1;
        return reverse * comparator(a.data, b.data);
      };

      items = items.sort(itemComparator);
    }
    return items;
  }

  protected _applySortBy(items: I[], sortBy: QuerySortBy[], comparators: AnonymousObject<QuerySortComparator>): I[] {
    if (sortBy.length > 0) {
      const comparator = function () {
        return function (a: I, b: I): number {
          let result = 0;
          sort_loop: for (const sort of sortBy) {
            let s: QuerySortByMultiFields | undefined;
            if (isQuerySortByField(sort)) {
              s = {
                id: sort.id,
                fields: [
                  {
                    name: sort.field,
                    comparator: sort.comparator,
                  },
                ],
                dir: sort.dir,
              };
            } else if (isQuerySortByMultiFields(sort)) {
              s = sort;
            }

            if (s) {
              for (const field of s.fields) {
                const fieldName = typeof field === 'string' ? field : field.name;
                const comparator =
                  typeof field === 'string' || !field.comparator
                    ? defaultComparator
                    : comparators[field.comparator] || defaultComparator;
                const reverse = s.dir === 'desc' ? -1 : 1;

                result = reverse * comparator(get(a.data, fieldName), get(b.data, fieldName));
                if (result !== 0) break sort_loop;
              }
            }
          }
          return result;
        };
      };
      items = items.sort(comparator());
    }
    return items;
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

  protected _execute(
    items: I[],
    query: LocalQuery,
    comparator: QuerySortComparator,
    comparators: AnonymousObject<QuerySortComparator>,
  ): I[] {
    // apply filters to data
    let result = items;
    if (query.filter) {
      result = items.filter((item) => this._applyFilter(item, formatFilter(query.filter)));
    } else if (query.search) {
      result = items.filter((item) => this._applySearch(item, query.search));
    } else {
      result = Object.assign([], items);
    }

    // apply sort
    if (query.sortBy) {
      result = this._applySortBy(result, formatSortBy(query.sortBy) || [], comparators);
    } else if (query.sort) {
      result = this._applySort(result, query.sort || 'asc', comparator);
    }

    // apply field subset
    if (query.fields && query.fields.length > 0) {
      result = this._applyFields(result, query.fields);
    }
    return result;
  }

  @saga(SagaEffect.Throttle, 'state.throttle', 1)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected *_fetch(query: Query, resetData: boolean) {
    let loadingTask: Task | null = null;
    const options = this.state.fetchOptions || {};
    const { onSuccess, onError } = options;

    try {
      const oQuery = this.serializeQuery(query);
      const sQuery = Object.keys(oQuery)
        .map((k) => `${k}=${oQuery[k]}`)
        .join('&');
      let result: CollectionFetcherResult<T>;
      if (this.cache[sQuery]) {
        result = this.cache[sQuery];
      } else {
        if (options.delayLoading) {
          loadingTask = yield fork(
            [this, this._delayLoading],
            options.delayLoading,
            query.limit,
            query.offset,
            resetData,
          );
        }
        const fetcher: Fetcher<CollectionFetcherResult<T>, T | Query | undefined> = options.fetcher || asyncHttp;
        const method = this.state.method ?? HttpMethod.Get;
        const body = this.state.method === HttpMethod.Get ? undefined : Object.assign({}, query);

        const fetchOptions = method === HttpMethod.Get ? Object.assign({}, options, { query: oQuery }) : options;
        result = yield fetcher(this.url, method, body, fetchOptions);

        this.cache[sQuery] = result;
        if (loadingTask !== null) {
          yield cancel(loadingTask);
        }
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
      yield this._fetchError(e, query);

      if (onError) {
        yield onError(DefaultBasicError.of(e));
      } else {
        throw e;
      }
    }
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _fetchError(e: any, query: Query): void {
    this.state.error = e;
    this._setLoading({
      resetLimit: false,
      resetData: false,
      limit: query.limit,
      offset: query.offset,
      status: LoadingStatus.Error,
    });
    this.state.status = LoadingStatus.Error;
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
      if (!limit || result.length < limit) {
        hasMore = false;
      }
    } else {
      if (!limit) {
        hasMore = false;
      } else if (result[this.state.hasMoreKey] === true) {
        hasMore = true;
      } else if (Object.keys(result).includes(this.state.totalKey)) {
        hasMore = total > limit + offset;
      } else {
        hasMore = data.length >= limit;
      }
    }

    // check if current query is still equals to the query used for fetching
    let same = isSameQuery(query, currentQuery);

    this.state.error = undefined;
    this.state.total = undefined;

    if (same) {
      // we have marked old items as loading. We need to mark them as loaded (even if they are no more in the list)
      this._setLoading({
        resetLimit: false,
        resetData,
        limit: query.limit,
        offset: query.offset,
        status: LoadingStatus.Loaded,
      });
      // update metadata
      const itemResult: I[] = data.map((itemData) => {
        const item = this.adapt(itemData);
        item.loadingStatus = LoadingStatus.Loaded;
        return Object.assign({}, item);
      });

      let items = resetData ? [] : this.state.items;

      if (limit) {
        items = items || Array(limit + offset);
        items
          .slice(offset, offset + limit)
          .filter((item) => item && item.id === undefined)
          .forEach(
            (item) =>
              item &&
              this.uidIndex[item.uid] &&
              this.uidIndex[item.uid].id === undefined &&
              delete this.uidIndex[item.uid],
          );
        items.splice(offset, limit, ...itemResult.slice(0, limit));

        this._setItems(items);
        if (data.length < limit) {
          this.state.total = this.state.items?.length;
        }
      } else {
        if (items) {
          items
            .filter((item) => item && item.id === undefined)
            .forEach(
              (item) =>
                item &&
                this.uidIndex[item.uid] &&
                this.uidIndex[item.uid].id === undefined &&
                delete this.uidIndex[item.uid],
            );
        }

        this._setItems(itemResult);
        this.state.total = this.state.items?.length;
      }
      this.state.hasMore = hasMore;
      if (!hasMore) {
        this.state.total = this.state.items?.length;
      }
      if (total !== undefined) {
        this.state.total = total;
      }
    }

    same = same && query.limit === currentQuery.limit && query.offset === currentQuery.offset;

    if (same && resetData) {
      this.state.status = hasMore ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
    } else {
      // need to calculate the status as we cannot be sure that there is not another running request
      if (Object.values(this.uidIndex).find((item) => item.loadingStatus === LoadingStatus.Loading)) {
        this.state.status = LoadingStatus.PartialLoading;
      } else if (Object.values(this.uidIndex).find((item) => item.loadingStatus === LoadingStatus.Fetching)) {
        this.state.status = LoadingStatus.PartialFetching;
      } else {
        this.state.status = hasMore ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
      }
    }
  }

  protected _buildItem(data: T | undefined, adaptee: unknown, _context?: { position?: number }): I {
    const result = adaptee as I;

    const getId = (data: any): string | number | undefined => {
      if (isNull(data)) {
        return _context?.position;
      }
      if (!isNull(data.id)) {
        return data.id;
      } else {
        return _context?.position;
      }
    };
    const getText = (data: any): string | undefined => {
      if (isNull(data)) {
        return undefined;
      }
      if (typeof data === 'string') {
        return data as string;
      } else if (!isNull(data.text)) {
        return String(data.text);
      } else {
        return undefined;
      }
    };

    ensureFieldValue(result, 'id', getId(data));
    ensureFieldValue(result, 'text', getText(data));

    const currentItem = this.idIndex[String(result.id)];

    if (currentItem !== undefined) {
      return Object.assign({}, currentItem, { data }, result);
    } else {
      const uid = generateUniqueId();
      return Object.assign(
        {
          data,
          uid,
          loadingStatus: data !== undefined ? LoadingStatus.Loaded : LoadingStatus.NotInitialized,
        },
        result,
      );
    }
  }

  protected _getId(data: T): string | number | undefined {
    return this.adapt(data).id;
  }

  protected _indexDb(item: I, _context?: AnonymousObject): void {
    if (this.positionIndex[item.uid] !== undefined && this.db) {
      set(this.db, this.positionIndex[item.uid], item);
    }
  }

  protected _indexId(item: I, _context?: AnonymousObject): void {
    if (item.id !== undefined) {
      this.idIndex[item.id] = item;
    }
  }

  protected _indexItem(item: I, context?: AnonymousObject): void {
    this._indexUid(item, context);
    this._indexId(item, context);
    this._indexPosition(item, context);
    this._indexDb(item, context);
  }

  protected _indexPosition(item: I, context?: AnonymousObject): void {
    if (context?.position !== undefined) {
      this.positionIndex[item.uid] = `${context.position}`;
    }
  }

  protected _indexUid(item: I, _context?: AnonymousObject): void {
    this.uidIndex[item.uid] = item;
  }

  @reducer
  protected _onLocationChange(location: Location): void {
    if (!this.refreshing) return;
    this.refreshing = false;
    const nextQuery = this._parseLocation(location);
    if (this.state.local) {
      this._setQuery(nextQuery);
      if (location.relativeurl && this.cache[location.relativeurl]) {
        this._setItems(this.cache[location.relativeurl]);
      } else {
        const queryEngine = this.state.queryEngine || this._execute.bind(this);
        this._setItems(
          queryEngine(
            this.db || [],
            nextQuery,
            this.state.comparator || defaultComparator,
            this.state.comparators || {},
          ),
        );
        if (location.relativeurl) {
          const keys = Object.keys(this.cache);
          if (keys.length > 100) {
            delete this.cache[keys[0]];
          }
          this.cache[location.relativeurl] = this.state.items;
        }
      }
    } else {
      const resetData = this.state.items ? shouldResetData(this.getQuery(), nextQuery) : false;
      if (resetData) {
        this._clearOffset(nextQuery);
      }
      this._setQuery(nextQuery);
      this[dispatch]({
        type: this[types]._fetch.actionType,
        payload: toPayload([nextQuery, resetData]),
      });
    }
  }

  protected _parseLocation(location: Location): Query {
    return parseQuery(location.query || {});
  }

  @reducer
  protected _removeByMeta<B extends keyof CollectionBy<T, I>>(
    field: 'active' | 'disabled' | 'highlighted' | 'selected',
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    const items = this.setMeta(by, target, field, false);
    const removeUids = items.map((item) => item.uid);
    this.state[field] = (this.state[field] || []).filter((s) => !removeUids.includes(s));
    return items;
  }

  protected _removeFilter(query: Query, filterId: QueryFilterId): void {
    const filter = clone(formatFilter(query.filter));
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

  protected _removeSortBy(query: Query, sort: QuerySortBy): void {
    const sortBy = formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(query, 'sortBy'));
    if (sortBy) {
      query.sortBy = sortBy.filter((s) => !isSameSortBy(sort, s));
    }
  }

  protected _removeSortById(query: Query, id: string): void {
    const sortBy = formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(query, 'sortBy'));
    if (sortBy) {
      query.sortBy = sortBy.filter((sort) => sort.id !== id);
    }
  }

  protected _setByMeta<B extends keyof CollectionBy<T, I>>(
    field: 'active' | 'disabled' | 'highlighted' | 'selected',
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    const current = this.state[field] || [];
    this.setMeta('uid', current, field, false);
    const items = this.setMeta(by, target, field, true);
    this.state[field] = items.map((item) => item.uid);
    return items;
  }

  protected _setFields(query: Query, fields: string[]): void {
    query.fields = fields;
  }

  protected _setFilter(query: Query, filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    query.filter = formatFilter(filter);
  }

  protected _setItems(items: (I | undefined)[]): void {
    this.state.items = items;
  }

  protected _setLimit(query: Query, limit: number): void {
    query.limit = limit;
  }

  protected _setLimitOffset(query: Query, limit?: number, offset?: number): void {
    query.limit = limit;
    query.offset = offset;
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
    if (this.state.local) {
      this.state.limit = options.limit;
      this.state.offset = options.offset;
    } else {
      const resetData = options.resetData ?? true;
      const resetLimit = options.resetLimit ?? true;

      if (options.status === undefined) {
        options.status =
          this.state.fetchOptions?.delayLoading !== undefined && this.state.fetchOptions?.delayLoading > 0
            ? LoadingStatus.Fetching
            : LoadingStatus.Loading;
      }

      const setItemStatus = (item: I | undefined, status: LoadingItemStatus): I => {
        if (item === undefined) {
          item = this.adapt(undefined);
        }
        item.loadingStatus = status;
        const result = Object.assign({}, item);
        this._indexItem(result);
        return result;
      };

      if (resetLimit) {
        this.state.limit = options.limit;
        this.state.offset = options.offset;
      }

      const offset = options.offset || 0;
      if (this.state.items) {
        if (options.limit && !resetData) {
          for (let i = offset; i < options.limit + offset; i++) {
            this.state.items[i] = setItemStatus(this.state.items[i], options.status);
          }
          this.state.status = `${resetData ? '' : 'partial_'}${options.status}` as CollectionStatus;
        } else {
          for (const i in this.state.items) {
            this.state.items[i] = setItemStatus(this.state.items[i], options.status);
          }
          this.state.status = options.status;
        }
      } else {
        if (options.limit) {
          this.state.items = Array(offset + options.limit);
          for (let i = offset; i < offset + options.limit; i++) {
            this.state.items[i] = setItemStatus(this.state.items[i], options.status);
          }
          this.state.status = `${resetData ? '' : 'partial_'}${options.status}` as CollectionStatus;
        } else {
          // no items yet, so we are sure that the collection is either full loading of full fetching
          this.state.status = options.status;
        }
      }
    }
  }

  @reducer
  protected _setQuery(query: Query, force = true): void {
    const nextFilter = formatFilter(query.filter);
    if (force || nextFilter) this.state.filter = nextFilter;
    const nextSortBy = formatSortBy(query.sortBy);
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _setParam(query: Query, key: string, value: any): void {
    if (!query.params) {
      query.params = {};
    }
    query.params[key] = value;
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
    query.sortBy = formatSortBy(sortBy);
  }
}
