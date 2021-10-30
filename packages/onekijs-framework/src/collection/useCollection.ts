import useObjectProxy from '../core/useObjectProxy';
import CollectionService from './CollectionService';
import { Collection, CollectionState, ItemMeta, UseCollectionOptions } from './typings';
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

const useCollection = <T = any, M extends ItemMeta = ItemMeta, I extends Item<T, M> = Item<T, M>>(
  dataSource: T[] | string | Collection<T, M, I> | undefined,
  adapter: CollectionItemAdapter<T, M, I>,
  options: UseCollectionOptions<T, M> = {},
): Collection<T, M, I> => {
  const initialState = useCollectionState(dataSource, adapter, options);
  const [, service] = useCollectionService<
    T,
    M,
    I,
    CollectionState<T, M, I>,
    CollectionService<T, M, I, CollectionState<T, M, I>>
  >(dataSource, CollectionService, initialState);

  const collection = useObjectProxy<Collection<T, M, I>>(service, collectionProxyProps);

  return isCollection(dataSource) ? dataSource : collection;
};

export default useCollection;
