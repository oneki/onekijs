import { Primitive } from '../types/core';
import { Fetcher, FetchOptions, FetchState, HttpMethod } from '../types/fetch';
import { AnonymousObject } from '../types/object';
import { Router } from '../types/router';

export type ChangeHandler<T> = (value: T) => void;

export type Collection<T, M extends ItemMeta, I extends Item<T, M>> = Omit<
  CollectionBroker<T, M, I>,
  'addSubscriber' | 'removeSubscriber'
> & {
  adapt(data: T | undefined): I;
  asService(): Collection<T, M, I>;
  readonly data?: (T | undefined)[];
  readonly dataSource?: T[] | string;
  readonly items?: (I | undefined)[];
  getAdapter(): CollectionItemAdapter<T, M, I>;
  getItem(id: string | number): I | undefined;
  getFields(): string[] | undefined;
  getFilter(): QueryFilter | undefined;
  getFilterById(id: QueryFilterId): QueryFilterOrCriteria | undefined;
  getLimit(): number | undefined;
  getMeta(id: string | number): M | undefined;
  getOffset(): number | undefined;
  getParam(key: string): any;
  getParams(): AnonymousObject | undefined;
  getSearch(): Primitive | undefined;
  getSort(): QuerySortDir | undefined;
  getSortBy(): QuerySortBy[] | undefined;
  getSortByField(field: string): QuerySortByField | undefined;
  getSortById(id: string): QuerySortBy | undefined;
  readonly hasMore: boolean;
  load(limit?: number, offset?: number): void;
  query(query: Query): void;
  refresh(query?: Query): void;
  reset(): void;
  setMeta(item: I, key: keyof M, value: any): void;
  setMetaById(id: Primitive, key: keyof M, value: any): void;
  readonly status: CollectionStatus;
  readonly total?: number;
};

export type CollectionBroker<T, M extends ItemMeta, I extends Item<T, M>> = {
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
  addSubscriber(collection: Collection<T, M, I>): void;
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
  removeSubscriber(collection: Collection<T, M, I>): void;
  search(search: Primitive): void;
  setData(data: T[]): void;
  setFields(fields: string[]): void;
  setParam(key: string, value: any): void;
  setParams(params: AnonymousObject): void;
  sort(dir: QuerySortDir): void;
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void;
};

export type CollectionFetcher<T> = Fetcher<CollectionFetcherResult<T>, Query | undefined>;

export type CollectionFetcherResult<T> = T[] | AnonymousObject;

export type CollectionFetchOptions<R = any, T = any> = Omit<FetchOptions<R, T>, 'auth'> & {
  auth?: AnonymousObject<any> | boolean;
};

export type CollectionItemAdapter<T, M extends ItemMeta, I extends Item<T, M>> = (data: T | undefined) => I;

export interface CollectionOptions<T, M extends ItemMeta, I extends Item<T, M>> {
  autoload?: boolean;
  comparator?: QuerySortComparator;
  comparators?: AnonymousObject<QuerySortComparator>;
  dataKey?: string;
  fetcher?: CollectionFetcher<T>;
  fetchOnce?: boolean;
  hasMoreKey?: string;
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
  queryEngine?: QueryEngine<T, M, I>;
  searcher?: QuerySearcher<T>;
  serializer?: QuerySerializer;
  throttle?: number;
  totalKey?: string;
}

export interface CollectionState<T, M extends ItemMeta, I extends Item<T, M>> extends FetchState {
  adapter: CollectionItemAdapter<T, M, I>;
  autoload?: boolean;
  comparator?: QuerySortComparator;
  comparators?: AnonymousObject<QuerySortComparator>;
  dataKey: string;
  dataSource?: T[] | string;
  fetchOnce?: boolean;
  fetchOptions?: FetchOptions<CollectionFetcherResult<T>, Query | undefined>;
  fields?: string[];
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  hasMore?: boolean;
  hasMoreKey: string;
  items?: (I | undefined)[];
  method?: HttpMethod;
  local: boolean;
  limit?: number;
  offset?: number;
  params?: AnonymousObject;
  queryEngine?: QueryEngine<T, M, I>;
  router: Router;
  search?: Primitive;
  searcher?: QuerySearcher<T>;
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
  | 'not_initialized'
  | 'loading'
  | 'fetching'
  | 'loaded'
  | 'partial_loading'
  | 'partial_fetching'
  | 'partial_loaded';

export interface Item<T, M extends ItemMeta> {
  data?: T;
  meta?: M;
  id?: string | number;
  text?: string;
}

export type ItemMeta = {
  loadingStatus?: LoadingItemStatus;
};

export type LoadingItemStatus = 'loading' | 'fetching' | 'loaded';

export enum LoadingStatus {
  NotInitialized = 'not_initialized',
  Loading = 'loading',
  Fetching = 'fetching',
  Loaded = 'loaded',
  PartialLoading = 'partial_loading',
  PartialFetching = 'partial_fetching',
  PartialLoaded = 'partial_loaded',
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

export type QueryEngine<T, M extends ItemMeta, I extends Item<T, M>> = (
  items: I[],
  query: LocalQuery,
  comparator: QuerySortComparator,
  comparators: AnonymousObject<QuerySortComparator>,
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
  | 'starts_with'
  | 'ends_with'
  | 'regex'
  | 'i_eq'
  | 'i_like'
  | 'i_starts_with'
  | 'i_ends_with'
  | 'i_regex'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte';

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

export type QuerySortComparator = <T>(a: T | null | undefined, b: T | null | undefined) => number;

export type QuerySortDir = 'asc' | 'desc';

export interface UseCollectionOptions<T, M extends ItemMeta, I extends Item<T, M>>
  extends CollectionOptions<T, M, I>,
    CollectionFetchOptions<CollectionFetcherResult<T>, Query | undefined> {}
