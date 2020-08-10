import { Fetcher, FetchOptions, FetchState, HttpMethod, Primitive } from 'onekijs';

// export const loadingSymbol = Symbol('collection.item.loading');
// export const deprecatedSymbol = Symbol('collection.item.deprecated');

export interface Collection<T = any> {
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
  clearSearch(): void;
  clearSort(): void;
  clearSortBy(): void;
  data?: Item<T>[];
  meta?: ItemMeta[];
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;
  getFields(): string[] | undefined;
  getFilter(): QueryFilter | undefined;
  getOffset(): number | undefined;
  getSearch(): Primitive | undefined;
  getSize(): number | undefined;
  getSort(): QuerySortDir | undefined;
  getSortBy(): QuerySortBy[] | undefined;
  load(size?: number, offset?: number): void;
  query(query: Query): void;
  refresh(): void;
  removeFilter(filterId: QueryFilterId): void;
  removeSortBy(field: string): void;
  search(search: Primitive): void;
  setFields(fields: string[]): void;
  sort(dir: QuerySortDir): void;
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void;
  status: CollectionStatus;
  total?: number;
}

export interface CollectionOptions {
  initialFields?: string[];
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  initialSortBy?: string | QuerySortBy | QuerySortBy[];
  initialSort?: QuerySortDir;
  initialSearch?: Primitive;
}

export type CollectionStatus =
  | 'not_initialized'
  | 'loading'
  | 'deprecated'
  | 'loaded'
  | 'partial_loading'
  | 'partial_deprecated'
  | 'partial_loaded';

export type Item<T = any> = T | undefined;

export type ItemMeta =
  | {
      status: ItemStatus;
    }
  | undefined;

export type ItemStatus = 'loading' | 'deprecated' | 'loaded';

export enum LoadingStatus {
  NotInitialized = 'not_initialized',
  Loading = 'loading',
  Deprecated = 'deprecated',
  Loaded = 'loaded',
  PartialLoading = 'partial_loading',
  PartialDeprecated = 'partial_deprecated',
  PartialLoaded = 'partial_loaded',
}

export interface LocalCollection<T = any> extends Collection<T> {
  setData(data: T[]): void;
}

export type LocalQuery = Omit<Query, 'offset' | 'size'>;

export interface LocalQueryState<T = any> extends QueryState {
  data: T[];
  result?: T[];
  queryEngine?: QueryEngine;
  comparator?: QuerySortComparator;
  searcher?: QuerySearcher<T>;
}

export interface Query {
  filter?: QueryFilter;
  sortBy?: QuerySortBy[];
  offset?: number;
  size?: number;
  fields?: string[];
  search?: Primitive;
  sort?: QuerySortDir;
}

export type QueryEngine<T = any> = (data: T[], query: LocalQuery) => T[];

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

export interface QueryLimit {
  offset?: number;
  size?: number;
}

export type QuerySearcher<T> = QueryFilterCriteriaOperator | ((item: T, search?: QueryFilterCriteriaValue) => boolean);

export type QuerySerializer = (query: Query) => QuerySerializerResult;

export type QuerySerializerResult = {
  filter?: string;
  sortBy?: string;
  offset?: string;
  size?: string;
  fields?: string;
  search?: string;
  sort?: QuerySortDir;
};

export interface QuerySortBy {
  comparator?: QuerySortComparator;
  field: string;
  dir?: QuerySortDir;
}

export type QuerySortComparator = <T>(a: T | null | undefined, b: T | null | undefined) => number;

export type QuerySortDir = 'asc' | 'desc';

export interface QueryState extends FetchState {
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  sortBy?: string | QuerySortBy | QuerySortBy[];
  sort?: QuerySortDir;
  search?: Primitive;
  fields?: string[];
  offset?: number;
  size?: number;
}

export type RemoteCollection<T = any> = Collection<T>;

export type RemoteCollectionFetcher<T> = Fetcher<RemoteCollectionFetcherResult<T>>;

export type RemoteCollectionFetcherResult<T> =
  | T[]
  | {
      [k: string]: any;
      total?: number;
      data: T[];
    };

export interface RemoteQueryState<T = any> extends QueryState {
  data?: Item<T>[];
  meta?: ItemMeta[];
  fetchOptions?: FetchOptions<T>;
  loading?: boolean;
  method?: HttpMethod;
  serializer?: QuerySerializer;
  status?: CollectionStatus;
  total?: number;
  url: string;
}

export interface UseCollectionOptions<T = any> extends CollectionOptions {
  queryEngine?: QueryEngine;
  comparator?: QuerySortComparator;
  searcher?: QuerySearcher<T>;
}

export interface UseRemoteCollectionOptions<T = any>
  extends CollectionOptions,
    FetchOptions<RemoteCollectionFetcherResult<T>> {
  serializer?: QuerySerializer;
  fetcher?: RemoteCollectionFetcher<T>;
  method?: HttpMethod;
}
