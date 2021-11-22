import { CollectionProxy, CollectionService, useCollectionInitialState, useCollectionProxy } from 'onekijs-framework';
import { ListItem, ListState, UseListOptions } from '../typings';

const useListDataSource = <T = any>(
  dataSource: T[] | string,
  options: UseListOptions<T, ListItem<T>> = {},
): CollectionProxy<
  T,
  ListItem<T>,
  ListState<T, ListItem<T>>,
  CollectionService<T, ListItem<T>, ListState<T, ListItem<T>>>
> => {
  const initialState = useCollectionInitialState(dataSource, options);
  const collection = useCollectionProxy(dataSource, CollectionService, initialState);

  return collection;
};

export default useListDataSource;
