import { useLazyRef } from 'onekijs-framework';
import { SelectItem } from '../../select/typings';
import selectColumn from '../columns/selectColumn';
import { SelectColumn, SelectColumnOptions, TableItem } from '../typings';

const useSelectColumn = <
  T = any,
  S = any,
  TI extends TableItem<T> = TableItem<T>,
  SI extends SelectItem<S> = SelectItem<S>,
>(
  id: string,
  options: SelectColumnOptions<T, S, TI, SI>,
): SelectColumn<T, S, TI, SI> => {
  const column = useLazyRef(() => {
    return selectColumn(id, options);
  });
  return column.current;
};

export default useSelectColumn;
