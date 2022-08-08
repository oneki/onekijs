import { CollectionProxy, useCollectionInitialState } from 'onekijs-framework';
import TreeService from '../TreeService';
import { TreeItem, TreeState, UseTreeOptions } from '../typings';

const useTreeInitialState = <T, I extends TreeItem<T>>(
  dataSource: string | T[] | undefined | CollectionProxy<T, I, TreeState<T, I>, TreeService<T, I, TreeState<T, I>>>,
  options: UseTreeOptions<T, I>,
): TreeState<T, I> => {
  return useCollectionInitialState(dataSource, options);
};

export default useTreeInitialState;
