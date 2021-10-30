import { Primitive } from '../types/core';
import { AnonymousObject } from '../types/object';
import {
  Collection,
  CollectionBroker,
  ItemMeta,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortDir,
  Item,
} from './typings';
import { formatFilter, formatSortBy, rootFilterId } from './utils';

export default class DefaultCollectionBroker<T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>>
  implements CollectionBroker<T, M, I> {
  protected subscribers: Collection<T, M, I>[] = [];
  protected filters: {
    parentFilterId: QueryFilterId;
    filter: QueryFilter;
    id?: QueryFilterId;
  }[] = [];
  protected sortBys: { sortBy: QuerySortBy; id?: string }[] = [];
  protected fields: string[] = [];
  protected params: AnonymousObject = {};
  protected currentSearch: Primitive | undefined;
  protected currentSort: QuerySortDir | undefined;
  protected data: T[] | undefined;

  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    const filter = formatFilter(filterOrCriteria);
    if (!filter) return;
    const filters = this.filters.filter((f) => filter.id === undefined || f.id !== filter.id);
    filters.push({
      id: filter.id,
      parentFilterId,
      filter,
    });
    this.subscribers.forEach((s) => s.addFilter(filter, parentFilterId));
  }

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

  addSortBy(sortBy: QuerySortBy, prepend?: boolean): void {
    const sortBys = this.sortBys.filter((s) => sortBy.id === undefined || s.id !== sortBy.id);
    if (prepend) {
      sortBys.unshift({
        id: sortBy.id,
        sortBy,
      });
    } else {
      sortBys.push({
        id: sortBy.id,
        sortBy,
      });
    }
    this.subscribers.forEach((s) => s.addSortBy(sortBy, prepend));
  }

  addSubscriber(subscriber: Collection<T, M, I>): void {
    const service = subscriber.asService();
    const index = this.subscribers.indexOf(service);
    if (index === -1) {
      this.subscribers.push(service);
    }
  }

  clearFields(): void {
    this.fields = [];
    this.subscribers.forEach((s) => s.clearFields());
  }

  clearFilter(): void {
    this.filters = [];
    this.subscribers.forEach((s) => s.clearFilter());
  }

  clearParam(key: string): void {
    delete this.params[key];
    this.subscribers.forEach((s) => s.clearParam(key));
  }

  clearParams(): void {
    this.params = {};
    this.subscribers.forEach((s) => s.clearParams());
  }

  clearSearch(): void {
    this.currentSearch = undefined;
    this.subscribers.forEach((s) => s.clearSearch());
  }

  clearSort(): void {
    this.currentSort = undefined;
    this.subscribers.forEach((s) => s.clearSort());
  }

  clearSortBy(): void {
    this.sortBys = [];
    this.subscribers.forEach((s) => s.clearSortBy());
  }

  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[]): void {
    const f = formatFilter(filter);
    if (f) {
      this.filters = [
        {
          id: rootFilterId,
          parentFilterId: rootFilterId,
          filter: f,
        },
      ];
    } else {
      this.filters = [];
    }

    this.subscribers.forEach((s) => s.filter(filter));
  }

  removeFilter(id: QueryFilterId): void {
    this.filters = this.filters.filter((f) => f.id !== id);
    this.subscribers.forEach((s) => s.removeFilter(id));
  }

  removeSortBy(id: string): void {
    this.sortBys = this.sortBys.filter((s) => s.id !== id);
    this.subscribers.forEach((s) => s.removeSortBy(id));
  }

  removeSubscriber(subscriber: Collection<T, M, I>): void {
    const service = subscriber.asService();
    this.subscribers = this.subscribers.filter((s) => s !== service);
  }

  search(search: Primitive): void {
    this.currentSearch = search;
    this.subscribers.forEach((s) => s.search(search));
  }

  setData(data: T[]): void {
    this.data = data;
    this.subscribers.forEach((s) => s.setData(data));
  }

  setFields(fields: string[]): void {
    this.fields = [];
    this.subscribers.forEach((s) => s.setFields(fields));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any): void {
    this.params[key] = value;
    this.subscribers.forEach((s) => s.setParam(key, value));
  }

  setParams(params: AnonymousObject): void {
    this.params = params;
    this.subscribers.forEach((s) => s.setParams(params));
  }

  sort(dir: QuerySortDir): void {
    this.currentSort = dir;
    this.subscribers.forEach((s) => s.sort(dir));
  }

  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this.sortBys = (formatSortBy(sortBy) || []).map((s) => {
      return {
        sortBy: s,
        id: undefined,
      };
    });
    this.subscribers.forEach((s) => s.sortBy(sortBy));
  }
}
