import { useLazyRef } from 'onekijs-framework';
import textareaColumn from '../columns/textareaColumn';
import { TableItem, TextareaColumn, TextareaColumnOptions } from '../typings';

const useTextareaColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: TextareaColumnOptions<T, I>,
): TextareaColumn<T, I> => {
  const column = useLazyRef(() => {
    return textareaColumn(id, options);
  });
  return column.current;
};

export default useTextareaColumn;
