import { get, Primitive, reducer, service } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  Collection,
  LocalQuery,
  LocalQueryState,
  QueryEngine,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
} from './typings';

@service
export default class LocalQueryService<T = any, S extends LocalQueryState<T> = LocalQueryState<T>>
  extends QueryService<S>
  implements Collection<T> {
  init(): void {
    this.refresh();
  }

  @reducer
  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._addFilter(filterOrCriteria, parentFilterId);
    this.refresh();
  }

  @reducer
  addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: string | number | boolean | QueryFilterCriteriaValue[] | null,
    not?: boolean | undefined,
    id?: string | number | symbol | undefined,
    parentFilterId?: string | number | symbol | undefined,
  ): void {
    this.addFilter(
      {
        field,
        operator,
        value,
        not,
        id,
      },
      parentFilterId,
    );
  }

  @reducer
  addSortBy(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._addSortBy(field, dir, comparator, prepend);
    this.refresh();
  }

  @reducer
  clearFilter(): void {
    this._clearFilter();
    this.refresh();
  }

  @reducer
  clearSearch(): void {
    this._clearSearch();
    this.refresh();
  }

  @reducer
  clearSort(): void {
    this._clearSort();
    this.refresh();
  }

  @reducer
  clearSortBy(): void {
    this._clearSortBy();
    this.refresh();
  }

  @reducer
  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    this._setFilter(filter);
    this.refresh();
  }

  get data(): T[] {
    return this.state.result || [];
  }

  get initialData(): T[] {
    return this.state.data;
  }

  getSearch(): Primitive | undefined {
    return this.state.search;
  }

  getSort(): QuerySortDir | undefined {
    return this.state.sort;
  }

  @reducer
  search(search: Primitive): void {
    this.state.search = search;
    this.refresh();
  }

  @reducer
  sort(dir: QuerySortDir): void {
    this.state.sort = dir;
    this.refresh();
  }

  @reducer
  refresh(): void {
    const queryEngine: QueryEngine = this.state.queryEngine || this._execute.bind(this);
    this.state.result = queryEngine(this.initialData, {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      search: this.getSearch(),
      sort: this.getSort(),
    });
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    this._removeFilter(filterId);
    this.refresh();
  }

  @reducer
  removeSortBy(field: string): void {
    this._removeSortBy(field);
    this.refresh();
  }

  @reducer
  setData(data: T[]): void {
    this.state.data = data;
    this.refresh();
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setSortBy(sortBy);
    this.refresh();
  }

  protected _applyCriteria(item: T, criteria: QueryFilterCriteria): boolean {
    const operator = criteria.operator;
    const value = criteria.value;
    const source = get(item, criteria.field);
    const not = criteria.not;
    let result: boolean;

    switch (operator) {
      case 'ends_with':
        result = String(source).endsWith(String(value));
        break;
      case 'like':
        result = String(source).toUpperCase().includes(String(value).toUpperCase());
        break;
      case 'starts_with':
        result = String(source).startsWith(String(value));
        break;
      default:
        result = source === value;
        break;
    }

    return not ? !result : result;
  }

  protected _applyFilter(item: T, filter?: QueryFilter): boolean {
    let result = true;

    if (filter) {
      const operator = filter.operator || 'and';
      for (const filterOrCriteria of filter.criterias) {
        if (isQueryFilterCriteria(filterOrCriteria)) {
          result = this._applyCriteria(item, filterOrCriteria);
        } else {
          result = this._applyFilter(item, filterOrCriteria);
        }

        if (!result && operator === 'and') return false;
        if (result && operator === 'or') return true;
      }
    }
    return result;
  }

  protected _applySearch(item: T, search?: Primitive): boolean {
    if (this.state.searcher) {
      return this.state.searcher(item, search);
    }
    if (search) {
      return String(item).toUpperCase().includes(String(search).toUpperCase());
    }
    return true;
  }

  protected _applySort(data: T[], dir?: QuerySortDir): T[] {
    if (dir) {
      const comparator = this.state.comparator || defaultComparator;
      data = data.sort(comparator);
    }
    return data;
  }

  protected _applySortBy(data: T[], sortBy?: QuerySortBy[]): T[] {
    if (sortBy && sortBy.length > 0) {
      const comparator = function () {
        return function (a: T, b: T): number {
          let result = 0;
          for (const sort of sortBy) {
            const comparator = sort.comparator || defaultComparator;
            const reverse = sort.dir === 'desc' ? -1 : 1;
            result = reverse * comparator(get(a, sort.field), get(b, sort.field));
            if (result !== 0) break;
          }
          return result;
        };
      };
      data = data.sort(comparator());
    }
    return data;
  }

  protected _execute(data: T[], query: LocalQuery): T[] {
    // apply filters to data
    let result = data;
    if (query.filter) {
      result = data.filter((item) => this._applyFilter(item, this._formatFilter(query.filter)));
    } else if (query.search) {
      result = data.filter((item) => this._applySearch(item, this.state.search));
    } else {
      result = Object.assign([], data);
    }

    // apply sort
    if (query.sortBy) {
      result = this._applySortBy(result, this._formatSortBy(query.sortBy));
    } else if (query.sort) {
      result = this._applySort(result, query.sort);
    }

    return result;
  }
}
