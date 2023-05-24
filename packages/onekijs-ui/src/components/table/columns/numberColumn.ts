import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableNumberFilterComponent from '../components/filters/TableNumberFilterComponent';
import { TableColumn, TableColumnOptions, TableItem } from '../typings';

const numberColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: TableColumnOptions<T, I>,
): TableColumn<T, I> => {
  return Object.assign(
    {
      CellComponent: DefaultCellComponent,
      filterable: true,
      FilterComponent: TableNumberFilterComponent,
      sortable: true,
    },
    options,
    {
      id,
    },
  );
};

export default numberColumn;
