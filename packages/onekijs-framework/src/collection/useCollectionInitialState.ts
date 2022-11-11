import useLazyRef from '../core/useLazyRef';
import useTryRouter from '../core/useTryRouter';
import useTryStore from '../core/useTryStore';
import LocalRouter from '../router/LocalRouter';
import { Collection, CollectionProxy, CollectionState, Item, UseCollectionOptions } from './typings';
import { isCollection } from './utils';

const useCollectionInitialState = <T = any, I extends Item<T> = Item<T>>(
  dataSource:
    | T[]
    | string
    | CollectionProxy<T, I, CollectionState<T, I>, Collection<T, I, CollectionState<T, I>>>
    | undefined,
  options: UseCollectionOptions<T, I> = {},
): CollectionState<T, I> => {
  const auth = useTryStore()?.getState().auth;
  let router = useTryRouter();

  let dataOrUrl: T[] | string | undefined;

  if (isCollection(dataSource)) {
    // we are going to create a fake collection (because hooks cannot be conditionals)
    dataOrUrl = [];
    options = {};
  } else {
    dataOrUrl = dataSource;
  }

  const stateRef = useLazyRef<CollectionState<T, I>>(() => {
    if (!router || !options.mutateUrl) {
      router = new LocalRouter();
    }

    if (options.auth === true) {
      options.auth = auth;
    } else if (options.auth === false) {
      options.auth = undefined;
    }
    const fetchOptions = Object.assign({ delayLoading: 0 }, options);

    return {
      adapter: options.adapter,
      autoload: options.autoload,
      comparator: options.comparator,
      comparators: options.comparators,
      dataKey: options.dataKey || 'data',
      dataSource: dataOrUrl,
      fetchOptions,
      fields: options.initialFields,
      filter: options.initialFilter,
      fetchOnce: options.fetchOnce,
      hasDataSource: dataSource !== undefined,
      hasMoreKey: options.hasMoreKey || 'has_more',
      limit: options.initialLimit,
      local: Array.isArray(dataOrUrl) || options.fetchOnce,
      method: options.method,
      mutateUrl: options.mutateUrl,
      offset: options.initialOffset,
      params: options.initialParams,
      queryEngine: options.queryEngine,
      router,
      search: options.initialSearch,
      searcher: options.searcher,
      serializer: options.serializer,
      sort: options.initialSort,
      sortBy: options.initialSortBy,
      throttle: options.throttle,
      totalKey: options.totalKey || 'total',
      url: Array.isArray(dataOrUrl) ? undefined : dataOrUrl,
    } as CollectionState<T, I>;
  });
  return stateRef.current;
};

export default useCollectionInitialState;
