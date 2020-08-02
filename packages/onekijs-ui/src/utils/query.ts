import { QueryFilter, QueryFilterCriteria, QueryFilterOrCriteria } from '../lib/typings';

let filterUid = 0;
export const rootFilterId = Symbol();

export const defaultComparator = (a: any, b: any) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

export const generateFilterId = (): number => {
  return ++filterUid;
};

export const isQueryFilter = (value: QueryFilterOrCriteria): value is QueryFilter => {
  return Object.keys(value).includes('criterias');
};

export const isQueryFilterCriteria = (value: QueryFilterOrCriteria): value is QueryFilterCriteria => {
  return !isQueryFilter(value);
};

export const visitFilter = (filter: QueryFilter, visitor: (filter: QueryFilter) => boolean | void): boolean | void => {
  let stop = visitor(filter);
  if (!stop) {
    for (let filterOrCriteria of filter.criterias) {
      if (isQueryFilter(filterOrCriteria) && !stop) {
        stop = visitFilter(filterOrCriteria, visitor);
      }
    }
  }
  return stop;
};
