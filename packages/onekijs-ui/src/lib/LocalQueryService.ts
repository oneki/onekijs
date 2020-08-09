import { get, Primitive, reducer, service } from 'onekijs';
import { defaultComparator, isQueryFilterCriteria, rootFilterId } from '../utils/query';
import QueryService from './QueryService';
import {
  LocalCollection,
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

const defaultSearcher = 'i_like';

@service
export default class LocalQueryService<T = any, S extends LocalQueryState<T> = LocalQueryState<T>>
  extends QueryService<S>
  implements LocalCollection<T> {
  init(): void {
    this.refresh();
  }

  @reducer
  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    this._clearOffset();
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
  clearFields(): void {
    this.state.fields = [];
    this.refresh();
  }

  @reducer
  clearFilter(): void {
    this._clearOffset();
    this._clearFilter();
    this.refresh();
  }

  @reducer
  clearSearch(): void {
    this._clearOffset();
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
    this._clearOffset();
    this._setFilter(filter);
    this.refresh();
  }

  get data(): T[] {
    return this.state.result || [];
  }

  get loading(): boolean {
    return false;
  }

  get paginatedData(): T[] {
    return this.state.paginatedResult || this.data;
  }

  get total(): number | undefined {
    if (this.state.result !== undefined) {
      return this.state.result.length;
    }
    return undefined;
  }

  @reducer
  load(size?: number, offset?: number): void {
    this.state.size = size;
    this.state.offset = offset;
    this._setPaginatedResult(size, offset);
  }

  @reducer
  search(search: Primitive): void {
    this._clearOffset();
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
    this.state.result = queryEngine(this.state.data, {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      search: this.getSearch(),
      sort: this.getSort(),
    });
    this._setPaginatedResult(this.state.size, this.state.offset);
  }

  @reducer
  removeFilter(filterId: QueryFilterId): void {
    this._clearOffset();
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
    this._clearOffset();
    this.state.data = data;
    this.refresh();
  }

  @reducer
  setFields(fields: string[]): void {
    this.state.fields = fields;
    this.refresh();
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setSortBy(sortBy);
    this.refresh();
  }

  protected _applyCriteria(item: T, criteria: QueryFilterCriteria): boolean {
    const operator = criteria.operator || 'eq';
    const value = criteria.value;
    const source = get(item, criteria.field);
    const not = criteria.not;
    const result = this._applyOperator(operator, source, value);
    return not ? !result : result;
  }

  protected _applyFields(items: T[], fields?: string[]): T[] {
    if (fields && fields.length > 0) {
      return items.map((item) => {
        return fields.reduce((accumulator, field) => {
          accumulator[field] = (item as any)[field];
          return accumulator;
        }, {} as any) as T;
      });
    }
    return items;
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

  protected _applyOperator(
    operator: QueryFilterCriteriaOperator,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    item: any,
    value?: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
  ): boolean {
    switch (operator) {
      case 'ends_with':
        return String(item).endsWith(String(value));
      case 'i_ends_with':
        return String(item).toUpperCase().endsWith(String(value).toUpperCase());
      case 'like':
        return String(item).includes(String(value));
      case 'i_like':
        return String(item).toUpperCase().includes(String(value).toUpperCase());
      case 'starts_with':
        return String(item).startsWith(String(value));
      case 'i_starts_with':
        return String(item).toUpperCase().startsWith(String(value).toUpperCase());
      case 'eq':
        return String(item).startsWith(String(value));
      case 'i_eq':
        return String(item).toUpperCase().startsWith(String(value).toUpperCase());
      case 'regex':
        return new RegExp(String(value)).test(String(item));
      case 'i_regex':
        return new RegExp(String(value), 'i').test(String(item));
      default:
        return true;
    }
  }

  protected _applySearch(item: T, search?: QueryFilterCriteriaValue): boolean {
    const searcher = this.state.searcher || defaultSearcher;
    if (typeof searcher === 'function') {
      return searcher(item, search);
    }
    return this._applyOperator(searcher, item, search);
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

  protected _clearOffset(): void {
    if (this.state.offset !== undefined) {
      this.state.offset = 0;
    }
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

    // apply field subset
    if (query.fields && query.fields.length > 0) {
      result = this._applyFields(result, query.fields);
    }

    return result;
  }

  protected _setPaginatedResult(size?: number, offset?: number): void {
    if (this.state.result !== undefined) {
      if (!size) {
        size = this.state.result.length;
      }
      if (!offset) {
        offset = 0;
      }
      this.state.paginatedResult = this.state.result.slice(offset, offset + size);
    }
  }
}
