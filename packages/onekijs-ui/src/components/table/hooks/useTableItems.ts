import { TableItem } from '../typings';
import { useTableState } from './useTableState';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useTableItems = <T = any, I extends TableItem<T> = TableItem<T>>(): (I | undefined)[] => {
  return useTableState<T, I>().items || [];
};

export default useTableItems;
