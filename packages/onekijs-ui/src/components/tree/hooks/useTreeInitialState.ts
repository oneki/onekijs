import { useCollectionInitialState, useLazyRef } from 'onekijs-framework';
import { TreeItem, TreeState, UseTreeOptions } from '../typings';

const useTreeInitialState = <T>(
  options: Omit<UseTreeOptions<T, TreeItem<T>>, 'adapter'>,
): TreeState<T, TreeItem<T>> => {
  const collectionState = useCollectionInitialState(options.dataSource, options);

  const stateRef = useLazyRef<TreeState<T, TreeItem<T>>>(() => {
    return Object.assign(collectionState, options);
  });
  return stateRef.current;
};

export default useTreeInitialState;
