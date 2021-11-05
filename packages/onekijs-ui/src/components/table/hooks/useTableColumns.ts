import { TableColumn, TableItem } from '../typings';
import { useMutableTableController } from './useTableController';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useTableColumns = <T = any, I extends TableItem<T> = TableItem<T>>(): TableColumn<T, I>[] => {
  return useMutableTableController<T, I>().state.columns;
};

export default useTableColumns;
