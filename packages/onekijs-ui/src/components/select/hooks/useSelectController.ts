import { CollectionProxy, useCollectionInitialState, useCollectionProxy } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import SelectService from '../SelectService';
import { SelectItem, SelectState } from '../typings';

const useSelectController = <T = any>(
  dataSource: T[] | string,
  options: UseListOptions<T, SelectItem<T>> = {},
): CollectionProxy<
  T,
  SelectItem<T>,
  SelectState<T, SelectItem<T>>,
  SelectService<T, SelectItem<T>, SelectState<T, SelectItem<T>>>
> => {
  const initialState = useCollectionInitialState(dataSource, options);
  const collection = useCollectionProxy(dataSource, SelectService, initialState);

  return collection;
};

export default useSelectController;
