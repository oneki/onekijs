import InputCellComponent from '../components/cells/InputCellComponent';
import { InputColumn, InputColumnOptions, TableItem } from '../typings';

const inputColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: InputColumnOptions<T, I>,
): InputColumn<T, I> => {
  const Component = options.CellComponent || InputCellComponent;
  return Object.assign(
    {
      filterable: false,
      sortable: false,
    },
    options,
    {
      id,
      CellComponent: Component(options),
    },
  );
};

export default inputColumn;