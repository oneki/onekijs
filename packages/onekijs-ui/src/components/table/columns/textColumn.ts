import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableTextFilterComponent from '../components/filters/TableTextFilterComponent';
import { TableColumn, TableColumnSpec, TableItem } from '../typings';

const textColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: Omit<TableColumnSpec<T, I>, 'id'>,
): TableColumn<T, I> => {
  return Object.assign(
    {
      CellComponent: DefaultCellComponent,
      filterable: true,
      FilterComponent: TableTextFilterComponent,
      sortable: true,
    },
    options,
    {
      id,
    },
  );
};

export default textColumn;
