import { useLazyRef } from 'onekijs-framework';
import CheckboxCellComponent from '../components/cells/CheckboxCellComponent';
import { CheckboxColumn, InputColumn, TableItem, UseCheckboxColumnOptions } from '../typings';

const useCheckboxColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: UseCheckboxColumnOptions<T, I>,
): CheckboxColumn<T, I> => {
  const Component = options.CellComponent || CheckboxCellComponent;
  const optionsRef = useLazyRef<InputColumn<T, I>>(() => {
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

export default useCheckboxColumn;
