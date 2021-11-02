import CollectionService from './CollectionService';
import {
  CollectionItemAdapter,
  CollectionProxy,
  CollectionState,
  Item,
  UseCollectionOptions,
  Collection,
} from './typings';
import useCollectionService from './useCollectionService';
import useCollectionInitialState from './useCollectionInitialState';
import { isCollection } from './utils';
import useCollectionProxy from './useCollectionProxy';

const useCollection = <T = any, I extends Item<T> = Item<T>>(
  dataSource:
    | T[]
    | string
    | CollectionProxy<T, I, CollectionState<T, I>, Collection<T, I, CollectionState<T, I>>>
    | undefined,
  adapter: CollectionItemAdapter<T, I>,
  options: UseCollectionOptions<T, I> = {},
): CollectionProxy<T, I, CollectionState<T, I>, Collection<T, I, CollectionState<T, I>>> => {
  const initialState = useCollectionInitialState(dataSource, adapter, options);
  const [, service] = useCollectionService<T, I, CollectionState<T, I>, CollectionService<T, I, CollectionState<T, I>>>(
    dataSource,
    CollectionService,
    initialState,
  );
  const collection = useCollectionProxy<T, I, CollectionState<T, I>, Collection<T, I, CollectionState<T, I>>>(service);
  if (isCollection(dataSource)) {
    return dataSource;
  }
  return collection;
};

export default useCollection;
