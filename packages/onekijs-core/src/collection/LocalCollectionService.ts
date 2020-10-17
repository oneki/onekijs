import { defaultComparator, isQueryFilterCriteria, rootFilterId } from './utils';
import CollectionService from './CollectionService';
import {
  Collection,
  CollectionState,
  Item,
  ItemMeta,
  LoadingItemStatus,
  LocalQuery,
  Query,
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
import { service, reducer } from '../core/annotations';
import { Primitive, AnonymousObject } from '../core/typings';
import { get, set } from '../core/utils/object';
import { Location } from '../app/typings';

const defaultSearcher = 'i_like';

@service
export default class LocalCollectionService<
  T = any,
  M extends ItemMeta = ItemMeta,
  S extends CollectionState<T, M> = CollectionState<T, M>
> extends CollectionService<T, M, S> implements Collection<T, M> {
  init(): void {
    super.init();
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
  clearParam(key: string): void {
    this._clearParam(key);
    this.refresh();
  }

  @reducer
  clearParams(): void {
    this._clearParams();
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

  @reducer
  load(limit?: number, offset?: number): void {
    this.state.limit = limit;
    this.state.offset = offset;
    this._setPaginatedResult(limit, offset);
  }

  @reducer
  query(query: Query): void {
    if (query.filter || query.search || query.sort || query.sortBy || query.fields) {
      this._clearOffset();
    }
    this._setQuery(query);
    this.refresh();
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
    const queryEngine: QueryEngine<T, M> = this.state.queryEngine || this._execute.bind(this);
    this.state.items = queryEngine(this.state.db || [], {
      filter: this.getFilter(),
      sortBy: this.getSortBy(),
      search: this.getSearch(),
      sort: this.getSort(),
    });
  }

  @reducer
  reset(): void {
    this.state = this.initialState;
    this.refresh();
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
    this.state.db = data.map((d) => this._adapt(d));
    this.refresh();
  }

  @reducer
  setFields(fields: string[]): void {
    this.state.fields = fields;
    this.refresh();
  }

  @reducer
  setItems(items: Item<T, M>[]): void {
    this._clearOffset();
    this.state.db = items;
    this.refresh();
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setMeta(item: Item<T, M>, key: keyof M, value: any): void {
    if (this.state.items && item.id !== undefined) {
      const stateItem = this.state.items.find((stateItem) => item.id === stateItem?.id);
      if (stateItem && item.meta) {
        stateItem.meta = Object.assign({}, item.meta, { [key]: value });
      }
    }
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any): void {
    set(this.state.params, key, value);
    this.refresh();
  }

  @reducer
  setParams(params: AnonymousObject): void {
    this.state.params = params;
    this.refresh();
  }

  @reducer
  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this._setSortBy(sortBy);
    this.refresh();
  }

  @reducer
  protected _onLocationChange(location: Location): void {
    this._setQuery(this._parseLocation(location));
    this.refresh();
  }

  protected _applyCriteria(item: Item<T, M>, criteria: QueryFilterCriteria): boolean {
    const operator = criteria.operator || 'eq';
    const value = criteria.value;
    const source = get(item.data, criteria.field);
    const not = criteria.not;
    const result = this._applyOperator(operator, source, value);
    return not ? !result : result;
  }

  protected _applyFields(items: Item<T, M>[], fields?: string[]): Item<T, M>[] {
    if (fields && fields.length > 0) {
      return items.map((item) => {
        const { data, ...nextItem } = item;
        if (data) {
          return fields.reduce((accumulator, field) => {
            accumulator.data = accumulator.data || {};
            accumulator.data[field] = (item as any).data[field];
            return accumulator;
          }, nextItem as any) as Item<T, M>;
        }
        return item;
      });
    }
    return items;
  }

  protected _applyFilter(item: Item<T, M>, filter?: QueryFilter): boolean {
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
    left: any,
    right?: QueryFilterCriteriaValue | QueryFilterCriteriaValue[],
  ): boolean {
    switch (operator) {
      case 'ends_with':
        return String(left).endsWith(String(right));
      case 'i_ends_with':
        return String(left).toUpperCase().endsWith(String(right).toUpperCase());
      case 'like':
        return String(left).includes(String(right));
      case 'i_like':
        return String(left).toUpperCase().includes(String(right).toUpperCase());
      case 'starts_with':
        return String(left).startsWith(String(right));
      case 'i_starts_with':
        return String(left).toUpperCase().startsWith(String(right).toUpperCase());
      case 'eq':
        return String(left).startsWith(String(right));
      case 'i_eq':
        return String(left).toUpperCase().startsWith(String(right).toUpperCase());
      case 'regex':
        return new RegExp(String(right)).test(String(left));
      case 'i_regex':
        return new RegExp(String(right), 'i').test(String(left));
      default:
        return true;
    }
  }

  protected _applySearch(item: Item<T, M>, search?: QueryFilterCriteriaValue): boolean {
    const searcher = this.state.searcher || defaultSearcher;
    if (item.data === undefined) {
      return false;
    }
    if (typeof searcher === 'function') {
      return searcher(item.data, search);
    }
    return this._applyOperator(searcher, item, search);
  }

  protected _applySort(items: Item<T, M>[], dir?: QuerySortDir): Item<T, M>[] {
    if (dir) {
      const comparator = this.state.comparator || defaultComparator;
      const itemComparator = function (a: Item<T, M>, b: Item<T, M>): number {
        const reverse = dir === 'desc' ? -1 : 1;
        return reverse * comparator(a.data, b.data);
      };

      items = items.sort(itemComparator);
    }
    return items;
  }

  protected _applySortBy(items: Item<T, M>[], sortBy?: QuerySortBy[]): Item<T, M>[] {
    if (sortBy && sortBy.length > 0) {
      const comparator = function () {
        return function (a: Item<T, M>, b: Item<T, M>): number {
          let result = 0;
          for (const sort of sortBy) {
            const comparator = sort.comparator || defaultComparator;
            const reverse = sort.dir === 'desc' ? -1 : 1;
            result = reverse * comparator(get(a.data, sort.field), get(b.data, sort.field));
            if (result !== 0) break;
          }
          return result;
        };
      };
      items = items.sort(comparator());
    }
    return items;
  }

  protected _clearOffset(): void {
    if (this.state.offset !== undefined) {
      this.state.offset = 0;
    }
  }

  protected _execute(items: Item<T, M>[], query: LocalQuery): Item<T, M>[] {
    // apply filters to data
    let result = items;
    if (query.filter) {
      result = items.filter((item) => this._applyFilter(item, this._formatFilter(query.filter)));
    } else if (query.search) {
      result = items.filter((item) => this._applySearch(item, this.state.search));
    } else {
      result = Object.assign([], items);
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

  @reducer
  protected _setLoading(
    options: {
      status?: LoadingItemStatus;
      limit?: number;
      offset?: number;
      resetLimit?: boolean;
      resetData?: boolean;
    } = {},
  ): void {
    this.state.limit = options.limit;
    this.state.offset = options.offset;
  }
}
