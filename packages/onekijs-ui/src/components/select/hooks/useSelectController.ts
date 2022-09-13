import { CollectionProxy, useCollectionInitialState, useCollectionProxy } from 'onekijs-framework';
import { UseListOptions } from '../../list/typings';
import SelectService from '../SelectService';
import { SelectItem, SelectState } from '../typings';

const useSelectController = <T = any, I extends SelectItem<T> = SelectItem<T>>(
  dataSource: T[] | string | undefined,
  options: UseListOptions<T, I> = {},
): CollectionProxy<T, I, SelectState<T, I>, SelectService<T, I, SelectState<T, I>>> => {
  const initialState = useCollectionInitialState<T, I>(dataSource, Object.assign({ initialLimit: 20 }, options));
  const collection = useCollectionProxy<T, I, SelectState<T, I>, SelectService<T, I, SelectState<T, I>>>(
    dataSource,
    SelectService,
    initialState,
  );

  return collection;
};

export default useSelectController;
