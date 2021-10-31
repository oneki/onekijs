import { useLazyRef } from 'onekijs-framework';
import InputCellComponent from '../components/InputCellComponent';
import { InputColumn, UseInputColumnOptions, TableItem } from '../typings';

const useInputColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: UseInputColumnOptions<T, I>,
): InputColumn<T, I> => {
  const optionsRef = useLazyRef<InputColumn<T, I>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
      },
      options,
      {
        CellComponent: InputCellComponent(options),
      },
    );
  });
  return optionsRef.current;
};

export default useInputColumn;
