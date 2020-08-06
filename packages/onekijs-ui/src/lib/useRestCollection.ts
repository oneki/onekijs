import { AnonymousObject, FetchOptions, omit, useService } from 'onekijs';
import { useMemo } from 'react';
import RemoteQueryService from './RemoteQueryService';
import { RemoteCollection, RemoteQueryState, UseRemoteCollectionOptions } from './typings';

const useRestCollection = <T>(url: string, options: UseRemoteCollectionOptions<T> = {}): RemoteCollection<T> => {
  const fetchOptions = omit<FetchOptions<T>>(options, [
    'initialFilter',
    'initialSortBy',
    'initialSort',
    'initialFields',
    'serializer',
  ]);
  const initialState = {
    url,
    filter: options.initialFilter,
    sortBy: options.initialSortBy,
    search: options.initialSearch,
    sort: options.initialSort,
    fields: options.initialFields,
    serializer: options.serializer,
    fetchOptions,
  } as RemoteQueryState<T>;

  const [state, service] = useService<RemoteQueryState<T>, RemoteQueryService<T, RemoteQueryState<T>>>(
    RemoteQueryService,
    initialState,
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
      data: state.result,
      loading: state.loading,
      paginatedData: state.paginatedResult,
      total: service.total,
    });
  }, [methods, state.result, state.paginatedResult, state.loading, service.total]) as RemoteCollection<T>;

  return collection;
};

export default useRestCollection;
