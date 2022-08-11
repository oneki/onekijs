import { CollectionProxy, useCollectionProxy } from 'onekijs-framework';
import TreeService from '../TreeService';
import { TreeItem, TreeState, UseTreeOptions } from '../typings';
import useTreeInitialState from './useTreeInitialState';

const useTreeController = <T>(
  dataSource?:
    | string
    | T[]
    | CollectionProxy<
        T,
        TreeItem<T>,
        TreeState<T, TreeItem<T>>,
        TreeService<T, TreeItem<T>, TreeState<T, TreeItem<T>>>
      >,
  options: UseTreeOptions<T, TreeItem<T>> = {},
): CollectionProxy<
  T,
  TreeItem<T>,
  TreeState<T, TreeItem<T>>,
  TreeService<T, TreeItem<T>, TreeState<T, TreeItem<T>>>
> => {
  const tableState = useTreeInitialState<T, TreeItem<T>>(dataSource, options);

  return useCollectionProxy<
    T,
    TreeItem<T>,
    TreeState<T, TreeItem<T>>,
    TreeService<T, TreeItem<T>, TreeState<T, TreeItem<T>>>
  >(dataSource, TreeService, tableState);
};

export default useTreeController;
