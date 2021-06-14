import { reducer, service } from '@oneki/core';
import { Location } from '@oneki/types';
import { get } from '@oneki/utils';
import CollectionService from './CollectionService';
import {
  Collection,
  CollectionState,
  Item,
  ItemMeta,
  LoadingItemStatus,
  LocalQuery,
  QueryEngine,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QuerySortBy,
  QuerySortDir,
} from './typings';
import { defaultComparator, isQueryFilterCriteria } from './utils';

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

  getItem(id: string | number): Item<T, M> | undefined {
    if (this.state.items) {
      return this.state.items.find((stateItem) => id === stateItem?.id);
    }
    return undefined;
  }

  getMeta(id: string | number): M | undefined {
    const item = this.getItem(id);
    if (item !== undefined) {
      return item.meta;
    }
    return undefined;
  }

  @reducer
  setData(data: T[]): void {
    this.cache = {};
    const query = this.getQuery();
    this._clearOffset(query);
    this.state.db = data.map((d) => this._adapt(d));
    this.refresh(query);
  }

  @reducer
  setItems(items: Item<T, M>[]): void {
    const query = this.getQuery();
    this._clearOffset(query);
    this.state.db = items;
    this.refresh(query);
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
  protected _onLocationChange(location: Location): void {
    const nextQuery = this._parseLocation(location);
    this._setQuery(nextQuery);
    if (location.relativeurl && this.cache[location.relativeurl]) {
      console.log("FROM CACHE");
      this.state.items = this.cache[location.relativeurl];
    } else {
      const queryEngine: QueryEngine<T, M> = this.state.queryEngine || this._execute.bind(this);
      this.state.items = queryEngine(this.state.db || [], nextQuery);
      if (location.relativeurl) {
        this.cache[location.relativeurl] = this.state.items;
      }
    }
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

  protected _execute(items: Item<T, M>[], query: LocalQuery): Item<T, M>[] {
    // apply filters to data
    let result = items;
    if (query.filter) {
      result = items.filter((item) => this._applyFilter(item, this._formatFilter(query.filter)));
    } else if (query.search) {
      result = items.filter((item) => this._applySearch(item, query.search));
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
