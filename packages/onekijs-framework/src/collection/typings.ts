import { Primitive } from '../types/core';
import { ErrorCallback } from '../types/error';
import { Fetcher, FetchOptions, FetchState, HttpMethod } from '../types/fetch';
import { AnonymousObject } from '../types/object';
import { Router } from '../types/router';

export type ChangeHandler<T> = (value: T) => void;

export type Collection<
  T,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
> = CollectionBase<T> & {
  adapt(data: T | null | undefined): I;
  addActive<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  addDisabled<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  addHighlighted<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  destroy: () => void;
  readonly data?: T[];
  readonly dataSource?: T[] | string;
  readonly items: (I | undefined)[];
  getItem(uid: string): I | undefined;
  getFields(): string[] | undefined;
  getFilter(): QueryFilter | undefined;
  getFilterById(id: QueryFilterId): QueryFilterOrCriteria | undefined;
  getLimit(): number | undefined;
  getOffset(): number | undefined;
  getParam(key: string): any;
  getParams(): AnonymousObject | undefined;
  getSearch(): Primitive | undefined;
  getSort(): QuerySortDir | undefined;
  getSortBy(): QuerySortBy[];
  getSortByField(field: string): QuerySortByField | undefined;
  getSortById(id: string): QuerySortBy | undefined;
  readonly hasMore: boolean;
  isFiltered(): boolean;
  initialLoad(): void;
  load(limit?: number, offset?: number, replace?: boolean): void;
  onSubscribe(initialData: T[] | undefined, initialUrl: string | undefined, initialQuery: Query): void;
  query(query: Query): void;
  reload(): void;
  refresh(query?: Query): void;
  removeActive<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  removeDisabled<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  removeHighlighted<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  reset(): void;
  scrollToIndex?: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  scrollToOffset?: (offsetInPixels: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void;
  setMeta<B extends keyof CollectionBy<T, I>, K extends keyof I>(
    by: B,
    target: CollectionBy<T, I>[B],
    key: K,
    value: I[K],
  ): I[];
  setActive<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  setDisabled<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  setHighlighted<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  startAutoRefresh(interval: number): void;
  startFollow(interval: number): void;
  stopAutoRefresh(): void;
  stopFollow(): void;
  readonly state: S;
  readonly status: CollectionStatus;
  readonly total?: number;
};

export type CollectionBase<T> = {
  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId?: QueryFilterId): void;
  addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
    not?: boolean,
    id?: QueryFilterId,
    parentFilterId?: QueryFilterId,
  ): void;
  addSortBy(sortBy: QuerySortBy, prepend?: boolean): void;

  clearFields(): void;
  clearFilter(): void;
  clearParams(): void;
  clearParam(key: string): void;
  clearSearch(): void;
  clearSort(): void;
  clearSortBy(): void;
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;
  removeFilter(filterId: QueryFilterId): void;
  removeSortBy(id: string): void;
  search(search: Primitive): void;
  setData(data: T[], query?: Query): void;
  setFields(fields: string[]): void;
  setParam(key: string, value: any): void;
  setParams(params: AnonymousObject): void;
  setUrl(url: string, query?: Query): void;
  sort(dir: QuerySortDir): void;
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void;
};

export type CollectionBroker<
  T,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends Collection<T, I, S> = Collection<T, I, S>,
