import useCollectionService from '../../../collection/useCollectionService';
import { Class } from '../../../types/object';
import GridService from './GridService';
import { GridItemMeta, GridState } from './typings';

const useGridService = <
  T = any,
  M extends GridItemMeta = GridItemMeta,
  S extends GridState<T, M> = GridState<T, M>,
  C extends GridService<T, M, S> = GridService<T, M, S>
>(
  dataSource: T[] | string,
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  return useCollectionService<T, M, S, C>(dataSource, ctor, initialState);
};

export default useGridService;
