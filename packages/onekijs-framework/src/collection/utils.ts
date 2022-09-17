import { __metadata } from 'tslib';
import DefaultBasicError from '../core/BasicError';
import { Primitive } from '../types/core';
import { AnonymousObject } from '../types/object';
import { isSameArray } from '../utils/array';
import { clone, get, shallowEqual, toArray } from '../utils/object';
import {
  Collection,
  CollectionState,
  Item,
  LoadingStatus,
  LocalQuery,
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySearcher,
  QuerySerializer,
  QuerySerializerResult,
  QuerySortBy,
  QuerySortByField,
  QuerySortByMultiFields,
  QuerySortComparator,
  QuerySortDir,
} from './typings';

let filterUid = 0;
export const rootFilterId = Symbol();

export const applyCriteria = <T = any, I extends Item<T> = Item<T>>(
  item: I,
  criteria: QueryFilterCriteria,
): boolean => {
  const operator = criteria.operator || 'eq';
  const value = criteria.value;
  const source = get(item.data, criteria.field);
  const not = criteria.not;
  const result = applyOperator(operator, source, value);
  return not ? !result : result;
};

export const applyFields = <T = any, I extends Item<T> = Item<T>>(items: I[], fields?: string[]): I[] => {
  if (fields && fields.length > 0) {
    return items.map((item) => {
      const { data, ...nextItem } = item;
      if (data) {
        return fields.reduce((accumulator, field) => {
          accumulator.data = accumulator.data || {};
          accumulator.data[field] = (item as any).data[field];
          return accumulator;
        }, nextItem as any) as I;
      }
      return item;
    });
  }
  return items;
};

export const applyFilter = <T = any, I extends Item<T> = Item<T>>(item: I, filter?: QueryFilter): boolean => {
  let result = true;

  if (filter) {
    const operator = filter.operator || 'and';
    for (const filterOrCriteria of filter.criterias) {
      if (isQueryFilterCriteria(filterOrCriteria)) {
        result = applyCriteria(item, filterOrCriteria);
      } else {
        result = applyFilter(item, filterOrCriteria);
      }

      if (!result && operator === 'and') return false;
      if (result && operator === 'or') return true;
    }
  }
  return result;
};

export const applyOperator = (
  operator: QueryFilterCriteriaOperator,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  left: any,
  right?: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
): boolean => {
  if (Array.isArray(left)) {
    return left.map((v) => applyOperator(operator, v, right)).filter((r) => r === true).length > 0;
  }
  if (Array.isArray(right)) {
    return right.map((v) => applyOperator(operator, left, v)).filter((r) => r === true).length > 0;
  }
  switch (operator) {
    case 'ew':
      return String(left).endsWith(String(right));
    case 'i_ew':
      return String(left).toUpperCase().endsWith(String(right).toUpperCase());
    case 'like':
      return String(left).includes(String(right));
    case 'i_like':
      return String(left).toUpperCase().includes(String(right).toUpperCase());
    case 'sw':
      return String(left).startsWith(String(right));
    case 'i_sw':
      return String(left).toUpperCase().startsWith(String(right).toUpperCase());
    case 'eq':
      return String(left).startsWith(String(right));
    case 'i_eq':
      return String(left).toUpperCase().startsWith(String(right).toUpperCase());
    case 'regex':
      return new RegExp(String(right)).test(String(left));
    case 'i_regex':
      return new RegExp(String(right), 'i').test(String(left));
    case 'gt':
      return left > (right || 0);
    case 'gte':
      return left >= (right || 0);
    case 'lt':
      return left < (right || 0);
    case 'lte':
      return left <= (right || 0);
    case 'in':
      return toArray(right || []).includes(left);
    default:
      return true;
  }
};

export const applySearch = <T = any, I extends Item<T> = Item<T>>(
  item: I,
  search?: QueryFilterCriteriaValue,
  searcher?: QuerySearcher<T>,
): boolean => {
  searcher = searcher ?? 'i_like';
  if (item.data === undefined) {
    return false;
  }
  if (typeof searcher === 'function') {
    return searcher(item.data, search);
  }
  return applyOperator(searcher, item.text, search);
};