> = {
  addSubscriber(id: string, subscriber: C): void;
  getInitialDataSource(subscriberId?: string): T[] | string | undefined;
  getInitialQuery(subscriberId?: string): Query;
  removeSubscriber(id: string): void;

  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId?: QueryFilterId, subscriberId?: string): void;
  addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
    not?: boolean,
    id?: QueryFilterId,
    parentFilterId?: QueryFilterId,
    subscriberId?: string,
  ): void;
  addSortBy(sortBy: QuerySortBy, prepend?: boolean): void;

  clearFields(subscriberId?: string): void;
  clearFilter(subscriberId?: string): void;
  clearParams(subscriberId?: string): void;
  clearParam(key: string, subscriberId?: string): void;
  clearSearch(subscriberId?: string): void;
  clearSort(subscriberId?: string): void;
  clearSortBy(subscriberId?: string): void;
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null, subscriberId?: string): void;
  removeFilter(filterId: QueryFilterId, subscriberId?: string): void;
  removeSortBy(id: string, subscriberId?: string): void;
  refresh(query?: Query, subscriberId?: string): void;
  search(search: Primitive, subscriberId?: string): void;
  setData(data: T[], query?: Query, subscriberId?: string): void;
  setFields(fields: string[], subscriberId?: string): void;
  setParam(key: string, value: any, subscriberId?: string): void;
  setParams(params: AnonymousObject, subscriberId?: string): void;
  setUrl(url: string, query?: Query, subscriberId?: string): void;
  sort(dir: QuerySortDir, subscriberId?: string): void;
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[], subscriberId?: string): void;
};

export type CollectionBy<T, I extends Item<T> = Item<T>> = {
  id: string | number;
  item: I;
  uid: string;
  value: T;
};

export type CollectionFetcher<T> = Fetcher<CollectionFetcherResult<T>>;

export type CollectionFetcherResult<T> = T[] | AnonymousObject;

export type CollectionFetchOptions<R = any> = Omit<FetchOptions<R>, 'auth'> & {
  auth?: AnonymousObject<any> | boolean;
};

export type CollectionItemAdapter<T, I extends Item<T>> = (data: T | undefined, currentItems: AnonymousObject<I>) => I;

export interface CollectionOptions<T, I extends Item<T>> {
  active?: T[];
  adapter?: ItemAdapter<T>;
  autoload?: boolean;
  brokerable?: boolean;
  comparator?: QuerySortComparator<T>;
  comparators?: AnonymousObject<QuerySortComparator<T>>;
  dataKey?: string;
  disabled?: T[];
  fetcher?: CollectionFetcher<T>;
  fetchOnce?: boolean;
  hasMoreKey?: string;
  highlighted?: T[];
  initialFields?: string[];
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  initialLimit?: number;
  initialOffset?: number;
  initialParams?: AnonymousObject;
  initialSearch?: Primitive;
  initialSort?: QuerySortDir;
  initialSortBy?: string | QuerySortBy | QuerySortBy[];
  method?: HttpMethod;
  mutateUrl?: boolean;
  onQueryError?: ErrorCallback;
  onQuerySuccess?: (result: I[]) => I[];
  queryEngine?: QueryEngine<T, I>;
  searcher?: QuerySearcher<T>;
  selected?: T[];
  serializer?: QuerySerializer;
  throttle?: number;
  totalKey?: string;
}

export type CollectionProxy<
  T,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends Collection<T, I, S> = Collection<T, I, S>,
> = C & {
  asService(): C;
};

export interface CollectionState<T, I extends Item<T>> extends FetchState {
  active?: string[];
  adapter?: ItemAdapter<T>;
  autoload?: boolean;
  brokerable?: boolean;
  brokered?: boolean;
  comparator?: QuerySortComparator<T>;
  comparators?: AnonymousObject<QuerySortComparator<T>>;
  dataKey: string;
  dataSource?: T[] | string;
  disabled?: string[];
  fetchOnce?: boolean;
  fetchOptions?: FetchOptions<CollectionFetcherResult<T>>;
  fields?: string[];
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  hasMore?: boolean;
  hasMoreKey: string;
  highlighted?: string[];
  items?: (I | undefined)[];
  method?: HttpMethod;
  mutateUrl?: boolean;
  local: boolean;
  limit?: number;
  onQueryError?: ErrorCallback;
  onQuerySuccess?: (result: I[]) => I[];
  offset?: number;
  params?: AnonymousObject;
  queryEngine?: QueryEngine<T, I>;
  router: Router;
  search?: Primitive;
  searcher?: QuerySearcher<T>;
  selected?: string[];
  serializer?: QuerySerializer;
  sort?: QuerySortDir;
  sortBy?: string | QuerySortBy | QuerySortBy[];
  status?: CollectionStatus;
  throttle?: number;
  total?: number;
  totalKey: string;
  url?: string;
}

