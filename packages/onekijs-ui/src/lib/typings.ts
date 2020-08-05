import { Fetcher, FetchOptions, FetchState, Primitive } from 'onekijs';

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
  clearFilter(): void;
  clearSearch(): void;
  clearSort(): void;
  clearSortBy(): void;
  data: T[];
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;
  getFilter(): QueryFilter | undefined;
  getSearch(): Primitive | undefined;
  getSort(): QuerySortDir | undefined;
  getSortBy(): QuerySortBy[] | undefined;
  refresh(): void;
  removeFilter(filterId: QueryFilterId): void;
  removeSortBy(field: string): void;
  search(search: Primitive): void;
  sort(dir: QuerySortDir): void;
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void;
}

export type LocalQuery = Omit<Query, 'offset' | 'fields' | 'size'>;

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

export type QueryFilterCriteriaOperator = 'eq' | 'like' | 'starts_with' | 'ends_with';

export type QueryFilterCriteriaValue = Primitive | null;

export type QueryFilterId = string | number | symbol;

export type QueryFilterOrCriteria = QueryFilter | QueryFilterCriteria;

export interface QueryLimit {
  offset?: number;
  size?: number;
}

export type QuerySearcher<T> = (item: T, search?: Primitive) => boolean;

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
}

export type RemoteCollection<T = any> = Omit<Collection<T>, 'data'> & {
  clearFields(): void;
  clearLimit(): void;
  clearOffset(): void;
  clearSize(): void;
  data: RemoteItem<T>[];
  getFields(): string[] | undefined;
  getLimit(): QueryLimit;
  getOffset(): number | undefined;
  getSize(): number | undefined;
  setFields(fields: string[]): void;
  setLimit(offset: number, size: number): void;
  setOffset(offset: number): void;
  setSize(size: number): void;
};

export type RemoteCollectionFetcher<T> = Fetcher<RemoteCollectionFetcherResult<T>>;

export type RemoteCollectionFetcherResult<T> =
  | T[]
  | {
      [k: string]: any;
      total?: number;
      data: T[];
    };

export type RemoteItem<T = any> = T | undefined | symbol;

export interface RemoteQueryState<T = any> extends QueryState {
  fields?: string[];
  offset?: number;
  size?: number;
  total?: number;
  url: string;
  result?: RemoteItem<T>[];
  serializer?: QuerySerializer;
  fetchOptions?: FetchOptions<T>;
}

export interface UseCollectionOptions<T = any> {
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  initialSortBy?: string | QuerySortBy | QuerySortBy[];
  initialSort?: QuerySortDir;
  initialSearch?: Primitive;
  queryEngine?: QueryEngine;
  comparator?: QuerySortComparator;
  searcher?: QuerySearcher<T>;
}

export interface UseRemoteCollectionOptions<T = any>
  extends UseCollectionOptions,
    FetchOptions<RemoteCollectionFetcherResult<T>> {
  initialFields?: string[];
  initialSize?: number;
  initialOffset?: number;
  serializer?: QuerySerializer;
  fetcher?: RemoteCollectionFetcher<T>;
}
