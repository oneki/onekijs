import { TreeItem } from '../typings';
import { useTreeState } from './useTreeState';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useTreeItems = <T = any, I extends TreeItem<T> = TreeItem<T>>(): (I | undefined)[] => {
  return useTreeState<T, I>().items || [];
};

export default useTreeItems;
