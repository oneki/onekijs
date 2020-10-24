import BasicError from '../core/BasicError';
import { AnonymousObject, Primitive } from '../core/typings';
import { isNull, shallowEqual } from '../core/utils/object';
import {
  Collection,
  CollectionItemAdapter,
  Item,
  ItemMeta,
  LoadingStatus,
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterOrCriteria,
  QuerySerializer,
  QuerySerializerResult,
  QuerySortBy,
  QuerySortDir,
  typeOfCollectionItem,
} from './typings';

let filterUid = 0;
export const rootFilterId = Symbol();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const defaultComparator = (a: any, b: any) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

export const defaultSerializer: QuerySerializer = (query) => {
  const result: AnonymousObject = {
    filter: serializeFilter(query.filter),
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
      result[key] = `${encodeURIComponent(String(params[key]))}}`;
    });
  }

  return Object.fromEntries(Object.entries(result).filter(([_k, v]) => v !== undefined)) as QuerySerializerResult;
};

export const generateFilterId = (): number => {
  return ++filterUid;
};

export const isCollectionLoading = <T, M>(collection: Collection<T, M>): boolean => {
  return !!(
    collection && ['partial_deprecated', 'partial_loading', 'loading', 'deprecated'].includes(collection.status)
  );
};

export const isItemLoading = (meta: ItemMeta): boolean => {
  return !!(meta && meta.loadingStatus === LoadingStatus.Loading);
};

export const isItemDeprecated = (meta: ItemMeta): boolean => {
  return !!(meta && (meta.loadingStatus === LoadingStatus.Loading || meta.loadingStatus === LoadingStatus.Deprecated));
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
      throw new BasicError(`Invalid query criteria value ${value}`);
    }
    //value = trimQuote(value, firstChar);
  }
  return JSON.parse(value);
};

export const getQueryFilterCriteria = (filterCriteria: string): QueryFilterCriteria | undefined => {
  const filterCriteriaRegex = /^\s*([a-zA-Z$_][a-zA-Z0-9$_]*)\s+(eq|starts_with)\s+('(?:[^\\']|\\.)*'|"(?:[^\\"]|\\.)*"|(?:[^\s"';]+))\s*$/g;
  const match = filterCriteriaRegex.exec(filterCriteria);
  if (match === null) return;
  return {
    operator: match[2] as QueryFilterCriteriaOperator,
    field: match[1].toLocaleLowerCase(),
    value: getQueryFilterCriteriaValue(match[3]),
  };
};

export const getQueryFilterOrCriterias = (filterOrCriterias: string): QueryFilterOrCriteria[] => {
  const filterOrCriteriaRegex = /\s*((?:(?:[a-zA-Z$_][a-zA-Z0-9$_]*)\s+(?:eq|starts_with)\s+(?:'(?:[^\\']|\\.)*'|"(?:[^\\"]|\\.)*"|(?:[^\s"';]+)))|(?:(?:and|or)?\s*\(.*\)))\s*;?/g;
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

export const isSameArray = (a1: any[] | undefined, a2: any[] | undefined): boolean => {
  if (a1 === undefined && a2 === undefined) return true;
  if (a1 === undefined || a2 === undefined) return false;
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
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

export const isSameSortBy = (s1?: QuerySortBy[], s2?: QuerySortBy[]): boolean => {
  if (s1 === undefined && s2 === undefined) return true;
  if (s1 === undefined || s2 === undefined) return false;
  if (s1.length !== s2.length) return false;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i].field !== s2[i].field) {
      return false;
    }
    if (s1[i].dir !== s2[i].dir) {
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
  switch (key.toLowerCase()) {
    case 'filter':
      result.filter = parseQueryFilter(value);
      break;
    case 'sortBy':
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
      result.params[key] = value;
  }
};

export const parseQueryFilter = (filter: string): QueryFilter => {
  const result = getQueryFilter(filter);
  if (result === undefined) {
    return {
      operator: 'and',
      criterias: getQueryFilterOrCriterias(filter),
    };
  }
  return result;
};

export const parseSortBy = (sortBy: string): QuerySortBy[] => {
  const result: QuerySortBy[] = [];
  sortBy.split(';').forEach((sort) => {
    const [field, order] = sort.split(',');
    const dir = order.toLowerCase() === 'desc' ? 'desc' : 'asc';
    result.push({ field, dir });
  });
  return result;
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

export const serializeParams = (params: AnonymousObject | undefined): AnonymousObject<string> | void => {
  if (params && params.length > 0) {
    const result: AnonymousObject<string> = {};
    Object.keys(params).forEach((key) => {
      result[key] = `${encodeURIComponent(String(params[key]))}}`;
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
  if (sortBy && sortBy.length > 0) {
    return `${sortBy.map((s) => `${s.field},${s.dir || 'asc'}`).join(';')}`;
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
    return `[${value.map((v) => serializePrimitiveValue(v)).join(',')}]`;
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

export const isCollection = <T, M extends ItemMeta>(data: T[] | Collection<T, M>): data is Collection<T, M> => {
  return !Array.isArray(data);
};

export const toCollectionItem = <T, M>(data?: T, adapter?: CollectionItemAdapter<T, M>): Item<T, M> => {
  const getId = (data: any) => {
    if (isNull(data)) {
      return undefined;
    }
    if (!isNull(data.id)) {
      return String(data.id);
    } else {
      return undefined;
    }
  };
  const getText = (data: any) => {
    if (isNull(data)) {
      return undefined;
    }
    if (!isNull(data.text)) {
      return String(data.text);
    } else {
      return undefined;
    }
  };
  if (adapter) {
    const adaptee = adapter(data);
    return Object.assign({ data }, adaptee, {
      type: typeOfCollectionItem,
      id: adaptee.id === undefined ? getId(data) : String(adaptee.id),
    });
  }

  return {
    data,
    meta: undefined,
    id: getId(data),
    text: getText(data),
    type: typeOfCollectionItem,
  };
};