export const applySort = <T = any, I extends Item<T> = Item<T>>(
  items: I[],
  dir: QuerySortDir,
  comparator: QuerySortComparator,
): I[] => {
  if (dir) {
    const itemComparator = function (a: I, b: I): number {
      const reverse = dir === 'desc' ? -1 : 1;
      return reverse * comparator(a.data, b.data);
    };

    items = items.sort(itemComparator);
  }
  return items;
};

export const applySortBy = <T = any, I extends Item<T> = Item<T>>(
  items: I[],
  sortBy: QuerySortBy[],
  comparators: AnonymousObject<QuerySortComparator>,
): I[] => {
  if (sortBy.length > 0) {
    const comparator = function () {
      return function (a: I, b: I): number {
        let result = 0;
        sort_loop: for (const sort of sortBy) {
          let s: QuerySortByMultiFields | undefined;
          if (isQuerySortByField(sort)) {
            s = {
              id: sort.id,
              fields: [
                {
                  name: sort.field,
                  comparator: sort.comparator,
                },
              ],
              dir: sort.dir,
            };
          } else if (isQuerySortByMultiFields(sort)) {
            s = sort;
          }

          if (s) {
            for (const field of s.fields) {
              const fieldName = typeof field === 'string' ? field : field.name;
              const comparator =
                typeof field === 'string' || !field.comparator
                  ? defaultComparator
                  : comparators[field.comparator] || defaultComparator;
              const reverse = s.dir === 'desc' ? -1 : 1;

              result = reverse * comparator(get(a.data, fieldName), get(b.data, fieldName));
              if (result !== 0) break sort_loop;
            }
          }
        }
        return result;
      };
    };
    items = items.sort(comparator());
  }
  return items;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const defaultComparator = (a: any, b: any) => {
  if (typeof a === 'string') {
    a = a.toLowerCase();
  }
  if (typeof b === 'string') {
    b = b.toLowerCase();
  }
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

export const defaultQueryEngine = <T = any, I extends Item<T> = Item<T>>(
  items: I[],
  query: LocalQuery,
  comparator: QuerySortComparator,
  comparators: AnonymousObject<QuerySortComparator>,
  searcher?: QuerySearcher<T>,
): I[] => {
  // apply filters to data
  let result: I[] = Object.assign([], items);

  if (query.filter) {
    result = result.filter((item) => applyFilter(item, formatFilter(query.filter)));
  }

  if (query.search) {
    result = result.filter((item) => applySearch(item, query.search, searcher));
  }

  // apply sort
  if (query.sortBy) {
    result = applySortBy(result, formatSortBy(query.sortBy) || [], comparators);
  } else if (query.sort) {
    result = applySort(result, query.sort || 'asc', comparator);
  }

  // apply field subset
  if (query.fields && query.fields.length > 0) {
    result = applyFields(result, query.fields);
  }
  return result;
};

export const defaultSerializer: QuerySerializer = (query) => {
  return _serializer(query, false);
};

export const urlSerializer: QuerySerializer = (query) => {
  return _serializer(query, true);
};

const _serializer = (query: Query, url: boolean) => {
  const result: AnonymousObject = {
    filter: url ? (query.filter ? btoa(JSON.stringify(query.filter)) : undefined) : serializeFilter(query.filter),
    sortBy: serializeSortBy(query.sortBy),
    offset: serializeOffset(query.offset),
    limit: serializeLimit(query.limit),
    fields: serializeFields(query.fields),
    search: serializeSearch(query.search),
    sort: serializeSort(query.sort),
  };

  const params = query.params;
  if (params) {
    Object.keys(params).forEach((key) => {
      result[key] = `${
        Array.isArray(params[key])
          ? params[key].map((p: any) => encodeURIComponent(p)).join(',')
          : encodeURIComponent(String(params[key]))
      }`;
    });
  }

  return Object.fromEntries(Object.entries(result).filter(([_k, v]) => v !== undefined)) as QuerySerializerResult;
};

export const generateFilterId = (): number => {
  return ++filterUid;
};

export const isCollectionReady = <T, I extends Item<T>>(collection: Collection<T, I>): boolean => {
  return !!(collection && collection.status !== 'not_ready');
};

export const isCollectionLoading = <T, I extends Item<T>>(collection: Collection<T, I>): boolean => {
  return !!(collection && ['partial_loading', 'loading'].includes(collection.status));
};

export const isCollectionFetching = <T, I extends Item<T>>(collection: Collection<T, I>): boolean => {
  return !!(collection && ['partial_fetching', 'partial_loading', 'loading', 'fetching'].includes(collection.status));
};

export const isCollectionInitializing = <T, I extends Item<T>>(collection: Collection<T, I>): boolean => {
  return !!(collection && collection.status === 'not_initialized');
};

export const isItemLoading = <T, I extends Item<T>>(item?: I): boolean => {
  if (item === undefined) {
    return false;
  }
  return item.loadingStatus === LoadingStatus.Loading;
};

export const isItemFetching = <T, I extends Item<T>>(item?: I): boolean => {
  return !!(item && (item.loadingStatus === LoadingStatus.Loading || item.loadingStatus === LoadingStatus.Fetching));
};

export const isQueryFilter = (value: QueryFilterOrCriteria | QueryFilterOrCriteria[]): value is QueryFilter => {
  return !Array.isArray(value) && Object.keys(value).includes('criterias');
};

export const isQueryFilterString = (filter: string): boolean => {
  const filterRegex = /^\s*(and|or)?\s*\((.*)\)\s*$/g;
  const match = filterRegex.exec(filter);
  return match !== null;
};

export const getQueryFilter = (filter: string): QueryFilter | undefined => {
  const filterRegex = /^\s*(and|or)?\s*\((.*)\)\s*$/g;
  const match = filterRegex.exec(filter);
  if (match === null) return;

  const result: QueryFilter = {
    operator: 'and',
    criterias: [],
  };
  const operator = match[1].toLowerCase();
  if (operator === 'or') {
    result.operator = operator;
  }
  if (match.length > 2) {
    result.criterias = getQueryFilterOrCriterias(match[2]);
  }
  return result;
};

export const getQueryFilterCriteriaValue = (value: string): QueryFilterCriteriaValue => {
  // const trimQuote = (str: string, quote: string): string => {
  //   return str.substring(1, str.length - 1).replace(`\\${quote}`, quote);
  // };

  const firstChar = value.charAt(0);
  const lastChar = value.charAt(value.length - 1);
  if (firstChar === "'" || firstChar === '"') {
    if (lastChar !== firstChar) {
      throw new DefaultBasicError(`Invalid query criteria value ${value}`);
    }
    //value = trimQuote(value, firstChar);
  }
  return JSON.parse(value);
};

export const getQueryFilterCriteria = (filterCriteria: string): QueryFilterCriteria | undefined => {
  const filterCriteriaRegex =
    /^\s*([a-zA-Z$_][a-zA-Z0-9$_]*)\s+(eq|starts_with)\s+('(?:[^\\']|\\.)*'|"(?:[^\\"]|\\.)*"|(?:[^\s"';]+))\s*$/g;
  const match = filterCriteriaRegex.exec(filterCriteria);
  if (match === null) return;
  return {
    operator: match[2] as QueryFilterCriteriaOperator,
    field: match[1].toLocaleLowerCase(),
    value: getQueryFilterCriteriaValue(match[3]),
  };
};

