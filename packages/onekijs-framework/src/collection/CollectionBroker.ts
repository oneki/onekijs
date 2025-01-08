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
  protected subscriberFilters: AnonymousObject<
    QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | undefined
  > = {};

  protected sortBys: string | QuerySortBy | QuerySortBy[] | undefined;
  protected subscriberSortBys: AnonymousObject<string | QuerySortBy | QuerySortBy[] | undefined> = {};

  protected fields: string[] | undefined;
  protected subscriberFields: AnonymousObject<string[] | undefined> = {};

  protected params: AnonymousObject | undefined;
  protected subscriberParams: AnonymousObject<AnonymousObject | undefined> = {};

  protected currentSearch: Primitive | undefined;
  protected subscriberSearch: AnonymousObject<Primitive | undefined> = {};

  protected currentSort: QuerySortDir | undefined;
  protected subscriberSort: AnonymousObject<QuerySortDir | undefined> = {};

  protected data: T[] | undefined;
  protected subscriberData: AnonymousObject<T[] | undefined> = {};

  protected url: string | undefined;
  protected subscriberUrl: AnonymousObject<string | undefined> = {};

  protected initialLimit: number | undefined;
  protected initialOffset: number | undefined;

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
    this.initialLimit = options.initialLimit;
    this.initialOffset = options.initialOffset;
  }

  addFilter(
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId: QueryFilterId = rootFilterId,
    subscriberId?: string,
  ): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberFilters).forEach((subscriberId) => {
        this._addFilter(filterOrCriteria, parentFilterId, subscriberId);
      });
      this._addFilter(filterOrCriteria, parentFilterId);
    } else {
      this._addFilter(filterOrCriteria, parentFilterId, subscriberId);
    }

    this._getSubscribers(subscriberId).forEach((s) => s.addFilter(filterOrCriteria, parentFilterId));
  }

  protected _addFilter(
    filterOrCriteria: QueryFilterOrCriteria,
    parentFilterId: QueryFilterId = rootFilterId,
    subscriberId?: string,
  ): void {
    const query = this._getQuery(subscriberId);
    addFilter(query, filterOrCriteria, parentFilterId);
    if (subscriberId === undefined) {
      this.filters = query.filter;
    } else {
      this.subscriberFilters[subscriberId] = query.filter;
    }
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
      Object.keys(this.subscriberSortBys).forEach((subscriberId) => {
        this._addSortBy(sortBy, prepend, subscriberId);
      });
      this._addSortBy(sortBy, prepend);
    } else {
      this._addSortBy(sortBy, prepend, subscriberId);
    }

    this._getSubscribers(subscriberId).forEach((s) => s.addSortBy(sortBy, prepend));
  }

  protected _addSortBy(sortBy: QuerySortBy, prepend?: boolean, subscriberId?: string): void {
    const sortBys = formatSortBy(this.getSortBy(subscriberId));
    if (sortBys) {
      if (subscriberId === undefined) {
        this.sortBys = sortBys.filter((s) => !isSameSortBy(sortBy, s));
      } else {
        this.subscriberSortBys[subscriberId] = sortBys.filter((s) => !isSameSortBy(sortBy, s));
      }
    }
    const currentSortBy = (formatSortBy(this.getSortBy(subscriberId)) || []).slice(0);
    if (prepend) {
      currentSortBy.unshift(sortBy);
    } else {
      currentSortBy.push(sortBy);
    }

    if (subscriberId === undefined) {
      this.sortBys = currentSortBy;
    } else {
      this.subscriberSortBys[subscriberId] = currentSortBy;
    }
  }

  addSubscriber(subscriberId: string, subscriber: C): void {
    if (!this.subscribers[subscriberId]) {
      this.subscribers[subscriberId] = subscriber;
      const initialUrl = this.getUrl(subscriberId);
      const initialQuery = this.getInitialQuery(subscriberId);
      let initialData = undefined;
      if (!initialUrl) {
        initialData = this.getData(subscriberId);
      }
      subscriber.onSubscribe(initialData, initialUrl, initialQuery);
    }
  }

  clearFields(subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberFields).forEach((subscriberId) => {
        this.subscriberFields[subscriberId] = [];
      });
      this.fields = [];
    } else {
      this.subscriberFields[subscriberId] = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearFields());
  }

  clearFilter(subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberFilters).forEach((subscriberId) => {
        this.subscriberFilters[subscriberId] = [];
      });
      this.filters = [];
    } else {
      this.subscriberFilters[subscriberId] = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearFilter());
  }

  clearParam(key: string, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberParams).forEach((subscriberId) => {
        const params = this.subscriberParams[subscriberId];
        if (params !== undefined) {
          delete params[key];
        }
      });
      if (this.params !== undefined) {
        delete this.params[key];
      }
    } else {
      const params = this.subscriberParams[subscriberId];
      if (params !== undefined) {
        delete params[key];
      }
    }

    this._getSubscribers(subscriberId).forEach((s) => s.clearParam(key));
  }

  clearParams(subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberParams).forEach((subscriberId) => {
        this.subscriberParams[subscriberId] = {};
      });
      this.params = {};
    } else {
      this.subscriberParams[subscriberId] = {};
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearParams());
  }

  clearSearch(subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSearch).forEach((subscriberId) => {
        this.subscriberSearch[subscriberId] = undefined;
      });
      this.currentSearch = undefined;
    } else {
      this.subscriberSearch[subscriberId] = undefined;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearSearch());
  }

  clearSort(subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSort).forEach((subscriberId) => {
        this.subscriberSort[subscriberId] = undefined;
      });
      this.currentSort = undefined;
    } else {
      this.subscriberSort[subscriberId] = undefined;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearSort());
  }

  clearSortBy(subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSortBys).forEach((subscriberId) => {
        this.subscriberSortBys[subscriberId] = undefined;
      });
      this.sortBys = [];
    } else {
      this.subscriberSortBys[subscriberId] = [];
    }
    this._getSubscribers(subscriberId).forEach((s) => s.clearSortBy());
  }

  filter(filter: QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[], subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberFilters).forEach((subscriberId) => {
        this.subscriberFilters[subscriberId] = formatFilter(filter);
      });
      this.filters = formatFilter(filter);
    } else {
      this.subscriberFilters[subscriberId] = formatFilter(filter);
    }
    this._getSubscribers(subscriberId).forEach((s) => s.filter(filter));
  }

  getData(subscriberId?: string): T[] | undefined {
    return subscriberId && this.subscriberData[subscriberId] ? this.subscriberData[subscriberId] : this.data;
  }

  getFields(subscriberId?: string): string[] | undefined {
    return subscriberId && this.subscriberFields[subscriberId] ? this.subscriberFields[subscriberId] : this.fields;
  }

  getFilter(subscriberId?: string): QueryFilter | QueryFilterCriteria | QueryFilterOrCriteria[] | undefined {
    return subscriberId && this.subscriberFilters[subscriberId] ? this.subscriberFilters[subscriberId] : this.filters;
  }

  getInitialQuery(subscriberId?: string): Query {
    return {
      filter: formatFilter(this.getFilter(subscriberId)),
      sortBy: formatSortBy(this.getSortBy(subscriberId)),
      fields: this.getFields(subscriberId),
      search: this.getSearch(subscriberId),
      sort: this.getSort(subscriberId),
      params: this.getParams(subscriberId),
      limit: this.initialLimit,
      offset: this.initialOffset,
    };
  }

  getInitialDataSource(subscriberId?: string): T[] | string | undefined {
    if (Array.isArray(this.getData(subscriberId))) {
      return this.data;
    }
    return this.getUrl(subscriberId);
  }

  getParams(subscriberId?: string): AnonymousObject | undefined {
    return subscriberId && this.subscriberParams[subscriberId] ? this.subscriberParams[subscriberId] : this.params;
  }

  getSearch(subscriberId?: string): Primitive | undefined {
    return subscriberId && this.subscriberSearch[subscriberId]
      ? this.subscriberSearch[subscriberId]
      : this.currentSearch;
  }

  getSort(subscriberId?: string): QuerySortDir | undefined {
    return subscriberId && this.subscriberSort[subscriberId] ? this.subscriberSort[subscriberId] : this.currentSort;
  }

  getSortBy(subscriberId?: string): string | QuerySortBy | QuerySortBy[] | undefined {
    return subscriberId && this.subscriberSortBys[subscriberId] ? this.subscriberSortBys[subscriberId] : this.sortBys;
  }

  getUrl(subscriberId?: string): string | undefined {
    return subscriberId && this.subscriberUrl[subscriberId] ? this.subscriberUrl[subscriberId] : this.url;
  }

  refresh(query?: Query, subscriberId?: string): void {
    this._getSubscribers(subscriberId).forEach((s) => s.refresh(query));
  }

  removeFilter(id: QueryFilterId, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberFilters).forEach((subscriberId) => {
        this._removeFilter(id, subscriberId);
      });
      this._removeFilter(id);
    } else {
      this._removeFilter(id, subscriberId);
    }

    this._getSubscribers(subscriberId).forEach((s) => s.removeFilter(id));
  }

  protected _removeFilter(id: QueryFilterId, subscriberId?: string): void {
    const filter = clone(formatFilter(this.getFilter(subscriberId)));
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
      if (subscriberId === undefined) {
        this.filters = filter;
      } else {
        this.subscriberFilters[subscriberId] = filter;
      }
    }
  }

  removeSortBy(id: string, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSortBys).forEach((subscriberId) => {
        this._removeSortBy(id, subscriberId);
      });
      this._removeSortBy(id);
    } else {
      this._removeSortBy(id, subscriberId);
    }

    this._getSubscribers(subscriberId).forEach((s) => s.removeSortBy(id));
  }

  protected _removeSortBy(id: string, subscriberId?: string): void {
    const sortBy = formatSortBy(this.getSortBy(subscriberId));
    if (sortBy) {
      if (subscriberId === undefined) {
        this.sortBys = sortBy.filter((sort) => sort.id !== id);
      } else {
        this.subscriberSortBys[subscriberId] = sortBy.filter((sort) => sort.id !== id);
      }
    }
  }

  removeSubscriber(id: string): void {
    delete this.subscribers[id];
  }

  search(search: Primitive, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSearch).forEach((subscriberId) => {
        this.subscriberSearch[subscriberId] = search;
      });
      this.currentSearch = search;
    } else {
      this.subscriberSearch[subscriberId] = search;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.search(search));
  }

  setData(data: T[], query?: Query, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberData).forEach((subscriberId) => {
        this.subscriberData[subscriberId] = data;
      });
      this.data = data;
    } else {
      this.subscriberData[subscriberId] = data;
    }

    if (query) {
      this._setQuery(query, subscriberId);
    }

    this._getSubscribers(subscriberId).forEach((s) => s.setData(data, query));
  }

  setFields(fields: string[], subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberFields).forEach((subscriberId) => {
        this.subscriberFields[subscriberId] = fields;
      });
      this.fields = fields;
    } else {
      this.subscriberFields[subscriberId] = fields;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setFields(fields));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setParam(key: string, value: any, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberParams).forEach((subscriberId) => {
        if (this.subscriberParams[subscriberId] === undefined) {
          this.subscriberParams[subscriberId] = this.params || {};
        }
        (this.subscriberParams[subscriberId] as any) = Object.assign({}, this.subscriberParams[subscriberId], {
          [key]: value
        });
      });
      if (this.params === undefined) {
        this.params = {};
      }
      this.params[key] = value;
    } else {

      if (this.subscriberParams[subscriberId] === undefined) {
        this.subscriberParams[subscriberId] = this.params || {};
      }
      (this.subscriberParams[subscriberId] as any) = Object.assign({}, this.subscriberParams[subscriberId], {
        [key]: value
      });
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setParam(key, value));
  }

  setParams(params: AnonymousObject, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberParams).forEach((subscriberId) => {
        this.subscriberParams[subscriberId] = params;
      });
      this.params = params;
    } else {
      this.subscriberParams[subscriberId] = params;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setParams(params));
  }

  setUrl(url: string, query?: Query, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberUrl).forEach((subscriberId) => {
        this.subscriberUrl[subscriberId] = url;
      });
      this.url = url;
    } else {
      this.subscriberUrl[subscriberId] = url;
    }

    if (query) {
      this._setQuery(query);
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setUrl(url, query));
  }

  sort(dir: QuerySortDir, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSort).forEach((subscriberId) => {
        this.subscriberSort[subscriberId] = dir;
      });
      this.currentSort = dir;
    } else {
      this.subscriberSort[subscriberId] = dir;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.sort(dir));
  }

  sortBy(sortBy: string | QuerySortBy | QuerySortBy[], subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscriberSortBys).forEach((subscriberId) => {
        this.subscriberSortBys[subscriberId] = formatSortBy(sortBy);
      });
      this.sortBys = formatSortBy(sortBy);
    } else {
      this.subscriberSortBys[subscriberId] = formatSortBy(sortBy);
    }
    this._getSubscribers(subscriberId).forEach((s) => s.sortBy(sortBy));
  }

  protected _getSubscribers(subscriberId?: string) {
    return subscriberId !== undefined ? toArray(this.subscribers[subscriberId]) : Object.values(this.subscribers);
  }

  protected _getQuery(subscriberId?: string): Query {
    return {
      filter: formatFilter(this.getFilter(subscriberId)),
      sortBy: formatSortBy(this.getSortBy(subscriberId)),
      fields: this.getFields(subscriberId),
      search: this.getSearch(subscriberId),
      sort: this.getSort(subscriberId),
      params: this.getParams(subscriberId),
    };
  }

  protected _setQuery(query: Query, subscriberId?: string): void {
    if (subscriberId === undefined) {
      Object.keys(this.subscribers).forEach((subscriberId) => {
        this.subscriberFilters[subscriberId] = query.filter;
        this.subscriberSortBys[subscriberId] = query.sortBy;
        this.subscriberFields[subscriberId] = query.fields;
        this.subscriberSearch[subscriberId] = query.search;
        this.subscriberSort[subscriberId] = query.sort;
        this.subscriberParams[subscriberId] = query.params;
      });
      this.filters = query.filter;
      this.sortBys = query.sortBy;
      this.fields = query.fields;
      this.currentSearch = query.search;
      this.currentSort = query.sort;
      this.params = query.params;
    } else {
      this.subscriberFilters[subscriberId] = query.filter;
      this.subscriberSortBys[subscriberId] = query.sortBy;
      this.subscriberFields[subscriberId] = query.fields;
      this.subscriberSearch[subscriberId] = query.search;
      this.subscriberSort[subscriberId] = query.sort;
      this.subscriberParams[subscriberId] = query.params;
    }
  }
}
