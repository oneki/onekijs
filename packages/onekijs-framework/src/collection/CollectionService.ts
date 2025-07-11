import { Task } from '@redux-saga/types';
import { cancel, delay, fork } from 'redux-saga/effects';
import DefaultBasicError from '../core/BasicError';
import DefaultService from '../core/Service';
import { reducer, saga } from '../core/annotations';
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
  QuerySearcher,
  QuerySerializerResult,
  QuerySortBy,
  QuerySortByField,
  QuerySortComparator,
  QuerySortDir,
} from './typings';
import {
  addFilter as aFilter,
  defaultComparator,
  defaultQueryEngine,
  defaultSerializer,
  formatFilter,
  formatSortBy,
  getDefaultCollectionStatus,
  isCollectionReady,
  isQueryFilterCriteria,
  isQuerySortByField,
  isQuerySortByMultiFields,
  isSameQuery,
  isSameSortBy,
  parseQuery,
  rootFilterId,
  shouldResetData,
  toQuerySortBy,
  urlSerializer,
  visitFilter,
} from './utils';

export default class CollectionService<
    T = any,
    I extends Item<T> = Item<T>,
    S extends CollectionState<T, I> = CollectionState<T, I>,
  >
  extends DefaultService<S>
  implements Collection<T, I, S>
{
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  _initialState: S = null!;
  _cache: AnonymousObject<any> = {};
  _idIndex: AnonymousObject<I> = {};
  _uidIndex: AnonymousObject<I> = {};
  _positionIndex: AnonymousObject<string> = {};
  _db?: I[];
  _unregisterRouterListener?: UnregisterCallback;
  _currentQuery?: string;
  _initialQuery?: Query;
  _refreshing?: boolean;
  _noCache?: boolean;
  _noLoading?: boolean;
  _resetData = false;
  protected refreshTask?: Task;
  protected followTask?: Task;
  scrollToIndex?: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  scrollToOffset?: (offsetInPixels: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;

  init(): void {
    this._initialState = this.state;
    this.state.status = this.state.autoload ? LoadingStatus.NotInitialized : LoadingStatus.NotReady;

    if (this.state.filter) {
      this.state.filter = formatFilter(this.state.filter);
    }
    if (this.state.sortBy) {
      this.state.sortBy = toQuerySortBy(this.state.sortBy);
    }

    if (!this.state.router) {
      this.state.router = new LocalRouter();
    }
    // listen on location change and adapt filters, sort, ... with these values
    this._unregisterRouterListener = this.state.router.listen((location: Location) => this._onLocationChange(location));
    // retrieve params from URL and initiate filter, sort ... with these values
    this._setQuery(this._parseLocation(this.state.router.location), false);

    this.initDb(this.state.dataSource);

    if (this.state.local === undefined) {
      this.state.local =
        this.state.dataSource === undefined || Array.isArray(this.state.dataSource);
    }

    if (this.state.local && this.state.dataSource !== undefined) {
      this.refresh();
    }

    this._initialQuery = this.getQuery();
  }

  destroy(): void {
    if (this._unregisterRouterListener) {
      this._unregisterRouterListener();
    }
  }

  initDb(dataSource: T[] | string | undefined): void {
    if (Array.isArray(dataSource)) {
      this.state.status = LoadingStatus.Loaded;
      this._db = [];
      dataSource.map((entry, index) => this._adapt(entry, { position: index }));
    }
  }

  adapt(data: T | null | undefined): I {
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._addSortBy(query, sortBy, prepend);
    this.refresh(query);
  }

  asService(): this {
    return this;
  }

  @reducer
  clearFields(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearFields(query);
    this.refresh(query);
  }

  @reducer
  clearFilter(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearFilter(query);
    this.refresh(query);
  }

  @reducer
  clearLimit(): void {
    this._setLoading({ offset: this.state.offset, resetData: false });
    const query = this.getQuery();
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearParam(query, key);
    this.refresh(query);
  }

  @reducer
  clearParams(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearParams(query);
    this.refresh(query);
  }

  @reducer
  clearSearch(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearSearch(query);
    this.refresh(query);
  }

  @reducer
  clearSort(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearSort(query);
    this.refresh(query);
  }

  @reducer
  clearSortBy(): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._clearSortBy(query);
    this.refresh(query);
  }

  @reducer
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
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
    return this._idIndex;
  }

  get status(): CollectionStatus {
    const defaultStatus = getDefaultCollectionStatus(
      this._db || this.state.url,
      this.state.brokerable,
      this.state.brokered,
      this.state.fetchOnce,
    );
    return this.state.status || defaultStatus;
  }

  get total(): number | undefined {
    return this.state.local ? this.state.items?.length : this.state.total;
  }

  get url(): string {
    return this.state.url || '';
  }

  getDb(): I[] {
    return this._db || [];
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
    return this._uidIndex[uid];
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

  getSortBy(): QuerySortBy[] {
    let currentSortBy = get<any>(this.state, 'sortBy');
    if (currentSortBy === undefined) {
      currentSortBy = [];
    } else if (typeof currentSortBy === 'string') {
      currentSortBy = [{field: currentSortBy}];
    } else if (!Array.isArray(currentSortBy)) {
      currentSortBy = [currentSortBy]
    }
    return currentSortBy;
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

  isFiltered(): boolean {
    return this._isFiltered(this.getQuery());
  }

  /**
   * When the collection is a remote collection and the autoload feature was not activated,
   * an external controller can decide when the collection become active by calling the initialLoad
   */
  @reducer
  initialLoad(): void {
    if (!this.state.local && (this.state.status === LoadingStatus.NotReady || this.state.status === LoadingStatus.NotInitialized)) {
      this.state.status = LoadingStatus.NotInitialized;
      if (this.state.fetchOnce) {
        this.state.local = true;
        this.callSaga('_fetchOnce');
      } else {
        this.load();
      }
    }
  }

  @reducer
  load(limit?: number, offset?: number, replace = false): void {
    limit = limit ?? this.getLimit();
    offset = offset ?? this.getOffset();
    if (!this.state.local) {
      const resetData = this.state.items ? false : true;
      this._setLoading({ limit, offset, resetData });
      this.refresh(undefined, !replace);
    }
  }

  @reducer
  onSubscribe(initialData: T[] | undefined, initialUrl: string | undefined, initialQuery: Query): void {
    this.state.brokered = true;
    if (Array.isArray(initialData)) {
      this.setData(initialData, initialQuery);
    } else if (initialUrl !== undefined) {
      this.setUrl(initialUrl, initialQuery);
    } else {
      this.query(initialQuery);
    }
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
  reload(): void {
    const query = Object.assign(this.getQuery(), {
      limit: this._initialQuery?.limit,
      offset: 0,
    });
    this.state.items = undefined;
    this.state.status = LoadingStatus.NotInitialized;
    this._setLoading({ limit: query.limit, offset: query.offset, resetData: true });
    this.refresh(query, false, true, false);
  }

  @reducer
  refresh(query?: Query, push?: boolean, noCache?: boolean, noLoading?: boolean): void {
    push = push ?? (query ? true : false);
    noCache = noCache ?? this._noCache ?? (query ? false : true);
    noLoading = noLoading ?? this._noLoading ?? false;
    if (query) {
      this._setQuery(query);
    } else {
      query = this.getQuery();
    }
    if (isCollectionReady(this)) {
      const path = this.state.router.location.pathname;
      if (noCache) {
        this._setParam(query, 'noCache', true);
      } else {
        this._clearParam(query, 'noCache');
      }

      if (noLoading) {
        this._setParam(query, 'noLoading', true);
      } else {
        this._clearParam(query, 'noLoading');
      }
      const method = push ? 'push' : 'replace';
      this._refreshing = true;

      this.state.router[method](urlBuilder(path, {}, urlSerializer(query)));
    }
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = this.getQuery();
    this._removeSortById(query, id);
    this.refresh(query);
  }

  @reducer
  reset(): void {
    this.state = this._initialState;
    this._setLoading({ limit: this.state.limit, offset: this.state.offset });
    this.refresh();
  }

  @reducer
  search(search: Primitive): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = Object.assign({}, this.getQuery());
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
  setData(data: T[], query?: Query): void {
    if (!this.state.local) {
      throw new DefaultBasicError('Call to unsupported method setData of a remote collection');
    }
    this._cache = {};
    // this.idIndex = {};
    // this.uidIndex = {};
    this._positionIndex = {};
    this.state.items = undefined;
    if (query === undefined) {
      query = this.getQuery();
    }
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = Object.assign({}, this.getQuery());
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
        items = target.map((t) => this._idIndex[String(t)]).filter((t) => t !== undefined);
        break;
      case 'uid':
        items = target.map((t) => this._uidIndex[String(t)]).filter((t) => t !== undefined);
        break;
      case 'item':
        items = target.map((t) => this._uidIndex[(t as I).uid]).filter((t) => t !== undefined);
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
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = Object.assign({}, this.getQuery());
    this._setParam(query, key, value);
    this.refresh(query);
  }

  @reducer
  setParams(params: AnonymousObject): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = Object.assign({}, this.getQuery());
    this._setParams(query, params);
    this.refresh(query);
  }

  @reducer
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    const result = this._setByMeta('selected', by, target);
    return result;
  }

  @reducer
  setStatus(status: LoadingStatus): void {
    this.state.status = status;
  }

  @reducer
  setUrl(url: string, query?: Query) {
    this._cache = {};
    this.state.dataSource = url;
    this.state.url = url;
    this.state.items = undefined;
    this.state.local = false;

    if (query === undefined) {
      query = this.getQuery();
    } else {
      this._setQuery(query);
    }

    if (this.status !== LoadingStatus.NotReady) {
      this.state.status = LoadingStatus.NotInitialized;
      if (this.state.fetchOnce) {
        this.state.local = true;
        this.callSaga('_fetchOnce');
      } else {
        const nextQuery = clone(query);
        this._clearOffset(nextQuery);
        this[dispatch]({
          type: this[types]._fetch.actionType,
          payload: toPayload([nextQuery, true]),
        });
      }
    }
  }

  @reducer
  sort(dir: QuerySortDir): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = Object.assign({}, this.getQuery());
    this._setSort(query, dir);
    this.refresh(query);
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setLoading({ limit: this.state.limit, offset: 0 });
    const query = Object.assign({}, this.getQuery());
    this._setSortBy(query, sortBy);
    this.refresh(query);
  }

  @saga(SagaEffect.Leading)
  *startAutoRefresh(interval: number) {
    yield this.stopAutoRefresh();
    this.refreshTask = yield fork([this, this._autoRefresh], interval);
  }

  @saga(SagaEffect.Leading)
  *startFollow(interval: number) {
    yield this._disableDelayLoading();
    yield this.stopFollow();
    this._noCache = true;
    this._noLoading = true;
    this.followTask = yield fork([this, this._follow], interval);
  }

  @saga(SagaEffect.Leading)
  *stopAutoRefresh() {
    if (this.refreshTask) {
      yield this.refreshTask.cancel();
      this.refreshTask = undefined;
    }
  }

  @saga(SagaEffect.Leading)
  *stopFollow() {
    if (this.followTask) {
      this._noCache = undefined;
      this._noLoading = undefined;
      yield this.followTask.cancel();
      this.followTask = undefined;
    }
  }

  _adapt(data: T | null | undefined, context?: AnonymousObject): I {
    const adaptee =
      this.state.adapter === undefined || data === undefined || data === null ? {} : this.state.adapter(data);

    const item: I = this._buildItem(data, adaptee, context);
    if (context === undefined || !context.doNotIndex) {
      this._indexItem(item, context);
    }
    return item;
  }

  _addByMeta<B extends keyof CollectionBy<T, I>>(
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

  _addFilter(
    query: Query,
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId: QueryFilterId = rootFilterId,
  ): void {
    return aFilter(query, filterOrCriteria, parentFilterId);
  }

  _addSortBy(query: Query, sortBy: QuerySortBy, prepend = true): void {
    this._removeSortBy(query, sortBy);
    const currentSortBy = (formatSortBy(get(query, 'sortBy'), get<any>(this.state, 'sortBy')) || []).slice(0);
    if (prepend) {
      currentSortBy.unshift(sortBy);
    } else {
      currentSortBy.push(sortBy);
    }
    query.sortBy = currentSortBy;
  }

  @saga(SagaEffect.Leading)
  protected *_autoRefresh(interval: number) {
    while (true) {
      yield delay(interval);
      yield this.refresh(undefined, false, true, true);
    }
  }

  _clearFields(query: Query): void {
    query.fields = undefined;
  }

  _clearFilter(query: Query): void {
    query.filter = undefined;
  }

  _clearOffset(query: Query): void {
    query.offset = undefined;
  }

  _clearParam(query: Query, key: string): void {
    if (query.params) {
      delete query.params[key];
    }
  }

  _clearParams(query: Query): void {
    query.params = undefined;
  }

  _clearSearch(query: Query): void {
    query.search = undefined;
  }

  @reducer
  _clearLimit(query: Query): void {
    query.limit = undefined;
  }

  @reducer
  _clearSortBy(query: Query): void {
    query.sortBy = undefined;
  }

  @reducer
  _clearSort(query: Query): void {
    query.sort = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *_delayLoading(delay_ms: number, limit?: number | string, offset?: number | string, resetData?: boolean) {
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

  @reducer
  _disableDelayLoading(): void {
    if (this.state.fetchOptions?.delayLoading) {
      this.state.fetchOptions.delayLoading = 0;
    }
  }

  @saga(SagaEffect.Latest)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *_fetchOnce() {
    if (typeof this.state.dataSource === 'string' && this.state.fetchOnce && this.status !== LoadingStatus.NotReady) {
      try {
        let result: CollectionFetcherResult<T> = [];
        if (this.status !== LoadingStatus.Loaded) {
          yield this.setStatus(LoadingStatus.Loading);
          result = yield this._executeFetch(
            Object.assign({}, this._initialQuery, { limit: undefined, offset: undefined }),
            this.state.fetchOptions,
            false,
          );
        }

        // check if the select was not converted to a local datasource during the fetch
        if (this.status !== LoadingStatus.Loaded) {
          yield this.setStatus(LoadingStatus.Loaded);
          if (Array.isArray(result)) {
            yield this.setData(result);
          } else {
            yield this.setData(result[this.state.dataKey]);
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Fetch error', e);
        }
        if (this.state.fetchOptions?.onFetchError) {
          yield this.state.fetchOptions.onFetchError(DefaultBasicError.of(e));
        } else {
          throw e;
        }
      }
    }
  }

  @saga(SagaEffect.Throttle, 'state.throttle', 1)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *_fetch(query: Query, resetData: boolean) {
    const options = this.state.fetchOptions || {};
    const { onFetchError } = options;

    try {
      const result: CollectionFetcherResult<T> = yield this._executeFetch(query, options, resetData);
      yield this._fetchSuccess(result, resetData, query); // to update the store and trigger a re-render.
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      yield this._fetchError(e, query);

      if (onFetchError) {
        yield onFetchError(DefaultBasicError.of(e));
      } else {
        throw e;
      }
    }
  }

  @saga(SagaEffect.Leading)
  protected *_follow(interval: number) {
    while (true) {
      yield delay(interval);
      const query = this.getQuery();
      query.offset = this.state.total || 0;
      yield this.refresh(query, false, true, true);
    }
  }

  *_executeFetch(query: Query, options: S['fetchOptions'] = {}, resetData: boolean) {
    if (!this.url) {
      return [];
    }
    let loadingTask: Task | null = null;
    try {
      const noCache = get(query, 'params.noCache', false);
      const noLoading = get(query, 'params.noLoading', false);
      const oQuery = this.serializeQuery(query);
      const sQuery = Object.keys(oQuery)
        .map((k) => `${k}=${oQuery[k]}`)
        .join('&');
      let result: CollectionFetcherResult<T>;
      if (this._cache[sQuery] && !noCache) {
        result = this._cache[sQuery];
      } else {
        if (options.delayLoading && !noLoading) {
          loadingTask = yield fork(
            [this, this._delayLoading],
            options.delayLoading,
            query.limit,
            query.offset,
            resetData,
          );
        }
        const fetcher: Fetcher<CollectionFetcherResult<T>> = options.fetcher || asyncHttp;
        const method = this.state.method ?? HttpMethod.Get;
        const body = this.state.method === HttpMethod.Get ? undefined : Object.assign({}, query);

        const fetchOptions = method === HttpMethod.Get ? Object.assign({}, options, { query: oQuery }) : options;
        result = yield fetcher(this.url, method, body, fetchOptions);

        if (this.state.fetchOptions?.onFetchSuccess) {
          const formattedResult: CollectionFetcherResult<T> | undefined = yield this.state.fetchOptions.onFetchSuccess(
            result,
          );
          if (formattedResult !== undefined) {
            result = formattedResult;
          }
        }

        this._cache[sQuery] = result;
        if (loadingTask !== null) {
          yield cancel(loadingTask);
        }
      }
      return result;
    } catch (e) {
      if (loadingTask !== null) {
        yield cancel(loadingTask);
      }
      throw e;
    }
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _fetchError(e: any, query: Query): void {
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
  _fetchSuccess(result: CollectionFetcherResult<T>, resetData: boolean, query: Query): void {
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
    const q1 = Object.assign({}, query);
    const q2 = Object.assign({}, currentQuery);
    delete q1.limit;
    delete q1.offset;
    delete q2.limit;
    delete q2.offset;
    let same = isSameQuery(q1, q2);
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
      let itemResult: I[] = data.map((itemData) => {
        const item = this.adapt(itemData);
        item.loadingStatus = LoadingStatus.Loaded;
        return Object.assign({}, item);
      });

      if (this.state.onQuerySuccess) {
        itemResult = this.state.onQuerySuccess(itemResult);
      }

      let items = resetData ? [] : this.state.items;

      if (limit) {
        items = items || Array(limit + offset);
        items
          .slice(offset, offset + limit)
          .filter((item) => item && item.id === undefined)
          .forEach(
            (item) =>
              item &&
              this._uidIndex[item.uid] &&
              this._uidIndex[item.uid].id === undefined &&
              delete this._uidIndex[item.uid],
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
                this._uidIndex[item.uid] &&
                this._uidIndex[item.uid].id === undefined &&
                delete this._uidIndex[item.uid],
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

    if (same && resetData && hasMore) {
      this.state.status = LoadingStatus.PartialLoaded;
    } else if (same && resetData) {
      this.state.status = LoadingStatus.Loaded;
    } else {
      const values = Object.values(this._uidIndex);
      // need to calculate the status as we cannot be sure that there is not another running request
      if (values.find((item) => item.loadingStatus === LoadingStatus.Loading)) {
        this.state.status = LoadingStatus.PartialLoading;
      } else if (values.find((item) => item.loadingStatus === LoadingStatus.Fetching)) {
        this.state.status = LoadingStatus.PartialFetching;
      } else if (hasMore || Object.values(this.state.items || []).length !== (this.state.items || []).length) {
        this.state.status = LoadingStatus.PartialLoaded;
      } else {
        const undef = Object.values(this._uidIndex).find((item) => item === undefined);
        this.state.status = undef ? LoadingStatus.PartialLoaded : LoadingStatus.Loaded;
      }
    }
  }

  _buildItem(data: T | null | undefined, adaptee: unknown, _context?: AnonymousObject): I {
    const result = adaptee as I;

    const getId = (data: any): string | number | undefined => {
      if (isNull(data)) {
        return _context?.position;
      }
      if (Array.isArray(data) && (typeof data[0] === 'string' || !isNaN(data[0]))) {
        return data[0];
      } else if (typeof data === 'string' || !isNaN(data)) {
        return data;
      } else if (!isNull(data.id)) {
        return data.id;
      } else {
        return _context?.position;
      }
    };
    const getText = (data: any): string | undefined => {
      if (isNull(data)) {
        return undefined;
      }
      if (Array.isArray(data)) {
        return getText(data[1]);
      } else if (typeof data === 'string' || !isNaN(data) || data === true || data === false) {
        return String(data);
      } else if (!isNull(data.text)) {
        return String(data.text);
      } else {
        return undefined;
      }
    };

    ensureFieldValue(result, 'id', getId(data));
    ensureFieldValue(result, 'text', getText(data));

    const currentItem = this._idIndex[String(result.id)];

    const d = Array.isArray(data) ? data[0] : data;

    if (currentItem !== undefined) {
      if (currentItem.id === data) {
        // do not erase with new text or id, just get the current item
        return Object.assign({}, currentItem);
      }
      return Object.assign({}, currentItem, { data: d }, result);
    } else {
      const uid = generateUniqueId();
      return Object.assign(
        {
          data: d,
          uid,
          loadingStatus: data !== undefined ? LoadingStatus.Loaded : LoadingStatus.NotInitialized,
        },
        result,
      );
    }
  }

  _execute(
    items: I[],
    query: LocalQuery,
    comparator: QuerySortComparator<T>,
    comparators: AnonymousObject<QuerySortComparator<T>>,
    searcher?: QuerySearcher<T>,
  ): I[] {
    try {
      let result = defaultQueryEngine(items, query, comparator, comparators, searcher);
      if (this.state.onQuerySuccess) {
        result = this.state.onQuerySuccess(result);
      }
      return result;
    } catch(e) {
      if (this.state.onQueryError) {
        this.state.onQueryError(DefaultBasicError.of(e));
      }
      throw e;
    }

  }

  _getId(data: T): string | number | undefined {
    return this.adapt(data).id;
  }

  _indexDb(item: I, _context?: AnonymousObject): void {
    if (this._positionIndex[item.uid] !== undefined && this._db) {
      set(this._db, this._positionIndex[item.uid] as any, item);
    }
  }

  _indexId(item: I, _context?: AnonymousObject): void {
    if (item.id !== undefined) {
      this._idIndex[item.id] = item;
    }
  }

  _indexItem(item: I, context?: AnonymousObject): void {
    this._indexUid(item, context);
    this._indexId(item, context);
    this._indexPosition(item, context);
    this._indexDb(item, context);
  }

  _indexPosition(item: I, context?: AnonymousObject): void {
    if (context?.position !== undefined) {
      this._positionIndex[item.uid] = `${context.position}`;
    }
  }

  _indexUid(item: I, _context?: AnonymousObject): void {
    this._uidIndex[item.uid] = item;
  }

  _isFiltered(query: Query): boolean {
    if (query.search !== undefined && query.search !== '') {
      return true;
    }
    const filter = query.filter;
    if (!filter) {
      return false;
    }
    return filter.criterias.length > 0;
  }

  @reducer
  _onLocationChange(location: Location): void {
    const nextQuery = this._parseLocation(location);
    if (!this._refreshing) return;
    this._refreshing = false;
    if (this.state.local) {
      this._setQuery(nextQuery);
      //if (location.relativeurl && this._cache[location.relativeurl]) {
      //  this._setItems(this._cache[location.relativeurl]);
      //} else {
      const queryEngine = this.state.queryEngine || this._execute.bind(this);
      this._setItems(
        queryEngine(
          this._db || [],
          nextQuery,
          this.state.comparator || defaultComparator,
          this.state.comparators || {},
          this.state.searcher,
        ),
      );
      if (location.relativeurl) {
        const keys = Object.keys(this._cache);
        if (keys.length > 100) {
          delete this._cache[keys[0]];
        }
        this._cache[location.relativeurl] = this.state.items;
      }
      //}
    } else {
      const resetData = this.state.items ? this._resetData || shouldResetData(this.getQuery(), nextQuery) : false;
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

  _parseLocation(location: Location): Query {
    return parseQuery(location.query || {});
  }

  @reducer
  _removeByMeta<B extends keyof CollectionBy<T, I>>(
    field: 'active' | 'disabled' | 'highlighted' | 'selected',
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    const items = this.setMeta(by, target, field, false);
    const removeUids = items.map((item) => item.uid);
    this.state[field] = (this.state[field] || []).filter((s) => !removeUids.includes(s));
    return items;
  }

  _removeFilter(query: Query, filterId: QueryFilterId): void {
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

  _removeSortBy(query: Query, sort: QuerySortBy): void {
    const sortBy = formatSortBy(get(query, 'sortBy'), get<any>(this.state, 'sortBy'));
    if (sortBy) {
      query.sortBy = sortBy.filter((s) => !isSameSortBy(sort, s));
    }
  }

  _removeSortById(query: Query, id: string): void {
    const sortBy = formatSortBy(get(query, 'sortBy'), get<any>(this.state, 'sortBy'));
    if (sortBy) {
      query.sortBy = sortBy.filter((sort) => sort.id !== id);
    }
  }

  @reducer
  _setByMeta<B extends keyof CollectionBy<T, I>>(
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

  _setFields(query: Query, fields: string[]): void {
    query.fields = fields;
  }

  _setFilter(query: Query, filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    query.filter = formatFilter(filter);
  }

  _setItems(items: (I | undefined)[]): void {
    this.state.items = items;
  }

  _setLimit(query: Query, limit: number): void {
    query.limit = limit;
  }

  _setLimitOffset(query: Query, limit?: number, offset?: number): void {
    query.limit = limit;
    query.offset = offset;
  }

  @reducer
  _setLoading(
    options: {
      status?: LoadingItemStatus;
      limit?: number;
      offset?: number;
      resetLimit?: boolean;
      resetData?: boolean;
    } = {},
  ): void {
    if (isCollectionReady(this)) {
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
          this._resetData = resetData;
        }

        const setItemStatus = (item: I | undefined, status: LoadingItemStatus): I => {
          if (item === undefined) {
            item = this.adapt(undefined);
            item.loadingStatus = status;
            this._indexItem(item);
            return item;
          }
          item.loadingStatus = status;
          this.setMeta('item', item, 'loadingStatus', status);
          return Object.assign({}, item);
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
  }

  @reducer
  _setQuery(query: Query, force = true): void {
    const nextFilter = formatFilter(query.filter);
    if (force || nextFilter) {
      this.state.filter = nextFilter;
    }
    const nextSortBy = formatSortBy(query.sortBy, get<any>(this.state, 'sortBy'));
    if (force || query.sortBy !== undefined) {
      this.state.sortBy = nextSortBy;
    }
    if (force || query.sort) this.state.sort = query.sort;
    if (force || query.search) this.state.search = query.search;
    if (force || query.fields) this.state.fields = query.fields;
    if (force || query.offset) this.state.offset = query.offset;
    if (force || query.limit) this.state.limit = query.limit;
    if (force || query.params) this.state.params = query.params;
  }

  _setOffset(query: Query, offset: number): void {
    query.offset = offset;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _setParam(query: Query, key: string, value: any): void {
    query.params = Object.assign({}, query.params, { [key]: value });
  }

  _setParams(query: Query, params: AnonymousObject): void {
    query.params = params;
  }

  _setSearch(query: Query, search: Primitive): void {
    query.search = search;
  }

  _setSort(query: Query, dir: QuerySortDir): void {
    query.sort = dir;
  }

  _setSortBy(query: Query, sortBy: string | QuerySortBy | QuerySortBy[]): void {
    query.sortBy = formatSortBy(sortBy, get<any>(this.state, 'sortBy'));
  }
}