export const getQueryFilterOrCriterias = (filterOrCriterias: string): QueryFilterOrCriteria[] => {
  const filterOrCriteriaRegex =
    /\s*((?:(?:[a-zA-Z$_][a-zA-Z0-9$_]*)\s+(?:eq|starts_with)\s+(?:'(?:[^\\']|\\.)*'|"(?:[^\\"]|\\.)*"|(?:[^\s"';]+)))|(?:(?:and|or)?\s*\(.*\)))\s*;?/g;
  let match = filterOrCriteriaRegex.exec(filterOrCriterias);
  if (match === null) return [];

  const result: QueryFilterOrCriteria[] = [];
  while (match !== null) {
    if (isQueryFilterString(match[0])) {
      result.push({
        operator: match[1].toLowerCase() === 'or' ? 'or' : 'and',
        criterias: getQueryFilterOrCriterias(match[2]),
      });
    } else {
      const filterCriteria = getQueryFilterCriteria(match[1]);
      if (filterCriteria !== undefined) {
        result.push(filterCriteria);
      }
    }
    match = filterOrCriteriaRegex.exec(filterOrCriterias);
  }
  return result;
};

export const isQueryFilterCriteria = (value: QueryFilterOrCriteria): value is QueryFilterCriteria => {
  return !isQueryFilter(value);
};

