import { useLazyRef } from 'onekijs-framework';
import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableInputFilterComponent from '../components/filters/TableInputFilterComponent';
import { TableItem, TableColumnSpec, TableColumn } from '../typings';

const useColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: TableColumnSpec<T, I>,
): TableColumn<T, I> => {
  const optionsRef = useLazyRef<TableColumn<T, I>>(() => {
    return Object.assign(
      {
        CellComponent: DefaultCellComponent,
        filterable: true,
        FilterComponent: TableInputFilterComponent,
        sortable: true,
      },
      options,
    );
  });
  return optionsRef.current;
};

export default useColumn;
