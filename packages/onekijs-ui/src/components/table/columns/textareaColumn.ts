import TextareaCellComponent from '../components/cells/TextareaCellComponent';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
import defaultCellSerializer from '../seralizers/defaultCellSerializer';
import { TableItem, TextareaColumn, TextareaColumnOptions } from '../typings';

const textareaColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: TextareaColumnOptions<T, I>,
): TextareaColumn<T, I> => {
  const Component = options.CellComponent || TextareaCellComponent;

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

export default textareaColumn;
