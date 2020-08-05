import { useService, omit, FetchOptions } from 'onekijs';
import RemoteQueryService from './RemoteQueryService';
import { RemoteQueryState, UseRemoteCollectionOptions } from './typings';
import { useEffect } from 'react';

const useRestCollection = <T>(
  url: string,
  options: UseRemoteCollectionOptions<T> = {},
): RemoteQueryService<T, RemoteQueryState<T>> => {
  const fetchOptions = omit<FetchOptions<T>>(options, [
    'initialFilter',
    'initialSort',
    'initialFields',
    'initialSize',
    'initialOffset',
    'serializer',
  ]);
  const initialState = {
    url,
    filter: options.initialFilter,
    sortBy: options.initialSortBy,
    search: options.initialSearch,
    sort: options.initialSort,
    fields: options.initialFields,
    offset: options.initialOffset,
    size: options.initialSize,
    serializer: options.serializer,
    fetchOptions,
  } as RemoteQueryState<T>;

  const [, service] = useService<RemoteQueryState<T>, RemoteQueryService<T, RemoteQueryState<T>>>(
    RemoteQueryService,
    initialState,
  );

  useEffect(() => {
    service.refresh();
  }, [service]);

  return service;
};

export default useRestCollection;