export const isQuerySortByField = (value: QuerySortBy): value is QuerySortByField => {
  return Object.keys(value).includes('field');
};

export const isQuerySortByMultiFields = (value: QuerySortBy): value is QuerySortByMultiFields => {
  return Object.keys(value).includes('fields');
};

export const isSameFilterCriteriaValue = (
  v1: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
  v2: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
): boolean => {
  if (Array.isArray(v1) && Array.isArray(v2)) {
    if (v1.length !== v2.length) return false;
    let result = true;
    for (let i = 0; i < v1.length; i++) {
      result = result && isSameFilterCriteriaValue(v1[i], v2[i]);
    }
    return result;
  } else {
    return v1 === v2;
  }
};

export const isSameFilter = (f1?: QueryFilterOrCriteria, f2?: QueryFilterOrCriteria): boolean => {
  if (f1 === f2) return true;
  if (f1 === undefined || f2 === undefined) return false;
  if (isQueryFilter(f1) && isQueryFilter(f2)) {
    let result = true;
    if (f1.criterias.length !== f2.criterias.length) {
      return false;
    }
    for (let i = 0; i < f1.criterias.length; i++) {
      if (!f2.criterias[i]) return false;
      result = result && isSameFilter(f1.criterias[i], f2.criterias[i]);
    }
    return result && (f1.operator || 'and') === (f2.operator || 'and');
  }
  if (isQueryFilterCriteria(f1) && isQueryFilterCriteria(f2)) {
    return (
      (f1.operator || 'eq') === (f2.operator || 'eq') &&
      f1.field === f2.field &&
      (f1.not || false) === (f2.not || false) &&
      isSameFilterCriteriaValue(f1.value, f2.value)
    );
  }
  return false;
};

export const isSameQuery = (q1: Query, q2: Query): boolean => {
  const s1 = defaultSerializer(q1);
  const s2 = defaultSerializer(q2);
  const k1 = Object.keys(s1);
  const k2 = Object.keys(s2);
  if (k1.length !== k2.length) return false;
  for (let i = 0; i < k1.length; i++) {
    const key = k1[i];
    if (s1[key] !== s2[key]) {
      return false;
    }
  }
  return true;
};

