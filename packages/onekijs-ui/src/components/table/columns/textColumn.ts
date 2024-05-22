import DefaultCellComponent from '../components/cells/DefaultCellComponent';
import TableTextFilterComponent from '../components/filters/TableTextFilterComponent';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
import defaultCellSerializer from '../seralizers/defaultCellSerializer';
import { TableColumn, TableColumnOptions, TableItem } from '../typings';

const textColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: TableColumnOptions<T, I>,
): TableColumn<T, I> => {
  return Object.assign(
    {
      CellComponent: DefaultCellComponent,
      filterable: true,
      FilterComponent: TableTextFilterComponent,
      sortable: true,
      Displayer: DefaultCellDisplayer,
      serializer: defaultCellSerializer,
    },
    options,
    {
      id,
    },
  );
};

export default textColumn;
