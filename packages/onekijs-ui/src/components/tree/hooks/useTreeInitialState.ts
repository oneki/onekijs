import { useCollectionInitialState } from 'onekijs-framework';
import { TreeItem, TreeState, UseTreeOptions } from '../typings';

const useTreeInitialState = <T, I extends TreeItem<T>>(
  dataSource: string | T[] | undefined,
  options: UseTreeOptions<T, I>,
): TreeState<T, I> => {
  return useCollectionInitialState(dataSource, options);
};

export default useTreeInitialState;
