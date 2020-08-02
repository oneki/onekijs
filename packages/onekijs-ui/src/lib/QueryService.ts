import { FetchService, reducer, get } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId, visitFilter } from '../utils/query';
import {
  QueryFilter,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySort,
  QuerySortComparator,
  QuerySortDir,
  QueryState,
  QueryFilterCriteria
} from './typings';

export default abstract class QueryService<T = any, S extends QueryState<T> = QueryState<T>> extends FetchService<T, S> {
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
    this.refresh();
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
    this.refresh();
  }

  get filter(): QueryFilter {
    return this._formatFilter(get<QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]>(this.state, 'filter'));
  }

  get sort(): QuerySort[] {
    return this._formatSort(get<string | QuerySort | QuerySort[]>(this.state, 'sort'));
  }

  abstract refresh(): void;

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
    this.refresh();
  }  

  @reducer
  removeSort(field: string): void {
    this.state.sort = this.sort.filter((sort) => sort.field !== field);
    this.refresh();
  }

  @reducer
  setSort(field: string, dir: QuerySortDir = 'asc', comparator: QuerySortComparator = defaultComparator): void {
    this.state.sort = [{ field, dir, comparator }];
    this.refresh();
  }

  _formatFilter(filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): QueryFilter {
    if (!filter) {
      return {
        id: rootFilterId,
        operator: 'and',
        criterias: [],
      };
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
    } else {
      return Object.assign({ id: rootFilterId, operator: 'and', criterias: [] }, filter);
    }
  }

  _formatSort(sort?: string | QuerySort | QuerySort[]) {
    if (Array.isArray(sort)) {
      return sort;
    }
    if (!sort) {
      return [];
    }
    if (typeof sort === 'string') {
      return [
        {
          field: sort,
        },
      ];
    }
    return [sort];
  }
}
