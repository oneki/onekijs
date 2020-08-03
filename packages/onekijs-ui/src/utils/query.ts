import {
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaValue,
  QueryFilterOrCriteria,
  QuerySerializer,
  QuerySort,
} from '../lib/typings';

let filterUid = 0;
export const rootFilterId = Symbol();
export const loading = Symbol();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const defaultComparator = (a: any, b: any) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

export const defaultSerializer: QuerySerializer = (filter?, sort?, offset?, size?, fields?) => {
  return [
    serializeFilter(filter),
    serializeSort(sort),
    serializeOffset(offset),
    serializeSize(size),
    serializeFields(fields),
  ]
    .filter((x) => x !== undefined)
    .join('&');
};

export const generateFilterId = (): number => {
  return ++filterUid;
};

export const isLoading = <T>(item: T | symbol): item is symbol => {
  return item === loading;
};

export const isQueryFilter = (value: QueryFilterOrCriteria): value is QueryFilter => {
  return Object.keys(value).includes('criterias');
};

export const isQueryFilterCriteria = (value: QueryFilterOrCriteria): value is QueryFilterCriteria => {
  return !isQueryFilter(value);
};

export const serializeCriteria = (criteria: QueryFilterCriteria): string => {
  const result = `${criteria.field} ${criteria.operator} ${serializeValue(criteria.value)}`;
  if (criteria.not) {
    return `not(${result})`;
  }
  return result;
};

export const serializeFields = (fields: string[] | undefined): string | void => {
  if (fields && fields.length > 0) {
    return `fields=${fields.join(',')}`;
  }
};

export const serializeFilter = (filter: QueryFilter | undefined): string | void => {
  if (filter && filter.criterias.length > 0) {
    return `filter=${filter.operator || 'and'}(${filter.criterias
      .map((filterOrCriteria) => {
        if (isQueryFilter(filterOrCriteria)) {
          return serializeFilter(filterOrCriteria);
        } else {
          return serializeCriteria(filterOrCriteria);
        }
      })
      .join(';')}`;
  }
};

export const serializeOffset = (offset: number | undefined): string | void => {
  if (offset && offset > 0) {
    return `offset=${offset}`;
  }
};

export const serializeSize = (size: number | undefined): string | void => {
  if (size && size > 0) {
    return `size=${size}`;
  }
};

export const serializeSort = (sort: QuerySort[] | undefined): string | void => {
  if (sort && sort.length > 0) {
    return `sortBy=${sort.map((s) => `${s.field},${s.dir || 'asc'}`).join(';')}`;
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
    return value.replace("'", "\\'");
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
