import { CollectionProxy, useCollectionProxy } from 'onekijs-framework';
import TreeService from '../TreeService';
import { TreeItem, TreeState, UseTreeOptions } from '../typings';
import useTreeInitialState from './useTreeInitialState';

const useTreeController = <T, I extends TreeItem<T> = TreeItem<T>>(
  dataSource?: string | T[] | CollectionProxy<T, I, TreeState<T, I>, TreeService<T, I, TreeState<T, I>>>,
  options: UseTreeOptions<T, I> = {},
): CollectionProxy<T, I, TreeState<T, I>, TreeService<T, I, TreeState<T, I>>> => {
  const tableState = useTreeInitialState<T, I>(dataSource, options);
  return useCollectionProxy<T, I, TreeState<T, I>, TreeService<T, I, TreeState<T, I>>>(
    dataSource,
    TreeService,
    tableState,
  );
};

export default useTreeController;
