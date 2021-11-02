import { useCollectionService, Class } from 'onekijs-framework';
import TableService from '../TableService';
import { TableItem, TableState } from '../typings';

const useTableService = <
  T,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableService<T, I, S> = TableService<T, I, S>
>(
  dataSource: T[] | string | undefined,
  ctor: Class<C>,
  initialState: S,
): [S, C] => {
  return useCollectionService<T, I, S, C>(dataSource, ctor, initialState);
};

export default useTableService;
