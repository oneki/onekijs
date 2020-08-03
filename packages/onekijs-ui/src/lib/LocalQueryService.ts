import { get, reducer, service } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  LocalQueryState,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySort,
  QuerySortComparator,
  QuerySortDir,
} from './typings';

@service
export default class LocalQueryService<T = any, S extends LocalQueryState<T> = LocalQueryState<T>> extends QueryService<
  T,
  S
> {
  init(): void {
    this.state.result = this._execute(this.state.data, this.state.filter, this.state.sort);
  }

  @reducer
  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._addFilter(filterOrCriteria, parentFilterId);
    this.refresh();
  }

  @reducer
  addSort(
    field: string,
    dir: QuerySortDir = 'asc',
    comparator: QuerySortComparator = defaultComparator,
    prepend = true,
  ): void {
    this._addSort(field, dir, comparator, prepend);
    this.refresh();
  }

  get data(): T[] {
    return this.state.result || [];
  }

  get initialData(): T[] {
    return this.state.data;
  }

  @reducer
  refresh(): void {
    this.state.result = this._execute(this.initialData, this.filter, this.sort);
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    this._removeFilter(filterId);
    this.refresh();
  }

  @reducer
  removeSort(field: string): void {
    this._removeSort(field);
    this.refresh();
  }

  @reducer
  setData(data: T[]): void {
    this.state.data = data;
    this.refresh();
  }

  @reducer
  setFilter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void {
    this._setFilter(filter);
    this.refresh();
  }

  @reducer
  setSort(field: string, dir: QuerySortDir = 'asc', comparator: QuerySortComparator = defaultComparator): void {
    this._setSort(field, dir, comparator);
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

  protected _applyFilter(item: T, filter: QueryFilter): boolean {
    const operator = filter.operator || 'and';
    let result = true;

    for (const filterOrCriteria of filter.criterias) {
      if (isQueryFilterCriteria(filterOrCriteria)) {
        result = this._applyCriteria(item, filterOrCriteria);
      } else {
        result = this._applyFilter(item, filterOrCriteria);
      }

      if (!result && operator === 'and') return false;
      if (result && operator === 'or') return true;
    }
    return result;
  }

  protected _applySort(data: T[], sorts: QuerySort[]): T[] {
    if (sorts.length > 0) {
      const comparator = function () {
        return function (a: T, b: T): number {
          let result = 0;
          for (const sort of sorts) {
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

  protected _execute(
    data: T[],
    filter?: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[],
    sort?: string | QuerySort | QuerySort[],
  ): T[] {
    // apply filters to data
    let result = data.filter((item) => this._applyFilter(item, this._formatFilter(filter)));

    // apply sort
    result = this._applySort(result, this._formatSort(sort));

    return result;
  }
}
