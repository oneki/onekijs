import { useLazyRef } from 'onekijs-framework';
import checkboxColumn from '../columns/checkboxColumn';
import { CheckboxColumn, CheckboxColumnOptions, TableItem } from '../typings';

const useCheckboxColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: CheckboxColumnOptions<T, I>,
): CheckboxColumn<T, I> => {
  const column = useLazyRef(() => {
    return checkboxColumn(id, options);
  });
  return column.current;
};

export default useCheckboxColumn;
