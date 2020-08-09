import { AnonymousObject, FetchOptions, omit, useService } from 'onekijs';
import { useMemo } from 'react';
import RemoteQueryService from './RemoteQueryService';
import { RemoteCollection, RemoteQueryState, UseRemoteCollectionOptions } from './typings';

const useRestCollection = <T>(url: string, options: UseRemoteCollectionOptions<T> = {}): RemoteCollection<T> => {
  const [state, service] = useService<RemoteQueryState<T>, RemoteQueryService<T, RemoteQueryState<T>>>(
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
        fetchOptions,
      } as RemoteQueryState<T>;
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
      'getSearch',
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
      data: state.data,
      loading: state.loading,
      deprecated: state.deprecated,
      paginatedData: state.result,
      total: service.total,
    });
  }, [methods, state.data, state.result, state.loading, state.deprecated, service.total]) as RemoteCollection<T>;

  return collection;
};

export default useRestCollection;
