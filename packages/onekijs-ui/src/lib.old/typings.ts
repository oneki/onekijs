import { Fetcher, FetchOptions, FetchState, HttpMethod, Primitive } from 'onekijs';

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
  clearSearch(): void;
  clearSort(): void;
  clearSortBy(): void;
  items?: (Item<T, M> | undefined)[];
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;
  getAdapter(): ItemAdapter<T, M> | undefined;
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
  setData(data: T[]): void;
  setFields(fields: string[]): void;
  setItems(items: Item<T, M>[]): void;
  setMeta(item: Item<T, M>, key: keyof M, value: any): void;
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

export interface CollectionOptions<T, M extends ItemMeta> {
  adapter?: ItemAdapter<T, M>;
  comparator?: QuerySortComparator;
  fetcher?: CollectionFetcher<T>;
  fetchOnce?: boolean;
  initialFields?: string[];
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
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
  adapter?: ItemAdapter<T, M>;
  comparator?: QuerySortComparator;
  db?: Item<T, M>[];
  fetchOptions?: FetchOptions<CollectionFetcherResult<T>, Query | undefined>;
  fields?: string[];
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  items?: (Item<T, M> | undefined)[];
  offset?: number;
  method?: HttpMethod;
  queryEngine?: QueryEngine<T, M>;
  search?: Primitive;
  searcher?: QuerySearcher<T>;
  serializer?: QuerySerializer;
  size?: number;
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

export type ItemAdapter<T, M extends ItemMeta> = (data: T | undefined) => Partial<Item<T, M>>;

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

export type LocalQuery = Omit<Query, 'offset' | 'size'>;

export interface Query {
  filter?: QueryFilter;
  sortBy?: QuerySortBy[];
  offset?: number;
  size?: number;
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

export interface UseCollectionOptions<T, M extends ItemMeta>
  extends CollectionOptions<T, M>,
    FetchOptions<CollectionFetcherResult<T>, Query | undefined> {}