import {
  CollectionProxy,
  CollectionService,
  Item,
  useCollectionInitialState,
  useCollectionProxy,
} from 'onekijs-framework';
import { ListItem, ListState, UseListOptions } from '../typings';

const useList = <T = any>(
  dataSource: T[] | string | CollectionProxy<T, Item<T>>,
  options: UseListOptions<T, Item<T>> = {},
): CollectionProxy<
  T,
  ListItem<T>,
  ListState<T, ListItem<T>>,
  CollectionService<T, ListItem<T>, ListState<T, ListItem<T>>>
> => {
  const initialState = useCollectionInitialState(dataSource, options);
  return useCollectionProxy(dataSource, CollectionService, initialState);
};

export default useList;
