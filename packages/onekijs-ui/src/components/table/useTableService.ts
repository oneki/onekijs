import { useCollectionService, Class } from 'onekijs-framework';
import TableService from './TableService';
import { TableItem, TableItemMeta, TableState } from './typings';

const useTableService = <
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>,
  S extends TableState<T, M, I> = TableState<T, M, I>,
  C extends TableService<T, M, I, S> = TableService<T, M, I, S>
>(
  dataSource: T[] | string | undefined,
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  return useCollectionService<T, M, I, S, C>(dataSource || [], ctor, initialState);
};

export default useTableService;
