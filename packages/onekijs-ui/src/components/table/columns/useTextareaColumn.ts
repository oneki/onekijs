import { useLazyRef } from 'onekijs-framework';
import TextareaCellComponent from '../components/cells/TextareaCellComponent';
import { TextareaColumn, UseTextareaColumnOptions, TableItem } from '../typings';

const useTextareaColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: UseTextareaColumnOptions<T, I>,
): TextareaColumn<T, I> => {
  const Component = options.CellComponent || TextareaCellComponent;
  const optionsRef = useLazyRef<TextareaColumn<T, I>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
      },
      options,
      {
        CellComponent: Component(options),
      },
    );
  });
  return optionsRef.current;
};

export default useTextareaColumn;
