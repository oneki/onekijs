import { FetchState } from 'onekijs';

export type QueryFilterCriteriaOperator = 'eq' | 'like' | 'starts_with' | 'ends_with';

export type QueryFilterCriteriaValue = string | number | boolean | null | string[] | number[];

export interface QueryFilterCriteria {
  id?: QueryFilterId;
  operator?: QueryFilterCriteriaOperator;
  field: string;
  value: QueryFilterCriteriaValue;
  not?: boolean;
}

export type QueryFilterId = string | number | Symbol;

export interface QueryFilter {
  id?: QueryFilterId;
  operator?: 'and' | 'or';
  criterias: QueryFilterOrCriteria[];
}

export type QueryFilterOrCriteria = QueryFilter | QueryFilterCriteria;

export type QuerySortDir = 'asc' | 'desc';

export type QuerySortComparator = <T>(a: T | null | undefined, b: T | null | undefined) => number;

export interface QuerySort {
  comparator?: QuerySortComparator;
  field: string;
  dir?: QuerySortDir
}

export interface QueryLimit {
  offset?: number;
  size: number;
}

export interface QueryState<T = any> extends FetchState {
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  sort?: string | QuerySort | QuerySort[];
  result?: T[];
}

export interface UseCollectionOptions {
  initialFilter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[];
  initialSort?: string | QuerySort | QuerySort[];
}

export interface LocalQueryState<T = any> extends QueryState<T> {
  data: T[];
}

export interface RemoteQueryState<T = any> extends QueryState<T> {
  fields?: string[];
  limit?: number | QueryLimit;
  url: string;
}