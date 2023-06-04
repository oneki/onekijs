import { useLazyRef } from 'onekijs-framework';
import textColumn from '../columns/textColumn';
import { TableColumn, TableColumnOptions, TableItem } from '../typings';

const useTextColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: TableColumnOptions<T, I>,
): TableColumn<T, I> => {
  const column = useLazyRef(() => {
    return textColumn(id, options);
  });
  return column.current;
};

export default useTextColumn;
