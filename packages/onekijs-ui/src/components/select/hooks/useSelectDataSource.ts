import { CollectionProxy, CollectionService, useCollectionInitialState, useCollectionProxy } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import { SelectItem, SelectState } from '../typings';

const useSelectDataSource = <T = any>(
  dataSource: T[] | string,
  options: UseListOptions<T, SelectItem<T>> = {},
): CollectionProxy<
  T,
  SelectItem<T>,
  SelectState<T, SelectItem<T>>,
  CollectionService<T, SelectItem<T>, SelectState<T, SelectItem<T>>>
> => {
  const initialState = useCollectionInitialState(dataSource, options);
  const collection = useCollectionProxy(dataSource, CollectionService, initialState);

  return collection;
};

export default useSelectDataSource;
