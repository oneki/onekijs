import { get, Primitive, reducer, Service } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId, visitFilter } from '../utils/query';
import {
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
  QueryState,
} from './typings';

export default abstract class QueryService<S extends QueryState = QueryState> extends Service<S> {
  getFields(): string[] | undefined {
    return this.state.fields;
  }

  getFilter(): QueryFilter | undefined {
    return this._formatFilter(this.state.filter);
  }

  getOffset(): number | undefined {
    return this.state.offset;
  }

  getSearch(): Primitive | undefined {
    return this.state.search;
  }

  getSize(): number | undefined {
    return this.state.size;
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
  protected _clearOffset(): void {
    this.state.offset = undefined;
  }

  @reducer
  protected _clearSearch(): void {
    this.state.search = undefined;
  }

  @reducer
  protected _clearSize(): void {
    this.state.size = undefined;
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
    } else if (filter.id === undefined || filter.operator === undefined) {
      return Object.assign({ id: rootFilterId, operator: 'and', criterias: [] }, filter);
    } else {
      return filter;
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
  protected _setFields(fields: string[]): void {
    this.state.fields = fields;
  }

  @reducer
  protected _setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this.state.filter = this._formatFilter(filter);
  }

  @reducer
  protected _setLimit(size?: number, offset?: number): void {
    if (size !== undefined) {
      this._setSize(size);
    } else {
      this._clearSize();
    }
    if (offset !== undefined) {
      this._setOffset(offset);
    } else {
      this._clearOffset();
    }
  }

  @reducer
  protected _setQuery(query: Query): void {
    if (query.filter) {
      this._setFilter(query.filter);
    } else {
      this._clearFilter();
    }
    if (query.sort) {
      this._setSort(query.sort);
    } else {
      this._clearSort();
    }
    if (query.sortBy) {
      this._setSortBy(query.sortBy);
    } else {
      this._clearSortBy();
    }
    if (query.search) {
      this._setSearch(query.search);
    } else {
      this._clearSearch();
    }
    if (query.fields) {
      this._setFields(query.fields);
    } else {
      this._clearFields();
    }
    if (query.offset !== undefined) {
      this._setOffset(query.offset);
    } else {
      this._clearOffset();
    }
    if (query.size !== undefined) {
      this._setSize(query.size);
    } else {
      this._clearSize();
    }
  }

  @reducer
  protected _setOffset(offset: number): void {
    this.state.offset = offset;
  }

  @reducer
  protected _setSearch(search: Primitive): void {
    this.state.search = search;
  }

  @reducer
  protected _setSize(size: number): void {
    this.state.size = size;
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
