import TableNumberFilterComponent from '../components/filters/TableNumberFilterComponent';
import { TableColumn, TableColumnSpec, TableItem } from '../typings';
import textColumn from './textColumn';

const numberColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: Omit<TableColumnSpec<T, I>, 'id'>,
): TableColumn<T, I> => {
  return textColumn(
    id,
    Object.assign(
      {
        FilterComponent: TableNumberFilterComponent,
      },
      options,
    ),
  );
};

export default numberColumn;
