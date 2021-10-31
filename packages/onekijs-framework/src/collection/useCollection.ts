import useObjectProxy from '../core/useObjectProxy';
import CollectionService from './CollectionService';
import { Collection, CollectionState, UseCollectionOptions } from './typings';
import useCollectionService from './useCollectionService';
import useCollectionState from './useCollectionState';
import { isCollection } from './utils';
import { Item, CollectionItemAdapter } from './typings';

export const collectionProxyProps = {
  pick: [
    'adapt',
    'addFilter',
    'addFilterCriteria',
    'addSortBy',
    'asService',
    'clearFields',
    'clearFilter',
    'clearSearch',
    'clearSort',
    'clearSortBy',
    'dataSource',
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
    'getSortById',
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
    'setMeta',
    'setMetaById',
    'setParams',
    'sort',
    'sortBy',
  ],
  mutables: ['data', 'hasMore', 'items', 'status', 'total'],
};

const useCollection = <T = any, I extends Item<T> = Item<T>>(
  dataSource: T[] | string | Collection<T, I> | undefined,
  adapter: CollectionItemAdapter<T, I>,
  options: UseCollectionOptions<T, I> = {},
): Collection<T, I> => {
  const initialState = useCollectionState(dataSource, adapter, options);
  const [, service] = useCollectionService<T, I, CollectionState<T, I>, CollectionService<T, I, CollectionState<T, I>>>(
    dataSource,
    CollectionService,
    initialState,
  );

  const collection = useObjectProxy<Collection<T, I>>(service, collectionProxyProps);

  return isCollection(dataSource) ? dataSource : collection;
};

export default useCollection;
