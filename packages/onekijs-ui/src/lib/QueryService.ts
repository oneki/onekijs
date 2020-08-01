import { LocalService, reducer, service } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId, visitFilter } from '../utils/query';
import {
  QueryFilter,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySort,
  QuerySortComparator,
  QuerySortDir,
  QueryState,
} from './typings';

@service
export default class QueryService<T = any> extends LocalService<QueryState<T>> {
  @reducer
  addFilter(filterOrCriteria: QueryFilterOrCriteria, filterId: QueryFilterId = rootFilterId): void {
    visitFilter(this.filter, (filter) => {
      if (filter.id === filterId) {
        filter.criterias.push(filterOrCriteria);
        return true;
      }
      return false;
    });
    this.state.filter = this.filter;
  }

  @reducer
  addSort(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this.removeSort(field);
    const sort = this.sort;
    if (prepend) {
      sort.unshift({ field, dir, comparator });
    } else {
      sort.push({ field, dir, comparator });
    }
    this.state.sort = sort;
  }

  get filter(): QueryFilter {
    const currentFilter = this.state.filter;
    if (!currentFilter) {
      return {
        id: rootFilterId,
        operator: 'and',
        criterias: [],
      };
    } else if (Array.isArray(currentFilter)) {
      // current filter is a QueryFilterOrCriteria[]
      return {
        id: rootFilterId,
        operator: 'and',
        criterias: currentFilter,
      };
    } else if (isQueryFilterCriteria(currentFilter)) {
      // current filter is a QueryFilterCriteria
      return {
        id: rootFilterId,
        operator: 'and',
        criterias: [currentFilter],
      };
    } else {
      return Object.assign({ id: rootFilterId, operator: 'and', criterias: [] }, currentFilter);
    }
  }

  get sort(): QuerySort[] {
    const currentSort = this.state.sort;
    if (Array.isArray(currentSort)) {
      return currentSort;
    }
    if (!currentSort) {
      return [];
    }
    if (typeof currentSort === 'string') {
      return [
        {
          field: currentSort,
        },
      ];
    }
    return [currentSort];
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    visitFilter(this.filter, (filter) => {
      for (let i in filter.criterias) {
        if (filter.criterias[i].id === filterId) {
          filter.criterias.splice(parseInt(i), 1);
          return true;
        }
      }
      return false;
    });
    this.state.filter = this.filter;
  }  

  @reducer
  removeSort(field: string): void {
    this.state.sort = this.sort.filter((sort) => sort.field !== field);
  }

  @reducer
  setSort(field: string, dir: QuerySortDir = 'asc', comparator: QuerySortComparator = defaultComparator): void {
    this.state.sort = [{ field, dir, comparator }];
  }
}
