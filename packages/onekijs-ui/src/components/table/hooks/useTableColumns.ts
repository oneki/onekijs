import { TableColumn, TableItem } from '../typings';
import { useTableState } from './useTableState';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useTableColumns = <T = any, I extends TableItem<T> = TableItem<T>>(): TableColumn<T, I>[] => {
  return useTableState<T, I>().columns;
};

export default useTableColumns;
