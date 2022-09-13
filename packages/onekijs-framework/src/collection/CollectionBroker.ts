import { CollectionState } from '..';
import { Primitive } from '../types/core';
import { AnonymousObject } from '../types/object';
import {
  Collection,
  CollectionBroker, Item,
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortDir,
  UseCollectionOptions
} from './typings';
import { addFilter, formatFilter, formatSortBy, isSameSortBy, rootFilterId, visitFilter } from './utils';

export default class DefaultCollectionBroker<
  T = any,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends Collection<T, I, S> = Collection<T, I, S>,
> implements CollectionBroker<T, I, S>
{
  protected subscribers: C[] = [];
  protected filters: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | undefined;
  protected sortBys: string | QuerySortBy | QuerySortBy[] | undefined;
  protected fields: string[] | undefined;
  protected params: AnonymousObject | undefined;
  protected currentSearch: Primitive | undefined;
  protected currentSort: QuerySortDir | undefined;
  protected initialLimit: number | undefined;
  protected initialOffset: number | undefined;
  protected data: T[] | undefined;
  protected url: string | undefined;

  constructor(dataSource: T[] | string | undefined, options: UseCollectionOptions<T, I>) {
    if (Array.isArray(dataSource)) {
      this.data = dataSource;
    } else if (typeof dataSource === 'string') {
      this.url = dataSource;
    }
    this.filters = options.initialFilter;
    this.sortBys = options.initialSortBy;
    this.fields = options.initialFields;
    this.params = options.initialParams;
    this.currentSearch = options.initialSearch;
    this.currentSort = options.initialSort;
  }

  addFilter(filterOrCriteria: QueryFilterOrCriteria, parentFilterId: QueryFilterId = rootFilterId): void {
    const query = this._getQuery();
    addFilter(query, filterOrCriteria, parentFilterId);
    this.filters = query.filter;

    this.subscribers.forEach((s) => s.addFilter(filterOrCriteria, parentFilterId));
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
    const sortBys = formatSortBy(this.sortBys);
    if (sortBys) {
      this.sortBys = sortBys.filter((s) => !isSameSortBy(sortBy, s));
    }

    const currentSortBy = (formatSortBy(this.sortBys) || []).slice(0);
    if (prepend) {
      currentSortBy.unshift(sortBy);
    } else {
      currentSortBy.push(sortBy);
    }
    this.sortBys = currentSortBy;
    this.subscribers.forEach((s) => s.addSortBy(sortBy, prepend));
  }

  addSubscriber(subscriber: C): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index === -1) {
      this.subscribers.push(subscriber);
      if (Array.isArray(this.data)) {
        subscriber.setData(this.data, this.getInitialQuery());
      } else if (this.url !== undefined) {
        subscriber.setUrl(this.url, this.getInitialQuery());
      } else {
        subscriber.query(this.getInitialQuery());
      }
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
    if (this.params !== undefined) {
      delete this.params[key];
    }

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
    this.filters = formatFilter(filter);
    this.subscribers.forEach((s) => s.filter(filter));
  }

  getInitialQuery(): Query {
    return {
      filter: formatFilter(this.filters),
      sortBy: formatSortBy(this.sortBys),
      fields: this.fields,
      search: this.currentSearch,
      sort: this.currentSort,
      params: this.params,
      limit: this.initialLimit,
      offset: this.initialOffset,
    };
  }

  getInitialDataSource(): T[] | string | undefined {
    if (Array.isArray(this.data)) {
      return this.data;
    }
    return this.url;
  }

  removeFilter(id: QueryFilterId): void {
    const filter = formatFilter(this.filters);
    if (filter) {
      visitFilter(filter, (filter) => {
        for (const i in filter.criterias) {
          if (filter.criterias[i].id === id) {
            filter.criterias.splice(parseInt(i), 1);
            return true;
          }
        }
        return false;
      });
      this.filters = filter;
    }

    this.subscribers.forEach((s) => s.removeFilter(id));
  }

  removeSortBy(id: string): void {
    const sortBy = formatSortBy(this.sortBys);
    if (sortBy) {
      this.sortBys = sortBy.filter((sort) => sort.id !== id);
    }
    this.subscribers.forEach((s) => s.removeSortBy(id));
  }

  removeSubscriber(subscriber: C): void {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
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
    if (this.params === undefined) {
      this.params = {};
    }
    this.params[key] = value;
    this.subscribers.forEach((s) => s.setParam(key, value));
  }

  setParams(params: AnonymousObject): void {
    this.params = params;
    this.subscribers.forEach((s) => s.setParams(params));
  }

  setUrl(url: string): void {
    this.url = url;
    this.subscribers.forEach((s) => s.setUrl(url));
  }

  sort(dir: QuerySortDir): void {
    this.currentSort = dir;
    this.subscribers.forEach((s) => s.sort(dir));
  }

  sortBy(sortBy: string | QuerySortBy | QuerySortBy[]): void {
    this.sortBys = formatSortBy(sortBy);
    this.subscribers.forEach((s) => s.sortBy(sortBy));
  }

  protected _getQuery(): Query {
    return {
      filter: formatFilter(this.filters),
      sortBy: formatSortBy(this.sortBys),
      fields: this.fields,
      search: this.currentSearch,
      sort: this.currentSort,
      params: this.params,
    };
  }
}
