import { FetchOptions, FetchState } from 'onekijs';

export type QueryFilterCriteriaOperator = 'eq' | 'like' | 'starts_with' | 'ends_with';

export type QueryFilterCriteriaValue = string | number | boolean | null;

export interface QueryFilterCriteria {
  id?: QueryFilterId;
  operator?: QueryFilterCriteriaOperator;
  field: string;
  value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[];
  not?: boolean;
}

export type QueryFilterId = string | number | symbol;

export interface QueryFilter {
  id?: QueryFilterId;
  operator?: 'and' | 'or';
  criterias: QueryFilterOrCriteria[];
}

export type QueryFilterOrCriteria = QueryFilter | QueryFilterCriteria;

export type QuerySerializer = (
  filter?: QueryFilter,
  sort?: QuerySort[],
  offset?: number,
  size?: number,
  fields?: string[],
) => string;

export type QuerySortDir = 'asc' | 'desc';

export type QuerySortComparator = <T>(a: T | null | undefined, b: T | null | undefined) => number;

export interface QuerySort {
  comparator?: QuerySortComparator;
  field: string;
  dir?: QuerySortDir;
}

export interface QueryState extends FetchState {
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  sort?: string | QuerySort | QuerySort[];
}

export interface LocalQueryState<T = any> extends QueryState {
  data: T[];
  result?: T[];
}

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

export interface UseCollectionOptions {
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  initialSort?: string | QuerySort | QuerySort[];
}

export interface UseRemoteCollectionOptions<T> extends UseCollectionOptions, FetchOptions<T> {
  initialFields?: string[];
  initialSize?: number;
  initialOffset?: number;
  serializer?: QuerySerializer;
}
