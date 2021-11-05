import { TableItem } from '../typings';
import { useMutableTableController } from './useTableController';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useTableItems = <T = any, I extends TableItem<T> = TableItem<T>>(): (I | undefined)[] => {
  return useMutableTableController<T, I>().state.items || [];
};

export default useTableItems;
