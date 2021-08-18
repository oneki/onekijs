import useObjectProxy from '../core/useObjectProxy';
import CollectionService from './CollectionService';
import { Collection, CollectionState, ItemMeta, UseCollectionOptions } from './typings';
import useCollectionService from './useCollectionService';
import useCollectionState from './useCollectionState';
import { isCollection } from './utils';

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

const useCollection = <T = any, M extends ItemMeta = ItemMeta>(
  dataSource?: T[] | string | Collection<T, M>,
  options: UseCollectionOptions<T, M> = {},
): Collection<T, M> => {
  const initialState = useCollectionState(dataSource, options);
  const [, service] = useCollectionService<T, M, CollectionState<T, M>, CollectionService<T, M, CollectionState<T, M>>>(
    dataSource,
    CollectionService,
    initialState,
  );

  const collection = useObjectProxy<Collection<T, M>>(service, collectionProxyProps);

  return isCollection(dataSource) ? dataSource : collection;
};

export default useCollection;
