import { useLazyRef } from 'onekijs-framework';
import linkColumn from '../columns/linkColumn';
import { LinkColumnOptions, TableColumn, TableItem } from '../typings';

const useLinkColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: LinkColumnOptions<T, I>,
): TableColumn<T, I> => {
  const column = useLazyRef(() => {
    return linkColumn(id, options);
  });
  return column.current;
};

export default useLinkColumn;
