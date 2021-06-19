import { useEffect, useMemo, useRef } from 'react';
import LocalRouter from '../router/LocalRouter';

import useService from '../core/useService';

import CollectionService from './CollectionService';
import LocalCollectionService from './LocalCollectionService';
import RemoteCollectionService from './RemoteCollectionService';
import {
  Collection,
  CollectionFetcherResult,
  CollectionItemAdapter,
  CollectionState,
  Item,
  ItemMeta,
  LoadingStatus,
  Query,
  UseCollectionOptions,
} from './typings';
import { isCollection, toCollectionItem } from './utils';
import { useRouter } from '../app';
import { omit } from '../utils';
import { AnonymousObject, Fetcher, FetchOptions, HttpMethod } from '../typings';
import { asyncHttp } from '../core';

const useCollection = <T = any, M extends ItemMeta = ItemMeta>(
  dataSource: T[] | string | Collection<T, M>,
  options: UseCollectionOptions<T, M> = {},
): Collection<T, M> => {
  const initializedRef = useRef(false);
  let router = useRouter();
  if (!options.mutateUrl) {
    router = new LocalRouter();
  }
  let dataOrUrl: T[] | string;

  if (isCollection(dataSource)) {
    // we are going to create a fake collection (because hooks cannot be conditionals)
    dataOrUrl = [];
    options = {};
  } else {
    dataOrUrl = dataSource;
  }
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

      let adapter: CollectionItemAdapter<T, M> | undefined;
      const optionAdapter = options.adapter;
      if (optionAdapter !== undefined) {
        adapter = (data) => {
          if (data !== undefined) {
            const result = optionAdapter(data);
            result.id = result.id !== undefined ? String(result.id) : undefined;
            return result as Partial<Item<T, M>>;
          } else {
            return {
              meta: {},
            } as Partial<Item<T, M>>;
          }
        };
      }

      return {
        adapter,
        comparator: options.comparator,
        dataKey: options.dataKey || 'data',
        db: Array.isArray(dataOrUrl) ? dataOrUrl.map((entry) => toCollectionItem(entry, adapter)) : undefined,
        fetchOptions,
        fields: options.initialFields,
        filter: options.initialFilter,
        hasMoreKey: options.hasMoreKey || 'has_more',
        method: options.method,
        offset: options.initialOffset,
        params: options.initialParams,
        queryEngine: options.queryEngine,
        router,
        status: Array.isArray(dataOrUrl)
          ? LoadingStatus.Loaded
          : options.fetchOnce
          ? LoadingStatus.Loading
          : LoadingStatus.NotInitialized,
        search: options.initialSearch,
        searcher: options.searcher,
        serializer: options.serializer,
        limit: options.initialLimit,
        sort: options.initialSort,
        sortBy: options.initialSortBy,
        throttle: options.throttle,
        totalKey: options.totalKey || 'total',
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
      'getFilterById',
      'getItem',
      'getMeta',
      'getOffset',
      'getParam',
      'getParams',
      'getSearch',
      'getLimit',
      'getSort',
      'getSortBy',
      'getSortByField',
      'load',
      'query',
      'refresh',
      'removeFilter',
      'removeSortBy',
      'reset',
      'search',
      'setData',
      'setFields',
      'setItems',
      'setMeta',
      'setParams',
      'sort',
      'sortBy',
    ].reduce((accumulator, method) => {
      accumulator[method] = service[method].bind(service);
      return accumulator;
    }, {} as AnonymousObject);
  }, [service]);

  const collection = useMemo(() => {
    return Object.assign({}, methods, {
      data: service.data,
      hasMore: service.hasMore,
      items: service.items,
      status: service.status,
      total: service.total,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, service.items, service.status, service.total]) as Collection<T, M>;

  useEffect(() => {
    if (typeof dataOrUrl === 'string' && options.fetchOnce) {
      const fetcher: Fetcher<CollectionFetcherResult<T>, Query | undefined> = options.fetcher || asyncHttp;
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

  useEffect(() => {
    if (!isCollection(dataSource) && options.autoload && !initializedRef.current) {
      initializedRef.current = true;
      collection.load(options.initialLimit, options.initialOffset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  return isCollection(dataSource) ? dataSource : collection;
};

export default useCollection;
