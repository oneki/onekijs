import { useEffect, useMemo } from 'react';
import { toCollectionItem } from './utils';
import CollectionService from './CollectionService';
import LocalCollectionService from './LocalCollectionService';
import RemoteCollectionService from './RemoteCollectionService';
import {
  Collection,
  CollectionFetcherResult,
  CollectionState,
  LoadingStatus,
  Query,
  UseCollectionOptions,
  ItemMeta,
} from './typings';
import useService from '../core/useService';
import { FetchOptions, Fetcher, HttpMethod } from '../fetch/typings';
import { omit } from '../core/utils/object';
import { AnonymousObject } from '../core/typings';
import { asyncHttp } from '../fetch/utils';

const useCollection = <T = any, M extends ItemMeta = ItemMeta>(
  dataOrUrl: T[] | string,
  options: UseCollectionOptions<T, M> = {},
): Collection<T, M> => {
  const ctor = Array.isArray(dataOrUrl) || options.fetchOnce ? LocalCollectionService : RemoteCollectionService;
  const [state, service] = useService<CollectionState<T, M>, CollectionService<T, M, CollectionState<T, M>>>(
    ctor,
    () => {
      const fetchOptions = Object.assign(
        { delayLoading: 0 },
        omit<FetchOptions<CollectionFetcherResult<T>, Query | undefined>>(options, [
          'adapter',
          'comparator',
          'fetchOnce',
          'initialFields',
          'initialFilter',
          'initialSearch',
          'initialSort',
          'initialSortBy',
          'method',
          'queryEngine',
          'searcher',
          'serializer',
          'throttle',
        ]),
      );

      return {
        adapter: options.adapter,
        comparator: options.comparator,
        db: Array.isArray(dataOrUrl) ? dataOrUrl.map((data) => toCollectionItem(data, options.adapter)) : undefined,
        fetchOptions,
        fields: options.initialFields,
        filter: options.initialFilter,
        method: options.method,
        queryEngine: options.queryEngine,
        status: Array.isArray(dataOrUrl)
          ? LoadingStatus.Loaded
          : options.fetchOnce
          ? LoadingStatus.Loading
          : LoadingStatus.NotInitialized,
        search: options.initialSearch,
        searcher: options.searcher,
        serializer: options.serializer,
        sort: options.initialSort,
        sortBy: options.initialSortBy,
        throttle: options.throttle,
        url: Array.isArray(dataOrUrl) ? undefined : dataOrUrl,
      } as CollectionState<T, M>;
    },
  );

  const methods = useMemo(() => {
    return [
      'addFilter',
      'addFilterCriteria',
      'addSortBy',
      'clearFields',
      'clearFilter',
      'clearSearch',
      'clearSort',
      'clearSortBy',
      'filter',
      'getAdapter',
      'getFields',
      'getFilter',
      'getOffset',
      'getSearch',
      'getSize',
      'getSort',
      'getSortBy',
      'load',
      'query',
      'refresh',
      'removeFilter',
      'removeSortBy',
      'search',
      'setData',
      'setFields',
      'setItems',
      'setMeta',
      'sort',
      'sortBy',
    ].reduce((accumulator, method) => {
      accumulator[method] = service[method].bind(service);
      return accumulator;
    }, {} as AnonymousObject);
  }, [service]);

  const collection = useMemo(() => {
    return Object.assign({}, methods, {
      items: service.items,
      status: service.status,
      total: service.total,
    });
  }, [methods, service.status, service.items, service.total]) as Collection<T, M>;

  useEffect(() => {
    if (typeof dataOrUrl === 'string' && options.fetchOnce) {
      const fetcher: Fetcher<CollectionFetcherResult<T>, T> = options.fetcher || asyncHttp;
      fetcher(dataOrUrl, options.method || HttpMethod.Get, undefined, state.fetchOptions).then((result) => {
        if (Array.isArray(result)) {
          service.setData(result);
        } else {
          service.setData(result.result);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return collection;
};

export default useCollection;
