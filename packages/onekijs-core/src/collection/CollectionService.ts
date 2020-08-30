import { defaultComparator, isQueryFilterCriteria, rootFilterId, visitFilter, toCollectionItem } from './utils';
import {
  CollectionState,
  Item,
  ItemMeta,
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortComparator,
  QuerySortDir,
  Collection,
  CollectionStatus,
  LoadingStatus,
  ItemAdapter,
} from './typings';
import Service from '../core/Service';
import { Primitive } from '../core/typings';
import { get } from '../core/utils/object';
import { reducer } from '../core/annotations';

export default abstract class CollectionService<
  T = any,
  M extends ItemMeta = ItemMeta,
  S extends CollectionState<T, M> = CollectionState<T, M>
> extends Service<S> implements Collection<T, M> {
  abstract addFilter(
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId?: string | number | symbol | undefined,
  ): void;
  abstract addFilterCriteria(
    field: string,
    operator: import('./typings').QueryFilterCriteriaOperator,
    value: string | number | boolean | import('./typings').QueryFilterCriteriaValue[] | null,
    not?: boolean | undefined,
    id?: string | number | symbol | undefined,
    parentFilterId?: string | number | symbol | undefined,
  ): void;
  abstract addSortBy(
    field: string,
    dir?: 'asc' | 'desc' | undefined,
    comparator?: QuerySortComparator | undefined,
    prepend?: boolean | undefined,
  ): void;
  abstract clearFields(): void;
  abstract clearFilter(): void;
  abstract clearSearch(): void;
  abstract clearSort(): void;
  abstract clearSortBy(): void;
  abstract filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | null): void;
  abstract load(size?: number | undefined, offset?: number | undefined): void;
  abstract query(query: Query): void;
  abstract refresh(): void;
  abstract removeFilter(filterId: string | number | symbol): void;
  abstract removeSortBy(field: string): void;
  abstract search(search: Primitive): void;
  abstract setData(data: T[]): void;
  abstract setFields(fields: string[]): void;
  abstract setItems(items: Item<T, M>[]): void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  abstract setMeta(item: Item<T, M>, key: keyof M, value: any): void;
  abstract sort(dir: QuerySortDir): void;
  abstract sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void;

  get items(): (Item<T, M> | undefined)[] | undefined {
    return this.state.items;
  }

  get status(): CollectionStatus {
    return this.state.status || LoadingStatus.Loaded;
  }

  get total(): number | undefined {
    return this.state.items?.length;
  }

  getAdapter(): ItemAdapter<T, M> | undefined {
    return this.state.adapter;
  }

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

  protected _adapt(data: T | undefined): Item<T, M> {
    return toCollectionItem(data, this.state.adapter);
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

  protected _getId(data: T): string | undefined {
    return this._adapt(data).id;
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
    this.state.size = size;
    this.state.offset = offset;
  }

  @reducer
  protected _setQuery(query: Query): void {
    this.state.filter = this._formatFilter(query.filter);
    this.state.sort = query.sort;
    this.state.sortBy = this._formatSortBy(query.sortBy);
    this.state.search = query.search;
    this.state.fields = query.fields;
    this.state.offset = query.offset;
    this.state.size = query.size;
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
