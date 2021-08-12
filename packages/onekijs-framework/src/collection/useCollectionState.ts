import useLazyRef from '../core/useLazyRef';
import useTryRouter from '../core/useTryRouter';
import useTryStore from '../core/useTryStore';
import LocalRouter from '../router/LocalRouter';
import { FetchOptions } from '../types/fetch';
import { omit } from '../utils/object';
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

const useCollectionState = <T = any, M extends ItemMeta = ItemMeta>(
  dataSource?: T[] | string | Collection<T, M>,
  options: UseCollectionOptions<T, M> = {},
): CollectionState<T, M> => {
  const auth = useTryStore()?.getState().auth;
  let router = useTryRouter();

  let dataOrUrl: T[] | string;

  if (isCollection(dataSource)) {
    // we are going to create a fake collection (because hooks cannot be conditionals)
    dataOrUrl = [];
    options = {};
  } else {
    dataOrUrl = dataSource || [];
  }

  const stateRef = useLazyRef<CollectionState<T, M>>(() => {
    if (!router || !options.mutateUrl) {
      router = new LocalRouter();
    }

    if (options.auth === true) {
      options.auth = auth;
    } else if (options.auth === false) {
      options.auth = undefined;
    }
    const fetchOptions = Object.assign(
      { delayLoading: 0 },
      omit<FetchOptions<CollectionFetcherResult<T>, Query | undefined>>(options, [
        'adapter',
        'comparator',
        'comparators',
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
      autoload: options.autoload,
      comparator: options.comparator,
      comparators: options.comparators,
      dataKey: options.dataKey || 'data',
      db: Array.isArray(dataOrUrl) ? dataOrUrl.map((entry) => toCollectionItem(entry, adapter)) : undefined,
      fetchOptions,
      fields: options.initialFields,
      filter: options.initialFilter,
      fetchOnce: options.fetchOnce,
      hasDataSource: dataSource !== undefined,
      hasMoreKey: options.hasMoreKey || 'has_more',
      limit: options.initialLimit,
      local: Array.isArray(dataOrUrl) || options.fetchOnce,
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
      sort: options.initialSort,
      sortBy: options.initialSortBy,
      throttle: options.throttle,
      totalKey: options.totalKey || 'total',
      url: Array.isArray(dataOrUrl) ? undefined : dataOrUrl,
    } as CollectionState<T, M>;
  });
  return stateRef.current;
};

export default useCollectionState;