export const isSameSortBy = (s1?: QuerySortBy | QuerySortBy[], s2?: QuerySortBy | QuerySortBy[]): boolean => {
  const isSameSortByField = (s1: QuerySortByField, s2: QuerySortByField): boolean => {
    if (s1.field !== s2.field || s1.dir !== s2.dir) {
      return false;
    }
    return true;
  };

  const isSameSortByMultiFields = (s1: QuerySortByMultiFields, s2: QuerySortByMultiFields): boolean => {
    if (s1.dir !== s2.dir) {
      return false;
    }
    if (s1.fields.length !== s2.fields.length) {
      return false;
    }
    for (let i = 0; i < s1.fields.length; i++) {
      if (typeof s1.fields[i] !== typeof s2.fields[i]) {
        return false;
      }
      if (typeof s1.fields[i] === 'string' && s1.fields[i] !== s2.fields[i]) {
        return false;
      }
      if ((s1.fields[i] as any).name !== (s2.fields[i] as any).name) {
        return false;
      }
    }
    return true;
  };

  if (s1 === undefined && s2 === undefined) return true;
  if (s1 === undefined || s2 === undefined) return false;
  s1 = toArray(s1);
  s2 = toArray(s2);
  if (s1.length !== s2.length) return false;
  for (let i = 0; i < s1.length; i++) {
    if (isQuerySortByField(s1[i]) && isQuerySortByField(s2[i])) {
      if (!isSameSortByField(s1[i] as QuerySortByField, s2[i] as QuerySortByField)) {
        return false;
      }
    } else if (isQuerySortByMultiFields(s1[i]) && isQuerySortByMultiFields(s2[i])) {
      if (!isSameSortByMultiFields(s1[i] as QuerySortByMultiFields, s2[i] as QuerySortByMultiFields)) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

export const parseQuery = (query: URLSearchParams | AnonymousObject): Query => {
  const result: Query = {};
  if (query instanceof URLSearchParams) {
    query.forEach((value, key) => handleQueryEntry(key, value, result));
  } else {
    Object.keys(query).forEach((key) => handleQueryEntry(key, query[key], result));
  }

  return result;
};

export const shouldResetData = (query: Query, nextQuery: Query): boolean => {
  if (!isSameFilter(query.filter, nextQuery.filter)) return true;
  if (!isSameSortBy(query.sortBy, nextQuery.sortBy)) return true;
  if (query.sort !== nextQuery.sort) return true;
  if (!isSameArray(query.fields, nextQuery.fields)) return true;
  if (!shallowEqual(query.params || null, nextQuery.params || null)) return true;
  if (query.search !== nextQuery.search) return true;
  return false;
};

const handleQueryEntry = (key: string, value: string, result: Query): void => {
  value = decodeURIComponent(value);
  switch (key.toLowerCase()) {
    case 'filter':
      result.filter = parseQueryFilter(value);
      break;
    case 'sortby':
      result.sortBy = parseSortBy(value);
      break;
    case 'offset':
      result.offset = parseInt(value);
      break;
    case 'limit':
      result.limit = parseInt(value);
      break;
    case 'fields':
      result.fields = value.split(',');
      break;
    case 'search':
      result.search = value;
      break;
    case 'sort':
      result.sort = value.toLowerCase() === 'desc' ? 'desc' : 'asc';
      break;
    default:
      result.params = result.params || {};
      result.params[key] = value.includes(',') ? value.split(',') : value;
  }
};

export const parseQueryFilter = (filter: string): QueryFilter => {
  // const result = getQueryFilter(filter);
  // if (result === undefined) {
  //   return {
  //     operator: 'and',
  //     criterias: getQueryFilterOrCriterias(filter),
  //   };
  // }
  // return result;
  return JSON.parse(atob(filter));
};

export const parseSortBy = (sortBy: string): QuerySortBy[] => {
  const result: QuerySortBy[] = [];
  const sorts: any = [];
  sortBy.split(';').forEach((sort) => {
    const [field, order, id, comparator] = sort.split(',');
    const dir = order.toLowerCase() === 'desc' ? 'desc' : 'asc';
    if (id === undefined || id === '') {
      sorts.push({
        fields: [
          {
            name: field,
            comparator,
          },
        ],
        dir,
      });
    } else {
      const current = sorts.find((t: any) => t.id === id);
      if (current) {
        current.fields.push({
          name: field,
          comparator,
        });
      } else {
        sorts.push({
          id,
          fields: [
            {
              name: field,
              comparator,
            },
          ],
          dir,
        });
      }
    }
    for (const sort of sorts) {
      if (sort.fields.length === 1) {
        result.push({
          id: sort.id,
          field: sort.fields[0].name,
          dir: sort.dir,
          comparator: sort.fields[0].comparator,
        } as QuerySortByField);
      } else {
        result.push(sort as QuerySortByMultiFields);
      }
    }
  });
  return result;
};

export const serializeCriteria = (criteria: QueryFilterCriteria): string => {
  return `${criteria.field} ${criteria.not ? 'not ' : ''}${criteria.operator || 'eq'} ${serializeValue(
    criteria.value,
  )}`;
};

export const serializeFields = (fields: string[] | undefined): string | void => {
  if (fields && fields.length > 0) {
    // return `${encodeURIComponent(fields.join(','))}`;
    return `${fields.map((f) => encodeURIComponent(f)).join(',')}`;
  }
};

export const serializeParams = (params: AnonymousObject | undefined): AnonymousObject<string> | void => {
  if (params && params.length > 0) {
    const result: AnonymousObject<string> = {};
    Object.keys(params).forEach((key) => {
      result[key] = `${
        Array.isArray(params[key])
          ? params[key].map((p: any) => encodeURIComponent(p)).join(',')
          : encodeURIComponent(String(params[key]))
      }`;
    });
    return result;
  }
};

export const serializeSearch = (search: Primitive | undefined): string | void => {
  if (search !== undefined && String(search) !== '') {
    return `${search}`;
  }
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

export const serializeLimit = (limit: number | undefined): string | void => {
  if (limit && limit > 0) {
    return `${limit}`;
  }
};

export const serializeSort = (sort: QuerySortDir | undefined): string | void => {
  if (sort !== undefined) {
    return `${sort}`;
  }
};

export const serializeSortBy = (sortBy: QuerySortBy[] | undefined): string | void => {
  const serializeSortByField = (s: QuerySortByField): string => {
    return `${s.field},${s.dir || 'asc'}${s.id || s.comparator ? `,${s.id || ''}` : ''}${
      s.comparator ? `,${s.comparator}` : ''
    }`;
  };

  const serializeSortByMultiFields = (s: QuerySortByMultiFields): string => {
    const result: string[] = s.fields.map((f) => {
      if (typeof f === 'string') {
        return `${f},${s.dir || 'asc'}${s.id ? `,${s.id}` : ''}`;
      } else {
        return `${f.name},${s.dir || 'asc'}${s.id || f.comparator ? `,${s.id || ''}` : ''}${
          f.comparator ? `,${f.comparator}` : ''
        }`;
      }
    });

    return result.join(';');
  };

  if (sortBy && sortBy.length > 0) {
    return `${sortBy
      .map((s) => {
        if (isQuerySortByField(s)) {
          return serializeSortByField(s);
        } else {
          return serializeSortByMultiFields(s);
        }
      })
      .join(';')}`;
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

export const serializeValue = (value: QueryFilterCriteriaValue | QueryFilterCriteriaValue[]): string => {
  if (Array.isArray(value)) {
    //return `[${value.map((v) => serializePrimitiveValue(v)).join(',')}]`;
    return serializePrimitiveValue(value.map((v) => `${v}`.replaceAll(',', '\\,')).join(','));
  }
  return serializePrimitiveValue(value);
};

export const serializePrimitiveValue = (value: QueryFilterCriteriaValue): string => {
  if (typeof value === 'string') {
    return `"${value.replace('"', '\\"')}"`;
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

export const addFilter = (
  query: Query,
  filterOrCriteria: QueryFilterOrCriteria,
  parentFilterId: QueryFilterId = rootFilterId,
): void => {
  const filter = clone(formatFilter(query.filter) || { id: rootFilterId, operator: 'and', criterias: [] });
  visitFilter(filter, (filter) => {
    if (filter.id === parentFilterId) {
      let index = -1;
      if (filterOrCriteria.id !== undefined) {
        index = filter.criterias.findIndex((entry) => filterOrCriteria.id === entry.id);
      }
      if (index === -1) {
        filter.criterias.push(filterOrCriteria);
      } else {
        filter.criterias[index] = filterOrCriteria;
      }
      return true;
    }
    return false;
  });
  query.filter = filter;
};

export const isCollection = <T, I extends Item<T>, S extends CollectionState<T, I>>(
  data?: T[] | Collection<T, I, S> | string,
): data is Collection<T, I, S> => {
  return data !== undefined && !Array.isArray(data) && !(typeof data === 'string');
};

export const dummyLogMetadata = (): void => {
  console.log(__metadata);
};

export const formatFilter = (
  filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[],
): QueryFilter | undefined => {
  if (!filter) {
    return;
  } else if (Array.isArray(filter)) {
    // current filter is a QueryFilterOrCriteria[]
    return {
      id: rootFilterId,
      operator: 'and',
      criterias: filter,
    };
  } else if (isQueryFilterCriteria(filter)) {
    // current filter is a QueryFilterCriteria
    return {
      id: rootFilterId,
      operator: 'and',
      criterias: [filter],
    };
  } else if (filter.id === undefined || filter.operator === undefined) {
    return Object.assign({ id: rootFilterId, operator: 'and', criterias: [] }, filter);
  } else {
    return filter;
  }
};

export const formatSortBy = (sortBy?: string | QuerySortBy | QuerySortBy[]): QuerySortBy[] | undefined => {
  if (Array.isArray(sortBy)) {
    return sortBy;
  }
  if (!sortBy) {
    return;
  }
  if (typeof sortBy === 'string') {
    return [
      {
        field: sortBy,
      },
    ];
  }
  return [sortBy];
};
