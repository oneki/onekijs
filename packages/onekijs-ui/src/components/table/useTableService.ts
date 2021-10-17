import { useCollectionService, Class } from 'onekijs-framework';
import TableService from './TableService';
import { TableItemMeta, TableState } from './typings';

const useTableService = <
  T = any,
  M extends TableItemMeta = TableItemMeta,
  S extends TableState<T, M> = TableState<T, M>,
  C extends TableService<T, M, S> = TableService<T, M, S>
>(
  dataSource: T[] | string | undefined,
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  return useCollectionService<T, M, S, C>(dataSource || [], ctor, initialState);
};

export default useTableService;
