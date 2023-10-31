import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableNumberFilterComponent from '../components/filters/TableNumberFilterComponent';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
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
      Displayer: DefaultCellDisplayer,
    },
    options,
    {
      id,
    },
  );
};

export default numberColumn;
