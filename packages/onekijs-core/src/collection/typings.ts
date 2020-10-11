import { Primitive, AnonymousObject } from '../core/typings';
import { Fetcher, HttpMethod, FetchState, FetchOptions } from '../fetch/typings';

export const typeOfCollectionItem = Symbol('typeof.collection.item');

export type ChangeHandler<T> = (value: T) => void;

export interface Collection<T, M extends ItemMeta> {
  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId?: QueryFilterId): void;
  addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
    not?: boolean,
    id?: QueryFilterId,
    parentFilterId?: QueryFilterId,
  ): void;
  addSortBy(field: string, dir?: QuerySortDir, comparator?: QuerySortComparator, prepend?: boolean): void;
  clearFields(): void;
  clearFilter(): void;
  clearParams(): void;
  clearParam(key: string): void;
  clearSearch(): void;
  clearSort(): void;
  clearSortBy(): void;
  data?: (T | undefined)[];
  items?: (Item<T, M> | undefined)[];
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;
  getAdapter(): CollectionItemAdapter<T, M> | undefined;
  getFields(): string[] | undefined;
  getFilter(): QueryFilter | undefined;
  getLimit(): number | undefined;
  getOffset(): number | undefined;
  getParams(): AnonymousObject | undefined;
  getSearch(): Primitive | undefined;
  getSort(): QuerySortDir | undefined;
  getSortBy(): QuerySortBy[] | undefined;
  load(limit?: number, offset?: number): void;
  query(query: Query): void;
  refresh(): void;
  removeFilter(filterId: QueryFilterId): void;
  removeSortBy(field: string): void;
  reset(): void;
  search(search: Primitive): void;
  setData(data: T[]): void;
  setFields(fields: string[]): void;
  setItems(items: Item<T, M>[]): void;
  setMeta(item: Item<T, M>, key: keyof M, value: any): void;
  setParam(key: string, value: any): void;
  setParams(params: AnonymousObject): void;
  sort(dir: QuerySortDir): void;
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void;
  status: CollectionStatus;
  total?: number;
}

export type CollectionFetcher<T> = Fetcher<CollectionFetcherResult<T>, Query | undefined>;

export type CollectionFetcherResult<T> =
  | T[]
  | {
      [k: string]: any;
      total?: number;
      result: T[];
    };

export type CollectionItemAdapter<T, M extends ItemMeta> = (data: T | undefined) => Partial<Item<T, M>>;

export interface CollectionOptions<T, M extends ItemMeta> {
  adapter?: CollectionItemAdapter<T, M>;
  autoload?: boolean;
  comparator?: QuerySortComparator;
  fetcher?: CollectionFetcher<T>;
  fetchOnce?: boolean;
  initialFields?: string[];
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  initialLimit?: number;
  initialOffset?: number;
  initialParams?: AnonymousObject;
  initialSearch?: Primitive;
  initialSort?: QuerySortDir;
  initialSortBy?: string | QuerySortBy | QuerySortBy[];
  method?: HttpMethod;
  queryEngine?: QueryEngine<T, M>;
  searcher?: QuerySearcher<T>;
  serializer?: QuerySerializer;
  throttle?: number;
}

export interface CollectionState<T, M extends ItemMeta> extends FetchState {
  adapter?: CollectionItemAdapter<T, M>;
  comparator?: QuerySortComparator;
  db?: Item<T, M>[];
  fetchOptions?: FetchOptions<CollectionFetcherResult<T>, Query | undefined>;
  fields?: string[];
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  items?: (Item<T, M> | undefined)[];
  method?: HttpMethod;
  limit?: number;
  offset?: number;
  params?: AnonymousObject;
  queryEngine?: QueryEngine<T, M>;
  search?: Primitive;
  searcher?: QuerySearcher<T>;
  serializer?: QuerySerializer;
  sort?: QuerySortDir;
  sortBy?: string | QuerySortBy | QuerySortBy[];
  status?: CollectionStatus;
  throttle?: number;
  total?: number;
  url?: string;
}

export type CollectionStatus =
  | 'not_initialized'
  | 'loading'
  | 'deprecated'
  | 'loaded'
  | 'partial_loading'
  | 'partial_deprecated'
  | 'partial_loaded';

export type Item<T, M extends ItemMeta> = {
  data?: T;
  meta?: M;
  id?: string;
  text?: string;
  type: symbol;
};

export type ItemAdapter<T, M extends ItemMeta> = (
  data: T,
) => {
  id?: string | number;
  meta?: M;
  text?: string;
};

export type ItemMeta = {
  loadingStatus?: LoadingItemStatus;
};

export type LoadingItemStatus = 'loading' | 'deprecated' | 'loaded';

export enum LoadingStatus {
  NotInitialized = 'not_initialized',
  Loading = 'loading',
  Deprecated = 'deprecated',
  Loaded = 'loaded',
  PartialLoading = 'partial_loading',
  PartialDeprecated = 'partial_deprecated',
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

export type QueryEngine<T, M extends ItemMeta> = (items: Item<T, M>[], query: LocalQuery) => Item<T, M>[];

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
  | 'i_regex';

export type QueryFilterCriteriaValue = Primitive | null;

export type QueryFilterId = string | number | symbol;

export type QueryFilterOrCriteria = QueryFilter | QueryFilterCriteria;

export type QuerySearcher<T> = QueryFilterCriteriaOperator | ((item: T, search?: QueryFilterCriteriaValue) => boolean);

export type QuerySerializer = (query: Query) => QuerySerializerResult;

export type QuerySerializerResult = AnonymousObject<string>;

export interface QuerySortBy {
  comparator?: QuerySortComparator;
  field: string;
  dir?: QuerySortDir;
}

export type QuerySortComparator = <T>(a: T | null | undefined, b: T | null | undefined) => number;

export type QuerySortDir = 'asc' | 'desc';

export interface UseCollectionOptions<T, M extends ItemMeta>
  extends CollectionOptions<T, M>,
    FetchOptions<CollectionFetcherResult<T>, Query | undefined> {}