export type CollectionStatus =
  | 'not_ready'
  | 'not_initialized'
  | 'loading'
  | 'fetching'
  | 'loaded'
  | 'partial_loading'
  | 'partial_fetching'
  | 'partial_loaded'
  | 'error';

export type Item<T = any> = {
  data?: T; // data can be undefined if the item is fetching or loading
  id?: string | number; // id can be undefined if the item is fetching or loading
  text?: string; // text can be undefined if the item is fetching or loading
  loadingStatus: LoadingItemStatus;
  uid: string; // this is a internal ID never visible from the outside
  selected?: boolean;
  selectable?: boolean;
  highlighted?: boolean;
  highlightable?: boolean;
  active?: boolean;
  activable?: boolean;
  disabled?: boolean;
  visible?: boolean;
};

export type ItemAdaptee = {
  id?: string | number;
  text?: string;
  selected?: boolean;
  selectable?: boolean;
  highlighted?: boolean;
  highlightable?: boolean;
  active?: boolean;
  activable?: boolean;
  disabled?: boolean;
  visible?: boolean;
};

export type ItemAdapter<T = any> = (data: T) => ItemAdaptee;

export type LoadingItemStatus = 'not_initialized' | 'loading' | 'fetching' | 'loaded' | 'error';

export enum LoadingStatus {
  NotReady = 'not_ready',
  NotInitialized = 'not_initialized',
  Loading = 'loading',
  Fetching = 'fetching',
  Loaded = 'loaded',
  PartialLoading = 'partial_loading',
  PartialFetching = 'partial_fetching',
  PartialLoaded = 'partial_loaded',
  Error = 'error',
}

export type LocalQuery = Omit<Query, 'offset' | 'limit'>;

export interface Query {
  filter?: QueryFilter;
  sortBy?: QuerySortBy[];
  limit?: number;
  offset?: number;
  params?: AnonymousObject;
  fields?: string[];
  search?: Primitive;
  sort?: QuerySortDir;
}

export type QueryEngine<T, I extends Item<T>> = (
  items: I[],
  query: LocalQuery,
  comparator: QuerySortComparator<T>,
  comparators: AnonymousObject<QuerySortComparator<T>>,
  searcher?: QuerySearcher<T>,
) => I[];

export interface QueryFilter {
  id?: QueryFilterId;
  operator?: 'and' | 'or';
  criterias: QueryFilterOrCriteria[];
}

export interface QueryFilterCriteria {
  id?: QueryFilterId;
  operator?: QueryFilterCriteriaOperator;
  field?: string;
  value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[];
  not?: boolean;
}

export type QueryFilterCriteriaOperator =
  | 'eq'
  | 'like'
  | 'sw'
  | 'ew'
  | 'regex'
  | 'i_eq'
  | 'i_like'
  | 'i_sw'
  | 'i_ew'
  | 'i_regex'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'in'
  | 'is';

export type QueryFilterCriteriaValue = Primitive | null;

export type QueryFilterId = string | number | symbol;

export type QueryFilterOrCriteria = QueryFilter | QueryFilterCriteria;

export type QuerySearcher<T> = QueryFilterCriteriaOperator | ((item: T, search?: QueryFilterCriteriaValue) => boolean);

export type QuerySerializer = (query: Query) => QuerySerializerResult;

export type QuerySerializerResult = AnonymousObject<string>;

export type QuerySortBy = QuerySortByField | QuerySortByMultiFields;

export type QuerySortByField = {
  id?: string;
  dir?: QuerySortDir;
  comparator?: string;
  field: string;
};

export type QuerySortByMultiFields = {
  id?: string;
  dir?: QuerySortDir;
  fields: (
    | string
    | {
        name: string;
        comparator?: string;
      }
  )[];
};

export type QuerySortComparator<T> = (a: T | null | undefined, b: T | null | undefined) => number;

export type QuerySortDir = 'asc' | 'desc';

export interface UseCollectionOptions<T, I extends Item<T> = Item<T>>
  extends CollectionOptions<T, I>,
    CollectionFetchOptions<CollectionFetcherResult<T>> {}
