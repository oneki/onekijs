import { useCollectionProxy } from 'onekijs-framework';
import TreeService from '../TreeService';
import { TreeController, TreeItem, TreeState, UseTreeOptions } from '../typings';
import useTreeInitialState from './useTreeInitialState';

const useTree = <T>(options: UseTreeOptions<T, TreeItem<T>>): TreeController<T, TreeItem<T>> => {
  const treeState = useTreeInitialState<T>(options);
  return useCollectionProxy<
    T,
    TreeItem<T>,
    TreeState<T, TreeItem<T>>,
    TreeService<T, TreeItem<T>, TreeState<T, TreeItem<T>>>
  >(options.dataSource, TreeService, treeState);
};

export default useTree;
