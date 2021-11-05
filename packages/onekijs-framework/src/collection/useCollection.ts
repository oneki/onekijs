import CollectionService from './CollectionService';
import { CollectionProxy, UseCollectionOptions } from './typings';
import useCollectionInitialState from './useCollectionInitialState';
import useCollectionProxy from './useCollectionProxy';

const useCollection = <T = any>(
  dataSource: T[] | string | CollectionProxy<T> | undefined,
  options: UseCollectionOptions<T> = {},
): CollectionProxy<T> => {
  const initialState = useCollectionInitialState(dataSource, options);
  return useCollectionProxy(dataSource, CollectionService, initialState);
};

export default useCollection;
