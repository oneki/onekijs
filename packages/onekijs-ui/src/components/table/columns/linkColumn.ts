import linkCellComponent from '../components/hoc/linkCellComponent';
import { LinkColumnOptions, TableColumn, TableItem } from '../typings';
import textColumn from './textColumn';

const linkColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: LinkColumnOptions<T, I>,
): TableColumn<T, I> => {
  const column = textColumn(id, options);

  return Object.assign({}, column, {
    CellComponent: linkCellComponent(options.href),
  });
};

export default linkColumn;
