import InputCellComponent from '../components/cells/InputCellComponent';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
import defaultCellSerializer from '../seralizers/defaultCellSerializer';
import { InputColumn, InputColumnOptions, TableItem } from '../typings';

const inputColumn = <T extends any = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: InputColumnOptions<T, I>,
): InputColumn<T, I> => {
  const Component = options.CellComponent || InputCellComponent;
  return Object.assign(
    {
      filterable: false,
      sortable: false,
      Displayer: DefaultCellDisplayer,
      serializer: defaultCellSerializer,
    },
    options,
    {
      id,
      CellComponent: Component(options),
    },
  );
};

export default inputColumn;
