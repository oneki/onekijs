import { useLazyRef } from 'onekijs-framework';
import linkCellComponent from '../components/hoc/linkCellComponent';
import { TableColumn, TableItem, UseLinkColumnOptions } from '../typings';
import useColumn from './useColumn';

const useLinkColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: UseLinkColumnOptions<T, I>,
): TableColumn<T, I> => {
  const column = useColumn(options);

  const optionsRef = useLazyRef<TableColumn<T, I>>(() => {
    return Object.assign({}, column, {
      CellComponent: linkCellComponent(options.href),
    });
  });
  return optionsRef.current;
};

export default useLinkColumn;
