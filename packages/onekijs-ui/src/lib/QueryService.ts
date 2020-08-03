import { FetchService, get, reducer } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId, visitFilter } from '../utils/query';
import {
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySort,
  QuerySortComparator,
  QuerySortDir,
  QueryState,
} from './typings';

export default abstract class QueryService<T = any, S extends QueryState = QueryState> extends FetchService<T, S> {
  abstract addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId?: QueryFilterId): void;

  abstract addSort(field: string, dir?: QuerySortDir, comparator?: QuerySortComparator, prepend?: boolean): void;

  get filter(): QueryFilter {
    return this._formatFilter(get<QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]>(this.state, 'filter'));
  }

  get sort(): QuerySort[] {
    return this._formatSort(get<string | QuerySort | QuerySort[]>(this.state, 'sort'));
  }

  abstract refresh(): void;

  abstract removeFilter(filterId: QueryFilterId): void;

  abstract removeSort(field: string): void;

  abstract setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;

  abstract setSort(field: string, dir?: QuerySortDir, comparator?: QuerySortComparator): void;

  @reducer
  protected _addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    const filter = this.filter;
    visitFilter(filter, (filter) => {
      if (filter.id === parentFilterId) {
        filter.criterias.push(filterOrCriteria);
        return true;
      }
      return false;
    });
    this.state.filter = filter;
  }

  @reducer
  protected _addSort(
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

  protected _formatFilter(filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): QueryFilter {
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

  protected _formatSort(sort?: string | QuerySort | QuerySort[]): QuerySort[] {
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

  @reducer
  protected _removeFilter(filterId: QueryFilterId): void {
    const filter = this.filter;
    visitFilter(filter, (filter) => {
      for (const i in filter.criterias) {
        if (filter.criterias[i].id === filterId) {
          filter.criterias.splice(parseInt(i), 1);
          return true;
        }
      }
      return false;
    });
    this.state.filter = filter;
  }

  @reducer
  protected _removeSort(field: string): void {
    this.state.sort = this.sort.filter((sort) => sort.field !== field);
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void {
    this.state.filter = this._formatFilter(filter);
  }

  @reducer
  protected _setSort(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
  ): void {
    this.state.sort = [{ field, dir, comparator }];
  }
}
