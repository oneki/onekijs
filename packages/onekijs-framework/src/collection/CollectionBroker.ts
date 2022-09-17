import { CollectionState } from '..';
import { Primitive } from '../types/core';
import { AnonymousObject } from '../types/object';
import { clone, toArray } from '../utils/object';
import {
  Collection,
  CollectionBroker,
  Item,
  Query,
  QueryFilter,
  QueryFilterCriteria,
  QueryFilterCriteriaOperator,
  QueryFilterCriteriaValue,
  QueryFilterId,
  QueryFilterOrCriteria,
  QuerySortBy,
  QuerySortDir,
  UseCollectionOptions,
} from './typings';
import { addFilter, formatFilter, formatSortBy, isSameSortBy, rootFilterId, visitFilter } from './utils';

export default class DefaultCollectionBroker<
  T = any,
  I extends Item<T> = Item<T>,
  S extends CollectionState<T, I> = CollectionState<T, I>,
  C extends Collection<T, I, S> = Collection<T, I, S>,
> implements CollectionBroker<T, I, S>
{
  protected subscribers: AnonymousObject<C> = {};
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

  addFilter(
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId: QueryFilterId = rootFilterId,
    subscriberId?: string,
  ): void {
    if (subscriberId === undefined) {
      const query = this._getQuery();
      addFilter(query, filterOrCriteria, parentFilterId);
      this.filters = query.filter;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.addFilter(filterOrCriteria, parentFilterId));
  }

  addFilterCriteria(
    field: string,
    operator: QueryFilterCriteriaOperator,
    value: string | number | boolean | QueryFilterCriteriaValue[] | null,
    not?: boolean | undefined,
    id?: string | number | symbol | undefined,
    parentFilterId?: string | number | symbol | undefined,
    subscriberId?: string,
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
      subscriberId,
    );
  }

  addSortBy(sortBy: QuerySortBy, prepend?: boolean, subscriberId?: string): void {
    if (subscriberId === undefined) {
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
    }

    this._getSubscribers(subscriberId).forEach((s) => s.addSortBy(sortBy, prepend));
  }

  addSubscriber(id: string, subscriber: C): void {
    if (!this.subscribers[id]) {
      this.subscribers[id] = subscriber;
      if (Array.isArray(this.data)) {
        subscriber.setData(this.data, this.getInitialQuery());
      } else if (this.url !== undefined) {
        subscriber.setUrl(this.url, this.getInitialQuery());
      } else {
        subscriber.query(this.getInitialQuery());
      }
    }
  }

  clearFields(subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.fields = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearFields());
  }

  clearFilter(subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.filters = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearFilter());
  }

  clearParam(key: string, subscriberId?: string): void {
    if (this.params !== undefined && subscriberId === undefined) {
      delete this.params[key];
    }

    this._getSubscribers(subscriberId).forEach((s) => s.clearParam(key));
  }

  clearParams(subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.params = {};
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearParams());
  }

  clearSearch(subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.currentSearch = undefined;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearSearch());
  }

  clearSort(subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.currentSort = undefined;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearSort());
  }

  clearSortBy(subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.sortBys = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearSortBy());
  }

  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[], subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.filters = formatFilter(filter);
    }
    this._getSubscribers(subscriberId).forEach((s) => s.filter(filter));
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

  removeFilter(id: QueryFilterId, subscriberId?: string): void {
    if (subscriberId === undefined) {
      const filter = clone(formatFilter(this.filters));
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
    }

    this._getSubscribers(subscriberId).forEach((s) => s.removeFilter(id));
  }

  removeSortBy(id: string, subscriberId?: string): void {
    if (subscriberId === undefined) {
      const sortBy = formatSortBy(this.sortBys);
      if (sortBy) {
        this.sortBys = sortBy.filter((sort) => sort.id !== id);
      }
    }
    this._getSubscribers(subscriberId).forEach((s) => s.removeSortBy(id));
  }

  removeSubscriber(id: string): void {
    delete this.subscribers[id];
  }

  search(search: Primitive, subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.currentSearch = search;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.search(search));
  }

  setData(data: T[], query?: Query, subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.data = data;
      if (query) {
        this._setQuery(query);
      }
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setData(data, query));
  }

  setFields(fields: string[], subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.fields = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setFields(fields));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any, subscriberId?: string): void {
    if (subscriberId === undefined) {
      if (this.params === undefined) {
        this.params = {};
      }
      this.params[key] = value;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setParam(key, value));
  }

  setParams(params: AnonymousObject, subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.params = params;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setParams(params));
  }

  setUrl(url: string, query?: Query, subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.url = url;
      if (query) {
        this._setQuery(query);
      }
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setUrl(url, query));
  }

  sort(dir: QuerySortDir, subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.currentSort = dir;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.sort(dir));
  }

  sortBy(sortBy: string | QuerySortBy | QuerySortBy[], subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.sortBys = formatSortBy(sortBy);
    }
    this._getSubscribers(subscriberId).forEach((s) => s.sortBy(sortBy));
  }

  protected _getSubscribers(subscriberId?: string) {
    return subscriberId !== undefined ? toArray(this.subscribers[subscriberId]) : Object.values(this.subscribers);
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

  protected _setQuery(query: Query): void {
    this.filters = query.filter;
    this.sortBys = query.sortBy;
    this.fields = query.fields;
    this.currentSearch = query.search;
    this.currentSort = query.sort;
    this.params = query.params;
  }
}
