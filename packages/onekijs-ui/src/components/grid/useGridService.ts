import { useCollectionService } from '@oneki/collection';
import { Class } from '@oneki/types';
import GridService from './GridService';
import { GridItemMeta, GridState } from './typings';

const useGridService = <
  T = any,
  S extends GridState<T> = GridState<T>,
  C extends GridService<T, S> = GridService<T, S>
>(
  dataSource: T[] | string,
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  return useCollectionService<T, GridItemMeta, S, C>(dataSource, ctor, initialState);
};

export default useGridService;
