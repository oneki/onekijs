import { CollectionProxy, useCollectionProxy } from 'onekijs-framework';
import useTreeInitialState from '../../tree/hooks/useTreeInitialState';
import { UseTreeOptions } from '../../tree/typings';
import TreeSelectService from '../TreeSelectService';
import { TreeSelectItem, TreeSelectState } from '../typings';

const useTreeSelectController = <T = any, I extends TreeSelectItem<T> = TreeSelectItem<T>>(
  dataSource: T[] | string | undefined,
  options: UseTreeOptions<T, I> = {},
): CollectionProxy<T, I, TreeSelectState<T, I>, TreeSelectService<T, I, TreeSelectState<T, I>>> => {
  const initialState = useTreeInitialState<T, I>(dataSource, Object.assign({ initialLimit: 20 }, options));
  const collection = useCollectionProxy<T, I, TreeSelectState<T, I>, TreeSelectService<T, I, TreeSelectState<T, I>>>(
    dataSource,
    TreeSelectService,
    initialState,
  );

  return collection;
};

export default useTreeSelectController;
