import { Primitive } from 'onekijs';
import {
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaValue,
  QueryFilterOrCriteria,
  QuerySerializer,
  QuerySortBy,
  QuerySortDir,
  ItemMeta,
  LoadingStatus,
} from '../lib/typings';

let filterUid = 0;
export const rootFilterId = Symbol();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const defaultComparator = (a: any, b: any) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

export const defaultSerializer: QuerySerializer = (query) => {
  const result = {
    filter: serializeFilter(query.filter),
    sortBy: serializeSortBy(query.sortBy),
    offset: serializeOffset(query.offset),
    size: serializeSize(query.size),
    fields: serializeFields(query.fields),
    search: serializeSearch(query.search),
    sort: serializeSort(query.sort),
  };

  return Object.fromEntries(Object.entries(result).filter(([_k, v]) => v !== undefined));
};

export const generateFilterId = (): number => {
  return ++filterUid;
};

export const isLoading = (meta: ItemMeta): boolean => {
  return !!(meta && meta.loadingStatus === LoadingStatus.Loading);
};

export const isDeprecated = (meta: ItemMeta): boolean => {
  return !!(meta && (meta.loadingStatus === LoadingStatus.Loading || meta.loadingStatus === LoadingStatus.Deprecated));
};

export const isQueryFilter = (value: QueryFilterOrCriteria | QueryFilterOrCriteria[]): value is QueryFilter => {
  return !Array.isArray(value) && Object.keys(value).includes('criterias');
};

export const isQueryFilterCriteria = (value: QueryFilterOrCriteria): value is QueryFilterCriteria => {
  return !isQueryFilter(value);
};

export const serializeCriteria = (criteria: QueryFilterCriteria): string => {
  const result = `${criteria.field} ${criteria.operator || 'eq'} ${serializeValue(criteria.value)}`;
  if (criteria.not) {
    return `not(${result})`;
  }
  return result;
};

export const serializeFields = (fields: string[] | undefined): string | void => {
  if (fields && fields.length > 0) {
    return `${encodeURIComponent(fields.join(','))}`;
  }
};

export const serializeSearch = (search: Primitive | undefined): string | void => {
  if (search !== undefined && String(search) !== '') {
    return `${search}`;
  }
};

export const serializeSort = (sort: QuerySortDir | undefined): string | void => {
  if (sort !== undefined) {
    return `${sort}`;
  }
};

export const serializeSubFilter = (filter: QueryFilter): string => {
  let result = filter.criterias.length > 1 ? `${filter.operator || 'and'}(` : '';
  result = `${result}${filter.criterias
    .map((filterOrCriteria) => {
      if (isQueryFilter(filterOrCriteria)) {
        return serializeSubFilter(filterOrCriteria);
      } else {
        return serializeCriteria(filterOrCriteria);
      }
    })
    .join(';')}`;
  if (filter.criterias.length > 1) {
    result = `${result})`;
  }
  return result;
};

export const serializeFilter = (filter: QueryFilter | undefined): string | void => {
  if (filter && filter.criterias.length > 0) {
    return `${serializeSubFilter(filter)}`;
  }
};

export const serializeOffset = (offset: number | undefined): string | void => {
  if (offset && offset > 0) {
    return `${offset}`;
  }
};

export const serializeSize = (size: number | undefined): string | void => {
  if (size && size > 0) {
    return `${size}`;
  }
};

export const serializeSortBy = (sortBy: QuerySortBy[] | undefined): string | void => {
  if (sortBy && sortBy.length > 0) {
    return `${sortBy.map((s) => `${s.field},${s.dir || 'asc'}`).join(';')}`;
  }
};

export const serializeValue = (value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[]): string => {
  if (Array.isArray(value)) {
    return `[${value.map((v) => serializePrimitiveValue(v)).join(',')}]`;
  }
  return serializePrimitiveValue(value);
};

export const serializePrimitiveValue = (value: QueryFilterCriteriaValue): string => {
  if (typeof value === 'string') {
    return `'${value.replace("'", "\\'")}'`;
  }
  return String(value);
};

export const visitFilter = (filter: QueryFilter, visitor: (filter: QueryFilter) => boolean | void): boolean | void => {
  let stop = visitor(filter);
  if (!stop) {
    for (const filterOrCriteria of filter.criterias) {
      if (isQueryFilter(filterOrCriteria) && !stop) {
        stop = visitFilter(filterOrCriteria, visitor);
      }
    }
  }
  return stop;
};
