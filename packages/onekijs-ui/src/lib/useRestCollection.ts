import { AnonymousObject, FetchOptions, omit, useService } from 'onekijs';
import { useMemo } from 'react';
import RemoteQueryService from './RemoteCollectionService';
import { RemoteCollection, RemoteCollectionState, UseRemoteCollectionOptions } from './typings';

const useRestCollection = <T>(url: string, options: UseRemoteCollectionOptions<T> = {}): RemoteCollection<T> => {
  const [, service] = useService<RemoteCollectionState<T>, RemoteQueryService<T, RemoteCollectionState<T>>>(
    RemoteQueryService,
    () => {
      const fetchOptions = Object.assign(
        { delayLoading: 0 },
        omit<FetchOptions<T>>(options, [
          'initialFilter',
          'initialSortBy',
          'initialSort',
          'initialFields',
          'serializer',
          'method',
          'throttle',
        ]),
      );
      return {
        url,
        filter: options.initialFilter,
        sortBy: options.initialSortBy,
        search: options.initialSearch,
        sort: options.initialSort,
        fields: options.initialFields,
        serializer: options.serializer,
        method: options.method,
        throttle: options.throttle,
        fetchOptions,
      } as RemoteCollectionState<T>;
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
      'getFields',
      'getFilter',
      'getOffset',
      'getSearch',
      'getSize',
      'getSort',
      'getSortBy',
      'load',
      'refresh',
      'removeFilter',
      'removeSortBy',
      'search',
      'setFields',
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
      meta: service.meta,
      status: service.status,
      total: service.total,
    });
  }, [methods, service.data, service.meta, service.status, service.total]) as RemoteCollection<T>;

  return collection;
};

export default useRestCollection;
