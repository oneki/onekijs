import { CollectionProxy, CollectionService, useCollectionInitialState, useCollectionProxy } from 'onekijs-framework';
import { ListItem, ListState, UseListOptions } from '../typings';

const useListController = <T = any, I extends ListItem<T> = ListItem<T>>(
  dataSource: T[] | string,
  options: UseListOptions<T, I> = {},
): CollectionProxy<T, I, ListState<T, I>, CollectionService<T, I, ListState<T, I>>> => {
  const initialState = useCollectionInitialState<T, I>(dataSource, options);
  const collection = useCollectionProxy<T, I, ListState<T, I>, CollectionService<T, I, ListState<T, I>>>(
    dataSource,
    CollectionService,
    initialState,
  );

  return collection;
};

export default useListController;
