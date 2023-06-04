import { useLazyRef } from 'onekijs-framework';
import enumColumn from '../columns/enumColumn';
import { EnumColumnOptions, TableColumn, TableItem } from '../typings';

const useEnumColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: EnumColumnOptions<T, I>,
): TableColumn<T, I> => {
  const column = useLazyRef(() => {
    return enumColumn(id, options);
  });
  return column.current;
};

export default useEnumColumn;
