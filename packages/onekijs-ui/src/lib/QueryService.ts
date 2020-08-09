import { FetchService, get, Primitive, reducer } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId, visitFilter } from '../utils/query';
import {
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
  QueryState,
} from './typings';

export default abstract class QueryService<S extends QueryState = QueryState> extends FetchService<S> {
  getFields(): string[] | undefined {
    return this.state.fields;
  }

  getFilter(): QueryFilter | undefined {
    return this._formatFilter(get<QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]>(this.state, 'filter'));
  }

  getSearch(): Primitive | undefined {
    return this.state.search;
  }

  getSort(): QuerySortDir | undefined {
    return this.state.sort;
  }

  getSortBy(): QuerySortBy[] | undefined {
    return this._formatSortBy(get<string | QuerySortBy | QuerySortBy[]>(this.state, 'sortBy'));
  }

  @reducer
  protected _addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    const filter = this.getFilter() || { id: rootFilterId, operator: 'and', criterias: [] };
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
  protected _addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._removeSortBy(field);
    const sortBy = this.getSortBy() || [];
    if (prepend) {
      sortBy.unshift({ field, dir, comparator });
    } else {
      sortBy.push({ field, dir, comparator });
    }
    this.state.sortBy = sortBy;
  }

  @reducer
  protected _clearFields(): void {
    this.state.fields = undefined;
  }

  @reducer
  protected _clearFilter(): void {
    this.state.filter = undefined;
  }

  @reducer
  protected _clearSearch(): void {
    this.state.search = undefined;
  }

  @reducer
  protected _clearSortBy(): void {
    this.state.sortBy = undefined;
  }

  @reducer
  protected _clearSort(): void {
    this.state.sort = undefined;
  }

  protected _formatFilter(
    filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[],
  ): QueryFilter | undefined {
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
    } else {
      return Object.assign({ id: rootFilterId, operator: 'and', criterias: [] }, filter);
    }
  }

  protected _formatSortBy(sortBy?: string | QuerySortBy | QuerySortBy[]): QuerySortBy[] | undefined {
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
  }

  @reducer
  protected _removeFilter(filterId: QueryFilterId): void {
    const filter = this.getFilter();
    if (filter) {
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
  }

  @reducer
  protected _removeSortBy(field: string): void {
    const sortBy = this.getSortBy();
    if (sortBy) {
      this.state.sortBy = sortBy.filter((sort) => sort.field !== field);
    }
  }

  @reducer
  protected _setFIelds(fields: string[]): void {
    this.state.fields = fields;
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this.state.filter = this._formatFilter(filter);
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this.state.search = search;
  }

  @reducer
  protected _setSort(dir: QuerySortDir): void {
    this.state.sort = dir;
  }

  @reducer
  protected _setSortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this.state.sortBy = this._formatSortBy(sortBy);
  }
}
