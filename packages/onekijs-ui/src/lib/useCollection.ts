import { AnonymousObject, useService } from 'onekijs';
import { useMemo } from 'react';
import LocalQueryService from './LocalQueryService';
import { LocalCollection, LocalQueryState, UseCollectionOptions, LoadingStatus } from './typings';

const useCollection = <T>(initialData: T[], options: UseCollectionOptions<T> = {}): LocalCollection<T> => {
  const initialState = {
    data: initialData,
    fields: options.initialFields,
    filter: options.initialFilter,
    sortBy: options.initialSortBy,
    search: options.initialSearch,
    sort: options.initialSort,
    queryEngine: options.queryEngine,
    comparator: options.comparator,
    searcher: options.searcher,
  } as LocalQueryState<T>;

  const [state, service] = useService<LocalQueryState<T>, LocalQueryService<T, LocalQueryState<T>>>(
    LocalQueryService,
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
      'setData',
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
      status: LoadingStatus.Loaded,
      total: service.total,
    });
  }, [methods, state.result, service.total]) as LocalCollection<T>;

  return collection;
};

export default useCollection;
