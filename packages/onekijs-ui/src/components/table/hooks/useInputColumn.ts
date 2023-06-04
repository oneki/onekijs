import { useLazyRef } from 'onekijs-framework';
import inputColumn from '../columns/inputColumn';
import { InputColumn, InputColumnOptions, TableItem } from '../typings';

const useInputColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: InputColumnOptions<T, I>,
): InputColumn<T, I> => {
  const column = useLazyRef(() => {
    return inputColumn(id, options);
  });
  return column.current;
};

export default useInputColumn;
