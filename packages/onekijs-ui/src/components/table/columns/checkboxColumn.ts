import { useLazyRef } from 'onekijs-framework';
import CheckboxCellComponent from '../components/cells/CheckboxCellComponent';
import { CheckboxColumn, TableItem, UseCheckboxColumnOptions } from '../typings';

const useCheckboxColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  options: UseCheckboxColumnOptions<T, I>,
): CheckboxColumn<T, I> => {
  const Component = options.CellComponent || CheckboxCellComponent;
  const optionsRef = useLazyRef<CheckboxColumn<T, I>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
        className: 'o-checkbox-cell',
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
